/* ============================================================
   GRAVITATE OSAKA — SNS LP
   main.js
   ============================================================ */

'use strict';

/* ── Hero Slideshow ─────────────────────────────── */
(function initSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let timer   = null;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }

  function start() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  // dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); start(); });
  });

  // init
  slides[0].classList.add('active');
  dots[0]?.classList.add('active');
  start();
})();


/* ── Scroll Reveal ──────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -36px 0px' });

  els.forEach(el => obs.observe(el));
})();


/* ── Counter Animation ──────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const val      = target * easeOut(progress);
      el.textContent = (decimals ? val.toFixed(decimals) : Math.floor(val)).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
})();


/* ── Sticky CTA ─────────────────────────────────── */
(function initStickyBar() {
  const hero = document.getElementById('hero');
  const bar  = document.getElementById('stickyBar');
  if (!hero || !bar) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      bar.classList.toggle('visible', !e.isIntersecting);
    });
  }, { threshold: 0.05 });

  obs.observe(hero);
})();


/* ── Smooth Anchor Scroll ───────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


/* ── Parallax Hero ──────────────────────────────── */
(function initParallax() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      slides.forEach(s => {
        s.style.transform = `translateY(${y * 0.35}px) scale(1.06)`;
      });
      ticking = false;
    });
  }, { passive: true });
})();


/* ── Activity card touch support ────────────────── */
(function initActCards() {
  const cards = document.querySelectorAll('.act-card');
  cards.forEach(card => {
    card.addEventListener('touchstart', () => card.classList.add('touch'), { passive: true });
    card.addEventListener('touchend',   () => setTimeout(() => card.classList.remove('touch'), 500));
  });
})();
