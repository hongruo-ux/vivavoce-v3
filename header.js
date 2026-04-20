window.addEventListener('DOMContentLoaded', () => {

  const NAV_ITEMS = [
    { label: "What's New", href: 'plp.html', noActive: true },
    { label: 'Get Inspired', megaMenu: { cols: [
      { title: 'Shop by Style', links: ['All Dresses','Midi Dresses','Maxi Dresses','Mini Dresses','Shirt Dresses','Wrap Dresses','Slip Dresses','Bodycon Dresses'] },
      { title: 'Shop by Occasion', links: ['Casual','Work','Evening','Wedding Guest','Vacation','Brunch'] },
      { title: 'Featured', links: ['Best Sellers','New In','Designer Dresses','Under $200','Under $500'] },
    ], cards: [{ label: 'Dress Edit' }, { label: 'New Season' }] }},
    { label: 'Summer', megaMenu: { cols: [
      { title: 'Shop by Category', links: ['Dresses','Tops','Shorts','Swimwear','Sandals'] },
      { title: 'Summer Edits', links: ['Resort Wear','Beach Essentials','Sun Dresses','Linen Collection'] },
      { title: 'Trending Now', links: ['Coastal Chic','Maximalist Prints','Sheer Layers','Bold Colour'] },
    ], cards: [{ label: 'Vacation Shop' }, { label: 'Beach Edit' }] }},
    { label: 'Brands', href: 'brands.html' },
    { label: 'Clothing', megaMenu: { cols: [
      { title: 'Dresses', links: ['Midi','Maxi','Mini','Wrap','Slip','Shirt Dress'] },
      { title: 'Tops', links: ['Blouses','T-Shirts','Knitwear','Shirts','Bodysuits'] },
      { title: 'Bottoms', links: ['Trousers','Jeans','Skirts','Shorts','Leggings'] },
      { title: 'Outerwear', links: ['Coats','Jackets','Blazers','Gilets'] },
    ], cards: [{ label: 'New In' }] }},
    { label: 'Dresses', megaMenu: { cols: [
      { title: 'Style', links: ['Midi','Maxi','Mini','Wrap','Slip'] },
      { title: 'Occasion', links: ['Party','Wedding Guest','Casual','Work'] },
      { title: 'Edit', links: ['New Arrivals','Under £100','Designer','Sustainable'] },
    ], cards: [{ label: 'Dress Edit' }] }},
    { label: 'Active', megaMenu: { cols: [
      { title: 'Women', links: ['Leggings','Sports Bras','Tops','Jackets','Shorts'] },
      { title: 'Men', links: ['T-Shirts','Shorts','Joggers','Hoodies','Jackets'] },
      { title: 'Shop', links: ['New In','Best Sellers','Sale','Under $100'] },
    ], cards: [{ label: 'Active Edit' }] }},
    { label: 'Shoes', megaMenu: { cols: [
      { title: 'Type', links: ['Heels','Flats','Boots','Sandals','Trainers'] },
      { title: 'Occasion', links: ['Casual','Formal','Sport','Going Out'] },
      { title: 'Shop', links: ['New In','Sale','Designer','Under $50'] },
    ], cards: [{ label: 'Shoe Edit' }] }},
    { label: 'Bags', megaMenu: { cols: [
      { title: 'Style', links: ['Tote','Shoulder','Crossbody','Clutch','Backpack'] },
      { title: 'Size', links: ['Mini','Small','Medium','Large','Oversized'] },
      { title: 'Shop', links: ['New In','Designer','Under $200','Sale'] },
    ], cards: [{ label: 'Bag Edit' }] }},
    { label: 'Accessories', megaMenu: { cols: [
      { title: 'Jewellery', links: ['Necklaces','Rings','Earrings','Bracelets'] },
      { title: 'Scarves & Hats', links: ['Scarves','Hats','Belts','Sunglasses'] },
      { title: 'Shop', links: ['New In','Designer','Trending','Under $50'] },
    ], cards: [{ label: 'Accessories Edit' }] }},
    { label: 'Beauty', megaMenu: { cols: [
      { title: 'Skincare', links: ['Cleansers','Serums','Moisturisers','SPF','Eye Care'] },
      { title: 'Makeup', links: ['Foundation','Lips','Eyes','Blush','Setting Spray'] },
      { title: 'Shop', links: ['New In','Best Sellers','Natural','Luxury'] },
    ], cards: [{ label: 'Beauty Edit' }] }},
    { label: 'Editorial', megaMenu: { cols: [
      { title: 'Community', links: ['Lifestyle','Fashion','Trending Styles','Brand Stories','View All'] },
      { title: 'Sustainability & Vision', links: ['Our Mission','Sustainability','Environmental Friendly','View All'] },
    ], stories: [
      { cat: 'Fashion', title: 'Most Wanted', date: '8 hrs ago' },
      { cat: 'Lifestyle', title: 'The Must-See Movies To Add To Your Watch List', date: '8 hrs ago' },
      { cat: 'Fashion', title: 'How To Master Off-Duty Style Like Zoë, Kendall & Co.', date: "16 Apr '26" },
    ]}},
  ];

  const PILL_ITEMS = [
    { label: "What's New", href: 'plp.html' },
    { label: 'Summer', href: 'plp.html' },
    { label: 'Clothing', href: 'plp.html' },
    { label: 'Dresses', href: 'plp.html' },
    { label: 'Active', href: 'plp.html' },
    { label: 'Shoes', href: 'plp.html' },
    { label: 'Bags', href: 'plp.html' },
    { label: 'Accessories', href: 'plp.html' },
    { label: 'Beauty', href: 'plp.html' },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // ── Desktop nav HTML ─────────────────────────────────────────
  const desktopNavHTML = NAV_ITEMS.map(item => {
    if (!item.megaMenu) {
      const isActive = !item.noActive && item.href === currentPage;
      return `<div class="nav-item"><a href="${item.href||'#'}" class="nav-link${isActive?' is-active':''}">${item.label}</a></div>`;
    }
    const menuId = 'mega-' + item.label.replace(/[\s']+/g, '-');
    const cols = item.megaMenu.cols.map(col => `
      <div class="mega-col">
        ${col.title ? `<div class="mega-col-title">${col.title}</div>` : ''}
        ${col.links.map(l => `<a href="plp.html" class="mega-link">${l}</a>`).join('')}
      </div>`).join('');
    let extra = '';
    if (item.megaMenu.cards) {
      extra = item.megaMenu.cards.map(c => `
        <a href="plp.html" class="mega-card">
          <div class="mega-card-img wf-img"></div>
          <div class="mega-card-label">${c.label}</div>
        </a>`).join('');
    }
    if (item.megaMenu.stories) {
      extra = `<div class="mega-stories-col">
        <div class="mega-col-title">Latest Stories</div>
        ${item.megaMenu.stories.map(s => `
          <div class="mega-story">
            <div class="mega-story-img wf-img"></div>
            <div>
              <div class="mega-story-cat">${s.cat}</div>
              <div class="mega-story-title">${s.title}</div>
              <div class="mega-story-date">${s.date}</div>
            </div>
          </div>`).join('')}
      </div>`;
    }
    return `<div class="nav-item"><button class="nav-link" data-menu="${menuId}">${item.label}</button><div class="mega-menu" id="${menuId}"><div class="mega-menu-inner">${cols}${extra}</div></div></div>`;
  }).join('');

  // ── Mobile accordion links ──────────────────────────────────
  const mobileAccordionLinks = NAV_ITEMS.map(item => {
    // Direct link — no mega menu
    if (!item.megaMenu) {
      return `<a href="${item.href||'plp.html'}" class="mobile-nav-link">${item.label}</a>`;
    }

    const subId = 'acc-' + item.label.replace(/[\s']+/g, '-');

    // Inner column groups — each with +/− toggle, first one open by default
    const groupsHTML = item.megaMenu.cols.map((col, i) => {
      const groupId = subId + '-g' + i;
      const isFirst = i === 0;
      const linksHTML = col.links.map(l =>
        `<a href="plp.html" class="mobile-acc-link">${l}</a>`
      ).join('');
      if (!col.title) {
        return `<div class="mobile-acc-group-open">${linksHTML}</div>`;
      }
      return `<div class="mobile-acc-group-item">
        <button class="mobile-acc-group-btn" data-group="${groupId}" aria-expanded="${isFirst}">
          <span>${col.title}</span>
          <span class="mobile-acc-plus" aria-hidden="true">${isFirst ? '−' : '+'}</span>
        </button>
        <div class="mobile-acc-group-body${isFirst ? ' is-open' : ''}" id="${groupId}">${linksHTML}</div>
      </div>`;
    }).join('');

    // Featured cards (if any)
    const cardsHTML = item.megaMenu.cards ? item.megaMenu.cards.map(c =>
      `<a href="plp.html" class="mobile-acc-card">
        <div class="mobile-acc-card-img wf-img"></div>
        <div class="mobile-acc-card-label">${c.label}</div>
      </a>`
    ).join('') : '';

    // Editorial stories (if any)
    const storiesHTML = item.megaMenu.stories ? item.megaMenu.stories.map(s =>
      `<div class="mobile-acc-story">
        <div class="mobile-acc-story-img wf-img"></div>
        <div>
          <div class="mobile-acc-story-cat">${s.cat}</div>
          <div class="mobile-acc-story-title">${s.title}</div>
          <div class="mobile-acc-story-date">${s.date}</div>
        </div>
      </div>`
    ).join('') : '';

    const cardsSection = cardsHTML ? `<div class="mobile-acc-cards">${cardsHTML}</div>` : '';
    const storiesSection = storiesHTML ? `<div class="mobile-acc-stories">${storiesHTML}</div>` : '';

    return `<div class="mobile-acc-item">
      <button class="mobile-nav-link mobile-acc-btn" data-acc="${subId}" aria-expanded="false">
        <span>${item.label}</span>
        <svg class="mobile-acc-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="mobile-acc-body" id="${subId}">
        ${groupsHTML}
        ${cardsSection}
        ${storiesSection}
      </div>
    </div>`;
  }).join('');

    const pillsHTML = PILL_ITEMS.map(p => `<a href="${p.href}" class="pill-link">${p.label}</a>`).join('');

  // ── Account content (shared between popup and modal) ─────────
  const accountContent = `
    <a href="account.html" class="btn filled md full">Sign in to Viva Voce</a>
    <a href="account.html" class="btn secondary md full">Other sign in options</a>
    <div class="account-btn-row">
      <a href="account.html" class="btn sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
        Orders
      </a>
      <a href="account.html" class="btn sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        Profile
      </a>
    </div>`;

  const html = `
    <a href="#main-content" class="sr-only">Skip to main content</a>
    <div class="promo-banner" id="promo-banner">
      <span class="promo-banner-text">FREE Shipping &amp; Returns on all orders</span>
      <button class="promo-banner-close" id="promo-banner-close" aria-label="Dismiss">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <header class="site-header" id="site-header">
      <div class="utility-bar">
        <div class="utility-bar-left">
          <span class="utility-ships">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
            Ships Globally
          </span>
          <div class="lang-picker" id="lang-picker">
            <button class="lang-picker-btn" id="lang-picker-btn" aria-haspopup="listbox" aria-expanded="false">
              <span id="lang-label">English</span>
              <svg class="lang-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="lang-picker-dropdown" id="lang-picker-dropdown" role="listbox">
              <button class="lang-picker-option is-selected" data-lang="English" role="option">English</button>
              <button class="lang-picker-option" data-lang="Español" role="option">Español</button>
            </div>
            
          </div>
          <a href="#" class="utility-link hide-on-mobile">Need Help?</a>

        </div>
        <a href="index.html" class="site-logo">viva voce</a>
        <div class="utility-bar-right">
          <button class="utility-link hide-on-mobile" id="signin-trigger">Sign In / Register</button>
          <button class="icon-circle-btn" id="search-open-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
          <button class="icon-circle-btn" aria-label="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </button>
          <button class="icon-circle-btn cart-btn" aria-label="Cart" onclick="location.href='cart.html'">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <span class="cart-count">3</span>
          </button>
          <button class="icon-circle-btn mobile-only" id="hamburger-btn" aria-label="Menu" aria-expanded="false">
            <svg class="icon-open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            <svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="display:none"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
      <nav class="main-nav desktop-only" id="main-nav">${desktopNavHTML}</nav>
      <div class="pill-strip mobile-only">${pillsHTML}</div>
    </header>

    <!-- Desktop account popup -->
    <div class="account-popup popup-sm" id="account-popup">
      <div class="account-popup-content">
        <h4>Account</h4>
        ${accountContent}
      </div>
    </div>

    <!-- Mobile account modal with mask -->
    <div class="account-modal-mask" id="account-modal-mask"></div>
    <div class="account-modal popup-lg" id="account-modal">
      <div class="account-modal-head">
        <h4>Account</h4>
        <button class="account-modal-close" id="account-modal-close" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="account-modal-content">${accountContent}</div>
    </div>

    <!-- Mobile drawer -->
    <div class="mobile-overlay" id="mobile-overlay"></div>
    <div class="mobile-drawer" id="mobile-drawer">
      <div class="mobile-drawer-inner">
        <div class="mobile-drawer-head">
          <a href="index.html" class="site-logo">viva voce</a>
          <button class="icon-circle-btn" id="drawer-close-btn" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="mobile-nav-links" id="mobile-nav-links">
              <button class="mobile-nav-link signin-link" id="mobile-signin-btn">Sign In / Register</button>
              ${mobileAccordionLinks}
            <div class="mobile-drawer-footer">
              <span class="utility-ships">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                Ships Globally
              </span>
              <span class="utility-sep">·</span>
              <button class="utility-link" id="mobile-lang-btn">English ▾</button>
              <span class="utility-sep">·</span>
              
              <a href="#" class="utility-link">Need Help?</a>
            </div>

        </div>
      </div>
    </div>

    <!-- Search overlay -->
    <div class="search-overlay" id="search-overlay">
      <div class="search-overlay-mask" id="search-overlay-mask"></div>
      <div class="search-panel">
        <div class="search-row">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          <input class="search-field" type="search" placeholder="Search brands, styles, products..." id="search-field"/>
          <button class="icon-circle-btn" id="search-close-btn" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="search-results-label">Products</div>
        <div class="search-results-grid">
          <a href="pdp.html" class="search-result-card"><div class="wf-img" style="aspect-ratio:3/4;margin-bottom:6px"></div><div class="search-result-name">Silk Slip Dress</div><div class="search-result-price">$285.00</div></a>
          <a href="pdp.html" class="search-result-card"><div class="wf-img" style="aspect-ratio:3/4;margin-bottom:6px"></div><div class="search-result-name">Linen Blazer</div><div class="search-result-price">$390.00</div></a>
          <a href="pdp.html" class="search-result-card"><div class="wf-img" style="aspect-ratio:3/4;margin-bottom:6px"></div><div class="search-result-name">Cashmere Crew Knit</div><div class="search-result-price">$420.00</div></a>
          <a href="pdp.html" class="search-result-card"><div class="wf-img" style="aspect-ratio:3/4;margin-bottom:6px"></div><div class="search-result-name">Wide-Leg Trousers</div><div class="search-result-price">$175.00</div></a>
        </div>
      </div>
    </div>`;

  // ── Inject HTML ─────────────────────────────────────────────
  const placeholder = document.getElementById('main-header');
  if (placeholder) { placeholder.insertAdjacentHTML('afterend', html); placeholder.remove(); }
  else { document.body.insertAdjacentHTML('afterbegin', html); }

  // ── Mega menu positioning ────────────────────────────────────
  function positionMegaMenus() {
    const hdr = document.getElementById('site-header');
    if (!hdr) return;
    const top = hdr.getBoundingClientRect().bottom;
    document.querySelectorAll('.mega-menu').forEach(m => m.style.top = top + 'px');
  }

  // ── Mega menu hover + click ──────────────────────────────────
  let hoverTimeout = null;
  function openMenu(menuId, btn) {
    clearTimeout(hoverTimeout);
    document.querySelectorAll('.mega-menu').forEach(m => m.classList.remove('is-open'));
    document.querySelectorAll('.nav-link.menu-open').forEach(b => b.classList.remove('menu-open'));
    const menu = document.getElementById(menuId);
    if (!menu) return;
    positionMegaMenus();
    menu.classList.add('is-open');
    btn.classList.add('menu-open');
  }
  function scheduleClose() {
    hoverTimeout = setTimeout(() => {
      document.querySelectorAll('.mega-menu').forEach(m => m.classList.remove('is-open'));
      document.querySelectorAll('.nav-link.menu-open').forEach(b => b.classList.remove('menu-open'));
    }, 180);
  }
  setTimeout(() => {
    document.querySelectorAll('[data-menu]').forEach(btn => {
      const menuId = btn.dataset.menu;
      let hoverEnterTimeout = null;
      btn.addEventListener('mouseenter', () => {
        hoverEnterTimeout = setTimeout(() => openMenu(menuId, btn), 300);
      });
      btn.addEventListener('mouseleave', () => {
        clearTimeout(hoverEnterTimeout);
        scheduleClose();
      });
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const menu = document.getElementById(menuId);
        if (!menu) return;
        if (menu.classList.contains('is-open')) { menu.classList.remove('is-open'); btn.classList.remove('menu-open'); }
        else { openMenu(menuId, btn); }
      });
    });
    document.querySelectorAll('.mega-menu').forEach(menu => {
      menu.addEventListener('mouseenter', () => clearTimeout(hoverTimeout));
      menu.addEventListener('mouseleave', scheduleClose);
    });
  }, 0);
  document.addEventListener('click', e => {
    if (!e.target.closest('[data-menu]') && !e.target.closest('.mega-menu')) {
      document.querySelectorAll('.mega-menu').forEach(m => m.classList.remove('is-open'));
      document.querySelectorAll('.nav-link.menu-open').forEach(b => b.classList.remove('menu-open'));
    }
  });
  window.addEventListener('scroll', () => { if (document.querySelector('.mega-menu.is-open')) positionMegaMenus(); }, { passive: true });
  window.addEventListener('resize', positionMegaMenus);

  // ── Account popup (desktop) / modal (mobile) ─────────────────
  function openAccount() {
    if (window.innerWidth >= 961) {
      const popup = document.getElementById('account-popup');
      if (popup.classList.contains('is-open')) { closeAccount(); return; }
      const rect = document.getElementById('signin-trigger').getBoundingClientRect();
      popup.style.top = (rect.bottom + 8) + 'px';
      popup.style.right = (window.innerWidth - rect.right) + 'px';
      popup.style.left = 'auto';
      popup.classList.add('is-open');
    } else {
      document.getElementById('account-modal-mask').classList.add('is-open');
      document.getElementById('account-modal').classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeAccount() {
    document.getElementById('account-popup')?.classList.remove('is-open');
    document.getElementById('account-modal')?.classList.remove('is-open');
    document.getElementById('account-modal-mask')?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  document.getElementById('signin-trigger')?.addEventListener('click', e => { e.stopPropagation(); openAccount(); });
  document.getElementById('mobile-signin-btn')?.addEventListener('click', () => { closeDrawer(); openAccount(); });
  document.getElementById('account-modal-close')?.addEventListener('click', closeAccount);
  document.getElementById('account-modal-mask')?.addEventListener('click', closeAccount);
  document.addEventListener('click', e => {
    if (!e.target.closest('#account-popup') && !e.target.closest('#signin-trigger'))
      document.getElementById('account-popup')?.classList.remove('is-open');
  });

  // ── Mobile drawer ────────────────────────────────────────────
  function openDrawer() {
    document.getElementById('mobile-drawer').classList.add('is-open');
    document.getElementById('mobile-overlay').classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const btn = document.getElementById('hamburger-btn');
    if (btn) { btn.querySelector('.icon-open').style.display='none'; btn.querySelector('.icon-close').style.display=''; btn.setAttribute('aria-expanded','true'); }
  }
  function closeDrawer() {
    document.getElementById('mobile-drawer').classList.remove('is-open');
    document.getElementById('mobile-overlay').classList.remove('is-open');
    document.body.style.overflow = '';
    const btn = document.getElementById('hamburger-btn');
    if (btn) { btn.querySelector('.icon-open').style.display=''; btn.querySelector('.icon-close').style.display='none'; btn.setAttribute('aria-expanded','false'); }
    // Close all accordion items and inner groups
    document.querySelectorAll('.mobile-acc-body.is-open').forEach(b => {
      b.classList.remove('is-open');
      b.previousElementSibling?.setAttribute('aria-expanded','false');
      const icon = b.previousElementSibling?.querySelector('.mobile-acc-icon');
      if (icon) icon.style.transform = '';
    });
    document.querySelectorAll('.mobile-acc-group-body.is-open').forEach(b => {
      b.classList.remove('is-open');
      const plus = b.previousElementSibling?.querySelector('.mobile-acc-plus');
      if (plus) plus.textContent = '+';
    });
  }
  document.getElementById('hamburger-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-drawer').classList.contains('is-open') ? closeDrawer() : openDrawer();
  });
  document.getElementById('drawer-close-btn')?.addEventListener('click', closeDrawer);
  document.getElementById('mobile-overlay')?.addEventListener('click', closeDrawer);

  // ── Mobile accordion — outer nav items ──────────────────────
  document.querySelectorAll('.mobile-acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.acc;
      const body = document.getElementById(id);
      const isOpen = body.classList.contains('is-open');
      // Close all outer items
      document.querySelectorAll('.mobile-acc-body.is-open').forEach(b => {
        b.classList.remove('is-open');
        b.previousElementSibling?.setAttribute('aria-expanded','false');
        b.previousElementSibling?.querySelector('.mobile-acc-icon')?.style && (b.previousElementSibling.querySelector('.mobile-acc-icon').style.transform = '');
      });
      if (!isOpen) {
        body.classList.add('is-open');
        btn.setAttribute('aria-expanded','true');
        const icon = btn.querySelector('.mobile-acc-icon');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // ── Mobile accordion — inner group toggles (+/−) ─────────────
  document.querySelectorAll('.mobile-acc-group-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.group;
      const body = document.getElementById(id);
      const isOpen = body.classList.contains('is-open');
      const plus = btn.querySelector('.mobile-acc-plus');
      body.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (plus) plus.textContent = isOpen ? '+' : '−';
    });
  });

  // ── Search ───────────────────────────────────────────────────
  function openSearch() { document.getElementById('search-overlay').classList.add('is-open'); document.body.style.overflow='hidden'; setTimeout(()=>document.getElementById('search-field')?.focus(),50); }
  function closeSearch() { document.getElementById('search-overlay').classList.remove('is-open'); document.body.style.overflow=''; }
  document.getElementById('search-open-btn')?.addEventListener('click', openSearch);
  document.getElementById('search-close-btn')?.addEventListener('click', closeSearch);
  document.getElementById('search-overlay-mask')?.addEventListener('click', closeSearch);

  // ── Language picker ─────────────────────────────────────────
  document.getElementById('lang-picker-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    const dropdown = document.getElementById('lang-picker-dropdown');
    const btn = document.getElementById('lang-picker-btn');
    const isOpen = dropdown.classList.contains('is-open');
    dropdown.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
  document.querySelectorAll('.lang-picker-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.getElementById('lang-label').textContent = opt.dataset.lang;
      document.querySelectorAll('.lang-picker-option').forEach(o => o.classList.remove('is-selected'));
      opt.classList.add('is-selected');
      document.getElementById('lang-picker-dropdown').classList.remove('is-open');
      document.getElementById('lang-picker-btn').setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('#lang-picker')) {
      document.getElementById('lang-picker-dropdown')?.classList.remove('is-open');
      document.getElementById('lang-picker-btn')?.setAttribute('aria-expanded', 'false');
    }
  });

  // ── Promo banner dismiss ────────────────────────────────────
  document.getElementById('promo-banner-close')?.addEventListener('click', () => {
    const banner = document.getElementById('promo-banner');
    if (banner) banner.style.display = 'none';
  });

  // ── Escape ───────────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.mega-menu').forEach(m => m.classList.remove('is-open'));
    document.querySelectorAll('.nav-link.menu-open').forEach(b => b.classList.remove('menu-open'));
    document.getElementById('lang-picker-dropdown')?.classList.remove('is-open');
    closeSearch(); closeDrawer(); closeAccount();
  });
});
