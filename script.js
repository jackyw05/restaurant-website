window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

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

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

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

let autoPlay = setInterval(() => {
  goTo(cur + 1 > slides.length - visibleSlides() ? 0 : cur + 1);
}, 3500);

const viewport = document.querySelector('.slider-viewport');

viewport.addEventListener('mouseenter', () => clearInterval(autoPlay));
viewport.addEventListener('mouseleave', () => {
  autoPlay = setInterval(() => goTo(cur + 1 > slides.length - visibleSlides() ? 0 : cur + 1), 3500);
});
window.addEventListener('resize', () => { buildDots(); goTo(cur); });

let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(diff > 0 ? cur + 1 : cur - 1);
});
buildDots();

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


// Cart state: { "Item Name": { price, qty, emoji } }
const cart = {};

const cartSidebar   = document.getElementById('cartSidebar');
const cartOverlay   = document.getElementById('cartOverlay');
const cartToggle    = document.getElementById('cartToggle');
const cartClose     = document.getElementById('cartClose');
const cartBadge     = document.getElementById('cartBadge');
const cartItemsEl   = document.getElementById('cartItems');
const cartEmptyEl   = document.getElementById('cartEmpty');
const cartFooterEl  = document.getElementById('cartFooter');
const cartTotalEl   = document.getElementById('cartTotal');
const cartSubtotalEl = document.getElementById('cartSubtotal');
const clearCartBtn  = document.getElementById('clearCartBtn');
const checkoutBtn   = document.getElementById('checkoutBtn');

function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

function renderCart() {
  const entries    = Object.entries(cart);
  const totalQty   = entries.reduce((s, [, v]) => s + v.qty, 0);
  const totalPrice = entries.reduce((s, [, v]) => s + v.price * v.qty, 0);

  cartBadge.textContent = totalQty;

  if (entries.length === 0) {
    cartEmptyEl.style.display  = 'flex';
    cartItemsEl.style.display  = 'none';
    cartFooterEl.classList.add('hidden');
    return;
  }

  cartEmptyEl.style.display  = 'none';
  cartItemsEl.style.display  = 'flex';
  cartFooterEl.classList.remove('hidden');

  cartItemsEl.innerHTML = entries.map(([name, { price, qty, emoji }]) => `
    <li class="cart-item" data-name="${name}">
      <div class="cart-item-emoji">${emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${name}</div>
        <div class="cart-item-price">$${(price * qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn remove-btn" data-action="remove" data-name="${name}" aria-label="Remove one">−</button>
        <span class="cart-item-qty">${qty}</span>
        <button class="qty-btn" data-action="add" data-name="${name}" aria-label="Add one">+</button>
      </div>
    </li>
  `).join('');

  cartSubtotalEl.textContent = '$' + totalPrice.toFixed(2);
  cartTotalEl.textContent    = '$' + totalPrice.toFixed(2);

  cartItemsEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      if (btn.dataset.action === 'add') {
        cart[name].qty++;
      } else {
        cart[name].qty--;
        if (cart[name].qty <= 0) delete cart[name];
      }
      renderCart();
    });
  });
}

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card  = btn.closest('.menu-card');
    const name  = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const emoji = card.dataset.emoji || '🍽️';

    if (cart[name]) {
      cart[name].qty++;
    } else {
      cart[name] = { price, qty: 1, emoji };
    }

    renderCart();

    cartBadge.classList.remove('bump');
    void cartBadge.offsetWidth;
    cartBadge.classList.add('bump');
    setTimeout(() => cartBadge.classList.remove('bump'), 300);

    btn.classList.add('added');
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
    }, 1000);
  });
});

clearCartBtn.addEventListener('click', () => {
  Object.keys(cart).forEach(k => delete cart[k]);
  renderCart();
});

checkoutBtn.addEventListener('click', () => {
  alert('Thank you for your order! 🍔\nWe\'ll have it ready for you shortly.');
  Object.keys(cart).forEach(k => delete cart[k]);
  renderCart();
  closeCart();
});

renderCart();

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

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

viewport.addEventListener('mouseenter', () => clearInterval(autoPlay));
viewport.addEventListener('mouseleave', () => {
  autoPlay = setInterval(() => {
    goTo(cur + 1 > slides.length - visibleSlides() ? 0 : cur + 1);
  }, 3500);
});

window.addEventListener('resize', () => { buildDots(); goTo(cur); });

track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(diff > 0 ? cur + 1 : cur - 1);
});

buildDots();

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