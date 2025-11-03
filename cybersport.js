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


// ============================================
// SOUND EFFECTS
// ============================================

const soundButton = document.querySelector('#play-sound-btn');
if (soundButton) {
  soundButton.addEventListener('click', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    const originalText = soundButton.textContent;
    soundButton.textContent = '🏎️ Vroom!';
    setTimeout(() => {
      soundButton.textContent = originalText;
    }, 1000);
  });
}

// ============================================
// HIGHER-ORDER FUNCTIONS
// ============================================

const filterTeams = (teams, filterFn) => teams.filter(filterFn);
const championshipTeams = filterTeams(f1Teams, team => team.championships > 0);

const mapTeams = (teams, mapFn) => teams.map(mapFn);
const teamNames = mapTeams(f1Teams, team => team.name);

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

  $(document).ready(function() {
    // Copy to clipboard functionality
    $('.content').each(function() {
      const content = $(this);
      const copyBtn = $('<button class="copy-btn btn btn-sm btn-outline-secondary mt-2">📋 Copy</button>');
      content.append(copyBtn);
      
      copyBtn.on('click', function(e) {
        e.stopPropagation();
        const textToCopy = content.clone().find('.copy-btn').remove().end().text().trim();
        
        const $temp = $('<textarea>');
        $('body').append($temp);
        $temp.val(textToCopy).select();
        document.execCommand('copy');
        $temp.remove();
        
        copyBtn.html('✓ Copied!').removeClass('btn-outline-secondary').addClass('btn-success');
        
        setTimeout(function() {
          copyBtn.html('📋 Copy').removeClass('btn-success').addClass('btn-outline-secondary');
        }, 2000);
      });
    });

    // Lazy loading images
    $('.carousel-item img').each(function() {
      const $img = $(this);
      const actualSrc = $img.attr('src');
      
      $img.attr('data-src', actualSrc);
      $img.attr('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect width="800" height="500" fill="%23f4f7fb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%2355677a"%3ELoading...%3C/text%3E%3C/svg%3E');
      $img.addClass('lazy-load');
    });
    
    function lazyLoadImages() {
      $('.lazy-load').each(function() {
        const $img = $(this);
        const imgTop = $img.offset().top;
        const imgBottom = imgTop + $img.height();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        
        if (imgBottom > viewportTop - 200 && imgTop < viewportBottom + 200) {
          const actualSrc = $img.attr('data-src');
          if (actualSrc && $img.attr('src') !== actualSrc) {
            $img.attr('src', actualSrc);
            $img.removeClass('lazy-load');
          }
        }
      });
    }
    
    $(window).on('scroll', lazyLoadImages);
    $('#f1Carousel').on('slide.bs.carousel', function() {
      setTimeout(lazyLoadImages, 100);
    });
    lazyLoadImages();

     // Real-time clock
    function updateTime() {
      const now = new Date();
      $("#datetime").text(now.toLocaleString());
    }
    updateTime();
    setInterval(updateTime, 1000);
  });
}

console.log('F1 JavaScript loaded successfully!');