$(document).ready(function () {
    console.log("olympics.js loaded!");
  
    // ===== Scroll Progress Bar =====
    $(window).on("scroll", function () {
      const scrollTop = $(window).scrollTop();
      const docHeight = $(document).height() - $(window).height();
      const scrollPercent = (scrollTop / docHeight) * 100;
      $("#scrollBar").css("width", scrollPercent + "%");
    });
  
    // ===== FAQ Toggle =====
    $(document).on("click", ".question", function () {
      $(this).next(".answer").toggleClass("show");
      $(this).parent().toggleClass("open");
    });
  
    // ===== Toast & Sound =====
    window.showToast = function (message) {
      const toast = $('<div class="toast-message"></div>').text(message);
      $("body").append(toast);
      toast.fadeIn(300);
      setTimeout(() => toast.fadeOut(400, () => toast.remove()), 2500);
    };
  
    window.playSound = function (file) {
      try {
        const audio = new Audio(file);
        audio.volume = 0.7;
        audio.play().catch(() => {
          const success = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwF';
          const error = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
          new Audio(file.includes('success') ? success : error).play();
        });
      } catch (err) {
        console.warn("Sound error:", err);
      }
    };
  
    // ===== Popup & Form =====
    const $popup = $("#popup");
    $("#openPopup").on("click", () => $popup.show());
    $("#closePopup").on("click", () => $popup.hide());
    $(window).on("click", (e) => { if ($(e.target).is("#popup")) $popup.hide(); });
  
    $("#contactForm").on("submit", function (e) {
      e.preventDefault();
      const name = $("#contactName").val().trim();
      const email = $("#contactEmail").val().trim();
      const msg = $("#contactMessage").val().trim();
  
      if (!name || !email || !msg) {
        showToast("Заполните все поля!");
        playSound("error.mp3");
        return;
      }
  
      const $btn = $(this).find("button");
      $btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm"></span> Отправка…');
      playSound("success.mp3");
  
      setTimeout(() => {
        $btn.prop("disabled", false).text("Send");
        showToast("Сообщение отправлено!");
        $popup.hide();
        $(this)[0].reset();
      }, 1500);
    });
  
    // ===== Lazy Loading =====
    const lazyImages = $(".lazy");
    const lazyLoad = () => {
      const windowBottom = $(window).scrollTop() + $(window).height();
      lazyImages.each(function () {
        const $img = $(this);
        const imgTop = $img.offset().top;
        if (imgTop < windowBottom + 200 && !$img.attr("src")) {
          $img.attr("src", $img.data("src")).addClass("loaded");
        }
      });
    };
    $(window).on("scroll", lazyLoad);
    lazyLoad();
  
    // ===== Real-time DateTime =====
    if ($("#datetime").length) {
      const updateTime = () => {
        const now = new Date();
        $("#datetime").text(now.toLocaleString("en-GB", {
          weekday: "long", day: "numeric", month: "long", year: "numeric",
          hour: "2-digit", minute: "2-digit", second: "2-digit"
        }));
      };
      updateTime();
      setInterval(updateTime, 1000);
    }
  
    // ===== Medal Counters =====
    $(".counter").each(function () {
      const $this = $(this);
      const target = +$this.data("target");
      $({ count: 0 }).animate({ count: target }, {
        duration: 2000,
        easing: "swing",
        step: (now) => $this.text(Math.floor(now)),
        complete: () => $this.text(target)
      });
    });
  
    // ===== Theme Toggle =====
    (function () {
      if (document.getElementById('themeToggle')) return;
      const btn = document.createElement('button');
      btn.id = 'themeToggle';
      btn.innerHTML = 'Sun';
      Object.assign(btn.style, {
        position: 'fixed', bottom: '20px', right: '20px',
        width: '50px', height: '50px', borderRadius: '50%',
        background: '#d62828', color: 'white', border: 'none',
        fontSize: '18px', cursor: 'pointer', zIndex: '9999',
        transition: 'all 0.6s ease'
      });
  
      const isDark = localStorage.getItem('theme') === 'dark' || 
                     (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.body.classList.toggle('dark-mode', isDark);
      btn.innerHTML = isDark ? 'Moon' : 'Sun';
      document.body.appendChild(btn);
  
      btn.addEventListener('click', () => {
        const nowDark = !document.body.classList.contains('dark-mode');
        document.body.classList.toggle('dark-mode', nowDark);
        localStorage.setItem('theme', nowDark ? 'dark' : 'light');
        btn.innerHTML = nowDark ? 'Moon' : 'Sun';
        btn.style.transform = 'rotate(360deg)';
        setTimeout(() => btn.style.transform = '', 600);
      });
    })();
  });