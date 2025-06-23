// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
  document.body.classList.toggle('menu-open');
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
  themeIcon.classList.toggle('fa-moon');
  themeIcon.classList.toggle('fa-sun');
});

// Load Theme from Local Storage
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.add('light');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Live Players Count Animation
function animatePlayerCount(element) {
  const min = parseInt(element.dataset.min);
  const max = parseInt(element.dataset.max);
  let current = parseInt(element.dataset.current);
  const playerNumber = element.querySelector('.player-number');

  function updateCount() {
    const change = Math.floor(Math.random() * 20) - 10; // Random change between -10 and +10
    current = Math.max(min, Math.min(max, current + change));
    playerNumber.textContent = current;
    element.dataset.current = current;
  }

  // Initial update
  updateCount();
  // Update every 2 seconds
  setInterval(updateCount, 2000);
}

document.querySelectorAll('.players-count').forEach(animatePlayerCount);

// Game Search Functionality
const gameSearch = document.getElementById('game-search');
gameSearch.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const gameCards = document.querySelectorAll('.live-game-card');
  gameCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = title.includes(query) ? 'block' : 'none';
  });
});

// Countdown Timer for Promotions
function startCountdown(element) {
  const endDate = new Date(element.dataset.end).getTime();
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = endDate - now;
    if (distance < 0) {
      element.textContent = 'Offer Expired';
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    element.textContent = `${days}d ${hours}h ${minutes}m`;
  };
  updateCountdown();
  setInterval(updateCountdown, 60000);
}

document.querySelectorAll('.countdown').forEach(startCountdown);

// Form Submission with Loader
function handleFormSubmission(form) {
  if (!form) return;
  const loader = document.querySelector('.loader');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    loader.classList.add('active');
    setTimeout(() => {
      loader.classList.remove('active');
      alert('Form submitted successfully!'); // Replace with actual submission logic
    }, 2000);
  });
}

document.querySelectorAll('#signup-form, #login-form').forEach(handleFormSubmission);

// Password Toggle
function togglePasswordVisibility(toggleId, inputId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);
  if (toggle && input) {
    toggle.addEventListener('click', () => {
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      toggle.classList.toggle('fa-eye');
      toggle.classList.toggle('fa-eye-slash');
    });
  }
}

togglePasswordVisibility('toggle-signup-password', 'password');
togglePasswordVisibility('toggle-login-password', 'password');

// Chat Widget Toggle (Placeholder)
const chatWidget = document.querySelector('.chat-widget');
chatWidget.addEventListener('click', () => {
  alert('Live chat coming soon!');
});

// Preview Button Functionality
document.querySelectorAll('.preview-btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('Game preview coming soon!');
  });
});