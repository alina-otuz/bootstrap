// ============================================
// GLOBAL VARIABLES
// ============================================
let isDarkMode = false;
let totalChampionships = 0;

// ============================================
// F1 TEAMS DATA
// ============================================
const f1Teams = [
  { name: 'Red Bull Racing', country: 'Austria', championships: 6 },
  { name: 'Mercedes', country: 'Germany', championships: 8 },
  { name: 'Ferrari', country: 'Italy', championships: 16 },
  { name: 'McLaren', country: 'UK', championships: 8 },
  { name: 'Aston Martin', country: 'UK', championships: 0 },
  { name: 'Alpine', country: 'France', championships: 2 },
  { name: 'Williams', country: 'UK', championships: 9 },
  { name: 'AlphaTauri', country: 'Italy', championships: 1 },
  { name: 'Haas', country: 'USA', championships: 0 },
  { name: 'Alfa Romeo', country: 'Switzerland', championships: 0 }
];

// Calculate total championships once
totalChampionships = f1Teams.reduce((total, team) => total + team.championships, 0);

// ============================================
// INITIALIZATION
// ============================================

// Dark mode toggle - single listener
const darkModeBtn = document.querySelector('#dark-mode-toggle');
if (darkModeBtn) {
  darkModeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    const t = translations[currentLanguage] || translations['en'] || {};
    darkModeBtn.textContent = isDarkMode ? (t.lightMode || 'â˜€ï¸ Light Mode') : (t.darkMode || 'ðŸŒ™ Dark Mode');
  });
}

// ============================================
// TRANSLATION FUNCTIONS
// ============================================
// Language Switcher for Formula 1 page
let translations = {};
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Load translations from JSON file
async function loadTranslations() {
  try {
    const response = await fetch('assets/i18n/f1.json');
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
  if (navBrand) navBrand.textContent = t.title || "Sport World";
  
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks[0]) navLinks[0].textContent = t.navMain || navLinks[0].textContent;
  if (navLinks[1]) navLinks[1].textContent = t.navOlympics || navLinks[1].textContent;
  if (navLinks[2]) navLinks[2].textContent = t.navCybersport || navLinks[2].textContent;

  // Sidebar
  const sidebarTitle = document.querySelector('.sidebar-section h3');
  if (sidebarTitle) sidebarTitle.textContent = t.quickNav;
  
  const sidebarLinks = document.querySelectorAll('.sidebar-section a');
  if (sidebarLinks[0]) sidebarLinks[0].textContent = t.aboutF1;
  if (sidebarLinks[1]) sidebarLinks[1].textContent = t.topDrivers;
  if (sidebarLinks[2]) sidebarLinks[2].textContent = t.raceCalendar;
  if (sidebarLinks[3]) sidebarLinks[3].textContent = t.photoGallery;
  if (sidebarLinks[4]) sidebarLinks[4].textContent = t.teams;
  if (sidebarLinks[5]) sidebarLinks[5].textContent = t.qa;

  // Quick stats
  const statTitles = document.querySelectorAll('.stat-title');
  if (statTitles[0]) statTitles[0].textContent = t.winsRecord || "Total F1 Wins Record";
  if (statTitles[1]) statTitles[1].textContent = t.consecutiveChamp || "Most Consecutive Championships";
  if (statTitles[2]) statTitles[2].textContent = t.fastestSpeed || "Fastest Speed";

  // Hero section
  const heroTitle = document.querySelector('#about h1');
  const heroSubtitle = document.querySelector('#about .fst-italic');
  const heroDescription = document.querySelector('#about .text-dark');
  if (heroTitle) heroTitle.textContent = t.title + " – " + t.subtitle;
  if (heroSubtitle) heroSubtitle.textContent = t.subtitle;
  if (heroDescription) heroDescription.textContent = t.description;

  // Three column cards
  const cardTitles = document.querySelectorAll('.card-title.h5');
  if (cardTitles[0]) cardTitles[0].textContent = t.topDrivers;
  if (cardTitles[1]) cardTitles[1].textContent = t.raceCalendar;
  if (cardTitles[2]) cardTitles[2].textContent = t.raceHighlights;

  // Card buttons
  const cardButtons = document.querySelectorAll('.card-footer .btn, .card-footer a.btn');
  if (cardButtons[0]) cardButtons[0].textContent = t.viewStats || "Explore";
  if (cardButtons[1]) cardButtons[1].textContent = t.viewFullCalendar;
  if (cardButtons[2]) cardButtons[2].textContent = t.watch;

  // Race highlights description
  const highlightsDesc = document.querySelectorAll('.card-text.text-muted-custom')[0];
  if (highlightsDesc) highlightsDesc.textContent = t.highlightsDesc;

  // Teams section
  const teamsTitle = document.querySelector('#teams h2');
  if (teamsTitle) teamsTitle.textContent = t.teamsTitle;

  const teamSearch = document.getElementById('team-search');
  if (teamSearch) teamSearch.placeholder = t.searchTeams || "🔍 Search teams by name or country...";

  const championBtn = document.getElementById('championship-teams-btn');
  if (championBtn) championBtn.textContent = t.showChampions || "Show Championship Winners";

  // Gallery section
  const galleryTitle = document.querySelector('#gallery h2');
  if (galleryTitle) galleryTitle.textContent = t.historicMoments;

  // FAQ section
  const faqTitle = document.querySelector('#faq h2');
  if (faqTitle) faqTitle.textContent = t.faq;

  const collapsibles = document.querySelectorAll('.collapsible');
  const contents = document.querySelectorAll('.content p');
  
  if (collapsibles[0]) collapsibles[0].textContent = t.faqQ1 || collapsibles[0].textContent;
  if (contents[0]) contents[0].textContent = t.faqA1 || contents[0].textContent;
  if (collapsibles[1]) collapsibles[1].textContent = t.faqQ2 || collapsibles[1].textContent;
  if (contents[1]) contents[1].textContent = t.faqA2 || contents[1].textContent;
  if (collapsibles[2]) collapsibles[2].textContent = t.faqQ3 || collapsibles[2].textContent;
  if (contents[2]) contents[2].textContent = t.faqA3 || contents[2].textContent;

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
// ============================================
// DISPLAY TEAMS AND SCHEDULE
// ============================================

// Display teams dynamically
const teamsContainer = document.querySelector('#teams-list');
if (teamsContainer) {
  let teamsHTML = '<ul class="list-unstyled">';
  
  for (let i = 0; i < f1Teams.length; i++) {
    teamsHTML += `
      <li class="mb-2 p-2 border-bottom">
        <strong>${f1Teams[i].name}</strong> (${f1Teams[i].country}) - 
        <span class="text-muted-custom">${f1Teams[i].championships} Championships</span>
      </li>
    `;
  }
  
  teamsHTML += '</ul>';
  teamsContainer.innerHTML = teamsHTML;
}

// Race schedule
const raceSchedule = [
  { race: 'Singapore GP', date: 'Oct 3-5', circuit: 'Marina Bay' },
  { race: 'United States GP', date: 'Oct 17-20', circuit: 'Austin' },
  { race: 'Mexico City GP', date: 'Oct 24-27', circuit: 'AutÃ³dromo' },
  { race: 'Brazilian GP', date: 'Nov 1-3', circuit: 'Interlagos' },
  { race: 'Las Vegas GP', date: 'Nov 14-16', circuit: 'Las Vegas Strip' },
  { race: 'Qatar GP', date: 'Nov 21-23', circuit: 'Lusail' },
  { race: 'Abu Dhabi GP', date: 'Nov 28-30', circuit: 'Yas Marina' }
];

// Display schedule
const scheduleContainer = document.querySelector('#schedule-list');
if (scheduleContainer) {
  let scheduleHTML = '<div class="list-group">';
  let index = 0;
  
  while (index < raceSchedule.length) {
    scheduleHTML += `
      <div class="list-group-item">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${raceSchedule[index].race}</h5>
          <small class="text-muted-custom">${raceSchedule[index].date}</small>
        </div>
        <p class="mb-1">Circuit: ${raceSchedule[index].circuit}</p>
      </div>
    `;
    index++;
  }
  
  scheduleHTML += '</div>';
  scheduleContainer.innerHTML = scheduleHTML;
}

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
    soundButton.textContent = 'ðŸŽï¸ Vroom!';
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

// Display championship teams
const createClickHandler = (callback) => {
  return (event) => {
    event.preventDefault();
    callback(event);
  };
};

const displayChampionshipTeams = document.querySelector('#championship-teams-btn');
if (displayChampionshipTeams) {
  const handler = createClickHandler(() => {
    const container = document.querySelector('#championship-teams-list');
    if (container) {
      const teamsHTML = championshipTeams
        .map(team => `
          <div class="alert alert-success">
            <strong>${team.name}</strong> - ${team.championships} Championship${team.championships > 1 ? 's' : ''}
          </div>
        `)
        .join('');
      
      container.innerHTML = teamsHTML;
      container.style.display = 'block';
    }
  });
  
  displayChampionshipTeams.addEventListener('click', handler);
}

// Display total championships
const championshipCounter = document.querySelector('#total-championships');
if (championshipCounter && !championshipCounter.textContent.includes(totalChampionships)) {
  championshipCounter.textContent = `Total F1 Championships: ${totalChampionships}`;
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const searchInput = document.querySelector('#team-search');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTeams = f1Teams.filter(team => 
      team.name.toLowerCase().includes(searchTerm) ||
      team.country.toLowerCase().includes(searchTerm)
    );
    
    const teamsContainer = document.querySelector('#teams-list');
    if (teamsContainer) {
      let teamsHTML = '<ul class="list-unstyled">';
      
      filteredTeams.forEach(team => {
        teamsHTML += `
          <li class="mb-2 p-2 border-bottom">
            <strong>${team.name}</strong> (${team.country}) - 
            <span class="text-muted-custom">${team.championships} Championships</span>
          </li>
        `;
      });
      
      if (filteredTeams.length === 0) {
        teamsHTML = '<p class="text-muted-custom">No teams found.</p>';
      } else {
        teamsHTML += '</ul>';
      }
      
      teamsContainer.innerHTML = teamsHTML;
    }
  });
}

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
  };

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

async function fetchTopDrivers() {
    const resultDiv = document.getElementById('result');

    try {
        // Get the latest race session
        const sessionsResponse = await fetch('https://api.openf1.org/v1/sessions?session_name=Race&year=2024');
        const sessions = await sessionsResponse.json();
        
        if (!sessions || sessions.length === 0) {
            resultDiv.innerHTML = 'No race data found';
            return;
        }

        // Get most recent race
        const latestSession = sessions.sort((a, b) => 
            new Date(b.date_start) - new Date(a.date_start)
        )[0];

        // Fetch drivers
        const driversResponse = await fetch(
            `https://api.openf1.org/v1/drivers?session_key=${latestSession.session_key}`
        );
        const drivers = await driversResponse.json();

        // Fetch positions
        const positionsResponse = await fetch(
            `https://api.openf1.org/v1/position?session_key=${latestSession.session_key}`
        );
        const positions = await positionsResponse.json();

        // Get final positions
        const finalPositions = {};
        positions.forEach(pos => {
            if (!finalPositions[pos.driver_number] || 
                new Date(pos.date) > new Date(finalPositions[pos.driver_number].date)) {
                finalPositions[pos.driver_number] = pos;
            }
        });

        // Sort and get top 3
        const top3 = drivers
            .filter(d => finalPositions[d.driver_number])
            .map(d => ({
                name: d.full_name,
                team: d.team_name,
                position: finalPositions[d.driver_number].position
            }))
            .sort((a, b) => a.position - b.position)
            .slice(0, 3);

        // Display as simple text
        let raceName = latestSession.meeting_official_name || 
                      latestSession.meeting_name || 
                      latestSession.location || 
                      'Latest Race';
        
        let html = `<strong>${raceName}</strong><br><br>`;
        top3.forEach(driver => {
            html += `${driver.position}. ${driver.name} - ${driver.team}<br>`;
        });
        
        resultDiv.innerHTML = html;

    } catch (error) {
        resultDiv.innerHTML = 'Error loading data: ' + error.message;
    }
}

fetchTopDrivers();


console.log('F1 JavaScript loaded successfully!');
console.log('Championship Teams:', championshipTeams);
console.log('Total Championships:', totalChampionships);