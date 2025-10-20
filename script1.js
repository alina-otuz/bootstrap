// ===== FAQ раскрытие ответов =====
document.querySelectorAll(".question").forEach(q => {
  q.addEventListener("click", () => q.nextElementSibling.classList.toggle("show"));
});

// ===== Popup форма =====
const popup = document.getElementById("popup");
const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");

if (popup && openPopup && closePopup) {
  openPopup.onclick = () => (popup.style.display = "block");
  closePopup.onclick = () => (popup.style.display = "none");
  window.onclick = (e) => { if (e.target === popup) popup.style.display = "none"; };
}

// ===== Часы (реальное время) =====
const dateBlock = document.getElementById("datetime");
if (dateBlock) {
  const updateTime = () => {
    const now = new Date();
    dateBlock.textContent = now.toLocaleString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
  };
  updateTime();
  setInterval(updateTime, 1000);
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

// ===== Темная тема (динамически в DOM) =====
const themeStyle = document.createElement('style');
themeStyle.textContent = `
  body.dark-mode {
    background-color: #121212 !important;
    color: #f5f5f5 !important;
    transition: background-color 0.6s, color 0.6s;
  }
  body.dark-mode .bg-light,
  body.dark-mode .card,
  body.dark-mode .p-3,
  body.dark-mode .shadow-sm {
    background-color: #1e1e1e !important;
    color: #f5f5f5 !important;
  }
`;
document.head.appendChild(themeStyle);

// ===== Многошаговая форма с аудиоэффектами =====
const registerForm = document.getElementById("registerForm");
const successSound = new Audio('success.mp3');
const errorSound = new Audio('error.mp3');

if (registerForm) {
  registerForm.innerHTML = `
    <div class="form-step active">
      <label>Name:</label>
      <input type="text" id="stepName" class="form-control" placeholder="Your name">
      <button type="button" class="next btn btn-danger mt-3 w-100">Next</button>
    </div>
    <div class="form-step">
      <label>Email:</label>
      <input type="email" id="stepEmail" class="form-control" placeholder="example@mail.com">
      <div class="d-flex mt-3 gap-2">
        <button type="button" class="back btn btn-secondary w-50">Back</button>
        <button type="button" class="next btn btn-danger w-50">Next</button>
      </div>
    </div>
    <div class="form-step">
      <label>Password:</label>
      <input type="password" id="stepPass" class="form-control" placeholder="******">
      <div class="d-flex mt-3 gap-2">
        <button type="button" class="back btn btn-secondary w-50">Back</button>
        <button type="submit" class="btn btn-success w-50">Submit</button>
      </div>
    </div>
  `;

  const steps = registerForm.querySelectorAll('.form-step');
  let current = 0;

  const showStep = (i) => {
    steps.forEach((s, idx) => {
      s.classList.toggle('active', idx === i);
      s.style.display = idx === i ? 'block' : 'none';
    });
  };
  showStep(current);

  registerForm.addEventListener('click', e => {
    if (e.target.classList.contains('next')) {
      current = Math.min(current + 1, steps.length - 1);
      showStep(current);
    } else if (e.target.classList.contains('back')) {
      current = Math.max(current - 1, 0);
      showStep(current);
    }
  });

  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById("stepName").value.trim();
    const email = document.getElementById("stepEmail").value.trim();
    const pass = document.getElementById("stepPass").value.trim();

    if (!name || !email || !pass) {
      alert("⚠️ Please fill all fields.");
      errorSound.currentTime = 0;
      errorSound.play(); // 🔴 ошибка
      return;
    }

    alert(`✅ Welcome, ${name}! Registration successful.`);
    successSound.currentTime = 0;
    successSound.play(); // 🟢 успех
    registerForm.reset();
    current = 0;
    showStep(0);
  });
}

// ===== Навигация с помощью клавиатуры (Keyboard Event Handling) =====
const menuItems = document.querySelectorAll('.nav-link');
let navIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    navIndex = (navIndex + 1) % menuItems.length;
  } else if (e.key === 'ArrowLeft') {
    navIndex = (navIndex - 1 + menuItems.length) % menuItems.length;
  } else return;

  menuItems[navIndex].focus();
});
