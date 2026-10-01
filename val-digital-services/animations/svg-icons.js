// VAL Shop — SVG Icon Animations
// Category icon hover animations, star ratings, checkmarks

(() => {
  'use strict';

  const { reducedMotion } = window.VAL_MOTION || { reducedMotion: false };

  // Animate SVG stroke draw-on
  function drawStroke(svg, duration = 800) {
    if (reducedMotion) return;
    const paths = svg.querySelectorAll('path, line, polyline, polygon, circle, rect');
    paths.forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.strokeWidth = path.style.strokeWidth || '2';
      path.animate([
        { strokeDashoffset: length, opacity: 0.5 },
        { strokeDashoffset: 0, opacity: 1 }
      ], { duration, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
    });
  }

  // Category icon hover animations
  function initCategoryIcons() {
    if (reducedMotion) return;

    const iconAnimations = {
      'tv': (svg) => { // Streaming
        const paths = svg.querySelectorAll('path');
        paths.forEach((path, i) => {
          path.style.transformOrigin = 'center';
          path.animate([
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(5deg) scale(1.1)' },
            { transform: 'rotate(-5deg) scale(1.1)' },
            { transform: 'rotate(0deg) scale(1)' }
          ], { duration: 800, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', iterations: 1 });
        });
      },
      'music-2': (svg) => { // Music
        const paths = svg.querySelectorAll('path');
        paths.forEach((path, i) => {
          path.animate([
            { transform: 'translateY(0)' },
            { transform: `translateY(-${5 + i * 2}px)` },
            { transform: 'translateY(0)' }
          ], { duration: 600, delay: i * 50, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
        });
      },
      'sparkles': (svg) => { // AI
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => {
          path.style.transformOrigin = 'center';
          path.animate([
            { transform: 'scale(1) rotate(0deg)', opacity: 1 },
            { transform: 'scale(1.2) rotate(180deg)', opacity: 0.7 },
            { transform: 'scale(1) rotate(360deg)', opacity: 1 }
          ], { duration: 1000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
        });
      },
      'palette': (svg) => { // Editing
        const paths = svg.querySelectorAll('path');
        paths.forEach((path, i) => {
          path.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(15deg)' },
            { transform: 'rotate(-15deg)' },
            { transform: 'rotate(0deg)' }
          ], { duration: 800, delay: i * 100, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
        });
      },
      'gamepad-2': (svg) => { // Gaming
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => {
          path.style.transformOrigin = 'center';
          path.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.15)' },
            { transform: 'scale(1)' }
          ], { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
        });
      },
      'shield': (svg) => { // VPN
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => {
          path.animate([
            { strokeWidth: '2' },
            { strokeWidth: '4' },
            { strokeWidth: '2' }
          ], { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
        });
      },
      'mail': (svg) => { // Email
        const paths = svg.querySelectorAll('path');
        paths.forEach((path, i) => {
          if (i === 0) { // Envelope
            path.animate([
              { transform: 'translateX(0)' },
              { transform: 'translateX(3px)' },
              { transform: 'translateX(-3px)' },
              { transform: 'translateX(0)' }
            ], { duration: 500, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
          } else { // Letter flap
            path.style.transformOrigin = 'top center';
            path.animate([
              { transform: 'rotateX(0deg)' },
              { transform: 'rotateX(-30deg)' },
              { transform: 'rotateX(0deg)' }
            ], { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
          }
        });
      },
      'link-2': (svg) => { // Links & Promos
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => {
          path.style.transformOrigin = 'center';
          path.animate([
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(10deg) scale(1.1)' },
            { transform: 'rotate(-10deg) scale(1.1)' },
            { transform: 'rotate(0deg) scale(1)' }
          ], { duration: 800, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
        });
      },
      'layout-grid': (svg) => { // All
        const paths = svg.querySelectorAll('path, rect');
        paths.forEach((path, i) => {
          path.animate([
            { opacity: 0.5, transform: 'scale(0.9)' },
            { opacity: 1, transform: 'scale(1.05)' },
            { opacity: 0.5, transform: 'scale(0.9)' }
          ], { duration: 1000, delay: i * 100, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
        });
      }
    };

    // Attach to category pills
    document.querySelectorAll('#categoryFilters button').forEach(btn => {
      const svg = btn.querySelector('svg');
      const iconName = btn.querySelector('[data-lucide]')?.getAttribute('data-lucide');
      if (!svg || !iconName || !iconAnimations[iconName]) return;

      let animating = false;
      btn.addEventListener('mouseenter', () => {
        if (animating) return;
        animating = true;
        iconAnimations[iconName](svg);
        setTimeout(() => animating = false, 1000);
      });
    });
  }

  // Star rating animation
  function initStarRatings() {
    if (reducedMotion) return;

    document.querySelectorAll('[data-lucide="star"]').forEach(star => {
      if (star.classList.contains('fill-yellow-400') || star.style.fill === 'rgb(251, 191, 36)') {
        star.style.transformOrigin = 'center';
        star.animate([
          { transform: 'scale(1) rotate(0deg)' },
          { transform: 'scale(1.2) rotate(10deg)' },
          { transform: 'scale(1) rotate(0deg)' }
        ], { duration: 600, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
      }
    });
  }

  // Checkmark draw-on for benefits
  function initCheckmarks() {
    if (reducedMotion) return;

    document.querySelectorAll('[data-lucide="check"]').forEach(check => {
      const path = check.querySelector('path') || check;
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.strokeWidth = '2.5';
      path.animate([
        { strokeDashoffset: length, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1 }
      ], { duration: 400, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
    });
  }

  // Heart/favorite animation
  function initFavorites() {
    if (reducedMotion) return;

    document.querySelectorAll('[data-lucide="heart"]').forEach(heart => {
      heart.addEventListener('click', (e) => {
        e.preventDefault();
        heart.style.transformOrigin = 'center';
        heart.animate([
          { transform: 'scale(1)', fill: 'none', stroke: 'currentColor' },
          { transform: 'scale(1.4)', fill: 'currentColor', stroke: 'currentColor' },
          { transform: 'scale(1)', fill: 'currentColor', stroke: 'currentColor' }
        ], { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
      });
    });
  }

  // Cart icon bounce on add
  function animateCartIcon() {
    if (reducedMotion) return;
    const cartBtn = document.getElementById('cartButton');
    const cartIcon = cartBtn?.querySelector('svg') || cartBtn?.firstElementChild;
    if (!cartIcon) return;

    cartIcon.animate([
      { transform: 'scale(1) rotate(0deg)' },
      { transform: 'scale(1.3) rotate(-10deg)' },
      { transform: 'scale(0.9) rotate(5deg)' },
      { transform: 'scale(1.1) rotate(-3deg)' },
      { transform: 'scale(1) rotate(0deg)' }
    ], { duration: 600, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
  }

  // WhatsApp float pulse
  function initWhatsAppFloat() {
    if (reducedMotion) return;
    const waBtn = document.getElementById('whatsappFloat');
    if (!waBtn) return;

    const pulse = waBtn.animate([
      { boxShadow: '0 8px 24px rgba(37,211,102,0.35)' },
      { boxShadow: '0 12px 32px rgba(37,211,102,0.5), 0 0 0 8px rgba(37,211,102,0.1)' },
      { boxShadow: '0 8px 24px rgba(37,211,102,0.35)' }
    ], {
      duration: 2000,
      easing: 'ease-in-out',
      iterations: Infinity
    });

    waBtn.addEventListener('mouseenter', () => {
      pulse.pause();
      waBtn.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' }
      ], { duration: 200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
    });

    waBtn.addEventListener('mouseleave', () => {
      pulse.play();
      waBtn.animate([
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' }
      ], { duration: 300, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
    });
  }

  // Initialize all SVG animations
  function init() {
    initCategoryIcons();
    initStarRatings();
    initCheckmarks();
    initFavorites();
    initWhatsAppFloat();

    // Re-init on dynamic content
    const observer = new MutationObserver(() => {
      initCategoryIcons();
      initStarRatings();
      initCheckmarks();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for manual use
  window.VAL_SVG = {
    drawStroke,
    animateCartIcon,
    initCategoryIcons,
    initStarRatings,
    initCheckmarks
  };
})();