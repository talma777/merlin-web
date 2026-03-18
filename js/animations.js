/* ═══════════════════════════════════════════════════════════
   MERLIN REGTECH — Scroll Reveal Animations
   ══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // Intersection Observer for scroll reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve — keep it visible
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  // Observe all .reveal elements
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ── Stats counter animation ────────────────────────────────
  const statNums = document.querySelectorAll('.stat-num');

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(el => statsObserver.observe(el));

  // ── Chain nodes staggered animation ───────────────────────
  const chainNodes = document.querySelectorAll('.chain-node');
  const chainObs = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        chainNodes.forEach((node, i) => {
          setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
          }, i * 80);
        });
        chainObs.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  // Set initial state for chain nodes
  chainNodes.forEach(node => {
    node.style.opacity = '0';
    node.style.transform = 'translateY(16px)';
    node.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  const chainArrows = document.querySelectorAll('.chain-arrow');
  chainArrows.forEach(arrow => {
    arrow.style.opacity = '0';
    arrow.style.transition = 'opacity 0.4s ease';
  });

  const chainObs2 = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        chainNodes.forEach((node, i) => {
          setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
          }, i * 80);
        });
        chainArrows.forEach((arrow, i) => {
          setTimeout(() => {
            arrow.style.opacity = '1';
          }, i * 80 + 40);
        });
        chainObs2.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  const chainContainer = document.querySelector('.chain-container');
  if (chainContainer) chainObs2.observe(chainContainer);

  // ── Mockup mini-animation: score ring draw ────────────────
  const scoreCircle = document.querySelector('.mock-score-ring circle:last-child');
  if (scoreCircle) {
    const original = scoreCircle.getAttribute('stroke-dashoffset');
    scoreCircle.setAttribute('stroke-dashoffset', '314');
    scoreCircle.style.transition = 'stroke-dashoffset 1.5s ease 0.5s';

    const mockObs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          scoreCircle.setAttribute('stroke-dashoffset', original);
          mockObs.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const mockupEl = document.querySelector('.hero-mockup');
    if (mockupEl) mockObs.observe(mockupEl);
  }

  // ── Progress bar in stepper nav (visual hint) ─────────────
  const stepBtns = document.querySelectorAll('.step-btn');
  stepBtns.forEach((btn, i) => {
    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'rgba(0,212,255,0.04)';
      btn.style.borderRadius = '8px 8px 0 0';
    });
    btn.addEventListener('mouseleave', () => {
      if (!btn.classList.contains('active')) {
        btn.style.background = '';
      }
    });
  });

})();
