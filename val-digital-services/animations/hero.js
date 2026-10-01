// VAL Shop — GSAP Hero Timeline
// Scroll-triggered hero animation with gold glow pulse

(() => {
  'use strict';

  const { reducedMotion, gsap } = window.VAL_MOTION || { reducedMotion: false, gsap: (cb) => {} };

  function initHero() {
    const heroSection = document.querySelector('section[class*="relative overflow-hidden bg-[#04060f]"]');
    if (!heroSection) return;

    const heroTitle = heroSection.querySelector('h1');
    const heroSubtitle = heroSection.querySelector('p');
    const heroCTAs = heroSection.querySelectorAll('.flex.flex-wrap.gap-3 a');
    const heroBadges = heroSection.querySelectorAll('.grid.grid-cols-2.lg\\:grid-cols-4 > div');
    const goldLogo = heroSection.querySelector('img[alt="VAL"]');
    const aiOrb = heroSection.querySelector('.absolute.right-6.top-2');
    const laptopMockup = heroSection.querySelector('.absolute.right-0.bottom-10');
    const controllerMockup = heroSection.querySelector('.absolute.left-10.bottom-6');
    const bottomIcons = heroSection.querySelector('.absolute.right-20.bottom-2');

    if (reducedMotion) {
      [heroTitle, heroSubtitle, ...heroCTAs, ...heroBadges, goldLogo, aiOrb, laptopMockup, controllerMockup, bottomIcons].forEach(el => {
        if (el) el.style.opacity = '1';
      });
      return;
    }

    gsap((gsap) => {
      if (!gsap || !gsap.timeline) return;

      // Register ScrollTrigger if available
      if (gsap.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: heroSection,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Initial states
      gsap.set([heroTitle, heroSubtitle, ...heroCTAs], { opacity: 0, y: 30 });
      gsap.set(heroBadges, { opacity: 0, y: 20 });
      gsap.set(goldLogo, { opacity: 0, scale: 0.8 });
      gsap.set(aiOrb, { opacity: 0, x: 50 });
      gsap.set(laptopMockup, { opacity: 0, x: 80, rotation: -5 });
      gsap.set(controllerMockup, { opacity: 0, y: 50, rotation: 10 });
      gsap.set(bottomIcons, { opacity: 0, y: 30 });

      // Timeline
      tl.fromTo(heroTitle.querySelectorAll('span'), {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      })
      .fromTo(heroSubtitle, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .fromTo(heroCTAs, {
        opacity: 0,
        y: 30,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)'
      }, '-=0.3')
      .fromTo(goldLogo, {
        opacity: 0,
        scale: 0.8,
        rotation: -10
      }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.6')
      .fromTo(aiOrb, {
        opacity: 0,
        x: 50
      }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.8')
      .fromTo(laptopMockup, {
        opacity: 0,
        x: 80,
        rotation: -5
      }, {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6')
      .fromTo(controllerMockup, {
        opacity: 0,
        y: 50,
        rotation: 10
      }, {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.5')
      .fromTo(bottomIcons, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.4')
      .fromTo(heroBadges, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out'
      }, '-=0.2');

      // Gold glow pulse (continuous)
      const glow = heroSection.querySelector('.absolute.-top-20.left-1\\/2');
      if (glow) {
        gsap.to(glow, {
          opacity: 0.08,
          scale: 1.1,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      }

      // Floating animation for visual elements
      if (aiOrb) {
        gsap.to(aiOrb, {
          y: -15,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      }
      if (controllerMockup) {
        gsap.to(controllerMockup, {
          y: -10,
          rotation: 5,
          duration: 2.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      }
      if (bottomIcons) {
        gsap.to(bottomIcons, {
          y: -8,
          duration: 2.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      }
    });
  }

  function initCategoryReveal() {
    const categorySection = document.getElementById('categorias');
    if (!categorySection || reducedMotion) return;

    gsap((gsap) => {
      if (!gsap || !gsap.ScrollTrigger) return;

      const pills = categorySection.querySelectorAll('#categoryFilters button');
      gsap.fromTo(pills, {
        opacity: 0,
        y: 30,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.3)',
        scrollTrigger: {
          trigger: categorySection,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  function initProductCardReveal() {
    if (reducedMotion) return;

    gsap((gsap) => {
      if (!gsap || !gsap.ScrollTrigger) return;

      const cards = document.querySelectorAll('#productGrid .glass');
      if (!cards.length) return;

      gsap.fromTo(cards, {
        opacity: 0,
        y: 40,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#productGrid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  function initSectionHeaders() {
    if (reducedMotion) return;

    gsap((gsap) => {
      if (!gsap || !gsap.ScrollTrigger) return;

      document.querySelectorAll('section h2, section h3').forEach(header => {
        gsap.fromTo(header, {
          opacity: 0,
          x: -30
        }, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    });
  }

  // Initialize all GSAP animations
  function init() {
    if (reducedMotion) return;

    // Wait for GSAP to load
    const checkGSAP = setInterval(() => {
      if (window.gsap) {
        clearInterval(checkGSAP);
        initHero();
        initCategoryReveal();
        initProductCardReveal();
        initSectionHeaders();
      }
    }, 100);

    // Timeout after 5 seconds
    setTimeout(() => clearInterval(checkGSAP), 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init on dynamic content (product grid updates)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.id === 'productGrid' || node.querySelector?.('#productGrid')) {
              setTimeout(initProductCardReveal, 100);
            }
            if (node.id === 'categoryFilters' || node.querySelector?.('#categoryFilters')) {
              setTimeout(initCategoryReveal, 100);
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();