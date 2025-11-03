// ===== jQuery READY =====
$(document).ready(function () {
  console.log("jQuery is ready!");

  // ===== Scroll Progress Bar =====
  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();
    let docHeight = $(document).height() - $(window).height();
    let scrollPercent = (scrollTop / docHeight) * 100;
    $("#scrollBar").css("width", scrollPercent + "%");
  });

  // ===== FAQ Toggle =====
  $(".question").on("click", function () {
    $(this).next(".answer").toggleClass("show");
    $(this).parent().toggleClass("open");
  });

  // ===== Multi-step Form =====
  let currentStep = 0;
  const steps = $(".form-step");

  $(".next").click(function () {
    steps.eq(currentStep).removeClass("active");
    currentStep = Math.min(currentStep + 1, steps.length - 1);
    steps.eq(currentStep).addClass("active");
  });

  $(".prev").click(function () {
    steps.eq(currentStep).removeClass("active");
    currentStep = Math.max(currentStep - 1, 0);
    steps.eq(currentStep).addClass("active");
  });

  // ===== REGISTRATION FORM WITH SUCCESS + ERROR SOUNDS =====
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    const btn = $(this).find("button[type=submit]");
    const originalText = btn.text();

    const name = $("#name").val().trim();
    const age = $("#age").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();

    // Проверка заполнения
    if (!name || !age || !email || !phone) {
      showToast("⚠️ Please fill in all fields before submitting.");
      playSound("error.mp3");
      return;
    }

    // Эффект загрузки
    btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm"></span> Please wait…');

    // Проигрываем звук успеха сразу
    playSound("success.mp3");

    setTimeout(() => {
      btn.prop("disabled", false).text(originalText);
      showToast("✅ Registration successful!");
    }, 1500);
  });

  // ===== Copy to Clipboard =====
  $("#copyBtn").on("click", function () {
    const text = $("#copyText").text();
    navigator.clipboard.writeText(text).then(() => {
      $(this).text("Copied ✅");
      showToast("Text copied to clipboard!");
      playSound("success.mp3");
      setTimeout(() => $(this).text("Copy"), 2000);
    });
  });

  // ===== Contact Popup =====
  $("#openPopup").click(() => $("#popup").fadeIn());
  $("#closePopup").click(() => $("#popup").fadeOut());
  $(window).click((e) => {
    if ($(e.target).is("#popup")) $("#popup").fadeOut();
  });

  // ===== CONTACT FORM (POPUP) WITH SOUNDS =====
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    const btn = $(this).find("button[type=submit]");
    const name = $("#contactName").val().trim();
    const email = $("#contactEmail").val().trim();
    const msg = $("#contactMessage").val().trim();

    // Проверка
    if (!name || !email || !msg) {
      showToast("⚠️ Please fill in all fields before sending.");
      playSound("error.mp3");
      return;
    }

    btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm"></span> Sending…');
    playSound("success.mp3");

    setTimeout(() => {
      btn.prop("disabled", false).text("Send");
      showToast("📧 Message sent successfully!");
      $("#popup").fadeOut();
    }, 1500);
  });

  // ===== Live Search in FAQ =====
  $("#faqSearch").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    $(".faq-item, .accordion-item").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });

    $("mark").contents().unwrap();
    if (value) {
      $(".question, .answer").each(function () {
        const regex = new RegExp("(" + value + ")", "gi");
        $(this).html($(this).text().replace(regex, "<mark>$1</mark>"));
      });
    }
  });

  // ===== Animated Number Counter =====
  $(".counter").each(function () {
    let $this = $(this);
    let target = +$this.data("target");
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
        },
      }
    );
  });

  // ===== Lazy Loading for Images =====
  const lazyImages = $(".lazy");
  const lazyLoad = () => {
    const windowBottom = $(window).scrollTop() + $(window).height();
    lazyImages.each(function () {
      const imgTop = $(this).offset().top;
      if (imgTop < windowBottom + 200 && !$(this).attr("src")) {
        $(this).attr("src", $(this).data("src"));
      }
    });
  };
  $(window).on("scroll", lazyLoad);
  lazyLoad();

  // ===== Toast Notification Function =====
  function showToast(message) {
    let toast = $('<div class="toast-message"></div>').text(message);
    $("body").append(toast);
    toast.fadeIn(300);
    setTimeout(() => toast.fadeOut(400, () => toast.remove()), 2000);
  }

  // ===== Play Sound Function =====
  function playSound(file) {
    try {
      const audio = new Audio(file);
      audio.volume = 0.8;
      audio.play().catch((err) => {
        console.warn("Audio blocked by browser:", err);
      });
    } catch (err) {
      console.error("Sound error:", err);
    }
  }

  // ===== THEME TOGGLE (Dark / Light) =====
  if (localStorage.getItem("theme") === "dark") {
    $("body").addClass("dark-mode");
    $("#changeBg").text("Switch to Light Mode");
  }

  $("#changeBg").on("click", function () {
    $("body").toggleClass("dark-mode");
    let theme = $("body").hasClass("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    $(this).text(theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
  });

  // ===== Real-time DateTime =====
  function updateTime() {
    const now = new Date();
    $("#datetime").text(now.toLocaleString());
  }
  updateTime();
  setInterval(updateTime, 1000);
});

// Rating System - Select and manipulate star elements
const starContainer = document.querySelector('#rating-stars');
if (starContainer) {
  const stars = starContainer.querySelectorAll('.star');
  let currentRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      currentRating = index + 1;
      updateStars(currentRating);
      updateRatingMessage(currentRating);
    });

    star.addEventListener('mouseenter', () => {
      updateStars(index + 1);
    });
  });

  starContainer.addEventListener('mouseleave', () => {
    updateStars(currentRating);
  });

  function updateStars(rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.color = '#d62828';
        star.textContent = '★';
      } else {
        star.style.color = '#ddd';
        star.textContent = '☆';
      }
    });
  }
}

// Dynamic Content Update - Modify textContent based on interactions
function updateRatingMessage(rating) {
  const messageElement = document.querySelector('#rating-message');
  if (messageElement) {
    const messages = [
      'Please rate your experience!',
      'Not great, but thanks for your feedback!',
      'Could be better. We\'ll work on it!',
      'Good! We appreciate your feedback!',
      'Great! Glad you enjoyed it!',
      'Excellent! We love you!'
    ];
    messageElement.textContent = messages[rating];
  }
}

// Reset Button - Clear all form inputs
const resetButton = document.querySelector('#reset-form-btn');
if (resetButton) {
  resetButton.addEventListener('click', () => {
    document.querySelectorAll('input, select, textarea').forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = false;
      } else {
        input.value = '';
      }
    });
    
    // Reset rating stars
    if (starContainer) {
      const stars = starContainer.querySelectorAll('.star');
      stars.forEach(star => {
        star.style.color = '#ddd';
        star.textContent = '☆';
      });
      currentRating = 0;
    }
    
    // Update message
    const messageElement = document.querySelector('#rating-message');
    if (messageElement) {
      messageElement.textContent = 'Form reset successfully!';
    }
  });
}