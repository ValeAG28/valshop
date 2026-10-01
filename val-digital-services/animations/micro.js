// VAL Shop — Micro-Interactions Library
// Reusable 60fps interactions using transform/opacity only

(() => {
  'use strict';

  const { reducedMotion, animate } = window.VAL_MOTION || { reducedMotion: false, animate: (el, k, o) => el.animate(k, o) };

  const easings = {
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  // Button ripple effect
  function createRipple(button, event) {
    if (reducedMotion) return;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${event.clientX - rect.left - size / 2}px;
      top: ${event.clientY - rect.top - size / 2}px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      z-index: 1;
    `;
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    animate(ripple, [
      { transform: 'scale(0)', opacity: 0.5 },
      { transform: 'scale(2.5)', opacity: 0 }
    ], { duration: 400, easing: easings.easeOut }).finished.then(() => ripple.remove());
  }

  // Add ripple to all buttons with .btn-ripple class
  function initRippleButtons() {
    document.querySelectorAll('.btn-ripple, .add-to-cart, .qv-btn, #applyCoupon, #checkoutBtn').forEach(btn => {
      btn.addEventListener('click', (e) => createRipple(btn, e));
    });
  }

  // Badge pulse animation
  function pulseBadge(badge) {
    if (reducedMotion) return;
    animate(badge, [
      { transform: 'scale(1)' },
      { transform: 'scale(1.15)' },
      { transform: 'scale(1)' }
    ], { duration: 1500, iterations: Infinity, easing: easings.smooth });
  }

  // Initialize badge pulses
  function initBadgePulses() {
    document.querySelectorAll('.badge-pulse, [class*="Best Seller"], [class*="Premium"], [class*="AI"], [class*="Offer"], [class*="Promo"]').forEach(el => {
      if (el.textContent.trim()) pulseBadge(el);
    });
  }

  // Card hover lift (transform only)
  function initCardLift() {
    if (reducedMotion) return;
    document.querySelectorAll('.card-lift, .glass').forEach(card => {
      let rafId;
      card.addEventListener('mouseenter', () => {
        cancelAnimationFrame(rafId);
        animate(card, [
          { transform: 'translateY(0) scale(1)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' },
          { transform: 'translateY(-8px) scale(1.02)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }
        ], { duration: 300, easing: easings.smooth, fill: 'forwards' });
      });
      card.addEventListener('mouseleave', () => {
        animate(card, [
          { transform: 'translateY(-8px) scale(1.02)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' },
          { transform: 'translateY(0) scale(1)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }
        ], { duration: 400, easing: easings.spring, fill: 'forwards' });
      });
    });
  }

  // Cart badge bounce
  function bounceCartBadge() {
    if (reducedMotion) return;
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    animate(badge, [
      { transform: 'scale(1)' },
      { transform: 'scale(1.4)' },
      { transform: 'scale(0.9)' },
      { transform: 'scale(1.1)' },
      { transform: 'scale(1)' }
    ], { duration: 600, easing: easings.spring });
  }

  // Toast slide in/out
  function showToast(element) {
    if (reducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
      return;
    }
    animate(element, [
      { transform: 'translateX(100%)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ], { duration: 300, easing: easings.smooth, fill: 'forwards' });
  }

  function hideToast(element) {
    if (reducedMotion) {
      element.remove();
      return Promise.resolve();
    }
    return animate(element, [
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(100%)', opacity: 0 }
    ], { duration: 200, easing: easings.sharp, fill: 'forwards' }).finished;
  }

  // Staggered entrance for lists
  function staggerEntrance(elements, baseDelay = 50) {
    if (reducedMotion) {
      elements.forEach(el => el.style.opacity = '1');
      return;
    }
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        animate(el, [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 400, easing: easings.smooth, fill: 'forwards' });
      }, i * baseDelay);
    });
  }

  // Drawer/panel slide
  function slidePanel(panel, open) {
    if (reducedMotion) {
      panel.style.transform = open ? 'translateX(0)' : 'translateX(100%)';
      return Promise.resolve();
    }
    return animate(panel, [
      { transform: open ? 'translateX(100%)' : 'translateX(0)' },
      { transform: open ? 'translateX(0)' : 'translateX(100%)' }
    ], { duration: 300, easing: open ? easings.smooth : easings.sharp, fill: 'forwards' }).finished;
  }

  // Fade backdrop
  function fadeBackdrop(backdrop, show) {
    if (reducedMotion) {
      backdrop.style.opacity = show ? '1' : '0';
      return Promise.resolve();
    }
    return animate(backdrop, [
      { opacity: show ? 0 : 1 },
      { opacity: show ? 1 : 0 }
    ], { duration: 200, easing: easings.smooth, fill: 'forwards' }).finished;
  }

  // Scale modal
  function scaleModal(modal, open) {
    if (reducedMotion) {
      modal.style.opacity = open ? '1' : '0';
      modal.style.transform = open ? 'scale(1)' : 'scale(0.95)';
      return Promise.resolve();
    }
    return animate(modal, [
      { opacity: open ? 0 : 1, transform: open ? 'scale(0.95)' : 'scale(1)' },
      { opacity: open ? 1 : 0, transform: open ? 'scale(1)' : 'scale(0.95)' }
    ], { duration: 200, easing: open ? easings.smooth : easings.sharp, fill: 'forwards' }).finished;
  }

  // Input focus glow
  function initInputGlow() {
    if (reducedMotion) return;
    document.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('focus', () => {
        animate(input, [
          { boxShadow: '0 0 0 0 rgba(212,160,23,0)' },
          { boxShadow: '0 0 0 4px rgba(212,160,23,0.3)' }
        ], { duration: 200, easing: easings.easeOut, fill: 'forwards' });
      });
      input.addEventListener('blur', () => {
        animate(input, [
          { boxShadow: '0 0 0 4px rgba(212,160,23,0.3)' },
          { boxShadow: '0 0 0 0 rgba(212,160,23,0)' }
        ], { duration: 300, easing: easings.easeOut, fill: 'forwards' });
      });
    });
  }

  // Category pill morph
  function initPillMorph() {
    if (reducedMotion) return;
    document.querySelectorAll('#categoryFilters button').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        animate(btn, [
          { borderRadius: '9999px' },
          { borderRadius: '12px' }
        ], { duration: 200, easing: easings.smooth, fill: 'forwards' });
      });
      btn.addEventListener('mouseleave', () => {
        animate(btn, [
          { borderRadius: '12px' },
          { borderRadius: '9999px' }
        ], { duration: 300, easing: easings.spring, fill: 'forwards' });
      });
    });
  }

  // Initialize all micro-interactions
  function init() {
    initRippleButtons();
    initBadgePulses();
    initCardLift();
    initInputGlow();
    initPillMorph();

    // Re-init on dynamic content
    const observer = new MutationObserver(() => {
      initRippleButtons();
      initBadgePulses();
      initCardLift();
      initPillMorph();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for manual use
  window.VAL_MICRO = {
    bounceCartBadge,
    showToast,
    hideToast,
    staggerEntrance,
    slidePanel,
    fadeBackdrop,
    scaleModal,
    pulseBadge
  };
})();