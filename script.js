document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ==========================================================================
     THEME SWITCHER LOGIC
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve theme preference from localStorage or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  });

  /* ==========================================================================
     MOBILE NAVIGATION LOGIC
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    // Change menu icon to close icon if open
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileNav.classList.contains('open')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });

  // Close mobile nav when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      const icon = mobileMenuBtn.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  /* ==========================================================================
     SCROLL ACTIVE SECTIONS OBSERVER
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the mid-section
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  /* ==========================================================================
     CONTACT FORM HANDLING
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const successOverlay = document.getElementById('form-success');
  const resetFormBtn = document.getElementById('reset-form-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Visual feedback: loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message... <i data-lucide="loader" class="animate-spin"></i>';
      lucide.createIcons();
      
      // Simulate API submit delay
      setTimeout(() => {
        // Reset submit button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        lucide.createIcons();
        
        // Show success screen and clear input fields
        successOverlay.classList.add('visible');
        contactForm.reset();
      }, 1500);
    });
  }

  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      successOverlay.classList.remove('visible');
    });
  }
});
