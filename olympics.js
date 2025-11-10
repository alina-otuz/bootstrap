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
    // Function to apply theme based on stored value
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Create toggle button
const themeToggle = document.createElement('button');
themeToggle.textContent = '🌞 / 🌙';
themeToggle.id = 'themeToggle';
Object.assign(themeToggle.style, {
  position: 'fixed', bottom: '20px', right: '20px',
  padding: '10px 14px', border: 'none', borderRadius: '50%',
  fontSize: '20px', cursor: 'pointer',
  background: '#d62828', color: 'white', transition: 'all 0.6s ease'
});
document.body.appendChild(themeToggle);

// Load theme from local storage on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
}

// Add event listener to toggle theme
themeToggle.addEventListener('click', () => {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  
  // Save the current theme in local storage
  if (isDarkMode) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
  
  // Animate the button
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => (themeToggle.style.transform = ''), 600);
});
});