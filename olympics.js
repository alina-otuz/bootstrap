$(document).ready(function () {
    console.log("olympics.js loaded!");
// Language Switcher with localStorage
let translations = {};
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Load translations from JSON file
async function loadTranslations() {
  try {
    const response = await fetch('assets/i18n/olympics.json');
    translations = await response.json();
    return true;
  } catch (error) {
    console.error('Error loading translations:', error);
    return false;
  }
}

// Apply translations to the page
function applyTranslations(lang) {
  if (!translations[lang]) {
    console.error(`Language ${lang} not found`);
    return;
  }

  const t = translations[lang];

  // Navigation
  const navBrand = document.querySelector('.navbar-brand span');
  if (navBrand) navBrand.textContent = t.navBrand;
  
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks[0]) navLinks[0].textContent = t.navMain;
  if (navLinks[1]) navLinks[1].textContent = t.navCybersport;
  if (navLinks[2]) navLinks[2].textContent = t.navFormula1;

  // Sidebar
  const sidebarTitle = document.querySelector('.sidebar-section h3');
  if (sidebarTitle) sidebarTitle.textContent = t.quickNav;
  
  const sidebarLinks = document.querySelectorAll('.sidebar-section a');
  if (sidebarLinks[0]) sidebarLinks[0].textContent = t.aboutLink;
  if (sidebarLinks[1]) sidebarLinks[1].textContent = t.medalsLink;
  if (sidebarLinks[2]) sidebarLinks[2].textContent = t.historyLink;
  if (sidebarLinks[3]) sidebarLinks[3].textContent = t.galleryLink;
  if (sidebarLinks[4]) sidebarLinks[4].textContent = t.funLink;
  if (sidebarLinks[5]) sidebarLinks[5].textContent = t.faqLink;

  // Quick stats
  const statTitles = document.querySelectorAll('.stat-title');
  const statValues = document.querySelectorAll('.stat-value');
  if (statTitles[0]) statTitles[0].textContent = t.nextOlympics;
  if (statValues[0]) statValues[0].innerHTML = t.nextOlympicsValue;
  if (statTitles[1]) statTitles[1].textContent = t.mostMedalsSummer;
  if (statValues[1]) statValues[1].textContent = t.mostMedalsSummerValue;
  if (statTitles[2]) statTitles[2].textContent = t.mostMedalsWinter;
  if (statValues[2]) statValues[2].textContent = t.mostMedalsWinterValue;
  if (statTitles[3]) statTitles[3].textContent = t.olympicMotto;
  if (statValues[3]) statValues[3].innerHTML = t.olympicMottoValue;

  // Hero section
  const heroTitle = document.querySelector('#about h1');
  const heroSubtitle = document.querySelector('#about .fst-italic');
  const heroDescription = document.querySelector('#about .text-dark');
  if (heroTitle) heroTitle.textContent = t.heroTitle;
  if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
  if (heroDescription) heroDescription.textContent = t.heroDescription;

  // Medal section
  const medalsTitle = document.querySelector('#medals h2');
  if (medalsTitle) medalsTitle.textContent = t.medalsTitle;
  
  const medalLabels = document.querySelectorAll('#medals .card-text small');
  medalLabels.forEach(el => {
    if (el) el.textContent = t.totalMedals;
  });

  // Three column cards
  const cardTitles = document.querySelectorAll('.card-title.h5');
  const cardTexts = document.querySelectorAll('.card-text.text-muted-custom');
  const cardButtons = document.querySelectorAll('.card-footer .btn');

  if (cardTitles[0]) cardTitles[0].textContent = t.historyTitle;
  if (cardTexts[0]) cardTexts[0].textContent = t.historyText;
  if (cardButtons[0]) cardButtons[0].textContent = t.learnMore;

  if (cardTitles[1]) cardTitles[1].textContent = t.funTitle;
  if (cardTexts[1]) cardTexts[1].textContent = t.funText;
  if (cardButtons[1]) cardButtons[1].textContent = t.watchHighlights;

  if (cardTitles[2]) cardTitles[2].textContent = t.sportsTitle;
  if (cardTexts[2]) cardTexts[2].textContent = t.sportsText;
  if (cardButtons[2]) cardButtons[2].textContent = t.exploreSports;

  // Gallery
  const galleryTitle = document.querySelector('#gallery h2');
  if (galleryTitle) galleryTitle.textContent = t.galleryTitle;
  
  const overlays = document.querySelectorAll('.img-overlay');
  if (overlays[0]) overlays[0].textContent = t.gallery1;
  if (overlays[1]) overlays[1].textContent = t.gallery2;
  if (overlays[2]) overlays[2].textContent = t.gallery3;
  if (overlays[3]) overlays[3].textContent = t.gallery4;
  if (overlays[4]) overlays[4].textContent = t.gallery5;
  if (overlays[5]) overlays[5].textContent = t.gallery6;

  // FAQ
  const faqTitle = document.querySelector('#faq h2');
  if (faqTitle) faqTitle.textContent = t.faqTitle;
  
  const collapsibles = document.querySelectorAll('.collapsible');
  const contents = document.querySelectorAll('.content p');
  
  if (collapsibles[0]) collapsibles[0].textContent = t.faq1Q;
  if (contents[0]) contents[0].textContent = t.faq1A;
  if (collapsibles[1]) collapsibles[1].textContent = t.faq2Q;
  if (contents[1]) contents[1].textContent = t.faq2A;
  if (collapsibles[2]) collapsibles[2].textContent = t.faq3Q;
  if (contents[2]) contents[2].textContent = t.faq3A;
  if (collapsibles[3]) collapsibles[3].textContent = t.faq4Q;
  if (contents[3]) contents[3].textContent = t.faq4A;

  // Save current language
  currentLanguage = lang;
  localStorage.setItem('selectedLanguage', lang);
}

// Change language function
function changeLanguage(lang) {
  applyTranslations(lang);
  
  // Update selector value
  const selector = document.getElementById('language-selector');
  if (selector) {
    selector.value = lang;
  }
}

// Initialize translations on page load
async function initTranslations() {
  const loaded = await loadTranslations();
  
  if (loaded) {
    // Apply saved or default language
    applyTranslations(currentLanguage);
    
    // Set selector to current language
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.value = currentLanguage;
      
      // Add event listener
      selector.addEventListener('change', function() {
        changeLanguage(this.value);
      });
    }
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTranslations);
} else {
  initTranslations();
}
    // ===== Scroll Progress Bar =====
    $(window).on("scroll", function () {
      const scrollTop = $(window).scrollTop();
      const docHeight = $(document).height() - $(window).height();
      const scrollPercent = (scrollTop / docHeight) * 100;
      $("#scrollBar").css("width", scrollPercent + "%");
    });

  const coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
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