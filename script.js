/**
 * PRIME REAL ESTATE — script.js
 * Bilingual (AR/EN) Real Estate Website
 * Features: Language Toggle, Search, Filter, Slider, Counters, Form Validation, Animations
 */

(function () {
  'use strict';

  /* ============================================================
     1. LANGUAGE TOGGLE (AR ↔ EN)
  ============================================================ */
  let currentLang = 'ar';

  const langToggleBtn = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');

  function applyLanguage(lang) {
    currentLang = lang;
    const isAr = lang === 'ar';

    // Direction & font
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.body.classList.toggle('ltr', !isAr);

    // Label
    langLabel.textContent = isAr ? 'EN' : 'عر';

    // Translate all data-ar / data-en elements
    document.querySelectorAll('[data-ar]').forEach(el => {
      const val = isAr ? el.dataset.ar : el.dataset.en;
      if (!val) return;

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        // skip content change for inputs
      } else if (el.tagName === 'OPTION') {
        el.textContent = val;
      } else if (el.tagName === 'META') {
        el.content = val;
      } else {
        el.textContent = val;
      }
    });

    // Placeholder updates
    document.querySelectorAll('[data-ph-ar]').forEach(el => {
      el.placeholder = isAr ? el.dataset.phAr : el.dataset.phEn;
    });

    // Page title
    document.title = isAr
      ? 'برايم للعقارات | Prime Real Estate'
      : 'Prime Real Estate | برايم للعقارات';

    // Save preference
    try { localStorage.setItem('prime_lang', lang); } catch(e) {}
  }

  langToggleBtn.addEventListener('click', () => {
    applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
  });

  // Load saved preference
  try {
    const saved = localStorage.getItem('prime_lang');
    if (saved && saved !== 'ar') applyLanguage(saved);
  } catch(e) {}

  /* ============================================================
     2. HEADER SCROLL EFFECT
  ============================================================ */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ============================================================
     3. MOBILE MENU TOGGLE
  ============================================================ */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* ============================================================
     4. ACTIVE NAV LINK ON SCROLL
  ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.id;
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ============================================================
     5. SEARCH TABS
  ============================================================ */
  document.querySelectorAll('.stab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ============================================================
     6. PROPERTY SEARCH
  ============================================================ */
  const searchBtn = document.getElementById('searchBtn');
  const searchResult = document.getElementById('searchResult');

  searchBtn.addEventListener('click', () => {
    const city = document.getElementById('citySelect').value;
    const type = document.getElementById('typeSelect').value;
    const price = document.getElementById('priceSelect').value;
    const rooms = document.getElementById('roomsSelect').value;

    const activeTab = document.querySelector('.stab.active');
    const tabText = activeTab ? activeTab.textContent.trim() : '';

    // Build result message
    const parts = [];
    if (city) parts.push(city);
    if (type) parts.push(type);
    if (price) parts.push(price);
    if (rooms) parts.push(`${rooms} ${currentLang === 'ar' ? 'غرف' : 'Rooms'}`);

    const isAr = currentLang === 'ar';
    let msg;
    if (parts.length === 0) {
      msg = isAr
        ? '🔍 يتم عرض جميع العقارات المتاحة...'
        : '🔍 Showing all available properties...';
    } else {
      msg = isAr
        ? `🔍 البحث عن: ${parts.join(' · ')} (${tabText})`
        : `🔍 Searching for: ${parts.join(' · ')} (${tabText})`;
    }

    searchResult.textContent = msg;
    searchResult.classList.add('visible');

    // Animate properties section
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });

    // Simulate filter effect
    const cards = document.querySelectorAll('.prop-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0.4';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transition = 'opacity 0.3s ease';
      }, 100 + i * 80);
    });
  });

  /* ============================================================
     7. PROPERTY FILTER (Tabs)
  ============================================================ */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;
      document.querySelectorAll('.prop-card').forEach((card, i) => {
        const match = filter === 'all' || card.dataset.type === filter;
        if (match) {
          card.classList.remove('hidden');
          card.style.animationDelay = `${i * 0.08}s`;
          card.style.animation = 'fadeInUp 0.5s ease both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ============================================================
     8. FAVORITE TOGGLE
  ============================================================ */
  document.querySelectorAll('.prop-fav').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.toggle('active');
      this.textContent = this.classList.contains('active') ? '♥' : '♡';
      this.style.color = this.classList.contains('active') ? '#e74c3c' : '';
    });
  });

  /* ============================================================
     9. PROPERTY DETAIL BUTTON
  ============================================================ */
  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = this.closest('.prop-card');
      const name = card.querySelector('.prop-name').textContent;
      const price = card.querySelector('.price-num').textContent;
      const isAr = currentLang === 'ar';
      alert(isAr
        ? `📌 ${name}\n💰 السعر: ${price} ر.س\n\nسيتم التواصل معك قريباً لمزيد من التفاصيل.`
        : `📌 ${name}\n💰 Price: ${price} SAR\n\nOur team will contact you shortly for more details.`
      );
    });
  });

  /* ============================================================
     10. ANIMATED COUNTERS
  ============================================================ */
  let countersStarted = false;

  function animateCounter(el, target, duration = 2000) {
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    document.querySelectorAll('.counter-num').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target, 2200);
    });
  }

  /* ============================================================
     11. INTERSECTION OBSERVER (Reveal + Counters)
  ============================================================ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounters();
          counterObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  // Apply reveal to key sections
  const revealTargets = [
    '.prop-card', '.srv-card', '.testi-card',
    '.about-content', '.about-img-col',
    '.contact-info', '.contact-form',
    '.counter-item', '.section-header'
  ];
  revealTargets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.07}s`;
      revealObserver.observe(el);
    });
  });

  // Observe counters
  const countersStrip = document.querySelector('.counters-strip');
  if (countersStrip) counterObserver.observe(countersStrip);

  /* ============================================================
     12. TESTIMONIALS SLIDER
  ============================================================ */
  const track = document.getElementById('testiTrack');
  const dotsContainer = document.getElementById('testiDots');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  let currentSlide = 0;
  let slidesPerView = 3;
  let autoplayInterval;

  function getSlidesPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function getSlides() {
    return track.querySelectorAll('.testi-card');
  }

  function createDots() {
    const slides = getSlides();
    dotsContainer.innerHTML = '';
    const total = Math.ceil(slides.length - slidesPerView + 1);
    for (let i = 0; i < Math.max(total, 1); i++) {
      const dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    document.querySelectorAll('.testi-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function goToSlide(index) {
    const slides = getSlides();
    slidesPerView = getSlidesPerView();
    const maxSlide = Math.max(0, slides.length - slidesPerView);
    currentSlide = Math.max(0, Math.min(index, maxSlide));

    const cardWidth = track.querySelector('.testi-card').offsetWidth;
    const gap = 24;
    const offset = currentSlide * (cardWidth + gap);
    const isRTL = document.documentElement.dir === 'rtl';
    track.style.transform = `translateX(${isRTL ? offset : -offset}px)`;
    updateDots();
  }

  function nextSlide() {
    const slides = getSlides();
    slidesPerView = getSlidesPerView();
    const maxSlide = Math.max(0, slides.length - slidesPerView);
    goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
  }

  function prevSlide() {
    const slides = getSlides();
    slidesPerView = getSlidesPerView();
    const maxSlide = Math.max(0, slides.length - slidesPerView);
    goToSlide(currentSlide <= 0 ? maxSlide : currentSlide - 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4500);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  prevBtn.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });
  nextBtn.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    const isRTL = document.documentElement.dir === 'rtl';
    if (Math.abs(delta) > 50) {
      if ((delta < 0 && !isRTL) || (delta > 0 && isRTL)) nextSlide();
      else prevSlide();
    }
    startAutoplay();
  }, { passive: true });

  function initSlider() {
    slidesPerView = getSlidesPerView();
    createDots();
    goToSlide(0);
    startAutoplay();
  }

  initSlider();

  window.addEventListener('resize', () => {
    slidesPerView = getSlidesPerView();
    createDots();
    goToSlide(Math.min(currentSlide, getSlides().length - slidesPerView));
  });

  /* ============================================================
     13. CONTACT FORM VALIDATION
  ============================================================ */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function showError(fieldId, errorId, msgAr, msgEn) {
    const errEl = document.getElementById(errorId);
    if (errEl) {
      errEl.textContent = currentLang === 'ar' ? msgAr : msgEn;
      errEl.classList.add('visible');
      document.getElementById(fieldId).style.borderColor = '#c0392b';
    }
  }

  function clearError(fieldId, errorId) {
    const errEl = document.getElementById(errorId);
    if (errEl) {
      errEl.classList.remove('visible');
      const field = document.getElementById(fieldId);
      if (field) field.style.borderColor = '';
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    clearError('fname', 'fnameErr');
    clearError('femail', 'femailErr');
    clearError('fmsg', 'fmsgErr');

    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const msg = document.getElementById('fmsg').value.trim();

    if (name.length < 2) {
      showError('fname', 'fnameErr', 'يرجى إدخال الاسم الكامل (حرفين على الأقل)', 'Please enter your full name (at least 2 characters)');
      valid = false;
    }

    if (!validateEmail(email)) {
      showError('femail', 'femailErr', 'يرجى إدخال بريد إلكتروني صحيح', 'Please enter a valid email address');
      valid = false;
    }

    if (msg.length < 10) {
      showError('fmsg', 'fmsgErr', 'الرسالة قصيرة جداً (10 أحرف على الأقل)', 'Message is too short (at least 10 characters)');
      valid = false;
    }

    if (!valid) return;

    // Simulate submission
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = currentLang === 'ar' ? '⏳ جاري الإرسال...' : '⏳ Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      formSuccess.style.display = 'flex';
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 6000);
    }, 1500);
  });

  // Real-time validation clear on input
  ['fname', 'femail', 'fmsg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id, `${id}Err`));
  });

  /* ============================================================
     14. SMOOTH SCROLL (anchor links)
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-h') || '80');
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ============================================================
     15. BACK TO TOP
  ============================================================ */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============================================================
     16. HERO PARTICLES (subtle gold dots)
  ============================================================ */
  (function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.35';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const N = 40;
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,88,${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ============================================================
     17. SEARCH SECTION PARALLAX (subtle)
  ============================================================ */
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg .hero-img');
    if (hero) {
      hero.style.transform = `scale(1.07) translateY(${window.scrollY * 0.08}px)`;
    }
  }, { passive: true });

  /* ============================================================
     18. CURSOR GLOW EFFECT (desktop only)
  ============================================================ */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:fixed; width:24px; height:24px; border-radius:50%;
      background:radial-gradient(circle, rgba(184,149,42,0.35) 0%, transparent 70%);
      pointer-events:none; z-index:9999; transform:translate(-50%,-50%);
      transition:transform 0.1s ease, opacity 0.3s ease;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
      glow.style.transform = 'translate(-50%, -50%) scale(2)';
      glow.style.opacity = '0.8';
    });
    document.addEventListener('mouseup', () => {
      glow.style.transform = 'translate(-50%, -50%) scale(1)';
      glow.style.opacity = '1';
    });
  }

  console.log('%c◈ Prime Real Estate — Loaded Successfully', 'color:#B8952A; font-size:14px; font-weight:bold;');

})();
