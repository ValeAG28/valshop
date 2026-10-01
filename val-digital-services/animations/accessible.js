// VAL Shop — Accessible Animation Wrapper
// Respects prefers-reduced-motion globally

(() => {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = prefersReduced.matches;

  prefersReduced.addEventListener('change', (e) => {
    reducedMotion = e.matches;
    document.documentElement.classList.toggle('reduce-motion', reducedMotion);
  });

  document.documentElement.classList.toggle('reduce-motion', reducedMotion);

  window.VAL_MOTION = {
    reducedMotion,
    prefersReduced,
    animate: (element, keyframes, options = {}) => {
      if (reducedMotion) {
        return Promise.resolve({ finished: Promise.resolve() });
      }
      return element.animate(keyframes, options);
    },
    gsap: (callback) => {
      if (reducedMotion) {
        callback({ kill: () => {}, play: () => {}, pause: () => {}, progress: () => 1 });
        return;
      }
      if (window.gsap) {
        callback(window.gsap);
      } else {
        console.warn('GSAP not loaded');
      }
    }
  };
})();