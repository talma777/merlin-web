/* ═══════════════════════════════════════════════════════════
   MERLIN REGTECH — JS Main
   ══════════════════════════════════════════════════════════ */

// ── Nav scroll effect ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ── Hamburger Menu ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── Stepper ────────────────────────────────────────────────
let currentStep = 1;

function setStep(n) {
  // Deactivate all
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`step-btn-${i}`)?.classList.remove('active');
    document.getElementById(`step-panel-${i}`)?.classList.remove('active');
  }
  // Activate selected
  document.getElementById(`step-btn-${n}`)?.classList.add('active');
  document.getElementById(`step-panel-${n}`)?.classList.add('active');
  currentStep = n;
}

// Auto-advance stepper every 5s when in view
let stepperInterval = null;
const stepperEl = document.querySelector('.stepper');

const stepperObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!stepperInterval) {
        stepperInterval = setInterval(() => {
          const next = (currentStep % 5) + 1;
          setStep(next);
        }, 5000);
      }
    } else {
      clearInterval(stepperInterval);
      stepperInterval = null;
    }
  });
}, { threshold: 0.3 });

if (stepperEl) stepperObs.observe(stepperEl);

// ── Form submission — Formspree real ──────────────────────
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = document.getElementById('acceso-form');
  const btn  = document.getElementById('submit-btn');
  const text = document.getElementById('submit-text');

  // Loading state
  btn.disabled = true;
  text.textContent = 'Enviando...';

  const data = new FormData(form);

  try {
    const res = await fetch('https://formspree.io/f/xkoqpaap', {
      method:  'POST',
      body:    data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    } else {
      const json = await res.json();
      const msg  = json?.errors?.map(e => e.message).join(', ') || 'Error al enviar. Intentá de nuevo.';
      text.textContent = 'Quiero acceso anticipado';
      btn.disabled = false;
      alert('❌ ' + msg);
    }
  } catch (err) {
    text.textContent = 'Quiero acceso anticipado';
    btn.disabled = false;
    alert('❌ Error de conexión. Revisá tu internet e intentá de nuevo.');
  }
}

// ── Active nav link on scroll ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionH   = section.offsetHeight;
    const sectionId  = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionH) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ── Smooth scroll for all anchor links ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('nav')?.offsetHeight || 72;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});

// ── WP message copy helper ────────────────────────────────
// Makes the domain name on mockup topbar click-to-copy
const mockUrl = document.querySelector('.mockup-url');
if (mockUrl) {
  mockUrl.style.cursor = 'pointer';
  mockUrl.title = 'merlin.com.ar';
}
