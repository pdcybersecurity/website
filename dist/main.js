// ==================
// PDC Landing JS - Enhanced Version
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
// Enhanced Parallax Effect (Hero)
// ------------------------------
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;

  function updateParallax() {
    if (window.innerWidth < 900) {
      hero.style.backgroundPosition = '';
      return;
    }
    
    const scrolled = window.scrollY;
    const rate = scrolled * -0.5;
    hero.style.backgroundPosition = `center ${rate}px`;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
  window.addEventListener('resize', updateParallax);
  updateParallax();
})();

// ------------------------------
// Enhanced Service Blocks Animation with Stagger
// ------------------------------
(function () {
  const serviceBlocks = document.querySelectorAll('.service-block');
  if (serviceBlocks.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, index * 100); // Stagger animation
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  serviceBlocks.forEach(block => {
    observer.observe(block);
  });
})();

// ------------------------------
// Enhanced Floating WhatsApp Button with Advanced Animation
// ------------------------------
(function () {
  const floatBtn = document.querySelector('.floating-btn');
  if (!floatBtn) return;

  // Add hover sound effect simulation
  floatBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(-5deg)';
  });

  floatBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
  });

  // Add click ripple effect
  floatBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
})();

// ------------------------------
// Smooth Scroll for Internal Links with Offset
// ------------------------------
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.topbar')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();

// ------------------------------
// Enhanced Touch Support for Service Blocks
// ------------------------------
(function () {
  if ('ontouchstart' in window) {
    document.querySelectorAll('.service-block').forEach(block => {
      let touchTimeout;
      
      block.addEventListener('touchstart', function (e) {
        clearTimeout(touchTimeout);
        this.classList.add('hover');
        
        // Prevent double-tap zoom on iOS
        e.preventDefault();
      });
      
      block.addEventListener('touchend', function () {
        touchTimeout = setTimeout(() => {
          this.classList.remove('hover');
        }, 300);
      });
      
      block.addEventListener('touchcancel', function () {
        clearTimeout(touchTimeout);
        this.classList.remove('hover');
      });
    });
  }
})();

// ------------------------------
// Dynamic Header Background on Scroll
// ------------------------------
(function () {
  const header = document.querySelector('.topbar');
  if (!header) return;

  let ticking = false;

  function updateHeader() {
    const scrolled = window.scrollY;
    const opacity = Math.min(scrolled / 100, 0.95);
    
    header.style.background = `rgba(10, 10, 10, ${opacity})`;
    header.style.backdropFilter = scrolled > 50 ? 'blur(20px)' : 'blur(10px)';
    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
  updateHeader();
})();

// ------------------------------
// Cursor Trail Effect (Desktop Only)
// ------------------------------
(function () {
  if (window.innerWidth < 768 || 'ontouchstart' in window) return;

  const trail = [];
  const trailLength = 20;

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: rgba(178, 187, 200, ${1 - i / trailLength});
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: all 0.1s ease;
    `;
    document.body.appendChild(dot);
    trail.push(dot);
  }

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    let x = mouseX, y = mouseY;

    trail.forEach((dot, index) => {
      const nextDot = trail[index + 1] || trail[0];
      
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      
      if (nextDot) {
        x += (parseFloat(nextDot.style.left) - x) * 0.3;
        y += (parseFloat(nextDot.style.top) - y) * 0.3;
      }
    });

    requestAnimationFrame(animateTrail);
  }

  animateTrail();
})();

// ------------------------------
// Performance Optimization: Debounced Resize Handler
// ------------------------------
(function () {
  let resizeTimeout;
  
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Trigger any resize-dependent functions
      window.dispatchEvent(new Event('optimizedResize'));
    }, 250);
  });
})();