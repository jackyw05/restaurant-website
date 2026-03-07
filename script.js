// header scrolls
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// hamburger menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// menu tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// gallery slider 
const track = document.getElementById('sliderTrack');
const slides = track.children;
const dotsEl = document.getElementById('sliderDots');
let cur = 0;

function visibleSlides() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
}

function buildDots() {
  dotsEl.innerHTML = '';
  const total = Math.max(1, slides.length - visibleSlides() + 1);
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === cur ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  }
}

function goTo(n) {
  cur = Math.max(0, Math.min(n, slides.length - visibleSlides()));
  track.style.transform = `translateX(-${cur * slides[0].offsetWidth}px)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === cur));
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(cur - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(cur + 1));

// auto-play
let autoPlay = setInterval(() => {
  goTo(cur + 1 > slides.length - visibleSlides() ? 0 : cur + 1);
}, 3500);

const viewport = document.querySelector('.slider-viewport');
viewport.addEventListener('mouseenter', () => clearInterval(autoPlay));
viewport.addEventListener('mouseleave', () => {
  autoPlay = setInterval(() => {
    goTo(cur + 1 > slides.length - visibleSlides() ? 0 : cur + 1);
  }, 3500);
});

window.addEventListener('resize', () => { buildDots(); goTo(cur); });

// touch swipe
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(diff > 0 ? cur + 1 : cur - 1);
});

buildDots();

// contact form
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    e.target.reset();
    document.getElementById('formSuccess').classList.remove('hidden');
    btn.textContent = '✓ Sent!';
    btn.style.background = '#3c8c3c';
  }, 1200);
}

// nav highlight
const sections = [...document.querySelectorAll('section[id]')];
window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  sections.forEach(s => {
    const link = document.querySelector(`.nav-link[href="#${s.id}"]`);
    if (link) {
      link.style.color = (y >= s.offsetTop - 100 && y < s.offsetTop + s.offsetHeight)
        ? 'var(--gold)' : '';
    }
  });
}, { passive: true });