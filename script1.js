const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirmPassword");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");

    [nameError, emailError, passwordError, confirmError].forEach(e => e && (e.textContent = ""));

    let valid = true;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (name && !name.value.trim()) {
      nameError.textContent = "Name is required.";
      valid = false;
    }

    if (email && !email.value.trim()) {
      emailError.textContent = "Email is required.";
      valid = false;
    } else if (email && !emailPattern.test(email.value)) {
      emailError.textContent = "Invalid email format (name@example.com).";
      valid = false;
    }

    if (password && password.value.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters.";
      valid = false;
    }

    if (confirm && confirm.value !== password.value) {
      confirmError.textContent = "Passwords do not match.";
      valid = false;
    }

    if (valid) {
      alert(`✅ Registration successful!\nWelcome, ${name.value}!`);
      registerForm.reset();
    }
  });
}

const questions = document.querySelectorAll(".question");
questions.forEach(q => {
  q.addEventListener("click", () => {
    q.nextElementSibling.classList.toggle("show");
  });
});

const popup = document.getElementById("popup");
const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");

if (popup && openPopup && closePopup) {
  openPopup.onclick = () => popup.style.display = "block";
  closePopup.onclick = () => popup.style.display = "none";
  window.onclick = (e) => {
    if (e.target === popup) popup.style.display = "none";
  };
}

const bgBtn = document.getElementById("changeBg");
if (bgBtn) {
  const colors = ["#f4f7fb", "#e0f7fa", "#ffebee", "#fff3e0", "#e8f5e9"];
  let index = 0;
  bgBtn.addEventListener("click", () => {
    document.body.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length;
  });
}

const dateBlock = document.getElementById("datetime");
if (dateBlock) {
  const updateTime = () => {
    const now = new Date();
    dateBlock.textContent = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };
  updateTime();
  setInterval(updateTime, 1000);
}
