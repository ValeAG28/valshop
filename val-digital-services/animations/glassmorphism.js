// VAL Shop — Glassmorphism Animated Specular Sweeps
// Apple "Liquid Glass" style animated highlights on .glass cards

(() => {
  'use strict';

  const { reducedMotion } = window.VAL_MOTION || { reducedMotion: false };

  if (reducedMotion) return;

  // Create specular sweep element
  function createSweep(card) {
    const sweep = document.createElement('div');
    sweep.className = 'glass-sweep';
    sweep.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(
        135deg,
        transparent 0%,
        rgba(255,255,255,0.08) 40%,
        rgba(255,255,255,0.15) 50%,
        rgba(255,255,255,0.08) 60%,
        transparent 100%
      );
      background-size: 200% 200%;
      opacity: 0;
      pointer-events: none;
      z-index: 1;
    `;
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(sweep);
    return sweep;
  }

  // Animate sweep across card
  function animateSweep(card) {
    const sweep = card.querySelector('.glass-sweep') || createSweep(card);
    
    sweep.style.opacity = '1';
    sweep.style.backgroundPosition = '-100% -100%';
    
    const animation = sweep.animate([
      { backgroundPosition: '-100% -100%', opacity: 0 },
      { backgroundPosition: '0% 0%', opacity: 1, offset: 0.3 },
      { backgroundPosition: '100% 100%', opacity: 0.5, offset: 0.6 },
      { backgroundPosition: '200% 200%', opacity: 0 }
    ], {
      duration: 1200,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    });

    animation.finished.then(() => {
      sweep.style.opacity = '0';
    });
  }

  // Initialize on all .glass cards
  function initGlassCards() {
    const cards = document.querySelectorAll('.glass:not([data-glass-init])');
    
    cards.forEach(card => {
      card.dataset.glassInit = 'true';
      
      // Entrance animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px) scale(0.98)';
      
      requestAnimationFrame(() => {
        card.animate([
          { opacity: 0, transform: 'translateY(20px) scale(0.98)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' }
        ], {
          duration: 500,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        });
      });

      // Hover sweep
      let sweepTimeout;
      card.addEventListener('mouseenter', () => {
        clearTimeout(sweepTimeout);
        animateSweep(card);
      });

      // Periodic sweep (every 8-12s) for ambient motion
      const ambientInterval = setInterval(() => {
        if (document.visibilityState === 'visible' && !card.matches(':hover')) {
          animateSweep(card);
        }
      }, 8000 + Math.random() * 4000);

      // Cleanup on remove
      const observer = new MutationObserver(() => {
        if (!document.body.contains(card)) {
          clearInterval(ambientInterval);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  // Reduced transparency fallback
  const mediaQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');
  function handleTransparencyChange(e) {
    document.documentElement.classList.toggle('reduced-transparency', e.matches);
  }
  mediaQuery.addEventListener('change', handleTransparencyChange);
  handleTransparencyChange(mediaQuery);

  // Initialize
  function init() {
    initGlassCards();

    // Re-init on dynamic content
    const observer = new MutationObserver(() => {
      initGlassCards();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();