window.addEventListener('DOMContentLoaded', () => {

  // ── Auth state ───────────────────────────────────────────────
  const ACCOUNT_PAGES = ['wishlist.html', 'profile.html', 'billing.html', 'address.html'];
  const currentPage   = window.location.pathname.split('/').pop() || 'index.html';
  const IS_ACCOUNT_PAGE = ACCOUNT_PAGES.includes(currentPage);
  const IS_LOGGED_IN = IS_ACCOUNT_PAGE || localStorage.getItem('vv_logged_in') === 'true';
  const USER_NAME     = localStorage.getItem('vv_user_name') || 'Emma';

  const isHomePage = currentPage === 'index.html';

  const NAV_ITEMS = [
    { label: "What's New", href: 'plpNew.html', noActive: true, megaMenu: { listCols: 3, cardCols: 2, cols: [
      { title: 'Shop by Category', links: ['All New Arrivals','Activewear','Bottoms','Dresses','Tops','Swimwear','Innerwear'] },
      { title: 'The Collections', links: ['Spring Brights','Neutral Ground','Black & White'] },
    ], cards: [{ label: 'Spring Brights' }, { label: 'Shop Our Pop-Up' }] }},
    { label: 'Get Inspired', href: 'plpCategory.html', megaMenu: { listCols: 3, cardCols: 2, cols: [
      { title: 'Shop by Style', links: ['Midi Dresses','Maxi Dresses','Mini Dresses','Shirt Dresses','Wrap Dresses','Slip Dresses','Bodycon Dresses'] },
      { title: 'Shop by Occasion', links: ['Casual','Work','Evening','Wedding Guest','Vacation','Brunch'] },
      { title: 'Featured', links: ['Best Sellers','New In','Designer Dresses','Under $200','Under $500'] },
    ], cards: [{ label: 'Dress Edit' }] }},
    { label: 'Summer', href: 'plpCategory.html', megaMenu: { listCols: 3, cardCols: 2, cols: [
      { title: 'Shop by Category', links: ['Dresses','Tops','Shorts','Swimwear','Sandals'] },
      { title: 'Summer Edits', links: ['Resort Wear','Beach Essentials','Sun Dresses','Linen Collection'] },
      { title: 'Trending Now', links: ['Coastal Chic','Maximalist Prints','Sheer Layers','Bold Colour'] },
    ], cards: [{ label: 'Beach Edit' }] }},
    { label: 'Brands', href: 'brands.html' },
    { label: 'Clothing', megaMenu: { listCols: 4, cardCols: 1, cols: [
      { title: 'Dresses', links: ['Midi','Maxi','Mini','Wrap','Slip','Shirt Dress'] },
      { title: 'Tops', links: ['Blouses','T-Shirts','Knitwear','Shirts','Bodysuits'] },
      { title: 'Bottoms', links: ['Trousers','Jeans','Skirts','Shorts','Leggings'] },
      { title: 'Outerwear', links: ['Coats','Jackets','Blazers','Gilets'] },
      { title: 'Bags', links: ['Tote','Shoulder','Crossbody','Clutch','Backpack'] },
      { title: 'Accessories', links: ['Necklaces','Rings','Earrings','Bracelets','Scarves','Sunglasses'] },
      { title: 'Beauty', links: ['Skincare','Makeup','Best Sellers','Natural','Luxury'] },
    ], cards: [{ label: 'Bag Edit' }] }},
    { label: 'Dresses', href: 'plpCategory.html', megaMenu: { listCols: 3, cardCols: 2, cols: [
      { title: 'Style', links: ['Midi','Maxi','Mini','Wrap','Slip'] },
      { title: 'Occasion', links: ['Party','Wedding Guest','Casual','Work'] },
      { title: 'Edit', links: ['New Arrivals','Under £100','Designer','Sustainable'] },
    ], cards: [{ label: 'Dress Edit' }] }},
    { label: 'Active', megaMenu: { listCols: 3, cardCols: 2, cols: [
      { title: 'Women', links: ['Leggings','Sports Bras','Tops','Jackets','Shorts'] },
      { title: 'Training Day Style', links: ['T-Shirts','Shorts','Joggers','Hoodies','Jackets'] },
      { title: 'Shop', links: ['New In','Best Sellers','Sale','Under $100'] },
    ], cards: [{ label: 'Active Edit' }] }},
    { label: 'Shoes', href: 'plpCategory.html', megaMenu: { listCols: 3, cardCols: 2, cols: [
      { title: 'Type', links: ['Heels','Flats','Boots','Sandals','Trainers'] },
     { title: 'Occasion', links: ['Casual','Formal','Sport','Going Out'] },
      { title: 'Shop', links: ['New In','Sale','Designer','Under $50'] },
    ], cards: [{ label: 'Shoe Edit' }] }},
    { label: 'Bags', href: 'plpCategory.html', megaMenu: { listCols: 3, cardCols: 2, cols: [
      { title: 'Style', links: ['Tote','Shoulder','Crossbody','Clutch','Backpack'] },
      { title: 'Size', links: ['Mini','Small','Medium','Large','Oversized'] },
      { title: 'Shop', links: ['New In','Designer','Under $200','Community Top Pick'] },
    ], cards: [{ label: 'Bag Edit' }] }},
    { label: 'Accessories', href: 'plpCategory.html', megaMenu: { listCols: 3, cardCols: 2, cols: [
      { title: 'Jewellery', links: ['Necklaces','Rings','Earrings','Bracelets'] },
      { title: 'Scarves & Hats', links: ['Scarves','Hats','Belts','Sunglasses'] },
      { title: 'Shop', links: ['New In','Designer','Trending','Under $50'] },
    ], cards: [{ label: 'Jewelry-New' }] }},
    { label: 'Beauty', href: 'plpCategory.html', megaMenu: { listCols: 3, cardCols: 2, cols: [
      { title: 'Skincare', links: ['Cleansers','Serums','Moisturisers','SPF','Eye Care'] },
      { title: 'Makeup', links: ['Foundation','Lips','Eyes','Blush','Setting Spray'] },
      { title: 'Shop', links: ['New In','Best Sellers','Natural','Luxury'] },
    ], cards: [{ label: 'Beauty Edit' }] }},
    { label: 'Editorial', href: 'editorial.html', megaMenu: { cols: [
      { title: 'Community', links: ['Lifestyle','Fashion','Trending Styles','Brand Stories','View All'] },
      { title: 'Sustainability & Vision', links: ['Our Mission','Sustainability','Environmental Friendly','View All'] },
    ], stories: [
      { cat: 'Fashion', title: 'Most Wanted', date: '8 hrs ago' },
      { cat: 'Lifestyle', title: 'The Must-See Movies To Add To Your Watch List', date: '8 hrs ago' },
      { cat: 'Fashion', title: 'How To Master Off-Duty Style Like Zoë, Kendall & Co.', date: "16 Apr '26" },
    ]}},
  ];

  const PILL_ITEMS = [
    { label: "What's New", href: 'plpNew.html' },
    { label: 'Summer', href: 'plpCategory.html' },
    { label: 'Clothing', href: 'plp.html' },
    { label: 'Dresses', href: 'plpCategory.html' },
    { label: 'Active', href: 'plpCategory.html' },
    { label: 'Shoes', href: 'plpCategory.html' },
    { label: 'Bags', href: 'plpCategory.html' },
    { label: 'Accessories', href: 'plpCategory.html' },
    { label: 'Beauty', href: 'plpCategory.html' },
  ];

  // ── Desktop nav HTML ─────────────────────────────────────────
  const desktopNavHTML = NAV_ITEMS.map(item => {
    if (!item.megaMenu) {
      const isActive = !item.noActive && item.href === currentPage;
      return `<div class="nav-item"><a href="${item.href || '#'}" class="nav-link${isActive?' is-active':''}">${item.label}</a></div>`;
    }
    const menuId = 'mega-' + item.label.replace(/[\s']+/g, '-');

    // Editorial — 5-col grid
    if (item.megaMenu.stories) {
      const groupsHTML = item.megaMenu.cols.map(col => `
        <div class="mega-group">
          ${col.title ? `<div class="mega-col-title">${col.title}</div>` : ''}
          ${col.links.map(l => `<a href="plpCategory.html" class="mega-link">${l}</a>`).join('')}
        </div>`).join('');
      const storiesHTML = item.megaMenu.stories.map(s => `
        <div class="mega-story">
          <div class="mega-story-img wf-img"></div>
          <div>
            <div class="mega-story-cat">${s.cat}</div>
            <div class="mega-story-title">${s.title}</div>
            <div class="mega-story-date">${s.date}</div>
          </div>
        </div>`).join('');
      return `<div class="nav-item">
        <a href="${item.href || 'plp.html'}" class="nav-link" data-menu="${menuId}">${item.label}</a>
        <div class="mega-menu" id="${menuId}">
          <div class="mega-menu-inner">
            <a href="editorial.html" class="mega-shop-all">Read All ${item.label}</a>
            <div class="mega-grid">
              <div class="mega-links-area" data-cols="2">${groupsHTML}</div>
              <div class="mega-editorial-gap"></div>
              <div class="mega-stories-area">
                <div class="mega-col-title">Latest Stories</div>
                ${storiesHTML}
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }

    // Standard 5-col grid menus
    const listCols = item.megaMenu.listCols;
    const cardCols = item.megaMenu.cardCols;
    const groupsHTML = item.megaMenu.cols.map(col => `
      <div class="mega-group">
        ${col.title ? `<div class="mega-col-title">${col.title}</div>` : ''}
        ${col.links.map(l => `<a href="plpCategory.html" class="mega-link">${l}</a>`).join('')}
      </div>`).join('');
    const cards = item.megaMenu.cards || [];
    const cardsHTML = cards.map(c =>
      `<a href="plpCategory.html" class="mega-card"><div class="mega-card-img wf-img"></div><div class="mega-card-label">${c.label}</div></a>`
    ).join('');
    const actionLabel = 'Shop All';
    const skipShopAll = ['Get Inspired', 'Summer'].includes(item.label);
    const shopAllLink = skipShopAll ? '' : `<a href="plp.html" class="mega-shop-all">${actionLabel} ${item.label}</a>`;
    return `<div class="nav-item">
      <a href="${item.href || 'plp.html'}" class="nav-link" data-menu="${menuId}">${item.label}</a>
      <div class="mega-menu" id="${menuId}">
        <div class="mega-menu-inner">
          ${shopAllLink}
          <div class="mega-grid">
            <div class="mega-links-area" data-cols="${listCols}">${groupsHTML}</div>
            <div class="mega-cards-area" data-cols="${cardCols}">${cardsHTML}</div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
  // ── Mobile accordion links ──────────────────────────────────
  const mobileAccordionLinks = NAV_ITEMS.map(item => {
    if (!item.megaMenu) {
      return `<a href="${item.href||'plp.html'}" class="mobile-nav-link">${item.label}</a>`;
    }
    const subId = 'acc-' + item.label.replace(/[\s']+/g, '-');
    const groupsHTML = item.megaMenu.cols.map((col, i) => {
      const groupId = subId + '-g' + i;
      const isFirst = i === 0;
      const linksHTML = col.links.map(l => `<a href="plpCategory.html" class="mobile-acc-link">${l}</a>`).join('');
      if (!col.title) return `<div class="mobile-acc-group-open">${linksHTML}</div>`;
      return `<div class="mobile-acc-group-item">
        <button class="mobile-acc-group-btn" data-group="${groupId}" aria-expanded="${isFirst}">
          <span>${col.title}</span>
          <span class="mobile-acc-plus" aria-hidden="true">${isFirst ? '−' : '+'}</span>
        </button>
        <div class="mobile-acc-group-body${isFirst ? ' is-open' : ''}" id="${groupId}">${linksHTML}</div>
      </div>`;
    }).join('');
    const cardsHTML = item.megaMenu.cards ? item.megaMenu.cards.map(c =>
      `<a href="plpCategory.html" class="mobile-acc-card">
        <div class="mobile-acc-card-img wf-img"></div>
        <div class="mobile-acc-card-label">${c.label}</div>
      </a>`).join('') : '';
    const storiesHTML = item.megaMenu.stories ? item.megaMenu.stories.map(s =>
      `<div class="mobile-acc-story">
        <div class="mobile-acc-story-img wf-img"></div>
        <div>
          <div class="mobile-acc-story-cat">${s.cat}</div>
          <div class="mobile-acc-story-title">${s.title}</div>
          <div class="mobile-acc-story-date">${s.date}</div>
        </div>
      </div>`).join('') : '';
    const actionLabel = item.label === 'Editorial' ? 'Read All' : 'Shop All';
    const skipShopAll = ['Get Inspired', 'Summer'].includes(item.label);
    const shopAllMobile = skipShopAll ? '' : `
      <div class="shop-all-container" style="padding: 8px 16px; margin-bottom: 8px;">
        <a href="plp.html" style="font-weight:700; text-decoration:none; color:inherit; font-size:.9375rem; display:block;">
          ${actionLabel} ${item.label}
        </a>
      </div>`;
    return `<div class="mobile-acc-item">
      <button class="mobile-nav-link mobile-acc-btn" data-acc="${subId}" aria-expanded="false">
        <span>${item.label}</span>
        <svg class="mobile-acc-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="mobile-acc-body" id="${subId}">
        ${shopAllMobile}
        ${groupsHTML}
        ${cardsHTML ? `<div class="mobile-acc-cards">${cardsHTML}</div>` : ''}
        ${storiesHTML ? `<div class="mobile-acc-stories">${storiesHTML}</div>` : ''}
      </div>
    </div>`;
  }).join('');

  const pillsHTML = PILL_ITEMS.map(p => `<a href="${p.href}" class="pill-link">${p.label}</a>`).join('');

  // ── Account content ──────────────────────────────────────────
  const accountContent = IS_LOGGED_IN ? `
    <div class="account-user-row">
      <div class="user-avatar user-avatar--lg">${USER_NAME.charAt(0)}</div>
      <div>
        <div class="account-user-name">Hi, ${USER_NAME}</div>
        <a href="profile.html" class="utility-link">View My Account</a>
      </div>
    </div>
    <div class="account-btn-row">
      <a href="profile.html" class="btn sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        My Account
      </a>
      <a href="#" class="btn sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
        Orders
      </a>
      
    </div>
    <a href="#" class="btn md full">Sign Out</a>
  ` : `
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

  // ── Sign in trigger HTML ─────────────────────────────────────
  const signinTriggerHTML = IS_LOGGED_IN
    ? `<div class="user-greeting hide-on-mobile" id="signin-trigger">
        <div class="user-avatar">${USER_NAME.charAt(0)}</div>
        <span class="user-greeting-name">Hi, ${USER_NAME}</span>
        <div class="user-greeting-dropdown" id="user-greeting-dropdown">
          <a href="profile.html" class="user-greeting-link">View My Account</a>
          <a href="#" class="user-greeting-link">Track Order History</a>
          <a href="#" class="user-greeting-link">Sign Out</a>

        </div>
       </div>`
    : `<button class="utility-link hide-on-mobile" id="signin-trigger">Sign In / Register</button>`;

  // ── Mobile sign in HTML ──────────────────────────────────────
  const mobileSigninHTML = IS_LOGGED_IN
    ? `<div class="mobile-acc-item">
        <button class="mobile-nav-link mobile-acc-btn" data-acc="acc-user-account" aria-expanded="false">
          <span>Hi, ${USER_NAME}</span>
          <svg class="mobile-acc-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="mobile-acc-body" id="acc-user-account">
          <a href="profile.html" class="mobile-acc-link" style="padding-left:1rem">View My Account</a>
          <a href="#" class="mobile-acc-link" style="padding-left:1rem">Track Order History</a>
        </div>
       </div>`
    : `<div class="mobile-signin-btns">
        <a href="account.html" class="btn sm full">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          My Account
        </a>
        <a href="wishlist.html" class="btn sm full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>
          Wishlist
        </a>
      </div>`;

  const html = `
    <a href="#main-content" class="sr-only">Skip to main content</a>
    <div class="promo-banner" id="promo-banner" data-slide="0" role="region" aria-label="Promotions">
      <button class="promo-nav-btn promo-nav-btn--prev" id="promo-prev" aria-label="Previous offer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div class="promo-track" id="promo-track">
        <div class="promo-slide promo-slide--shipping" role="group" aria-label="Offer 1 of 2">
          <span class="promo-banner-text">FREE Shipping &amp; Returns on all orders</span>
        </div>
        <div class="promo-slide promo-slide--nyc banner-sm" role="group" aria-label="Offer 2 of 2">
          <span class="promo-banner-text">NYC Pop-Up Store &nbsp;&middot;&nbsp; Open May 23&ndash;30 &nbsp;&nbsp;<a href="#">Sign Up</a></span>
        </div>
      </div>
      <button class="promo-nav-btn promo-nav-btn--next" id="promo-next" aria-label="Next offer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div class="promo-dots" aria-hidden="true">
        <button class="promo-dot is-active" data-dot="0"></button>
        <button class="promo-dot" data-dot="1"></button>
      </div>
    </div>
    <header class="site-header" id="site-header">
      <div class="utility-bar">
        <button class="icon-circle-btn mobile-only utility-bar-hamburger" id="hamburger-btn" aria-label="Menu" aria-expanded="false">
          <svg class="icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          <svg class="icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="display:none"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="utility-bar-left">
          <button href="#" class="utility-link">
            <span class="material-icons" style="font-size:16px;">eco</span>
            Ethical Production
          </button>
          
          <button href="#" class="utility-link hide-on-mobile">Need Help?</button>
        </div>
        <a href="index.html" class="site-logo"><img src="images/logo/logo-black.png" alt="Viva Voce" class="site-logo-img" /></a>
        <div class="utility-bar-right">
          ${signinTriggerHTML}
          <button class="icon-circle-btn" id="search-open-btn" aria-label="Search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
          <button class="icon-circle-btn hide-on-mobile" aria-label="Wishlist">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M24.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </button>
          <button class="icon-circle-btn cart-btn" aria-label="Cart" onclick="location.href='cart.html'">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <span class="cart-count">3</span>
          </button>
        </div>
      </div>
      <nav class="main-nav desktop-only" id="main-nav">${desktopNavHTML}</nav>
      ${isHomePage ? `<div class="pill-strip mobile-only">${pillsHTML}</div>` : ''}
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
    <div class="account-modal popup-md" id="account-modal" style="height: fit-content;">
      <div class="account-modal-head">
        <h4>Account</h4>
        <button class="account-modal-close" id="account-modal-close" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="account-modal-content">${accountContent}</div>
    </div>

    <!-- Mobile drawer -->
    <div class="mobile-overlay" id="mobile-overlay"></div>
    <div class="mobile-drawer" id="mobile-drawer">
      <div class="mobile-drawer-inner">
        <div class="mobile-drawer-head">
          <a href="index.html" class="site-logo"><img src="images/logo/logo-black.png" alt="Viva Voce" class="site-logo-img" /></a>
          <button class="icon-circle-btn" id="drawer-close-btn" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="mobile-nav-links" id="mobile-nav-links">
          ${mobileSigninHTML}
          ${mobileAccordionLinks}
          <div class="mobile-drawer-footer">
            <a href="#" class="utility-link">
              <span class="material-icons" style="font-size:16px;">eco</span>
              Ethical Production
            </a>
            <span class="utility-sep">·</span>
            <button class="utility-link" id="mobile-lang-btn">English ▾</button>
            <span class="utility-sep">·</span>
            <a href="#" class="utility-link">Need Help?</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Search overlay -->
    <div class="search-overlay" id="search-overlay" role="dialog" aria-modal="true" aria-label="Search">
      <div class="search-mask" id="search-overlay-mask"></div>
      <div class="search-panel">
        <div class="search-input-row">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          <input class="search-input" type="search" placeholder="Search styles, products..." id="search-field" autocomplete="off"/>
          <button class="search-clear-btn" id="search-clear-btn" aria-label="Clear">Clear</button>
          <button class="icon-circle-btn search-close-btn" id="search-close-btn" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="search-body" id="search-body">
          <div class="search-results-label">Products</div>
          <div class="search-results-grid" id="search-results-grid">
            <a href="pdp.html" class="search-result-card"><div class="wf-img search-result-image"></div><div class="search-result-name">Silk Slip Dress</div><div class="search-result-price">$285.00</div></a>
            <a href="pdp.html" class="search-result-card"><div class="wf-img search-result-image"></div><div class="search-result-name">Linen Blazer</div><div class="search-result-price">$390.00</div></a>
            <a href="pdp.html" class="search-result-card"><div class="wf-img search-result-image"></div><div class="search-result-name">Cashmere Crew Knit</div><div class="search-result-price">$424.00</div></a>
            <a href="pdp.html" class="search-result-card"><div class="wf-img search-result-image"></div><div class="search-result-name">Wide-Leg Trousers</div><div class="search-result-price">$175.00</div></a>
          </div>
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
      btn.addEventListener('mouseenter', () => { hoverEnterTimeout = setTimeout(() => openMenu(menuId, btn), 300); });
      btn.addEventListener('mouseleave', () => { clearTimeout(hoverEnterTimeout); scheduleClose(); });
      btn.addEventListener('click', e => {
        const menu = document.getElementById(menuId);
        if (!menu) return;
        if (!menu.classList.contains('is-open')) { e.preventDefault(); e.stopPropagation(); openMenu(menuId, btn); }
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

  // Nav overflow: between 961px-1100px hide desktop nav, show pill-strip
  function checkNavOverflow() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    const w = window.innerWidth;
    if (w > 960 && w <= 1100) {
      nav.style.setProperty('display', 'none', 'important');
      const pill = document.querySelector('#site-header .pill-strip');
      if (pill) pill.style.setProperty('display', 'flex', 'important');
    } else {
      nav.style.removeProperty('display');
      const pill = document.querySelector('#site-header .pill-strip');
      if (pill) pill.style.removeProperty('display');
    }
  }
  checkNavOverflow();
  window.addEventListener('resize', checkNavOverflow);

  // ── Account popup (desktop) / modal (mobile) ─────────────────
  function openAccount() {
    if (window.innerWidth >= 1101) {
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
      document.querySelectorAll('.mobile-acc-body.is-open').forEach(b => {
        b.classList.remove('is-open');
        b.previousElementSibling?.setAttribute('aria-expanded','false');
        b.previousElementSibling?.querySelector('.mobile-acc-icon') && (b.previousElementSibling.querySelector('.mobile-acc-icon').style.transform = '');
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
  const SEARCH_KEYWORDS = ['dresses', 'clothing', 'pants', 'shirts', 'jeans'];
  const SEARCH_SUGGESTIONS = {
    dresses:  ['Summer Dresses','Casual Dresses','Maxi Dresses','Midi Dresses','Wedding Guest Dresses','Wrap Dresses'],
    clothing: ['Summer Clothing','Active Clothing','New In Clothing','Sale Clothing','Designer Clothing','Sustainable Clothing'],
    pants:    ['Wide-Leg Pants','Tailored Pants','Linen Pants','Leather Pants','Cropped Pants','High-Waist Pants'],
    shirts:   ['Linen Shirts','Oversized Shirts','Silk Shirts','Striped Shirts','Button-Down Shirts','Cropped Shirts'],
    jeans:    ['Straight Jeans','Wide-Leg Jeans','Cropped Jeans','High-Rise Jeans','Skinny Jeans','Flare Jeans'],
  };
  const SEARCH_PRODUCTS = {
    dresses:  [{name:'Silk Slip Dress',price:'$285.00'},{name:'Wrap Midi Dress',price:'$195.00'},{name:'Maxi Floral Dress',price:'$240.00'},{name:'Bodycon Mini',price:'$165.00'}],
    clothing: [{name:'Linen Blazer',price:'$390.00'},{name:'Cashmere Crew Knit',price:'$424.00'},{name:'Oversized Shirt',price:'$120.00'},{name:'Tailored Coat',price:'$580.00'}],
    pants:    [{name:'Wide-Leg Trousers',price:'$175.00'},{name:'Tailored Pants',price:'$210.00'},{name:'Pleated Wide Leg',price:'$195.00'},{name:'Slim Fit Trousers',price:'$160.00'}],
    shirts:   [{name:'Oversized Oxford',price:'$130.00'},{name:'Silk Blouse',price:'$220.00'},{name:'Striped Shirt',price:'$110.00'},{name:'Linen Shirt',price:'$145.00'}],
    jeans:    [{name:'High-Rise Straight',price:'$195.00'},{name:'Wide Leg Jeans',price:'$210.00'},{name:'Slim Fit Jeans',price:'$175.00'},{name:'Cropped Flare',price:'$185.00'}],
  };
  const FEATURED_HTML = `
    <div class="search-results-label">Products</div>
    <div class="search-results-grid">
      <a href="pdp.html" class="search-result-card"><div class="wf-img search-result-image"></div><div class="search-result-name">Silk Slip Dress</div><div class="search-result-price">$285.00</div></a>
      <a href="pdp.html" class="search-result-card"><div class="wf-img search-result-image"></div><div class="search-result-name">Linen Blazer</div><div class="search-result-price">$390.00</div></a>
      <a href="pdp.html" class="search-result-card"><div class="wf-img search-result-image"></div><div class="search-result-name">Cashmere Crew Knit</div><div class="search-result-price">$420.00</div></a>
      <a href="pdp.html" class="search-result-card"><div class="wf-img search-result-image"></div><div class="search-result-name">Wide-Leg Trousers</div><div class="search-result-price">$175.00</div></a>
    </div>`;

  function fuzzyMatch(input, keyword) {
    const q = input.toLowerCase(); const k = keyword.toLowerCase();
    if (k.includes(q)) return true;
    let qi = 0;
    for (let i = 0; i < k.length && qi < q.length; i++) { if (k[i] === q[qi]) qi++; }
    return qi === q.length;
  }

  function renderSearch(query) {
    const body = document.getElementById('search-body');
    const clearBtn = document.getElementById('search-clear-btn');
    if (!body) return;
    clearBtn.style.display = query ? '' : 'none';
    if (!query) { body.innerHTML = FEATURED_HTML; return; }
    const matched = SEARCH_KEYWORDS.filter(k => fuzzyMatch(query, k));
    if (!matched.length) { body.innerHTML = `<p class="search-no-results">No results found for &ldquo;${query}&rdquo;. Try another search.</p>`; return; }
    const pillsHTML = `<div class="search-pills">${matched.flatMap(k => SEARCH_SUGGESTIONS[k].map(s => `<button class="search-pill" data-pill="${s}">${s}</button>`)).join('')}</div>`;
    const cardsHTML = matched.flatMap(k => SEARCH_PRODUCTS[k]).map(p => `<a href="pdp.html" class="search-result-card"><div class="wf-img search-result-image"></div><div class="search-result-name">${p.name}</div><div class="search-result-price">${p.price}</div></a>`).join('');
    body.innerHTML = `${pillsHTML}<div class="search-results-label">Products</div><div class="search-results-grid">${cardsHTML}</div>`;
    body.querySelectorAll('.search-pill').forEach(btn => {
      btn.addEventListener('click', () => { const field = document.getElementById('search-field'); if (field) field.value = btn.dataset.pill; renderSearch(btn.dataset.pill); });
    });
  }

  function openSearch() { document.getElementById('search-overlay').classList.add('is-open'); document.body.style.overflow = 'hidden'; setTimeout(() => document.getElementById('search-field')?.focus(), 50); }
  function closeSearch() { document.getElementById('search-overlay').classList.remove('is-open'); document.body.style.overflow = ''; const field = document.getElementById('search-field'); if (field) { field.value = ''; renderSearch(''); } }

  document.getElementById('search-open-btn')?.addEventListener('click', openSearch);
  document.getElementById('search-close-btn')?.addEventListener('click', closeSearch);
  document.getElementById('search-overlay-mask')?.addEventListener('click', closeSearch);
  document.getElementById('search-clear-btn')?.addEventListener('click', () => { const field = document.getElementById('search-field'); if (field) { field.value = ''; field.focus(); renderSearch(''); } });
  document.getElementById('search-field')?.addEventListener('input', e => renderSearch(e.target.value.trim()));

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

  // ── Promo banner carousel (mobile <900px only) ───────────────
  (function () {
    const banner = document.getElementById('promo-banner');
    const track  = document.getElementById('promo-track');
    const dots   = document.querySelectorAll('.promo-dot');
    const total  = 2; let current = 0; let autoTimer = null;
    function goTo(index) { current = (index + total) % total; track.style.transform = `translateX(-${current * 100}%)`; banner.setAttribute('data-slide', current); dots.forEach((d, i) => d.classList.toggle('is-active', i === current)); }
    function startAuto() { clearInterval(autoTimer); autoTimer = setInterval(() => goTo(current + 1), 5000); }
    function stopAuto() { clearInterval(autoTimer); }
    function isMobile() { return window.innerWidth < 900; }
    function init() { if (isMobile()) { goTo(current); startAuto(); } else { stopAuto(); track.style.transform = ''; banner.setAttribute('data-slide', '0'); } }
    document.getElementById('promo-prev')?.addEventListener('click', () => { if (isMobile()) { goTo(current - 1); stopAuto(); startAuto(); } });
    document.getElementById('promo-next')?.addEventListener('click', () => { if (isMobile()) { goTo(current + 1); stopAuto(); startAuto(); } });
    dots.forEach(d => d.addEventListener('click', () => { if (isMobile()) { goTo(Number(d.dataset.dot)); stopAuto(); startAuto(); } }));
    banner?.addEventListener('mouseenter', () => { if (isMobile()) stopAuto(); });
    banner?.addEventListener('mouseleave', () => { if (isMobile()) startAuto(); });
    window.addEventListener('resize', init);
    init();
  }());

  // ── Escape ───────────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.mega-menu').forEach(m => m.classList.remove('is-open'));
    document.querySelectorAll('.nav-link.menu-open').forEach(b => b.classList.remove('menu-open'));
    document.getElementById('lang-picker-dropdown')?.classList.remove('is-open');
    closeSearch(); closeDrawer(); closeAccount();
  });
});

// ── Wishlist button redirect ─────────────────────────────────
document.addEventListener('click', function (e) {
  const wishlistBtn = e.target.closest('.icon-circle-btn[aria-label="Wishlist"]');
  if (wishlistBtn) window.location.href = 'wishlist.html';
});