// ============================================
// GLOBAL VARIABLES
// ============================================
let currentLanguage = 'en';

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
      'Excellent! You\'re a true F1 fan!'
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

// ============================================
// SWITCH STATEMENTS - Language Selector
// ============================================

const languageSelector = document.querySelector('#language-selector');
if (languageSelector) {
  languageSelector.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    changeLanguage(currentLanguage);
  });
}

function changeLanguage(lang) {
  const translations = {
    en: {
      title: 'Formula 1 — Speed & Strategy',
      subtitle: 'F1 is the top class of international single-seater auto racing. Quick facts below.',
      description: 'Formula 1, better known as F1, is the pinnacle of motorsport. It\'s the highest class of international open-wheel single-seater Formula auto racing. These words may seem complicated, but they\'re actually pretty simple. F1 is the highest level of racing with a single-seater car and the wheels outside the body of the car. Since F1 is the highest level of Formula auto racing it\'s called Formula 1; it\'s the highest level of motorsport. Junior levels of motorsport are things like Formula 2 and Formula 3, which are feeder series to F1.',
      darkMode: '🌙 Dark Mode',
      lightMode: '☀️ Light Mode',
      engineSound: '🔊 Play Engine Sound',
      vroom: '🏎️ Vroom!',
      topDrivers: 'Top Drivers',
      viewStats: 'View Stats',
      follow: 'Follow',
      raceCalendar: 'Race Calendar',
      viewFullCalendar: 'View Full Calendar',
      raceHighlights: 'Race Highlights',
      highlightsDesc: 'Experience the thrill of Formula 1 racing with our curated collection of historic moments and legendary battles on track.',
      watch: 'Watch',
      share: 'Share',
      teamsTitle: 'F1 Teams 2024',
      searchTeams: '🔍 Search teams by name or country...',
      championships: 'Championships',
      showChampions: 'Show Championship Winners',
      ratingTitle: 'Rate Your Experience',
      ratingQuestion: 'How would you rate our F1 website?',
      ratingMessage: 'Please rate your experience!',
      resetForms: 'Reset All Forms',
      historicMoments: 'Historic F1 Moments',
      newsletter: 'Newsletter',
      subscribe: 'Subscribe',
      formTitle: 'Get Race Notifications',
      formSubtitle: 'Complete the form below and we\'ll notify you about Formula 1 races!',
      name: 'Name',
      email: 'Email address',
      emailHelp: 'We\'ll never share your email with anyone else.',
      favoriteTeam: 'Favorite Team',
      updates: 'Send me race highlights and updates',
      subscribeNow: 'Subscribe Now',
      clearForm: 'Clear Form',
      faq: 'Frequently Asked Questions',
      faqQ1: 'Why do F1 cars spark?',
      faqQ2: 'What are penalty points?',
      faqQ3: 'Can drivers listen to music during a race?',
      faqA1: `Sparks mainly come from the car running very close to the track. With the floor just millimetres off the ground and track surface variances, contact (or near contact) often creates sparks. Cars have a wooden "skid block" under the floor to enforce ride-height rules; if it's worn too much a car can be disqualified. Teams also add small titanium skid elements that strike the track and produce the bright sparks fans see.`,
    faqA2: `Every F1 driver holds a FIA Super License that tracks incidents and penalty points. Different infractions carry different points; if a driver accumulates 12 or more points within 12 months they receive a one-race ban. The system helps enforce safety and consistency on track.`,
    faqA3: `No — drivers cannot listen to music during a race. It would be a dangerous distraction. They do, however, have constant radio communication with engineers and the pit wall for strategic and safety messages.`,
      quickNav: 'Quick Navigation',
      aboutF1: 'About F1',
      photoGallery: 'Photo Gallery',
      teams: 'Teams',
      rateUs: 'Rate Us',
      qa: 'Q&A',
      winsRecord: 'Total F1 Wins Record',
      winsRecordText: 'Lewis Hamilton is the most decorated F1 driver with 105 race wins',
      consecutiveChamp: 'Most Consecutive Championships',
      consecutiveChampText: 'Michael Schumacher won 5 seasons back-to-back, starting in 2000',
      fastestSpeed: 'Fastest Speed',
      fastestSpeedText: 'The fastest speed ever recorded in a Formula 1 race is 231.5 mph by Montoya driving for McLaren-Mercedes',
      totalChampionships: 'Total F1 Championships',
       newsletterTitle: 'Newsletter',
    subscribeBtn: 'Subscribe',
    formTitle: 'Get Race Notifications',
    formDesc: "Complete the form below and we'll notify you about Formula 1 races!",
    nameLabel: 'Name',
    emailLabel: 'Email address',
    teamLabel: 'Favorite Team',
    highlightsLabel: 'Send me race highlights and updates',
    submitBtn: 'Subscribe Now',
    resetBtn: 'Clear Form'
    },
    ru: {
      title: 'Формула 1 — Скорость и Стратегия',
      subtitle: 'Ф1 - высший класс международных одноместных автогонок. Краткие факты ниже.',
      description: 'Формула 1, более известная как Ф1, является вершиной автоспорта. Это высший класс международных автогонок с открытыми колесами и одноместными автомобилями. Эти слова могут показаться сложными, но на самом деле они довольно просты. Ф1 - это высший уровень гонок с одноместным автомобилем, где колеса находятся снаружи кузова. Поскольку Ф1 является высшим уровнем автогонок, она называется Формула 1; это высший уровень автоспорта. Младшие уровни автоспорта - это такие серии, как Формула 2 и Формула 3, которые являются подготовительными сериями для Ф1.',
      darkMode: '🌙 Темная Тема',
      lightMode: '☀️ Светлая Тема',
      engineSound: '🔊 Звук Двигателя',
      vroom: '🏎️ Врум!',
      topDrivers: 'Лучшие Гонщики',
      viewStats: 'Статистика',
      follow: 'Следить',
      raceCalendar: 'Календарь Гонок',
      viewFullCalendar: 'Полный Календарь',
      raceHighlights: 'Лучшие Моменты Гонок',
      highlightsDesc: 'Испытайте острые ощущения гонок Формулы 1 с нашей подборкой исторических моментов и легендарных битв на треке.',
      watch: 'Смотреть',
      share: 'Поделиться',
      teamsTitle: 'Команды Ф1 2024',
      searchTeams: '🔍 Поиск команд по названию или стране...',
      championships: 'Чемпионств',
      showChampions: 'Показать Победителей Чемпионатов',
      ratingTitle: 'Оцените Ваш Опыт',
      ratingQuestion: 'Как бы вы оценили наш сайт о Ф1?',
      ratingMessage: 'Пожалуйста, оцените ваш опыт!',
      resetForms: 'Сбросить Все Формы',
      historicMoments: 'Исторические Моменты Ф1',
      newsletter: 'Новостная Рассылка',
      subscribe: 'Подписаться',
      formTitle: 'Получайте Уведомления о Гонках',
      formSubtitle: 'Заполните форму ниже, и мы будем уведомлять вас о гонках Формулы 1!',
      name: 'Имя',
      email: 'Email адрес',
      emailHelp: 'Мы никогда не передадим ваш email третьим лицам.',
      favoriteTeam: 'Любимая Команда',
      updates: 'Отправлять мне обзоры гонок и обновления',
      subscribeNow: 'Подписаться Сейчас',
      clearForm: 'Очистить Форму',
      faq: 'Часто Задаваемые Вопросы',
      faqQ1: 'Почему машины Ф1 искрят?',
      faqQ2: 'Что такое штрафные очки?',
      faqQ3: 'Могут ли гонщики слушать музыку во время гонки?',
      faqA1: `Искры возникают потому, что днище болида находится всего в миллиметрах от покрытия трассы. Неровности и колебания поверхности в сочетании с такой маленькой посадкой приводят к искрению при контакте. Под днищем установлен деревянный «скид-блок» (plank) для контроля допускаемой высоты — при чрезмерном стачивании машина может быть дисквалифицирована. Команды также используют вставки из титана, которые намеренно касаются трассы и дают яркую искру, уменьшая износ деревянного блока.`,
    faqA2: `У каждого гонщика есть Суперлицензия FIA, где фиксируются нарушения и штрафные очки. Разные нарушения дают разное количество очков; при достижении 12 и более очков в течение 12 месяцев гонщику выписывается дисквалификация на одну гонку. Система призвана поддерживать безопасность и дисциплину на трассе.`,
    faqA3: `Нет — гонщики не могут слушать музыку во время гонки, это было бы слишком отвлекающим и опасным. Зато у них есть двусторонняя радиосвязь с инженерами и пит-воллом для передачи стратегических и безопасностных указаний.`
,quickNav: 'Быстрая Навигация',
      aboutF1: 'О Ф1',
      photoGallery: 'Фотогалерея',
      teams: 'Команды',
      rateUs: 'Оцените Нас',
      qa: 'Вопросы и Ответы',
      winsRecord: 'Рекорд Побед в Ф1',
      winsRecordText: 'Льюис Хэмилтон - самый титулованный гонщик Ф1 со 105 победами',
      consecutiveChamp: 'Наибольшее Число Чемпионств Подряд',
      consecutiveChampText: 'Михаэль Шумахер выиграл 5 сезонов подряд, начиная с 2000 года',
      fastestSpeed: 'Максимальная Скорость',
      fastestSpeedText: 'Самая высокая скорость в истории Ф1 составила 372,6 км/ч, её показал Монтойя на McLaren-Mercedes',
      totalChampionships: 'Всего Чемпионств Ф1',
       newsletterTitle: 'Подписка на новости',
    subscribeBtn: 'Подписаться',
    formTitle: 'Получайте уведомления о гонках',
    formDesc: 'Заполните форму, и мы будем уведомлять вас о гонках Формулы-1!',
    nameLabel: 'Имя',
    emailLabel: 'Email адрес',
    teamLabel: 'Любимая команда',
    highlightsLabel: 'Отправлять мне хайлайты и обновления',
    submitBtn: 'Подписаться',
    resetBtn: 'Очистить'
    },
    kz: {
      title: 'Формула 1 — Жылдамдық пен Стратегия',
      subtitle: 'Ф1 - халықаралық бір орындық автокөлік жарыстарының жоғары класы. Қысқаша деректер төменде.',
      description: 'Формула 1, Ф1 деп те белгілі, автоспорттың шыңы болып табылады. Бұл ашық дөңгелекті бір орындық автокөліктердегі халықаралық автожарыстардың жоғары класы. Бұл сөздер күрделі болып көрінуі мүмкін, бірақ шын мәнінде олар өте қарапайым. Ф1 - бұл дөңгелектері кузовтың сыртында орналасқан бір орындық автокөлікпен жарысудың ең жоғары деңгейі. Ф1 формулалық автожарыстардың ең жоғары деңгейі болғандықтан, ол Формула 1 деп аталады; бұл автоспорттың ең жоғары деңгейі. Автоспорттың кіші деңгейлері - бұл Формула 2 және Формула 3 сияқты сериялар, олар Ф1-ге дайындық сериялары болып табылады.',
      darkMode: '🌙 Қараңғы Тақырып',
      lightMode: '☀️ Ашық Тақырып',
      engineSound: '🔊 Қозғалтқыш Дыбысы',
      vroom: '🏎️ Врум!',
      topDrivers: 'Үздік Жарысшылар',
      viewStats: 'Статистика',
      follow: 'Бақылау',
      raceCalendar: 'Жарыс Күнтізбесі',
      viewFullCalendar: 'Толық Күнтізбе',
      raceHighlights: 'Жарыстың Ең Жақсы Сәттері',
      highlightsDesc: 'Формула 1 жарысының қызығын біздің тарихи сәттер мен трекдегі аңызды шайқастар жинағымен сезініңіз.',
      watch: 'Көру',
      share: 'Бөлісу',
      teamsTitle: 'Ф1 Командалары 2024',
      searchTeams: '🔍 Атауы немесе елі бойынша командаларды іздеу...',
      championships: 'Чемпионаттар',
      showChampions: 'Чемпионат Жеңімпаздарын Көрсету',
      ratingTitle: 'Тәжірибеңізді Бағалаңыз',
      ratingQuestion: 'Біздің Ф1 сайтын қалай бағалар едіңіз?',
      ratingMessage: 'Тәжірибеңізді бағалаңыз!',
      resetForms: 'Барлық Пішіндерді Тазалау',
      historicMoments: 'Ф1-дің Тарихи Сәттері',
      newsletter: 'Жаңалықтар Тарату',
      subscribe: 'Жазылу',
      formTitle: 'Жарыс Туралы Хабарламаларды Алыңыз',
      formSubtitle: 'Төмендегі пішінді толтырыңыз, біз сізге Формула 1 жарыстары туралы хабарлаймыз!',
      name: 'Аты',
      email: 'Email мекенжайы',
      emailHelp: 'Біз сіздің email-ді ешкіммен бөліспейміз.',
      favoriteTeam: 'Сүйікті Команда',
      updates: 'Маған жарыстың ең жақсы сәттерін және жаңартуларды жіберу',
      subscribeNow: 'Қазір Жазылу',
      clearForm: 'Пішінді Тазалау',
      faq: 'Жиі Қойылатын Сұрақтар',
      faqQ1: 'Неліктен Ф1 машиналары ұшқындайды?',
      faqQ2: 'Айыппұл ұпайлары дегеніміз не?',
      faqQ3: 'Жарысшылар жарыс кезінде музыка тыңдай ала ма?',
      faqA1: `Ұшқынын негізінен көлік ехпажының жол бетіне өте жақын орналасуынан пайда болады. Днищесі миллиметрлерге дейін төмен болғандықтан, трассадағы ойықтар мен теңсіздіктер жанасуды немесе қатты жақындауды тудырып, ұшқын шығарады. Днищеде «скид-блок» (ағаш тақта) бар — оның ескіріп тозуы регламентті бұзса, машина дисквалификациялануы мүмкін. Командалар күнделікті тозуды азайту және жарқын ұшқын алу үшін кей жерлерге титан қоймаларын қояды.`,
    faqA2: `Әрбір гонщикте FIA Суперлицензиясы бар, онда жол ережесін бұзғаны үшін айыппұл ұпайлары тіркеледі. Түрлі ережелерге әртүрлі ұпайлар қойылады; егер гонщик 12 немесе одан көп ұпай жинаса — 12 ай ішінде бір жарыстан шеттетіледі. Бұл жүйе қауіпсіздік пен тәртіпті қамтамасыз етуге бағытталған.`,
    faqA3: `Жоқ — жарысшылар жарыс кезінде музыка тыңдай алмайды, өйткені бұл қауіпті алаңдаушылық тудырады. Алайда олар инженерлермен және пит-воллмен радиобайланыс арқылы стратегиялық және қауіпсіздік бойынша хабарламалар ала алады.`
 ,
      quickNav: 'Жылдам Навигация',
      aboutF1: 'Ф1 туралы',
      photoGallery: 'Фотогалерея',
      teams: 'Командалар',
      rateUs: 'Бізді Бағалаңыз',
      qa: 'Сұрақ-Жауап',
      winsRecord: 'Ф1 Жеңістер Рекорды',
      winsRecordText: 'Льюис Хэмилтон 105 жеңіспен Ф1-дің ең титулды жарысшысы',
      consecutiveChamp: 'Қатарынан Ең Көп Чемпионаттар',
      consecutiveChampText: 'Михаэль Шумахер 2000 жылдан бастап қатарынан 5 маусым жеңді',
      fastestSpeed: 'Ең Жоғары Жылдамдық',
      fastestSpeedText: 'Ф1 тарихындағы ең жоғары жылдамдық 372,6 км/сағ болды, оны Монтойя McLaren-Mercedes көлігінде көрсетті',
      totalChampionships: 'Ф1 Чемпионаттарының Жалпы Саны',
      newsletterTitle: 'Жаңалықтарға жазылу',
    subscribeBtn: 'Жазылу',
    formTitle: 'Жарыс туралы хабарламалар алыңыз',
    formDesc: 'Форманы толтырыңыз — біз сізге Формула-1 жарыстары туралы хабарлаймыз!',
    nameLabel: 'Аты',
    emailLabel: 'Электрондық пошта',
    teamLabel: 'Ұнататын команда',
    highlightsLabel: 'Жарыстың үзінділері мен жаңалықтарын жіберу',
    submitBtn: 'Жазылу',
    resetBtn: 'Форманы тазалау'
    }
  };

  switch(lang) {
    case 'en':
      applyTranslations(translations.en);
      break;
    case 'ru':
      applyTranslations(translations.ru);
      break;
    case 'kz':
      applyTranslations(translations.kz);
      break;
    default:
      applyTranslations(translations.en);
  }
}
function applyTranslations(translations) {
  // 'translations' here is an object already (e.g. translations.en)
  if (!translations) return;

  // Main title and subtitle
  const heroTitle = document.querySelector('.hero-title.display-5');
  if (heroTitle) heroTitle.textContent = translations.title || heroTitle.textContent;

  const subtitle = document.querySelector('.text-muted-custom.fst-italic');
  if (subtitle) subtitle.textContent = translations.subtitle || subtitle.textContent;

  const description = document.querySelector('.text-dark.lh-base') || document.querySelector('#description');
  if (description) description.textContent = translations.description || description.textContent;

  // Dark mode button (respect current isDarkMode state)
  const darkModeBtn = document.querySelector('#dark-mode-toggle');
  if (darkModeBtn) {
    darkModeBtn.textContent = isDarkMode ? (translations.lightMode || 'Light') : (translations.darkMode || 'Dark');
  }

  // Newsletter and popup labels
  const newsletterTitle = document.querySelector('#newsletter h2');
  if (newsletterTitle && translations.newsletter) newsletterTitle.textContent = translations.newsletter;

  const subscribeBtn = document.getElementById('showFormBtn');
  if (subscribeBtn && translations.subscribe) subscribeBtn.textContent = translations.subscribe;

  const formTitle = document.querySelector('#popupForm .popup-content h2');
  if (formTitle && translations.formTitle) formTitle.textContent = translations.formTitle;

  const formDesc = document.querySelector('#popupForm .popup-content p');
  if (formDesc && translations.formSubtitle) formDesc.textContent = translations.formSubtitle;

  const nameLabel = document.querySelector('label[for="nameInput"]');
  if (nameLabel && translations.name) nameLabel.textContent = translations.name;

  const emailLabel = document.querySelector('label[for="emailInput"]');
  if (emailLabel && translations.email) emailLabel.textContent = translations.email;

  const teamLabel = document.querySelector('label[for="teamSelect"]');
  if (teamLabel && translations.favoriteTeam) teamLabel.textContent = translations.favoriteTeam;

  const emailHelp = document.querySelector('#emailHelp');
  if (emailHelp && translations.emailHelp) emailHelp.textContent = translations.emailHelp;

  const updatesLabel = document.querySelector('label[for="notificationsCheck"]');
  if (updatesLabel && translations.updates) updatesLabel.textContent = translations.updates;

  const subscribeNowBtn = document.querySelector('.form-custom button[type="submit"]');
  if (subscribeNowBtn && translations.subscribeNow) subscribeNowBtn.textContent = translations.subscribeNow;

  const clearFormBtn = document.querySelector('.form-custom button[type="reset"]');
  if (clearFormBtn && translations.clearForm) clearFormBtn.textContent = translations.clearForm;

  // Sound button (always set to engineSound translation)
  const soundBtn = document.querySelector('#play-sound-btn');
  if (soundBtn && translations.engineSound) soundBtn.textContent = translations.engineSound;

  // Top Drivers section buttons
  const driversTitle = document.querySelector('#drivers .card-title');
  if (driversTitle && translations.topDrivers) driversTitle.textContent = translations.topDrivers;

  const driversBtns = document.querySelectorAll('#drivers .btn-group button');
  if (driversBtns[0] && translations.viewStats) driversBtns[0].textContent = translations.viewStats;
  if (driversBtns[1] && translations.follow) driversBtns[1].textContent = translations.follow;

  // Calendar
  const calendarTitle = document.querySelector('#calendar .card-title');
  if (calendarTitle && translations.raceCalendar) calendarTitle.textContent = translations.raceCalendar;
  const calendarBtn = document.querySelector('#calendar .btn-f1-primary');
  if (calendarBtn && translations.viewFullCalendar) calendarBtn.textContent = translations.viewFullCalendar;

  // Highlights
  const highlightsTitle = document.querySelectorAll('.card-title')[2];
  if (highlightsTitle && translations.raceHighlights) highlightsTitle.textContent = translations.raceHighlights;
  const highlightsDesc = document.querySelector('.card-text.text-muted-custom');
  if (highlightsDesc && translations.highlightsDesc) highlightsDesc.textContent = translations.highlightsDesc;
  const highlightsBtns = document.querySelectorAll('.card:last-of-type .btn-group a, .card:last-of-type .btn-group button');
  if (highlightsBtns[0] && translations.watch) highlightsBtns[0].textContent = translations.watch;
  if (highlightsBtns[1] && translations.share) highlightsBtns[1].textContent = translations.share;

  // Teams section
  const teamsTitle = document.querySelector('#teams h2');
  if (teamsTitle && translations.teamsTitle) teamsTitle.textContent = translations.teamsTitle;
  const teamSearch = document.querySelector('#team-search');
  if (teamSearch && translations.searchTeams) teamSearch.placeholder = translations.searchTeams;
  const championsBtn = document.querySelector('#championship-teams-btn');
  if (championsBtn && translations.showChampions) championsBtn.textContent = translations.showChampions;

  // Rating
  const ratingTitle = document.querySelector('#rating h2');
  if (ratingTitle && translations.ratingTitle) ratingTitle.textContent = translations.ratingTitle;
  const ratingQuestion = document.querySelector('#rating .card-body > p:first-of-type');
  if (ratingQuestion && translations.ratingQuestion) ratingQuestion.textContent = translations.ratingQuestion;
  const ratingMsg = document.querySelector('#rating-message');
  if (ratingMsg && translations.ratingMessage) ratingMsg.textContent = translations.ratingMessage;
  const resetBtn = document.querySelector('#reset-form-btn');
  if (resetBtn && translations.resetForms) resetBtn.textContent = translations.resetForms;

  // Gallery & FAQ
  const galleryTitle = document.querySelector('#gallery h2');
  if (galleryTitle && translations.historicMoments) galleryTitle.textContent = translations.historicMoments;
  const faqTitle = document.querySelector('#faq h2');
  if (faqTitle && translations.faq) faqTitle.textContent = translations.faq;

  // FAQ buttons and answers — avoid childNodes indexing
  const faqButtons = document.querySelectorAll('.collapsible');
  if (faqButtons && faqButtons.length >= 3) {
    if (translations.faqQ1) faqButtons[0].textContent = translations.faqQ1;
    if (translations.faqQ2) faqButtons[1].textContent = translations.faqQ2;
    if (translations.faqQ3) faqButtons[2].textContent = translations.faqQ3;
    if (faqButtons[0].nextElementSibling && translations.faqA1) faqButtons[0].nextElementSibling.textContent = translations.faqA1;
    if (faqButtons[1].nextElementSibling && translations.faqA2) faqButtons[1].nextElementSibling.textContent = translations.faqA2;
    if (faqButtons[2].nextElementSibling && translations.faqA3) faqButtons[2].nextElementSibling.textContent = translations.faqA3;
  }

  // Sidebar links & quick stats
  const quickNavTitle = document.querySelector('.sidebar-section h3');
  if (quickNavTitle && translations.quickNav) quickNavTitle.textContent = translations.quickNav;
  const navLinks = document.querySelectorAll('.sidebar-section a');
  if (navLinks && navLinks.length >= 8) {
    if (translations.aboutF1) navLinks[0].textContent = translations.aboutF1;
    if (translations.topDrivers) navLinks[1].textContent = translations.topDrivers;
    if (translations.raceCalendar) navLinks[2].textContent = translations.raceCalendar;
    if (translations.photoGallery) navLinks[3].textContent = translations.photoGallery;
    if (translations.teams) navLinks[4].textContent = translations.teams;
    if (translations.rateUs) navLinks[5].textContent = translations.rateUs;
    if (translations.newsletter) navLinks[6].textContent = translations.newsletter;
    if (translations.qa) navLinks[7].textContent = translations.qa;
  }

  // Stat titles and values
  const statTitles = document.querySelectorAll('.stat-title');
  if (statTitles[0] && translations.winsRecord) statTitles[0].textContent = translations.winsRecord;
  if (statTitles[1] && translations.consecutiveChamp) statTitles[1].textContent = translations.consecutiveChamp;
  if (statTitles[2] && translations.fastestSpeed) statTitles[2].textContent = translations.fastestSpeed;

  const statValues = document.querySelectorAll('.stat-value');
  if (statValues[0] && translations.winsRecordText) statValues[0].textContent = translations.winsRecordText;
  if (statValues[1] && translations.consecutiveChampText) statValues[1].textContent = translations.consecutiveChampText;
  if (statValues[2] && translations.fastestSpeedText) statValues[2].textContent = translations.fastestSpeedText;

  // Update total championships element keep translation label if present
  const totalChampElem = document.querySelector('#total-championships');
  if (totalChampElem) {
    const label = translations.totalChampionships || 'Total F1 Championships';
    totalChampElem.textContent = `${label}: ${totalChampionships}`;
  }
}

// ============================================
// ARRAYS AND LOOPS - Dynamic Item Display
// ============================================

// F1 Teams Array
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

// Display teams dynamically using loops
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

// Race schedule array
const raceSchedule = [
  { race: 'Singapore GP', date: 'Oct 3-5', circuit: 'Marina Bay' },
  { race: 'United States GP', date: 'Oct 17-20', circuit: 'Austin' },
  { race: 'Mexico City GP', date: 'Oct 24-27', circuit: 'Autódromo' },
  { race: 'Brazilian GP', date: 'Nov 1-3', circuit: 'Interlagos' },
  { race: 'Las Vegas GP', date: 'Nov 14-16', circuit: 'Las Vegas Strip' },
  { race: 'Qatar GP', date: 'Nov 21-23', circuit: 'Lusail' },
  { race: 'Abu Dhabi GP', date: 'Nov 28-30', circuit: 'Yas Marina' }
];

// Display schedule using while loop
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
// PLAY SOUNDS
// ============================================

// Sound effect for button clicks
const soundButton = document.querySelector('#play-sound-btn');
if (soundButton) {
  soundButton.addEventListener('click', () => {
    // Create audio context for racing sound effect
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillator for engine sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Racing car engine sound
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // Visual feedback
    soundButton.textContent = '🏎️ Vroom!';
    setTimeout(() => {
      soundButton.textContent = '🔊 Play Engine Sound';
    }, 1000);
  });
}

// Notification sound for form submission
const newsletterForm = document.querySelector('.form-custom');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Play success sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Success chime
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
    
    // Show success message
    alert('✅ Successfully subscribed to F1 notifications!');
  });
}

// ============================================
// HIGHER-ORDER FUNCTIONS
// ============================================

// Filter function - Filter teams with championships
const filterTeams = (teams, filterFn) => {
  return teams.filter(filterFn);
};

// Get teams with championships
const championshipTeams = filterTeams(f1Teams, team => team.championships > 0);

// Map function - Transform team data
const mapTeams = (teams, mapFn) => {
  return teams.map(mapFn);
};

// Create simplified team list
const teamNames = mapTeams(f1Teams, team => team.name);

// ForEach function - Apply styling to elements
const applyStylesToElements = (selector, styleFunction) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(styleFunction);
};

// Example: Apply hover effect to all cards
applyStylesToElements('.card', (card) => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.transition = 'transform 0.3s ease';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Custom higher-order function: Create event handler
const createClickHandler = (callback) => {
  return (event) => {
    event.preventDefault();
    callback(event);
  };
};

// Display championship teams with higher-order function
const displayChampionshipTeams = document.querySelector('#championship-teams-btn');
if (displayChampionshipTeams) {
  const handler = createClickHandler((e) => {
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

// Reduce function - Calculate total championships
const totalChampionships = f1Teams.reduce((total, team) => total + team.championships, 0);

// Display total championships
const championshipCounter = document.querySelector('#total-championships');
if (championshipCounter) {
  championshipCounter.textContent = `Total F1 Championships: ${totalChampionships}`;
}

// ============================================
// BONUS: Interactive Features
// ============================================

// Dark mode toggle with local storage alternative (using session variable)
let isDarkMode = false;
const darkModeToggle = document.querySelector('#dark-mode-toggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
}

// Live search/filter functionality
const searchInput = document.querySelector('#team-search');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredTeams = f1Teams.filter(team => 
      team.name.toLowerCase().includes(searchTerm) ||
      team.country.toLowerCase().includes(searchTerm)
    );
    
    // Update teams display
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

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
// ============================================
// TASK 4: COLORFUL SCROLL PROGRESS BAR
// ============================================
$(document).scroll(function () {
  var scrollAmount = $(window).scrollTop();
  var documentHeight = $(document).height();
  var windowHeight = $(window).height();
  var scrollPercent = (scrollAmount / (documentHeight - windowHeight)) * 100;
  var roundScroll = Math.round(scrollPercent);
  
  // Update progress bar width and text
  $(".scrollBar").css("width", scrollPercent + "%");
  $(".scrollBar span").text(roundScroll);
});

// ============================================
// TASK 8: COPIED TO CLIPBOARD BUTTON
// ============================================
$(document).ready(function() {
  // Add copy buttons to FAQ content
  $('.content').each(function(index) {
    const content = $(this);
    const copyBtn = $('<button class="copy-btn btn btn-sm btn-outline-secondary mt-2">📋 Copy</button>');
    content.append(copyBtn);
    
    copyBtn.on('click', function(e) {
      e.stopPropagation();
      const textToCopy = content.clone().find('.copy-btn').remove().end().text().trim();
      
      // Create temporary textarea for copying
      const $temp = $('<textarea>');
      $('body').append($temp);
      $temp.val(textToCopy).select();
      document.execCommand('copy');
      $temp.remove();
      
      // Change button appearance
      copyBtn.html('✓ Copied!').removeClass('btn-outline-secondary').addClass('btn-success');
      
      // Show tooltip
      copyBtn.attr('title', 'Copied to clipboard!');
      
      // Reset after 2 seconds
      setTimeout(function() {
        copyBtn.html('📋 Copy').removeClass('btn-success').addClass('btn-outline-secondary');
        copyBtn.removeAttr('title');
      }, 2000);
    });
  });
  
  // Also handle actual copy events
  $('.content').on('copy', function() {
    console.log('Text copied from FAQ section');
  });
});

// ============================================
// TASK 9: IMAGE LAZY LOADING
// ============================================
$(document).ready(function() {
  // Add lazy loading to carousel images
  $('.carousel-item img').each(function() {
    const $img = $(this);
    const actualSrc = $img.attr('src');
    
    // Store actual src in data attribute and replace with placeholder
    $img.attr('data-src', actualSrc);
    $img.attr('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect width="800" height="500" fill="%23f4f7fb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%2355677a"%3ELoading...%3C/text%3E%3C/svg%3E');
    $img.addClass('lazy-load');
  });
  
  // Function to load images when in viewport
  function lazyLoadImages() {
    $('.lazy-load').each(function() {
      const $img = $(this);
      const imgTop = $img.offset().top;
      const imgBottom = imgTop + $img.height();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();
      
      // Check if image is in viewport (with 200px buffer)
      if (imgBottom > viewportTop - 200 && imgTop < viewportBottom + 200) {
        const actualSrc = $img.attr('data-src');
        if (actualSrc && $img.attr('src') !== actualSrc) {
          $img.attr('src', actualSrc);
          $img.removeClass('lazy-load');
          console.log('Lazy loaded image:', actualSrc);
        }
      }
    });
  }
  
  // Load images on scroll
  $(window).on('scroll', lazyLoadImages);
  
  // Load images on carousel slide
  $('#f1Carousel').on('slide.bs.carousel', function() {
    setTimeout(lazyLoadImages, 100);
  });
  
  // Initial load for images already in viewport
  lazyLoadImages();
});

// ============================================
// TASK 6: LOADING SPINNER ON SUBMIT
// ============================================
$(document).ready(function() {
  $('.form-custom').on('submit', function(e) {
    e.preventDefault();
    
    const $form = $(this);
    const $submitBtn = $form.find('button[type="submit"]');
    const originalText = $submitBtn.html();
    
    // Disable button and show spinner
    $submitBtn.prop('disabled', true);
    $submitBtn.html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Please wait...');
    
    // Simulate server call (2 seconds)
    setTimeout(function() {
      // Play success sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      
      // Show success message
      alert('✅ Successfully subscribed to F1 notifications!');
      
      // Reset button
      $submitBtn.html(originalText);
      $submitBtn.prop('disabled', false);
      
      // Close popup
      $('#popupForm').css('display', 'none');
      
      // Reset form
      $form[0].reset();
    }, 2000);
  });
});

// ============================================
// POPUP FORM HANDLING
// ============================================
$(document).ready(function() {
  $('#showFormBtn').on('click', function() {
    $('#popupForm').css('display', 'flex');
  });
  
  $('#closeFormBtn').on('click', function() {
    $('#popupForm').css('display', 'none');
  });
  
  // Close on outside click
  $('#popupForm').on('click', function(e) {
    if ($(e.target).is('#popupForm')) {
      $(this).css('display', 'none');
    }
  });
});

console.log('F1 JavaScript loaded successfully!');
console.log('Championship Teams:', championshipTeams);
console.log('Total Championships:', totalChampionships);