// ============================================
// GLOBAL VARIABLES
// ============================================
let currentLanguage = 'en';
let translations = {};
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
const TRANSLATIONS_PATH = 'assets/i18n/f1.json';

// Load saved language preference
const savedLang = localStorage.getItem('language');
if (savedLang) currentLanguage = savedLang;

// Try to get initial totalChampionships from DOM if available
const totalChampValueElem = document.getElementById('total-championships-value');
if (totalChampValueElem) {
  const parsed = parseInt(totalChampValueElem.textContent.replace(/\D/g, ''), 10);
  if (!isNaN(parsed)) totalChampionships = parsed;
} else {
  const totalElem = document.getElementById('total-championships');
  if (totalElem && totalElem.dataset && totalElem.dataset.value) {
    const parsed = parseInt(totalElem.dataset.value, 10);
    if (!isNaN(parsed)) totalChampionships = parsed;
  }
}

// ============================================
// LOAD TRANSLATIONS
// ============================================
fetch(TRANSLATIONS_PATH)
  .then(response => {
    if (!response.ok) throw new Error('Failed to load translations: ' + response.status);
    return response.json();
  })
  .then(data => {
    translations = data;
    
    // Fallback to 'en' if current language not available
    if (!translations[currentLanguage]) {
      currentLanguage = Object.keys(translations)[0] || 'en';
    }

    // Set language selector value
    const languageSelector = document.querySelector('#language-selector');
    if (languageSelector) {
      languageSelector.value = currentLanguage;
    }
  
    // Apply translations
    changeLanguage(currentLanguage);
  })
  .catch(err => {
    console.error('Translation loading error:', err);
  });

// ============================================
// EVENT LISTENERS
// ============================================

// Language selector
const languageSelector = document.querySelector('#language-selector');
if (languageSelector) {
  languageSelector.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    localStorage.setItem('language', currentLanguage);
    changeLanguage(currentLanguage);
  });
}

// Dark mode toggle - single listener
const darkModeBtn = document.querySelector('#dark-mode-toggle');
if (darkModeBtn) {
  darkModeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    const t = translations[currentLanguage] || translations['en'] || {};
    darkModeBtn.textContent = isDarkMode ? (t.lightMode || '☀️ Light Mode') : (t.darkMode || '🌙 Dark Mode');
  });
}

// ============================================
// TRANSLATION FUNCTIONS
// ============================================

function changeLanguage(lang) {
  if (!translations || !translations[lang]) {
    console.warn(`No translations for "${lang}", falling back to "en".`);
    if (translations && translations.en) {
      applyTranslations(translations.en);
    }
    return;
  }

  applyTranslations(translations[lang]);

  // Update dark mode button text
  const dmBtn = document.querySelector('#dark-mode-toggle');
  if (dmBtn) {
    const t = translations[lang];
    dmBtn.textContent = isDarkMode ? (t.lightMode || '☀️ Light Mode') : (t.darkMode || '🌙 Dark Mode');
  }
}

function applyTranslations(t) {
  if (!t) return;

  // Helper function
  const setText = (selectorOrElem, text, isPlaceholder = false) => {
    if (!text) return;
    let el;
    if (typeof selectorOrElem === 'string') {
      el = document.querySelector(selectorOrElem);
    } else {
      el = selectorOrElem;
    }
    if (!el) return;
    
    if (isPlaceholder) {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  };

  // Main title and subtitle
  setText('.hero-title.display-5', t.title);
  setText('.text-muted-custom.fst-italic', t.subtitle);

  const description = document.querySelector('.text-dark.lh-base') || document.querySelector('#description');
  if (description && t.description) description.textContent = t.description;

  // Sound button
  setText('#play-sound-btn', t.engineSound);

  // Top Drivers section
  setText('#drivers .card-title', t.topDrivers);
  const driversBtns = document.querySelectorAll('#drivers .btn-group button');
  if (driversBtns.length > 0 && t.viewStats) driversBtns[0].textContent = t.viewStats;
  if (driversBtns.length > 1 && t.follow) driversBtns[1].textContent = t.follow;

  // Calendar
  setText('#calendar .card-title', t.raceCalendar);
  const calendarBtn = document.querySelector('#calendar .btn-f1-primary');
  if (calendarBtn && t.viewFullCalendar) calendarBtn.textContent = t.viewFullCalendar;

  // Highlights
  const allCardTitles = document.querySelectorAll('.card-title');
  if (allCardTitles && allCardTitles.length >= 3 && t.raceHighlights) {
    if (allCardTitles[2]) allCardTitles[2].textContent = t.raceHighlights;
  }
  const highlightsDesc = document.querySelector('.card-text.text-muted-custom');
  if (highlightsDesc && t.highlightsDesc) highlightsDesc.textContent = t.highlightsDesc;
  const highlightsBtns = document.querySelectorAll('.card:last-of-type .btn-group a, .card:last-of-type .btn-group button');
  if (highlightsBtns[0] && t.watch) highlightsBtns[0].textContent = t.watch;
  if (highlightsBtns[1] && t.share) highlightsBtns[1].textContent = t.share;

  // Teams section
  setText('#teams h2', t.teamsTitle);
  const teamSearch = document.querySelector('#team-search');
  if (teamSearch && t.searchTeams) teamSearch.placeholder = t.searchTeams;
  const championsBtn = document.querySelector('#championship-teams-btn');
  if (championsBtn && t.showChampions) championsBtn.textContent = t.showChampions;

  // Gallery & FAQ
  setText('#gallery h2', t.historicMoments);
  setText('#faq h2', t.faq);

  // FAQ buttons and answers
  const faqButtons = document.querySelectorAll('.collapsible');
  if (faqButtons && faqButtons.length >= 3) {
    if (t.faqQ1) faqButtons[0].textContent = t.faqQ1;
    if (t.faqQ2) faqButtons[1].textContent = t.faqQ2;
    if (t.faqQ3) faqButtons[2].textContent = t.faqQ3;

    if (faqButtons[0].nextElementSibling && t.faqA1) faqButtons[0].nextElementSibling.textContent = t.faqA1;
    if (faqButtons[1].nextElementSibling && t.faqA2) faqButtons[1].nextElementSibling.textContent = t.faqA2;
    if (faqButtons[2].nextElementSibling && t.faqA3) faqButtons[2].nextElementSibling.textContent = t.faqA3;
  }

  // Sidebar links & quick stats
  setText('.sidebar-section h3', t.quickNav);
  const navLinks = document.querySelectorAll('.sidebar-section a');
  if (navLinks && navLinks.length >= 8) {
    if (t.aboutF1) navLinks[0].textContent = t.aboutF1;
    if (t.topDrivers) navLinks[1].textContent = t.topDrivers;
    if (t.raceCalendar) navLinks[2].textContent = t.raceCalendar;
    if (t.photoGallery) navLinks[3].textContent = t.photoGallery;
    if (t.teams) navLinks[4].textContent = t.teams;
    if (t.rateUs) navLinks[5].textContent = t.rateUs;
    if (t.newsletter) navLinks[6].textContent = t.newsletter;
    if (t.qa) navLinks[7].textContent = t.qa;
  }

  // Stat titles and values
  const statTitles = document.querySelectorAll('.stat-title');
  if (statTitles && statTitles.length >= 3) {
    if (t.winsRecord) statTitles[0].textContent = t.winsRecord;
    if (t.consecutiveChamp) statTitles[1].textContent = t.consecutiveChamp;
    if (t.fastestSpeed) statTitles[2].textContent = t.fastestSpeed;
  }

  const statValues = document.querySelectorAll('.stat-value');
  if (statValues && statValues.length >= 3) {
    if (t.winsRecordText) statValues[0].textContent = t.winsRecordText;
    if (t.consecutiveChampText) statValues[1].textContent = t.consecutiveChampText;
    if (t.fastestSpeedText) statValues[2].textContent = t.fastestSpeedText;
  }

  // Update total championships - FIX: Added missing variable declaration
  const totalChampElem = document.querySelector('#total-championships');
  if (totalChampElem) {
    const label = t.totalChampionships || 'Total F1 Championships';
    const valueSpan = totalChampElem.querySelector('.value');
    if (valueSpan) {
      valueSpan.textContent = totalChampionships;
      totalChampElem.innerHTML = `${label}: <span class="value">${totalChampionships}</span>`;
    } else {
      totalChampElem.textContent = `${label}: ${totalChampionships}`;
    }
  }
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
  { race: 'Mexico City GP', date: 'Oct 24-27', circuit: 'Autódromo' },
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
  });
}
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
        
        let html = `Race Name - <strong>${raceName}</strong><br><br> Finalists <br>`;
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