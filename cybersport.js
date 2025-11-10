// ============================================
// GLOBAL VARIABLES
// ============================================
let currentLanguage = 'en';
let translations = {};
let isDarkMode = false;

// Load saved language preference
// ============================================
// CYBERSPORT PAGE LANGUAGE SWITCHER + CLOCK
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const langSelector = document.getElementById('language-selector');

  // ===== APPLY TRANSLATIONS =====
  function applyTranslations(t) {
    if (!t) return;

    // Helper to safely set text or placeholder
    const setText = (selector, text, isPlaceholder = false) => {
      if (!text) return;
      const el = document.querySelector(selector);
      if (!el) return;
      if (isPlaceholder) el.placeholder = text;
      else el.textContent = text;
    };

    // -----------------------------
    // NAVBAR
    // -----------------------------
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    if (navLinks.length >= 3) {
      navLinks[0].textContent = t.main_page;
      navLinks[1].textContent = t.olympics;
      navLinks[2].textContent = t.formula1;
    }

    // -----------------------------
    // SIDEBAR
    // -----------------------------
    setText('.sidebar-section h3.hero-title', t.quick_navigation);

    const sideLinks = document.querySelectorAll('.sidebar-section a');
    if (sideLinks.length >= 4) {
      sideLinks[0].textContent = t.about_esports;
      sideLinks[1].textContent = t.popular_games;
      sideLinks[2].textContent = t.tournaments;
      sideLinks[3].textContent = t.gallery;
    }

    const statTitles = document.querySelectorAll('.quick-stat-card .stat-title');
    const statValues = document.querySelectorAll('.quick-stat-card .stat-value');
    if (statTitles.length >= 3 && statValues.length >= 3) {
      statTitles[0].textContent = t.active_players;
      statTitles[1].textContent = t.top_player;
      statTitles[2].textContent = t.most_viewed;
    }

    // -----------------------------
    // MAIN HERO SECTION
    // -----------------------------
    setText('#about .hero-title.display-5', t.hero_title);
    setText('#about .text-muted-custom.fst-italic', t.hero_text);
    if (t.description) {
      const desc = document.querySelector('#about .text-dark.lh-base');
      if (desc) desc.textContent = t.description;
    }

    // -----------------------------
    // CARDS (Games / Tournaments / Teams)
    // -----------------------------
    const cardTitles = document.querySelectorAll('.card-title');
    if (cardTitles.length >= 3) {
      cardTitles[0].textContent = t.popular_games;
      cardTitles[1].textContent = t.tournaments;
      cardTitles[2].textContent = t.pro_teams;
    }

    // Buttons in first card (games)
    const gameCard = document.querySelector('#games');
    if (gameCard) {
      const gameButtons = gameCard.parentElement.querySelectorAll('.btn-group button');
      if (gameButtons.length >= 2) {
        if (t.view_rankings) gameButtons[0].textContent = t.view_rankings;
        if (t.watch) gameButtons[1].textContent = t.watch;
      }
    }

    // Button in tournaments card
    const tournamentCard = document.querySelector('#tournaments');
    if (tournamentCard) {
      const viewBtn = tournamentCard.parentElement.querySelector('.btn-cyber-primary');
      if (viewBtn && t.view_schedule) viewBtn.textContent = t.view_schedule;
    }

    // Buttons in last card (Teams)
    const teamCard = document.querySelector('.card:last-of-type');
    if (teamCard) {
      const teamBtns = teamCard.querySelectorAll('.btn-group button');
      if (teamBtns.length >= 2) {
        if (t.teams_btn) teamBtns[0].textContent = t.teams_btn;
        if (t.players_btn) teamBtns[1].textContent = t.players_btn;
      }
    }

    // -----------------------------
    // GALLERY
    // -----------------------------
    setText('#gallery h2', t.gallery_title);

    // -----------------------------
    // FOOTER
    // -----------------------------
    setText('footer p.text-muted', t.footer);
  }

  // ===== LOAD TRANSLATIONS =====
  async function loadTranslations(lang) {
    try {
      const response = await fetch('assets/i18n/cybersport.json');
      const data = await response.json();
      applyTranslations(data[lang] || data['en']);
    } catch (err) {
      console.error('Error loading translations:', err);
    }
  }

  // Default language
  loadTranslations('en');

  // Change language when selected
  langSelector.addEventListener('change', (e) => {
    loadTranslations(e.target.value);
  });
});

// ===== Переключатель день/ночь (Dynamic Style Changes) =====
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

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => (themeToggle.style.transform = ''), 600);
});

// Apply hover effects to cards
const applyStylesToElements = (selector, styleFunction) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(styleFunction);
};

applyStylesToElements('.card', (card) => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.transition = 'transform 0.3s ease';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// ============================================
// FAQ COLLAPSIBLE
// ============================================

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

// ============================================
// JQUERY FEATURES (if jQuery is loaded)
// ============================================

if (typeof $ !== 'undefined') {
  // Scroll progress bar
  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();
    let docHeight = $(document).height() - $(window).height();
    let scrollPercent = (scrollTop / docHeight) * 100;
    $("#scrollBar").css("width", scrollPercent + "%");
  });

     // Real-time clock
    function updateTime() {
      const now = new Date();
      $("#datetime").text(now.toLocaleString());
    }
    updateTime();
    setInterval(updateTime, 1000);
  };

console.log('JavaScript loaded successfully!');