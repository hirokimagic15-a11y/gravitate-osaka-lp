/* ============================================================
   GRAVITATE OSAKA — SNS LP  v2
   main.js
   ============================================================ */

'use strict';


/* ── Navigation: scroll-triggered background ────────────── */
(function initNav() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;

  const obs = new IntersectionObserver((entries) => {
    // When hero exits viewport, add scrolled class to nav
    entries.forEach(e => {
      nav.classList.toggle('scrolled', !e.isIntersecting);
    });
  }, { threshold: 0.3 });

  const hero = document.getElementById('hero');
  if (hero) obs.observe(hero);
})();


/* ── Hamburger / Mobile Drawer ──────────────────────────── */
(function initHamburger() {
  const btn    = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  if (!btn || !drawer) return;

  function open() {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    btn.classList.contains('open') ? close() : open();
  });

  // Close on drawer link click
  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
})();


/* ── Scroll Reveal ──────────────────────────────────────── */
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


/* ── Counter Animation: removed per design decision ────────
   Numbers display as static final values from initial render.
   Emphasis is achieved through size, color, and spacing.
   ─────────────────────────────────────────────────────────── */


/* ── Sticky CTA Bar ─────────────────────────────────────── */
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


/* ── Smooth Anchor Scroll ───────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navH = 60; // nav height offset
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();


/* ── Parallax Hero ──────────────────────────────────────── */
(function initParallax() {
  const bg = document.querySelector('.hero__bg');
  if (!bg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      bg.style.transform = `translateY(${y * 0.35}px) scale(1.06)`;
      ticking = false;
    });
  }, { passive: true });
})();


/* ── FAQ Accordion ──────────────────────────────────────── */
(function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle this item
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();


/* ── Activity card touch support ────────────────────────── */
(function initActCards() {
  const cards = document.querySelectorAll('.act-card');
  cards.forEach(card => {
    card.addEventListener('touchstart', () => card.classList.add('touch'), { passive: true });
    card.addEventListener('touchend',   () => setTimeout(() => card.classList.remove('touch'), 500));
  });
})();
