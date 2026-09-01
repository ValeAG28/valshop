// VAL Digital Services - Frontend Logic
// =============================================================

(() => {
  // ----- LUCIDE ICONS INIT -----
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ----- CONFIG GLOBAL -----
  const CONFIG = {
    whatsappPhone: '12025551234',
    supportEmail: 'support@valdigital.com',
    supportPhoneDisplay: '+1 202 555 1234'
  };
  // ----- STATE -----
  const state = {
    products: [],
    cart: [],
    currency: 'USD',
    search: '',
    activeCategory: 'All',
    sort: 'featured',
    coupons: { VAL10: 0.1, PROMO20: 0.2 },
    appliedCoupon: null,
    paymentMethod: 'transferencia',
    rates: { USD: 1, EUR: 0.92, GBP: 0.79 }
  };

  const CATEGORY_META = {
    'All': { icon: 'layout-grid', label: 'All' },
    'Streaming': { icon: 'tv', label: 'Streaming' },
    'Music': { icon: 'music-2', label: 'Music' },
    'AI': { icon: 'sparkles', label: 'AI' },
    'Editing': { icon: 'palette', label: 'Editing' },
    'Gaming': { icon: 'gamepad-2', label: 'Gaming' },
    'VPN': { icon: 'shield', label: 'VPN' },
    'Email': { icon: 'mail', label: 'Email' },
    'Links & Promos': { icon: 'link-2', label: 'Links & Promos' }
  };
  const CATEGORIES_ORDER = ['All','Streaming','Music','AI','Editing','Gaming','VPN','Email','Links & Promos'];
  // ----- SAMPLE PRODUCT DATA (9 categorías) -----
  const sampleProducts = [
    { id: 1, name: "Netflix Premium 4K", category: "Streaming", priceUSD: 15.99, rating: 4.9, badge: "Best Seller", image: "assets/icons/products/netflix.svg", description: "Premium UHD account, 4 screens.", benefits: ["4K + HDR","4 screens","No ads","Delivery <5 min"] },
    { id: 2, name: "Spotify Family", category: "Music", priceUSD: 9.99, rating: 4.9, badge: "", image: "assets/icons/products/spotify.svg", description: "Music without limits, no ads.", benefits: ["Offline","6 accounts","High quality","24/7 Support"] },
    { id: 3, name: "YouTube Premium", category: "Music", priceUSD: 12.99, rating: 4.8, badge: "", image: "assets/icons/products/youtube.svg", description: "No ads + YouTube Music.", benefits: ["No ads","Background play","Downloads","Music premium"] },
    { id: 4, name: "ChatGPT Plus", category: "AI", priceUSD: 20.00, rating: 4.9, badge: "AI", image: "assets/icons/products/chatgpt.svg", description: "Priority GPT-4o access.", benefits: ["GPT-4o","Faster response","Plugins","Support"] },
    { id: 5, name: "Midjourney Pro", category: "AI", priceUSD: 30.00, rating: 4.7, badge: "", image: "assets/icons/products/midjourney.svg", description: "Unlimited image generation.", benefits: ["HD Images","Relax mode","Commercial","Fast delivery"] },
    { id: 6, name: "Adobe Creative Cloud", category: "Editing", priceUSD: 54.99, rating: 4.8, badge: "Premium", image: "assets/icons/products/adobe.svg", description: "Complete editing suite.", benefits: ["Photoshop","Illustrator","Premiere","100GB Cloud"] },
    { id: 7, name: "Canva Pro Team", category: "Editing", priceUSD: 14.90, rating: 4.8, badge: "", image: "assets/icons/products/canva.svg", description: "Pro collaborative design.", benefits: ["Premium templates","Brand kit","Collaboration","Instant delivery"] },
    { id: 8, name: "Xbox Game Pass Ultimate", category: "Gaming", priceUSD: 16.99, rating: 4.9, badge: "", image: "assets/icons/products/xbox.svg", description: "Hundreds of games + EA Play.", benefits: ["Console+PC","Cloud","EA Play","Online"] },
    { id: 9, name: "NordVPN 1 Year", category: "VPN", priceUSD: 49.00, rating: 4.7, badge: "Offer", image: "assets/icons/products/nordvpn.svg", description: "Premium VPN 6 devices.", benefits: ["AES-256","60 countries","Kill switch","Ad block"] },
    { id: 10, name: "Proton Mail Plus", category: "Email", priceUSD: 5.99, rating: 4.6, badge: "", image: "assets/icons/products/proton.svg", description: "Encrypted email premium.", benefits: ["Encryption","15GB","Custom domain","Support"] },
    { id: 11, name: "Prime Video + Deezer Pack", category: "Links & Promos", priceUSD: 8.99, rating: 4.7, badge: "Promo", image: "assets/icons/products/prime-deezer.svg", description: "Combo promo streaming + music.", benefits: ["2 services","30% off","Stock available","Fast delivery"] },
    { id: 12, name: "Crunchyroll Mega Fan", category: "Streaming", priceUSD: 9.99, rating: 4.8, badge: "", image: "assets/icons/products/crunchyroll.svg", description: "Anime no ads offline.", benefits: ["No ads","Offline","4 streams","Delivery <5 min"] }
  ];

  // ----- INIT -----
  function init() {
    state.products = sampleProducts;
    loadCartFromLocalStorage();
    renderAnnouncement();
    renderHeader();
    renderCurrencySelector();
    renderProductGrid();
    renderTestimonials();
    renderFAQ();
    setupEventListeners();
    updateCartBadge();
  }

  // ----- LOCAL STORAGE -----
  function loadCartFromLocalStorage() {
    const saved = localStorage.getItem('valCart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        state.cart = Array.isArray(parsed) ? parsed.filter(i => i && typeof i.id === 'number' && typeof i.qty === 'number') : [];
      } catch (e) {
        state.cart = [];
        localStorage.removeItem('valCart');
      }
    }
    if (!Array.isArray(state.cart)) state.cart = [];
  }

  function saveCartToLocalStorage() {
    localStorage.setItem('valCart', JSON.stringify(state.cart));
  }

  // ----- RENDER FUNCTIONS -----
  function renderAnnouncement() {
    const announcement = document.getElementById('announcement');
    const closeBtn = document.getElementById('closeAnnouncement');
    closeBtn.addEventListener('click', () => {
      announcement.classList.add('hidden');
    });
  }

  function renderHeader() {
    // Header already static in HTML; we just need sticky behavior on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        header.classList.remove('bg-gray-900/80', 'backdrop-blur-lg');
        return;
      }
      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // scrolling down
        header.classList.add('scroll-down');
        header.classList.remove('scroll-up');
      } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      }
      lastScroll = currentScroll;
    });
  }

  function renderCurrencySelector() {
    const btn = document.getElementById('currencyButton');
    const symbolSpan = document.getElementById('currencySymbol');
    const menu = document.getElementById('currencyMenu');
    const options = menu.querySelectorAll('.currency-option');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(willOpen));
    });

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const curr = opt.getAttribute('data-currency');
        state.currency = curr;
        symbolSpan.textContent = curr;
        menu.classList.add('hidden');
        renderProductGrid();
        updateCartSummary();
      });
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded','false');
      }
    });
  }

  function renderProductGrid() {
    const grid = document.getElementById('productGrid');
    const emptyState = document.getElementById('emptyState');
    const categoryFilters = document.getElementById('categoryFilters');

    // Build categories list (9 fijas doradas)
    const categories = CATEGORIES_ORDER;
    categoryFilters.innerHTML = '';
    categories.forEach(cat => {
      const meta = CATEGORY_META[cat] || {icon:'layout-grid', label:cat};
      const isActive = state.activeCategory === cat || (cat==='All' && state.activeCategory==='All');
      const btn = document.createElement('button');
      btn.innerHTML = `<i data-lucide="${meta.icon}" class="w-3.5 h-3.5"></i> ${meta.label}`;
      btn.className = `px-3.5 py-2 text-xs font-semibold rounded-full border transition ${isActive ? 'bg-white text-black border-white' : 'bg-white/[0.06] text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'} flex items-center gap-1.5`;
      btn.addEventListener('click', () => {
        state.activeCategory = cat==='All' ? 'All' : cat;
        renderProductGrid();
      });
      categoryFilters.appendChild(btn);
    });
    // Re-initialize Lucide icons for new category pills
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Filter products
    let filtered = state.products.filter(p => {
      if (state.activeCategory !== 'All' && p.category !== state.activeCategory) return false;
      if (state.search && !(`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(state.search.toLowerCase()))) return false;
      return true;
    });

    // Sort
    switch (state.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        // prioritize badges then rating
        filtered.sort((a, b) => {
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return b.rating - a.rating;
        });
    }

    if (filtered.length === 0) {
      grid.classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }
    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');

    grid.innerHTML = '';
    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = `glass rounded-2xl overflow-hidden card-lift border border-white/5`;
      card.innerHTML = `
        <div class="relative">
          <img src="${product.image}" alt="${product.name}" class="w-full h-44 object-contain bg-gradient-to-br from-[#0f1220] to-[#050814] border border-white/5 p-4">
          <span class="absolute top-3 left-3 bg-[#D4A017] text-black text-[10px] font-bold px-2 py-1 rounded-full">● In Stock</span>
          ${product.badge ? `<span class="absolute top-3 right-3 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-full">${product.badge}</span>` : ''}
        </div>
        <div class="p-4 space-y-2">
          <div class="text-[11px] tracking-widest text-gray-500 font-semibold">${product.category.toUpperCase()}</div>
          <h3 class="font-bold text-sm leading-tight">${product.name}</h3>
          <p class="text-xs text-gray-500 line-clamp-2">${product.description}</p>
          <div class="flex items-center justify-between pt-2">
            <span class="text-sm font-black">${formatPrice(convertPrice(product.priceUSD))}</span>
            <span class="text-[11px] text-amber-400 flex items-center gap-0.5"><i data-lucide="star" class="w-3 h-3 fill-yellow-400"></i> ${product.rating.toFixed(1)}</span>
          </div>
          <div class="grid grid-cols-2 gap-2 pt-2">
            <button class="qv-btn bg-white/[0.06] border border-white/10 hover:bg-white/10 text-xs font-medium py-2 rounded-full" data-id="${product.id}">Quick View</button>
            <button class="add-to-cart bg-white text-black hover:bg-gray-100 text-xs font-bold py-2 rounded-full" data-id="${product.id}">Add</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Re-initialize Lucide icons for new product cards (stars, etc.)
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Attach listeners to buttons
    grid.querySelectorAll('.qv-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        openQuickView(id);
      });
    });
    grid.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        addToCart(id);
      });
    });
  }

  function openQuickView(id) {
    const product = state.products.find(p => p.id === id);
    if (!product) return;
    const modal = document.getElementById('quickViewModal');
    const backdrop = document.getElementById('quickViewBackdrop');
    document.getElementById('qvImage').src = product.image;
    document.getElementById('qvImage').alt = product.name;
    document.getElementById('qvTitle').textContent = product.name;
    const ratingEl = document.getElementById('qvRating');
    ratingEl.innerHTML = `<i data-lucide="star" class="w-3 h-3 fill-amber-400"></i> ${product.rating.toFixed(1)} · ${product.category}`;
    document.getElementById('qvDescription').textContent = product.description;
    const benefitsEl = document.getElementById('qvBenefits');
    benefitsEl.innerHTML = product.benefits.map(b => `<li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-[#D4A017]"></i> ${b}</li>`).join('');
    document.getElementById('qvPrice').textContent = formatPrice(convertPrice(product.priceUSD));
    document.getElementById('qvAddToCart').dataset.id = product.id;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
    void backdrop.offsetWidth;
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    document.body.classList.add('overlay-open');
    document.body.style.overflow = 'hidden';
    // Re-initialize Lucide icons for new modal content
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    document.getElementById('closeQuickView').focus();
  }

  function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    const backdrop = document.getElementById('quickViewBackdrop');
    if (!modal || modal.classList.contains('hidden')) return;
    const backdropEl = document.getElementById('quickViewBackdrop');
    backdropEl.classList.add('opacity-0');
    backdropEl.classList.remove('opacity-100');
    modal.setAttribute('aria-hidden','true');
    if (document.getElementById('cartDrawer').classList.contains('hidden')) {
      document.body.classList.remove('overlay-open');
      document.body.style.overflow = '';
    }
    setTimeout(() => modal.classList.add('hidden'), 240);
  }

  function addToCart(id) {
    const existing = state.cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({ id, qty: 1 });
    }
    saveCartToLocalStorage();
    updateCartBadge();
    showToast('Producto agregado al carrito');
    if (window.updateCartState && !document.getElementById('cartDrawer').classList.contains('hidden')) {
      renderCartItems();
      updateCartSummary();
    }
    // animate cart button
    const cartBtn = document.getElementById('cartButton');
    cartBtn.classList.add('scale-110');
    setTimeout(() => cartBtn.classList.remove('scale-110'), 200);
  }

  function removeFromCart(id) {
    state.cart = state.cart.filter(item => item.id !== id);
    saveCartToLocalStorage();
    renderCartItems();
    updateCartBadge();
    updateCartSummary();
  }

  function updateCartQty(id, delta) {
    const item = state.cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
    } else {
      saveCartToLocalStorage();
      renderCartItems();
      updateCartBadge();
      updateCartSummary();
    }
  }

  function renderCartItems() {
    const container = document.getElementById('cartItems');
    if (!Array.isArray(state.cart) || state.cart.length === 0) {
      container.innerHTML = `<div class="text-center py-10"><div class="mx-auto w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">🛒</div><p class="text-sm text-gray-400">Tu carrito está vacío.</p><p class="text-xs text-gray-600 mt-1">Agregá productos y aparecerán aquí</p></div>`;
      return;
    }
    container.innerHTML = '';
    state.cart.forEach(item => {
      const product = state.products.find(p => p.id === item.id);
      if (!product) return;
      const price = convertPrice(product.priceUSD);
      const el = document.createElement('div');
      el.className = 'flex gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-white/10 transition';
      el.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-14 h-14 object-cover rounded-xl bg-white/5 shrink-0">
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm leading-tight truncate">${product.name}</div>
          <div class="text-xs text-gray-500">${product.category} · ${formatPrice(price)} c/u</div>
          <div class="flex items-center gap-2 mt-2">
            <button class="qty-btn h-7 w-7 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center hover:bg-gray-100" data-id="${item.id}" data-change="-1">−</button>
            <span class="w-6 text-center text-sm font-bold">${item.qty}</span>
            <button class="qty-btn h-7 w-7 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center hover:bg-gray-100" data-id="${item.id}" data-change="+1">+</button>
            <button class="remove-btn ml-auto text-[11px] text-gray-500 hover:text-red-400" data-id="${item.id}">Quitar</button>
          </div>
        </div>
      `;
      container.appendChild(el);
    });
    // attach listeners
    container.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        const change = Number(e.currentTarget.dataset.change);
        updateCartQty(id, change);
      });
    });
    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        removeFromCart(id);
      });
    });
  }

  function updateCartBadge() {
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cartCount');
    if (totalQty === 0) {
      badge.classList.add('hidden');
    } else {
      badge.textContent = totalQty;
      badge.classList.remove('hidden');
    }
  }

  function updateCartSummary() {
    const subtotal = state.cart.reduce((sum, item) => {
      const product = state.products.find(p => p.id === item.id);
      return sum + (convertPrice(product.priceUSD) * item.qty);
    }, 0);
    const discount = appliedDiscountAmount(subtotal);
    const total = subtotal - discount;
    document.getElementById('cartSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('cartDiscount').textContent = formatPrice(discount);
    document.getElementById('cartTotal').textContent = formatPrice(total);
    // enable/disable checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = state.cart.length === 0;
  }

  function appliedDiscountAmount(subtotal) {
    if (!state.appliedCoupon) return 0;
    const rate = state.coupons[state.appliedCoupon] || 0;
    return subtotal * rate;
  }

  function applyCoupon() {
    const input = document.getElementById('couponInput');
    const code = input.value.trim().toUpperCase();
    const msgEl = document.getElementById('couponMessage');
    if (state.coupons[code]) {
      state.appliedCoupon = code;
      msgEl.textContent = `Cupón ${code} aplicado (${state.coupons[code]*100}% OFF)`;
      msgEl.classList.remove('hidden');
      input.value = '';
      updateCartSummary();
      showToast(`Cupón ${code} aplicado`, 'success');
    } else {
      state.appliedCoupon = null;
      msgEl.textContent = 'Cupón no válido';
      msgEl.classList.remove('hidden');
      updateCartSummary();
      showToast('Cupón no válido', 'error');
    }
  }

  function generateWhatsAppLink() {
    if (!Array.isArray(state.cart) || state.cart.length === 0) return null;
    const orderId = '#VAL-' + Math.floor(Math.random()*1000000).toString().padStart(6, '0');
    const paymentLabels = { transferencia:'Transferencia / Depósito', mercadopago:'Mercado Pago', paypal:'PayPal', stripe:'Tarjeta (Stripe)' };
    const lines = [
      `*Nuevo pedido VAL Digital Services*`,
      `*ID:* ${orderId}`,
      `*Método de pago:* ${paymentLabels[state.paymentMethod] || state.paymentMethod}`,
      `*Moneda:* ${state.currency}`,
      '',
      '*Productos:*'
    ];
    state.cart.forEach(item => {
      const product = state.products.find(p => p.id === item.id);
      if (!product) return;
      const unit = convertPrice(product.priceUSD);
      const line = `- ${product.name} x${item.qty} = ${formatPrice(unit * item.qty)}`;
      lines.push(line);
    });
    const subtotal = state.cart.reduce((sum, item) => {
      const product = state.products.find(p => p.id === item.id);
      if (!product) return sum;
      return sum + (convertPrice(product.priceUSD) * item.qty);
    }, 0);
    const discount = appliedDiscountAmount(subtotal);
    const total = subtotal - discount;
    lines.push('', `*Subtotal:* ${formatPrice(subtotal)}`);
    if (discount > 0) lines.push(`*Descuento (${state.appliedCoupon}):* -${formatPrice(discount)}`);
    lines.push(`*Total (${state.currency}):* ${formatPrice(total)}`);
    lines.push('', '_Gracias por confiar en VAL Digital Services._');
    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${CONFIG.whatsappPhone}?text=${text}`;
  }

  function checkout() {
    if (!Array.isArray(state.cart) || state.cart.length === 0) {
      showToast('Tu carrito está vacío', 'error');
      return;
    }
    if (['mercadopago','paypal','stripe'].includes(state.paymentMethod)) {
      showToast(`Redirigiendo a ${state.paymentMethod}... (pronto) — usando WhatsApp por ahora`, 'success');
    }
    const link = generateWhatsAppLink();
    if (link) window.open(link, '_blank');
    else showToast('No se pudo generar el pedido', 'error');
  }

  // ----- UTILS -----
  function formatPrice(num) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: state.currency
    }).format(num);
  }

  function convertPrice(usd) {
    return usd * state.rates[state.currency];
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `flex items-center space-x-3 px-4 py-2 rounded-lg shadow-lg toast-enter ${
      type === 'success' ? 'bg-indigo-600/80' : 'bg-red-600/80'
    }`;
    toast.innerHTML = `
      <svg class="h-5 w-5 ${type === 'success' ? 'text-indigo-200' : 'text-red-200'}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${type === 'success' ? 'M9 12l2 2 4-4M5 19h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z' : 'M6 18L18 6M6 6l12 12'}" />
      </svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-enter-active');
    });
    setTimeout(() => {
      toast.classList.remove('toast-enter-active');
      toast.classList.add('toast-exit-active');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 3000);
  }

  // ----- SEARCH & SORT EVENTS -----
  function setupEventListeners() {
    // Search debounce
    const searchInput = document.getElementById('search');
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        state.search = e.target.value;
        renderProductGrid();
      }, 300);
    });

    // Sort dropdown
    const sortBtn = document.getElementById('sortButton');
    const sortMenu = document.getElementById('sortMenu');
    const sortOptions = sortMenu.querySelectorAll('.sort-option');
    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sortMenu.classList.toggle('hidden');
      sortBtn.setAttribute('aria-expanded', String(!sortMenu.classList.contains('hidden')));
    });
    sortOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const s = opt.getAttribute('data-sort');
        state.sort = s;
        const labelMap = {
          featured: 'Ordenar: Destacados ▾',
          'price-asc': 'Ordenar: Precio ↑',
          'price-desc': 'Ordenar: Precio ↓',
          rating: 'Ordenar: Mejor ★'
        };
        sortBtn.textContent = labelMap[s];
        sortBtn.setAttribute('aria-expanded','false');
        sortMenu.classList.add('hidden');
        renderProductGrid();
      });
    });
    document.addEventListener('click', (e) => {
      if (!sortMenu.contains(e.target) && !sortBtn.contains(e.target)) {
        sortMenu.classList.add('hidden');
        sortBtn.setAttribute('aria-expanded','false');
      }
    });

    // Cart drawer — modern overlay (backdrop fade + panel slide + lock)
    const cartBtn = document.getElementById('cartButton');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartBackdrop = document.getElementById('cartBackdrop');
    const closeCart = document.getElementById('closeCart');
    const cartPanel = document.getElementById('cartPanel');
    const updateCartState = (open) => {
      if (open) {
        cartDrawer.classList.remove('hidden');
        cartDrawer.setAttribute('aria-hidden','false');
        void cartPanel.offsetWidth;
        cartBackdrop.classList.remove('opacity-0');
        cartBackdrop.classList.add('opacity-100');
        cartPanel.classList.remove('translate-x-full');
        document.body.classList.add('overlay-open');
        document.body.style.overflow = 'hidden';
        renderCartItems();
        updateCartSummary();
        requestAnimationFrame(() => closeCart.focus());
      } else {
        cartPanel.classList.add('translate-x-full');
        cartBackdrop.classList.add('opacity-0');
        cartBackdrop.classList.remove('opacity-100');
        document.body.classList.remove('overlay-open');
        document.body.style.overflow = '';
        cartDrawer.setAttribute('aria-hidden','true');
        setTimeout(() => cartDrawer.classList.add('hidden'), 300);
      }
    };
    window.updateCartState = updateCartState;
    cartBtn.addEventListener('click', () => {
      const isOpen = !cartDrawer.classList.contains('hidden') && !cartPanel.classList.contains('translate-x-full');
      updateCartState(!isOpen);
    });
    closeCart.addEventListener('click', () => updateCartState(false));
    cartBackdrop.addEventListener('click', () => updateCartState(false));
    cartPanel.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !cartDrawer.classList.contains('hidden')) {
        updateCartState(false);
        const qv = document.getElementById('quickViewModal');
        if (!qv.classList.contains('hidden')) closeQuickView();
      }
    });

    // Apply coupon button
    document.getElementById('applyCoupon').addEventListener('click', applyCoupon);

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', checkout);

    // Quick view close — modern (backdrop + ESC handled globally)
    document.getElementById('closeQuickView').addEventListener('click', closeQuickView);
    document.getElementById('quickViewBackdrop').addEventListener('click', closeQuickView);
    document.getElementById('quickViewModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeQuickView();
    });
    document.getElementById('qvAddToCart').addEventListener('click', (e) => {
      const id = Number(e.currentTarget.dataset.id);
      if (id) { addToCart(id); closeQuickView(); }
    });

    // WhatsApp float button (ahora funcional)
    const waBtn = document.getElementById('whatsappFloat');
    const tooltip = document.getElementById('whatsappTooltip');
    waBtn.addEventListener('mouseenter', () => tooltip.classList.remove('hidden'));
    waBtn.addEventListener('mouseleave', () => tooltip.classList.add('hidden'));
    waBtn.addEventListener('click', () => {
      const msg = encodeURIComponent('Hola VAL Digital Services 👋 Quisiera consultar por licencias disponibles');
      window.open(`https://wa.me/${CONFIG.whatsappPhone}?text=${msg}`, '_blank');
    });
    // Payment method selector
    document.querySelectorAll('input[name="paymentMethod"]').forEach(r => {
      r.addEventListener('change', (e) => {
        state.paymentMethod = e.target.value;
        const pmLabel = { transferencia:'Transferencia', mercadopago:'Mercado Pago', paypal:'PayPal', stripe:'Tarjeta' };
        showToast(`Método: ${pmLabel[state.paymentMethod]}`, 'success');
      });
    });
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        const nombre = (data.get('nombre')||'').toString().trim();
        const email = (data.get('email')||'').toString().trim();
        const mensaje = (data.get('mensaje')||'').toString().trim();
        if (!nombre || !email || !mensaje || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showToast('Completa nombre, email válido y mensaje', 'error');
          return;
        }
        const ticket = '#SOP-' + Math.floor(Math.random()*1000000).toString().padStart(6,'0');
        showToast(`Mensaje enviado ${ticket} — te respondemos < 2h`, 'success');
        const waMsg = encodeURIComponent(`*Nuevo contacto VAL*%0A*Ticket:* ${ticket}%0A*Nombre:* ${nombre}%0A*Email:* ${email}%0A*Mensaje:* ${mensaje}`);
        window.open(`https://wa.me/${CONFIG.whatsappPhone}?text=${waMsg}`, '_blank');
        contactForm.reset();
      });
    }
    // Soporte search filter
    const soporteSearch = document.getElementById('soporteSearch');
    if (soporteSearch) {
      soporteSearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('#faqAccordion [data-index]').forEach(h => {
          const card = h.parentElement;
          const txt = (h.textContent + card.querySelector('div.hidden, div:not(.hidden):last-child')?.textContent || '').toLowerCase();
          card.style.display = txt.includes(q) ? '' : 'none';
        });
      });
    }

    // Initial renders
    renderCartItems();
    updateCartSummary();

    // Initialize Lucide icons after all DOM is ready
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // ----- TESTIMONIALS & FAQ (static data) -----
  function renderTestimonials() {
    const container = document.getElementById('testimonialSlider');
    const testimonials = [
      {
        name: "María G.",
        role: "Diseñadora Gráfica",
        text: "Las licencias de Adobe llegaron al instante y funcionan perfectamente. El soporte es excepcional.",
        rating: 5
      },
      {
        name: "Carlos P.",
        role: "Desarrollador",
        text: "Compré NordVPN y la activación fue inmediata. Precio mejor que en la tienda oficial.",
        rating: 5
      },
      {
        name: "Lucía M.",
        role: "Community Manager",
        text: "ChatGPT Plus me ha ahorrado horas de trabajo. La entrega fue en menos de 2 minutos.",
        rating: 4
      }
    ];
    container.innerHTML = '';
    testimonials.forEach(t => {
      const el = document.createElement('div');
      el.className = 'bg-gray-900/50 border border-gray-800 rounded-xl p-6';
      el.innerHTML = `
        <p class="text-gray-300 italic mb-3">“${t.text}”</p>
        <div class="flex items-center space-x-3 text-sm">
          <div class="flex space-x-1">
            ${Array.from({ length: 5 }, (_, i) => `
              <svg class="h-4 w-4 ${i < t.rating ? 'fill-yellow-400' : 'fill-none'}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.218 4.424a1 1 0 001.806.549l3.046-2.213a1 1 0 00.08-1.04l2.43-.702a1 1 0 00-.196-1.426l-1.489-4.592a1 1 0 00-1.214-.85l-3.255 1.13a1 1 0 00-1.658.026l-2.908-4.093a1 1 0 00-.94-.988z"/>
              </svg>
            `).join('')}
          </div>
          <span>${t.name} • ${t.role}</span>
        </div>
      `;
      container.appendChild(el);
    });
  }

  function renderFAQ() {
    const container = document.getElementById('faqAccordion');
    const faqs = [
      { q: "¿Cómo recibo mi licencia después de la compra?", a: "Recibes el código de activación o enlace de descarga por WhatsApp o correo electrónico en menos de 5 minutos después de confirmar el pago." },
      { q: "¿Las licencias son oficiales y garantizadas?", a: "Sí. Todas son 100% legales, de distribuidores autorizados, con garantía de reemplazo inmediato si hay algún inconveniente." },
      { q: "¿Puedo cambiar o devolver una licencia?", a: "Por ser producto digital no hay devoluciones una vez entregado el código. Si el código no funciona, lo reemplazamos al instante." },
      { q: "¿Qué métodos de pago aceptan?", a: "Transferencia bancaria (alias/CBU), Mercado Pago (tarjeta, débito, efectivo), PayPal y Stripe (Visa/Master/Amex). Elegís el método en el carrito antes del checkout. Descuento 10% con VAL10 y 20% con PROMO20." },
      { q: "¿Hay soporte post-venta?", a: "Sí. Soporte por WhatsApp y email durante el primer mes para instalación y activación. Tiempo de respuesta < 2h (Lun-Dom 9-21 AR, urgencias 24/7)." },
      { q: "¿En cuánto tiempo llega la entrega?", a: "Promedio < 5 minutos tras confirmar pago. Si elegís transferencia, enviá comprobante por WhatsApp para acelerar." },
      { q: "¿Puedo cambiar de moneda?", a: "Sí. Selector arriba a la derecha: USD, EUR, ARS, MXN, COP. El total se recalcula al instante con tipo de cambio indicativo." },
      { q: "¿La garantía cubre actualizaciones?", a: "Sí, las licencias incluyen actualizaciones mientras el plan esté vigente (ej. Microsoft 365, Adobe CC)." }
    ];
    container.innerHTML = '';
    faqs.forEach((faq, index) => {
      const el = document.createElement('div');
      el.className = 'border-t border-gray-800';
      el.innerHTML = `
        <div class="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-800/50" data-index="${index}">
          <h3 class="font-medium">${faq.q}</h3>
          <svg class="h-5 w-5 text-gray-400 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
        <div class="hidden p-5 text-gray-300 text-sm leading-relaxed">${faq.a}</div>
      `;
      container.appendChild(el);
    });
    // accordion behavior
    container.querySelectorAll('[data-index]').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isOpen = !item.classList.contains('open');
        // close all
        container.querySelectorAll('.open').forEach(o => o.classList.remove('open'));
        container.querySelectorAll('[data-index]').forEach(h => {
          const svg = h.querySelector('svg');
          svg.classList.remove('rotate-180');
        });
        container.querySelectorAll('[data-index] + div').forEach(panel => {
          panel.classList.add('hidden');
        });
        if (isOpen) {
          item.classList.add('open');
          header.querySelector('svg').classList.add('rotate-180');
          header.nextElementSibling.classList.remove('hidden');
        }
      });
    });
  }

  // ----- INITIALIZE -----
  init();
})();