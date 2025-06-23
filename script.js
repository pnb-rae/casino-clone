// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
      document.body.classList.toggle('menu-open');
    });
    }
  });

  // Theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('light');
      localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
      themeIcon.classList.toggle('fa-moon');
      themeIcon.classList.toggle('fa-sun');
    });
    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.add('light');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  // Initialize Swiper
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  // Live players count animation
  function animatePlayerCount(element) {
    const min = parseInt(element.dataset.min);
    const max = parseInt(element.dataset.max);
    let current = parseInt(element.dataset.current) || min;
    const playerNumber = element.querySelector('.player-number');
    
    if (!playerNumber) {
      console.error('Player number element not found in:', element);
      return;
    }

    function updateCount() {
      const change = Math.floor(Math.random() * 5) - 2; // Smaller changes for realism
      current = Math.max(min, Math.min(max, current + change));
      playerNumber.textContent = current;
      element.dataset.current = current;
    }

    updateCount();
    setInterval(updateCount, 3000);
  }

  document.querySelectorAll('.players-count').forEach(animatePlayerCount);

  // Game search with debounce
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const gameSearch = document.getElementById('game-search');
  if (gameSearch) {
    gameSearch.addEventListener('input', debounce((e) => {
      const query = e.target.value.toLowerCase();
      const gameCards = document.querySelectorAll('.live-game-card, .category-card');
      gameCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
      });
    }, 300));
  }

  // Countdown timer for promotions
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
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  document.querySelectorAll('.countdown').forEach(startCountdown);

  // Form submission with loader and validation
  function handleFormSubmission(form) {
    if (!form) return;
    const loader = document.querySelector('.loader');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      loader.classList.add('active');
      
      if (form.id === 'signup-form') {
        const username = form.querySelector('input[name="username"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const password = form.querySelector('input[name="password"]').value;
        const terms = form.querySelector('input[name="terms"]').checked;

        if (!username || !email || !password || !terms) {
          alert('Please fill in all fields and agree to the terms.');
          loader.classList.remove('active');
          return;
        }
        if (!email.includes('@')) {
          alert('Please enter a valid email.');
          loader.classList.remove('active');
          return;
        }
        if (!/^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
          alert('Password must be at least 8 characters, including a number and symbol.');
          loader.classList.remove('active');
          return;
        }
      } else if (form.id === 'login-form') {
        const email = form.querySelector('input[name="email"]').value;
        const password = form.querySelector('input[name="password"]').value;

        if (!email || !password) {
          alert('Please fill in all fields.');
          loader.classList.remove('active');
          return;
        }
        if (!email.includes('@')) {
          alert('Please enter a valid email.');
          loader.classList.remove('active');
          return;
        }
      }

      setTimeout(() => {
        loader.classList.remove('active');
        alert('Form submitted successfully!');
      }, 2000);
    });
  }

  document.querySelectorAll('#signup-form, #login-form').forEach(handleFormSubmission);

  // Password toggle
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

  // Chat widget
  const chatWidget = document.querySelector('.chat-widget');
  if (chatWidget) {
    chatWidget.addEventListener('click', () => {
      alert('Live chat coming soon!');
    });
  }

  // Preview button
  document.querySelectorAll('.preview-btn').forEach(button => {
    button.addEventListener('click', () => {
      alert('Game preview coming soon!');
    });
  });

  // Hero tagline animation
  const taglines = [
    "Win Big Today!",
    "Exclusive Bonuses Await!",
    "Join the Fun!"
  ];
  let taglineIndex = 0;
  const taglineElement = document.querySelector('.hero p');
  if (taglineElement) {
    function changeTagline() {
      taglineElement.textContent = taglines[taglineIndex];
      taglineIndex = (taglineIndex + 1) % taglines.length;
    }
    changeTagline();
    setInterval(changeTagline, 5000);
  }