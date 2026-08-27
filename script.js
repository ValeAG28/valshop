// VAL Digital Services - Frontend Logic
// =============================================================

(() => {
  // ----- STATE -----
  const state = {
    products: [], // filled with sample data
    cart: [], // array of { id, qty }
    currency: 'USD',
    search: '',
    activeCategory: 'All',
    sort: 'featured', // featured, price-asc, price-desc, rating
    coupons: {
      VAL10: 0.1,
      PROMO20: 0.2
    },
    appliedCoupon: null,
    rates: {
      USD: 1,
      EUR: 0.92,
      ARS: 350,
      MXN: 17,
      COP: 4000
    }
  };

  // ----- SAMPLE PRODUCT DATA -----
  const sampleProducts = [
    {
      id: 1,
      name: "Adobe Creative Cloud",
      category: "Software",
      priceUSD: 54.99,
      rating: 4.8,
      badge: "Más Vendido",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      description: "Suite completa de diseño, video, fotografía y web.",
      benefits: [
        "Photoshop, Illustrator, InDesign",
        "Actualizaciones constantes",
        "Almacenamiento en la nube 100GB",
        "Soporte 24/7"
      ]
    },
    {
      id: 2,
      name: "Netflix Premium",
      category: "Streaming",
      priceUSD: 15.99,
      rating: 4.9,
      badge: "",
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
      description: "Películas, series y documentales en 4K HDR.",
      benefits: [
        "4 pantalla simultáneas",
        "Descargas offline",
        "Sin anuncios",
        "Nuevo contenido semanal"
      ]
    },
    {
      id: 3,
      name: "NordVPN 2 años",
      category: "Seguridad",
      priceUSD: 89.00,
      rating: 4.7,
      badge: "Oferta",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3458e?w=400",
      description: "Protección avanzada para todos tus dispositivos.",
      benefits: [
        "Cifrado AES-256",
        "Kill switch automático",
        "Servidores en 60 países",
        "Bloqueo de anuncios y malware"
      ]
    },
    {
      id: 4,
      name: "ChatGPT Plus",
      category: "IA",
      priceUSD: 20.00,
      rating: 4.8,
      badge: "",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400",
      description: "Acceso a GPT-4 con respuesta prioritaria.",
      benefits: [
        "Respuestas más rápidas",
        "Acceso durante picos de demanda",
        "Funciones beta exclusivas",
        "Plugin store"
      ]
    },
    {
      id: 5,
      name: "Microsoft 365 Familiar",
      category: "Software",
      priceUSD: 99.99,
      rating: 4.6,
      badge: "",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
      description: "Office premium para hasta 6 usuarios.",
      benefits: [
        "Word, Excel, PowerPoint, Outlook",
        "1TB OneDrive por persona",
        "Actualizaciones permanentes",
        "Soporte técnico"
      ]
    },
    {
      id: 6,
      name: "Spotify Premium",
      category: "Streaming",
      priceUSD: 9.99,
      rating: 4.9,
      badge: "",
      image: "https://images.unsplash.com/photo-1614728340025-6c6922859773?w=400",
      description: "Música sin límites, sin anuncios.",
      benefits: [
        "Escucha offline",
        "Calidad de audio alta",
        "Podcasts exclusivos",
        "Compatibilidad multi-dispositivo"
      ]
    },
    {
      id: 7,
      name: "Malwarebytes Premium",
      category: "Seguridad",
      priceUSD: 39.99,
      rating: 4.5,
      badge: "",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
      description: "Protección contra malware, ransomware y sitios maliciosos.",
      benefits: [
        "Escaneo en tiempo real",
        "Protección web",
        "Eliminación de adware",
        "Actualizaciones automáticas"
      ]
    },
    {
      id: 8,
      name: "Jasper AI",
      category: "IA",
      priceUSD: 49.00,
      rating: 4.7,
      badge: "Más Vendido",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
      description: "Asistente de redacción IA para marketing y blogs.",
      benefits: [
        "Genera copy en segundos",
        "Plantillas SEO",
        "Tono de voz personalizable",
        "Integración con SurferSEO"
      ]
    }
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
        state.cart = JSON.parse(saved);
      } catch (e) {
        state.cart = [];
      }
    }
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
      menu.classList.toggle('hidden');
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

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });
  }

  function renderProductGrid() {
    const grid = document.getElementById('productGrid');
    const emptyState = document.getElementById('emptyState');
    const categoryFilters = document.getElementById('categoryFilters');

    // Build categories list
    const categories = ['All', ...new Set(state.products.map(p => p.category))];
    categoryFilters.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.textContent = cat;
      btn.className = `px-3 py-1 text-sm rounded-full transition ${
        state.activeCategory === cat
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
      }`;
      btn.addEventListener('click', () => {
        state.activeCategory = cat;
        renderProductGrid();
      });
      categoryFilters.appendChild(btn);
    });

    // Filter products
    let filtered = state.products.filter(p => {
      if (state.activeCategory !== 'All' && p.category !== state.activeCategory) return false;
      if (state.search && !p.name.toLowerCase().includes(state.search.toLowerCase())) return false;
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
      card.className = `glass rounded-xl overflow-hidden card-lift transform hover:scale-[1.02] neon-border`;
      card.innerHTML = `
        <div class="relative p-4">
          <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
          ${product.badge ? `<span class="absolute top-2 left-2 bg-indigo-600/80 text-xs px-2 py-0.5 rounded">${product.badge}</span>` : ''}
        </div>
        <div class="p-4 space-y-3">
          <h3 class="font-semibold text-lg">${product.name}</h3>
          <p class="text-gray-400 line-clamp-2">${product.description}</p>
          <div class="flex items-baseline space-x-2">
            <span class="text-xl font-bold">${formatPrice(product.priceUSD)}</span>
            <div class="flex items-center space-x-1 text-indigo-400">
              ${Array.from({ length: 5 }, (_, i) => `
                <svg class="h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400' : 'fill-none'}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.218 4.424a1 1 0 001.806.549l3.046-2.213a1 1 0 00.08-1.04l2.43-.702a1 1 0 00-.196-1.426l-1.489-4.592a1 1 0 00-1.214-.85l-3.255 1.13a1 1 0 00-1.658.026l-2.908-4.093a1 1 0 00-.94-.988z"/>
                </svg>
              `).join('')}
            </div>
          </div>
          <div class="flex justify-between pt-4">
            <button class="qv-btn bg-gray-800/50 hover:bg-gray-700 text-xs px-2 py-1 rounded w-1/2" data-id="${product.id}">
              Vista Rápida
            </button>
            <button class="add-to-cart bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-medium py-1 px-3 rounded w-1/2" data-id="${product.id}">
              Agregar
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

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
    document.getElementById('qvImage').src = product.image;
    document.getElementById('qvImage').alt = product.name;
    document.getElementById('qvTitle').textContent = product.name;
    const ratingEl = document.getElementById('qvRating');
    ratingEl.innerHTML = Array.from({ length: 5 }, (_, i) => `
      <svg class="h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400' : 'fill-none'}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.218 4.424a1 1 0 001.806.549l3.046-2.213a1 1 0 00.08-1.04l2.43-.702a1 1 0 00-.196-1.426l-1.489-4.592a1 1 0 00-1.214-.85l-3.255 1.13a1 1 0 00-1.658.026l-2.908-4.093a1 1 0 00-.94-.988z"/>
      </svg>
    `).join('');
    document.getElementById('qvDescription').textContent = product.description;
    const benefitsEl = document.getElementById('qvBenefits');
    benefitsEl.innerHTML = product.benefits.map(b => `<li>${b}</li>`).join('');
    document.getElementById('qvPrice').textContent = formatPrice(product.priceUSD);
    document.getElementById('qvAddToCart').dataset.id = product.id;
    modal.classList.remove('hidden');
    // trap focus
    const closeBtn = document.getElementById('closeQuickView');
    closeBtn.focus();
  }

  function closeQuickView() {
    document.getElementById('quickViewModal').classList.add('hidden');
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
    // Update cart UI if drawer is open
    const cartDrawer = document.getElementById('cartDrawer');
    const cartPanel = document.getElementById('cartPanel');
    if (!cartDrawer.classList.contains('pointer-events-none')) {
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
    if (state.cart.length === 0) {
      container.innerHTML = `<p class="text-gray-400 text-center py-4">Tu carrito está vacío.</p>`;
      return;
    }
    container.innerHTML = '';
    state.cart.forEach(item => {
      const product = state.products.find(p => p.id === item.id);
      if (!product) return;
      const price = convertPrice(product.priceUSD);
      const total = price * item.qty;
      const el = document.createElement('div');
      el.className = 'flex items-center space-x-3 bg-gray-800/50 p-3 rounded';
      el.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded">
        <div class="flex-1">
          <div class="font-medium">${product.name}</div>
          <div class="text-sm text-gray-400">${
            formatPrice(price)
          } x ${item.qty}</div>
        </div>
        <div class="flex items-center space-x-2 text-lg">
          <button class="qty-btn text-gray-400 hover:text-white" data-id="${item.id}" data-change="-1">−</button>
          <span class="w-5 text-center">${item.qty}</span>
          <button class="qty-btn text-gray-400 hover:text-white" data-id="${item.id}" data-change="+1">+</button>
          <button class="remove-btn text-red-400 hover:text-red-200" data-id="${item.id}">×</button>
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
    if (state.cart.length === 0) return null;
    const orderId = '#VAL-' + Math.floor(Math.random()*1000000).toString().padStart(6, '0');
    const lines = [
      `*Nuevo pedido VAL Digital Services*`,
      `*ID:* ${orderId}`,
      '',
      '*Productos:*'
    ];
    state.cart.forEach(item => {
      const product = state.products.find(p => p.id === item.id);
      const unit = convertPrice(product.priceUSD);
      const line = `- ${product.name} x${item.qty} = ${formatPrice(unit * item.qty)}`;
      lines.push(line);
    });
    const subtotal = state.cart.reduce((sum, item) => {
      const product = state.products.find(p => p.id === item.id);
      return sum + (convertPrice(product.priceUSD) * item.qty);
    }, 0);
    const discount = appliedDiscountAmount(subtotal);
    const total = subtotal - discount;
    lines.push('', '*Subtotal:*', formatPrice(subtotal));
    if (discount > 0) {
      lines.push(`*Descuento (${state.appliedCoupon}):*`, `-${formatPrice(discount)}`);
    }
    lines.push(`*Total:*`, formatPrice(total));
    lines.push('', '_Gracias por confiar en VAL Digital Services._');
    const text = lines.join('%0A');
    const phone = '1234567890'; // placeholder, you can set real number
    return `https://wa.me/${phone}?text=${text}`;
  }

  function checkout() {
    const link = generateWhatsAppLink();
    if (link) {
      window.open(link, '_blank');
    } else {
      showToast('Tu carrito está vacío', 'error');
    }
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
    });
    sortOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const s = opt.getAttribute('data-sort');
        state.sort = s;
        // update button label
        const labelMap = {
          featured: 'Destacados',
          'price-asc': 'Precio Ascendente',
          'price-desc': 'Precio Descendente',
          rating: 'Mejor Calificados'
        };
        sortBtn.querySelector('span').textContent = `Ordenar por: ${labelMap[s]}`;
        sortMenu.classList.add('hidden');
        renderProductGrid();
      });
    });
    document.addEventListener('click', (e) => {
      if (!sortMenu.contains(e.target) && !sortBtn.contains(e.target)) {
        sortMenu.classList.add('hidden');
      }
    });

    // Cart drawer toggle
    const cartBtn = document.getElementById('cartButton');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCart = document.getElementById('closeCart');
    const cartPanel = document.getElementById('cartPanel');
    const updateCartState = (open) => {
      if (open) {
        cartDrawer.classList.remove('pointer-events-none');
        cartPanel.classList.remove('translate-x-full');
        renderCartItems();
        updateCartSummary();
        requestAnimationFrame(() => {
          closeCart.focus();
        });
      } else {
        cartDrawer.classList.add('pointer-events-none');
        cartPanel.classList.add('translate-x-full');
      }
    };
    cartBtn.addEventListener('click', () => {
      const isOpen = !cartPanel.classList.contains('translate-x-full');
      updateCartState(!isOpen);
    });
    closeCart.addEventListener('click', () => {
      updateCartState(false);
    });
    // Close when clicking on backdrop
    cartDrawer.addEventListener('click', (e) => {
      if (e.target === cartDrawer) {
        updateCartState(false);
      }
    });
    // Prevent closing when clicking inside panel
    cartPanel.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Apply coupon button
    document.getElementById('applyCoupon').addEventListener('click', applyCoupon);

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', checkout);

    // Quick view close
    document.getElementById('closeQuickView').addEventListener('click', closeQuickView);
    document.getElementById('quickViewModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeQuickView();
    });

    // WhatsApp float button tooltip
    const waBtn = document.getElementById('whatsappFloat');
    const tooltip = document.getElementById('whatsappTooltip');
    waBtn.addEventListener('mouseenter', () => {
      tooltip.classList.remove('hidden');
    });
    waBtn.addEventListener('mouseleave', () => {
      tooltip.classList.add('hidden');
    });

    // Initial renders
    renderCartItems();
    updateCartSummary();
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
      {
        q: "¿Cómo recibo mi licencia después de la compra?",
        a: "Recibes el código de activación o enlace de descarga por WhatsApp o correo electrónico en menos de 5 minutos después de confirmar el pago."
      },
      {
        q: "¿Las licencias son oficiales y garantizadas?",
        a: "Sí. Todas nuestras licencias son 100% legales, provienen de distribuidores autorizados y incluyen garantía de reemplazo si hay algún problema."
      },
      {
        q: "¿Puedo cambiar o devolver una licencia?",
        a: "Debido a la naturaleza digital de los productos, no se aceptan devoluciones una vez entregado el código. Sin embargo, si el código no funciona, te lo reemplazamos inmediatamente."
      },
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos transferencias bancarias, depósitos y pagos mediante billeteras virtuales. El pago se confirma antes de enviar la licencia."
      },
      {
        q: "¿Hay soporte post-venta?",
        a: "Sí. Ofrecemos asistencia por WhatsApp para instalación, activación y cualquier duda técnica durante el primer mes."
      }
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