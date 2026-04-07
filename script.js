/* ============================================================
   GODA BRIDGE LP — script.js
   Intersection Observer / Count-up / Tabs / Carousel / CTA Bar
============================================================ */

'use strict';

/* ── Scroll Animation (Intersection Observer) ─────────────── */
(function initFadeUp() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();


/* ── Count-up Animation ──────────────────────────────────── */
(function initCountUp() {
  const counters = document.querySelectorAll('.hook__num[data-target]');
  if (!counters.length) return;

  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease-in-out

  const formatNum = (val, suffix, divisor) => {
    if (divisor) {
      // e.g. 8,600,000 → 860万
      const divided = val / divisor;
      return Math.floor(divided).toLocaleString('ja-JP') + suffix;
    }
    return Math.floor(val).toLocaleString('ja-JP') + suffix;
  };

  const animateCounter = (el) => {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix  || '';
    const divisor  = el.dataset.divisor ? parseFloat(el.dataset.divisor) : null;
    const duration = 1400; // ms
    let startTime  = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current  = target * ease(progress);

      el.textContent = formatNum(current, suffix, divisor);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNum(target, suffix, divisor);
      }
    };

    requestAnimationFrame(step);
  };

  // Trigger when #hook enters viewport
  const hookObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach((el, i) => {
          setTimeout(() => animateCounter(el), i * 120);
        });
        hookObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const hookSection = document.getElementById('hook');
  if (hookSection) hookObserver.observe(hookSection);
})();


/* ── Activity Tab Switching ──────────────────────────────── */
(function initTabs() {
  const tabs   = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.activity-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tabs
      tabs.forEach(t => {
        t.classList.remove('tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('tab--active');
      tab.setAttribute('aria-selected', 'true');

      // Update panels
      panels.forEach(panel => {
        panel.classList.remove('activity-panel--active');
        panel.style.display = 'none';
      });

      const activePanel = document.getElementById('panel-' + target);
      if (activePanel) {
        activePanel.style.display = '';
        // Trigger reflow for animation
        void activePanel.offsetWidth;
        activePanel.classList.add('activity-panel--active');
      }
    });
  });
})();


/* ── Review Carousel ─────────────────────────────────────── */
(function initCarousel() {
  const track  = document.getElementById('reviewsTrack');
  const dots   = document.querySelectorAll('.dot');
  if (!track || !dots.length) return;

  const cards  = track.querySelectorAll('.review-card');
  let current  = 0;
  let autoTimer = null;
  let startX   = 0;

  const goTo = (index) => {
    current = (index + cards.length) % cards.length;
    track.style.transform = `translateX(calc(${-current * 100}% - ${current}rem))`;
    dots.forEach((d, i) => d.classList.toggle('dot--active', i === current));
  };

  // Dot click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      resetAuto();
    });
  });

  // Auto slide
  const startAuto = () => {
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  };
  const resetAuto = () => {
    clearInterval(autoTimer);
    startAuto();
  };

  // Touch swipe
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    clearInterval(autoTimer);
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
    startAuto();
  }, { passive: true });

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.parentElement.addEventListener('mouseleave', startAuto);

  startAuto();
})();


/* ── Fixed CTA Bar ───────────────────────────────────────── */
(function initCtaBar() {
  const bar     = document.getElementById('ctaBar');
  const booking = document.getElementById('booking');
  if (!bar || !booking) return;

  // Show bar after 100px scroll; hide when #booking is visible
  const bookingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bar.classList.add('is-hidden');
        bar.classList.remove('is-visible');
        bar.setAttribute('aria-hidden', 'true');
      } else if (window.scrollY > 100) {
        bar.classList.remove('is-hidden');
        bar.classList.add('is-visible');
        bar.setAttribute('aria-hidden', 'false');
      }
    });
  }, { threshold: 0.1 });

  bookingObserver.observe(booking);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100 && !bar.classList.contains('is-hidden')) {
      bar.classList.add('is-visible');
      bar.setAttribute('aria-hidden', 'false');
    } else if (window.scrollY <= 100) {
      bar.classList.remove('is-visible');
      bar.setAttribute('aria-hidden', 'true');
    }
  }, { passive: true });
})();


/* ── Hero scroll hint fade-out ───────────────────────────── */
(function initScrollHint() {
  const hint = document.querySelector('.hero__scroll');
  if (!hint) return;

  window.addEventListener('scroll', () => {
    const opacity = Math.max(0, 1 - window.scrollY / 200);
    hint.style.opacity = opacity;
  }, { passive: true });
})();


/* ── iOS Parallax workaround (experience section) ────────── */
(function initParallax() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (!isIOS) return;

  const bg = document.querySelector('.experience__bg');
  if (!bg) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bg.style.transform = `translateY(${y * 0.25}px)`;
  }, { passive: true });
})();
