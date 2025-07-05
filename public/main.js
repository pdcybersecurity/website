// ==================
// PDC Landing JS
// ==================

// Elegant Preloader Fade Out (robust, handles slow/fast loads, accessibility)
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Helper: Fade and remove preloader
  function fadeOutPreloader() {
    if (!preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1200); // matches CSS transition
    }
  }

  // Fade out after window fully loaded, with fallback timeout
  window.addEventListener('load', () => {
    setTimeout(fadeOutPreloader, 650);
  });

  // Fallback: If images/fonts/etc. never load, ensure preloader vanishes
  setTimeout(fadeOutPreloader, 3500);

  // Accessibility: allow ESC key to skip preloader
  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") fadeOutPreloader();
  });
})();

// ------------------------------
// Smooth Parallax Effect (Hero)
// ------------------------------
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Only apply on desktop-like screens
  function parallaxHandler() {
    if (window.innerWidth < 900) {
      hero.style.backgroundPosition = '';
      return;
    }
    const scrolled = window.scrollY;
    hero.style.backgroundPosition = `center ${Math.round(scrolled * 0.28)}px`;
  }

  window.addEventListener('scroll', parallaxHandler);
  window.addEventListener('resize', parallaxHandler);
  parallaxHandler();
})();

// ------------------------------
// Animated Service Blocks on Scroll
// ------------------------------
(function () {
  const serviceBlocks = document.querySelectorAll('.service-block');
  if (serviceBlocks.length === 0) return;

  function revealOnScroll() {
    const trigger = window.innerHeight * 0.92;
    serviceBlocks.forEach(block => {
      const rect = block.getBoundingClientRect();
      if (rect.top < trigger) {
        block.classList.add('in-view');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('resize', revealOnScroll);
  // Initial run
  revealOnScroll();
})();

// ------------------------------
// Floating WhatsApp Button Pulse
// ------------------------------
(function () {
  const floatBtn = document.querySelector('.floating-btn');
  if (!floatBtn) return;
  let pulse;
  function pulseEffect() {
    floatBtn.animate([
      { boxShadow: '0 8px 28px #2196f388' },
      { boxShadow: '0 0px 38px #2196f3cc', transform: 'scale(1.09)' },
      { boxShadow: '0 8px 28px #2196f388', transform: 'scale(1.00)' }
    ], {
      duration: 1700,
      iterations: Infinity
    });
  }
  pulseEffect();
})();

// ------------------------------
// Smooth Scroll for Internal Links (optional, if anchors used)
// ------------------------------
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();

// ------------------------------
// Helper: Touch-friendly hover for service blocks on mobile
// ------------------------------
(function () {
  // On touch devices, toggle 'hover' class on tap
  if ('ontouchstart' in window) {
    document.querySelectorAll('.service-block').forEach(block => {
      block.addEventListener('touchstart', function () {
        this.classList.add('hover');
      });
      block.addEventListener('touchend', function () {
        setTimeout(() => this.classList.remove('hover'), 300);
      });
    });
  }
})();
