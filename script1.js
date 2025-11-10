$(document).ready(function () {
  console.log("jQuery is ready! (script1.js loaded)");

  // ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ДЛЯ RESET =====
  let currentStep = 0;
  let $steps = $();
  let showStep = () => {};
  let $registerForm = $();

  // ===== Scroll Progress Bar =====
  if ($("#scrollBar").length) {
    $(window).on("scroll", function () {
      let scrollTop = $(window).scrollTop();
      let docHeight = $(document).height() - $(window).height();
      let scrollPercent = (scrollTop / docHeight) * 100;
      $("#scrollBar").css("width", scrollPercent + "%");
    });
  }

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

  // ===== Contact Popup & Form =====
  const $openPopup = $("#openPopup");
  const $popup = $("#popup");
  const $closePopup = $("#closePopup");

  if ($openPopup.length && $popup.length) {
    $openPopup.on("click", function () {
      $popup.show();
    });
    $closePopup.on("click", function () {
      $popup.hide();
    });
    $(window).on("click", function (e) {
      if ($(e.target).is("#popup")) {
        $popup.hide();
      }
    });
  }

  const $contactForm = $("#contactForm");
  if ($contactForm.length) {
    $contactForm.on("submit", function (e) {
      e.preventDefault();
      const name = $("#contactName").val().trim();
      const email = $("#contactEmail").val().trim();
      const msg = $("#contactMessage").val().trim();

      if (!name || !email || !msg) {
        showToast("Fill all fields.");
        playSound("error.mp3");
        return;
      }

      const $btn = $(this).find("button");
      $btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm"></span> Sending…');
      playSound("success.mp3");

      setTimeout(() => {
        $btn.prop("disabled", false).text("Send");
        showToast("Message sent!");
        $popup.hide();
        $(this)[0].reset();
      }, 1500);
    });
  }

  // ===== Lazy Loading =====
  const lazyImages = $(".lazy");
  if (lazyImages.length) {
    const lazyLoad = () => {
      const windowBottom = $(window).scrollTop() + $(window).height();
      lazyImages.each(function () {
        const $img = $(this);
        const imgTop = $img.offset().top;
        if (imgTop < windowBottom + 200 && !$img.attr("src")) {
          $img.attr("src", $img.data("src"));
        }
      });
    };
    $(window).on("scroll", lazyLoad);
    lazyLoad();
  }

  // ===== Real-time DateTime =====
  if ($("#datetime").length) {
    function updateTime() {
      const now = new Date();
      $("#datetime").text(now.toLocaleString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      }));
    }
    updateTime();
    setInterval(updateTime, 1000);
  }

  // ===== ANIMATED MEDAL COUNTERS =====
  if ($(".counter").length) {
    $(".counter").each(function () {
      const $this = $(this);
      const target = +$this.data("target");
      $({ countNum: 0 }).animate(
        { countNum: target },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        }
      );
    });
  }

  // ===== МНОГОШАГОВАЯ ФОРМА РЕГИСТРАЦИИ =====
  $registerForm = $("#registerForm");
  if ($registerForm.length) {
    $registerForm.html(`
      <div class="form-step active">
        <label class="form-label">Name:</label>
        <input type="text" id="stepName" class="form-control" placeholder="Your full name">
        <div class="invalid-feedback"></div>
        <button type="button" class="next btn btn-danger mt-3 w-100">Next</button>
      </div>
      <div class="form-step">
        <label class="form-label">Email:</label>
        <input type="email" id="stepEmail" class="form-control" placeholder="example@mail.com">
        <div class="invalid-feedback"></div>
        <div class="d-flex mt-3 gap-2">
          <button type="button" class="back btn btn-secondary w-50">Back</button>
          <button type="button" class="next btn btn-danger w-50">Next</button>
        </div>
      </div>
      <div class="form-step">
        <label class="form-label">Password:</label>
        <input type="password" id="stepPass" class="form-control" placeholder="Min 6 characters">
        <div class="invalid-feedback"></div>
        <div class="d-flex mt-3 gap-2">
          <button type="button" class="back btn btn-secondary w-50">Back</button>
          <button type="submit" class="btn btn-success w-50">Submit</button>
        </div>
      </div>
    `);

    $steps = $(".form-step");
    showStep = function (i) {
      $steps.removeClass("active").eq(i).addClass("active");
    };

    function showError(input, message) {
      const $input = $(input);
      const $error = $input.next(".invalid-feedback");
      $input.addClass("is-invalid");
      $error.text(message).show();
    }

    function clearError(input) {
      $(input).removeClass("is-invalid");
      $(input).next(".invalid-feedback").hide().text("");
    }

    function validateStep(step) {
      let valid = true;
      clearError("#stepName, #stepEmail, #stepPass");

      if (step === 0) {
        const name = $("#stepName").val().trim();
        if (!name) { showError("#stepName", "Name is required."); valid = false; }
        else if (name.length < 2) { showError("#stepName", "Name must be at least 2 characters."); valid = false; }
      }

      if (step === 1) {
        const email = $("#stepEmail").val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) { showError("#stepEmail", "Email is required."); valid = false; }
        else if (!emailRegex.test(email)) { showError("#stepEmail", "Enter a valid email."); valid = false; }
      }

      if (step === 2) {
        const pass = $("#stepPass").val();
        if (!pass) { showError("#stepPass", "Password is required."); valid = false; }
        else if (pass.length < 6) { showError("#stepPass", "Password must be at least 6 characters."); valid = false; }
      }

      if (!valid) {
        playSound("error.mp3");
        showToast("Please fix the errors.");
      }
      return valid;
    }

    $(document).on("click", ".next", function () {
      if (validateStep(currentStep)) {
        currentStep = Math.min(currentStep + 1, $steps.length - 1);
        showStep(currentStep);
      }
    });

    $(document).on("click", ".back", function () {
      currentStep = Math.max(currentStep - 1, 0);
      showStep(currentStep);
    });

    $registerForm.on("submit", function (e) {
      e.preventDefault();
      if (!validateStep(2)) return;

      const name = $("#stepName").val().trim();
      const $btn = $(this).find("button[type=submit]");
      $btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm"></span> Wait...');
      playSound("success.mp3");

      setTimeout(() => {
        $btn.prop("disabled", false).text("Submit");
        showToast(`Welcome, ${name}! You're registered!`);
        $registerForm[0].reset();
        currentStep = 0;
        showStep(0);
        clearError("#stepName, #stepEmail, #stepPass");
      }, 1500);
    });

    $("#stepName, #stepEmail, #stepPass").on("input", function () {
      clearError(this);
    });
  }

  // ===== Copy to Clipboard =====
  const $copyBtn = $("#copyBtn");
  if ($copyBtn.length) {
    $copyBtn.on("click", function () {
      const text = $("#copyText").text();
      navigator.clipboard.writeText(text).then(() => {
        $(this).text("Copied");
        showToast("Copied to clipboard!");
        playSound("success.mp3");
        setTimeout(() => $(this).text("Copy"), 2000);
      });
    });
  }

  // ===== Live Search + Autocomplete in FAQ =====
  const $faqSearch = $("#faqSearch");
  if ($faqSearch.length) {
    const faqItems = [
      { q: "What is Sport World?", a: "It’s a website about global sports trends and achievements." },
      { q: "Who created it?", a: "Created by Alina Otuzbayeva and Zhanel Shunshalinova, AITU students." },
      { q: "What can I find here?", a: "Information about various sports, Olympic Games, and major competitions." }
    ];

    function highlight(text, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }

    $faqSearch.on("input", function () {
      const value = $(this).val().trim().toLowerCase();
      const $suggestions = $("#faqSuggestions");
      $suggestions.empty();

      $(".accordion-item").each(function () {
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(value));
      });

      $("mark").contents().unwrap();
      if (value) {
        $(".question, .answer").each(function () {
          const $el = $(this);
          const text = $el.text();
          const highlighted = text.replace(new RegExp(`(${value})`, 'gi'), '<mark>$1</mark>');
          if (highlighted !== text) $el.html(highlighted);
        });
      }

      if (value) {
        const matches = faqItems
          .map(item => item.q)
          .filter(q => q.toLowerCase().includes(value))
          .slice(0, 5);

        if (matches.length > 0) {
          matches.forEach((q) => {
            const $item = $(`<div class="list-group-item">${highlight(q, value)}</div>`);
            $item.on("click", () => {
              $faqSearch.val(q);
              $suggestions.hide();
              $(".accordion-item").hide();
              $(`.accordion-item[data-question="${q}"]`).show().find(".answer").addClass("show");
            });
            $suggestions.append($item);
          });
          $suggestions.show();
        } else {
          $suggestions.hide();
        }
      } else {
        $suggestions.hide();
        $(".accordion-item").show();
        $(".answer").removeClass("show");
      }
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest("#faqSearch, #faqSuggestions").length) {
        $("#faqSuggestions").hide();
      }
    });

    let suggestionIndex = -1;
    $faqSearch.on("keydown", function (e) {
      const $items = $("#faqSuggestions .list-group-item");
      if (!$items.length) return;

      if (e.key === "ArrowDown") {
        suggestionIndex = (suggestionIndex + 1) % $items.length;
        $items.removeClass("active").eq(suggestionIndex).addClass("active");
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        suggestionIndex = (suggestionIndex - 1 + $items.length) % $items.length;
        $items.removeClass("active").eq(suggestionIndex).addClass("active");
        e.preventDefault();
      } else if (e.key === "Enter" && suggestionIndex >= 0) {
        $items.eq(suggestionIndex).click();
        e.preventDefault();
      }
    });
  }

  // ===== Rating System =====
// ===== Rating System =====
const starContainer = document.querySelector('#rating-stars');
if (starContainer) {
  const stars = starContainer.querySelectorAll('.star');
  let currentRating = 0;

  // Define updateStars function FIRST
  const updateStars = (rating) => {
    stars.forEach((star, i) => {
      star.style.color = i < rating ? '#d62828' : '#ddd';
      star.textContent = i < rating ? '★' : '☆';
    });
  };

  // THEN load rating from localStorage
  const savedRating = localStorage.getItem('userRating');
  if (savedRating) {
    currentRating = parseInt(savedRating);
    updateStars(currentRating);
    updateRatingMessage(currentRating);
  }

  stars.forEach((star, i) => {
    star.addEventListener('click', () => {
      currentRating = i + 1;
      updateStars(currentRating);
      updateRatingMessage(currentRating);
      
      // Save rating to localStorage
      localStorage.setItem('userRating', currentRating);
      showToast(`Rating saved: ${currentRating} stars!`);
    });
    star.addEventListener('mouseenter', () => updateStars(i + 1));
  });

  starContainer.addEventListener('mouseleave', () => updateStars(currentRating));
}

function updateRatingMessage(rating) {
  const msg = document.querySelector('#rating-message');
  if (msg) {
    const texts = [
      'Please rate your experience!',
      'Not great, but thanks!',
      'Could be better.',
      'Good! Thanks!',
      'Great! Glad you liked it!',
      'Excellent! We love you!'
    ];
    msg.textContent = texts[rating];
  }
}

// ===== Reset Button =====
const resetBtn = document.querySelector('#reset-form-btn');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    document.querySelectorAll('input, textarea').forEach(el => {
      el.value = '';
      el.classList.remove('is-invalid');
    });
    $(".invalid-feedback").hide().text("");

    if ($registerForm && $registerForm.length) {
      currentStep = 0;
      showStep(0);
    }

    if (starContainer) {
      const stars = starContainer.querySelectorAll('.star');
      stars.forEach(s => {
        s.style.color = '#ddd';
        s.textContent = '☆';
      });
      currentRating = 0;
      updateRatingMessage(0);
      
      // Clear rating from localStorage
      localStorage.removeItem('userRating');
    }

    showToast("All forms reset!");
  });
}

// ===== ТЕМА С СОХРАНЕНИЕМ =====
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
})});