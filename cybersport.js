// ============================================
// GLOBAL VARIABLES
// ============================================

let isDarkMode = false;

document.addEventListener('DOMContentLoaded', () => {
 // Language Switcher for Cybersport page
let translations = {};
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Load translations from JSON file
async function loadTranslations() {
  try {
    const response = await fetch('assets/i18n/cybersport.json');
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
  if (navLinks[1]) navLinks[1].textContent = t.navOlympics;
  if (navLinks[2]) navLinks[2].textContent = t.navFormula1;

  // Sidebar
  const sidebarTitle = document.querySelector('.sidebar-section h3');
  if (sidebarTitle) sidebarTitle.textContent = t.quickNav;
  
  const sidebarLinks = document.querySelectorAll('.sidebar-section a');
  if (sidebarLinks[0]) sidebarLinks[0].textContent = t.aboutEsports;
  if (sidebarLinks[1]) sidebarLinks[1].textContent = t.popularGames;
  if (sidebarLinks[2]) sidebarLinks[2].textContent = t.tournaments;
  if (sidebarLinks[3]) sidebarLinks[3].textContent = t.gamingGallery;

  // Quick stats
  const statTitles = document.querySelectorAll('.stat-title');
  const statValues = document.querySelectorAll('.stat-value');
  if (statTitles[0]) statTitles[0].textContent = t.activePlayers;
  if (statValues[0]) statValues[0].textContent = t.activePlayersValue;
  if (statTitles[1]) statTitles[1].textContent = t.topEarningPlayer;
  if (statValues[1]) statValues[1].textContent = t.topEarningPlayerValue;
  if (statTitles[2]) statTitles[2].textContent = t.mostViewedTournament;
  if (statValues[2]) statValues[2].textContent = t.mostViewedTournamentValue;

  // Hero section
  const heroTitle = document.querySelector('#about h1');
  const heroSubtitle = document.querySelector('#about .fst-italic');
  const heroDescription = document.querySelector('#about .text-dark');
  if (heroTitle) heroTitle.textContent = t.heroTitle;
  if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
  if (heroDescription) heroDescription.textContent = t.heroDescription;

  // Three column cards
  const cardTitles = document.querySelectorAll('.card-title.h5');
  if (cardTitles[0]) cardTitles[0].textContent = t.mostPopularGames;
  if (cardTitles[1]) cardTitles[1].textContent = t.majorTournaments;
  if (cardTitles[2]) cardTitles[2].textContent = t.proTeams;

  // Card buttons
  const cardButtons = document.querySelectorAll('.card-footer .btn');
  if (cardButtons[0]) cardButtons[0].textContent = t.viewRankings;
  if (cardButtons[1]) cardButtons[1].textContent = t.watch;
  if (cardButtons[2]) cardButtons[2].textContent = t.viewSchedule;
  if (cardButtons[3]) cardButtons[3].textContent = t.teams;
  if (cardButtons[4]) cardButtons[4].textContent = t.players;

  // Pro teams description
  const proTeamsDesc = document.querySelector('.card-text.text-muted-custom');
  if (proTeamsDesc) proTeamsDesc.textContent = t.proTeamsDesc;

  // Gallery section
  const galleryTitle = document.querySelector('#gallery h2');
  if (galleryTitle) galleryTitle.textContent = t.epicGamingMoments;
  
  const overlays = document.querySelectorAll('.img-overlay');
  if (overlays[0]) overlays[0].textContent = t.gallery1;
  if (overlays[1]) overlays[1].textContent = t.gallery2;
  if (overlays[2]) overlays[2].textContent = t.gallery3;
  if (overlays[3]) overlays[3].textContent = t.gallery4;
  if (overlays[4]) overlays[4].textContent = t.gallery5;
  if (overlays[5]) overlays[5].textContent = t.gallery6;
  if (overlays[6]) overlays[6].textContent = t.gallery7;
  if (overlays[7]) overlays[7].textContent = t.gallery8;
  if (overlays[8]) overlays[8].textContent = t.gallery9;

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
  });}

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

console.log('JavaScript loaded successfully!')});