/* ============================================================
   MINI CART — JS
   Opens on Add to Bag click on PDP.
   Qty controls, delete, subtotal update, close handlers.
   ============================================================ */

(function () {

  var overlay  = document.getElementById('mini-cart-overlay');
  var drawer   = document.getElementById('mini-cart');

  /* ── Open / Close ─────────────────────────────────────── */
  function openMiniCart() {
    if (!drawer || !overlay) return;
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMiniCart() {
    if (!drawer || !overlay) return;
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* ── Expose openMiniCart globally for inline onclick ──── */
  window.openMiniCart = openMiniCart;

  /* ── Close triggers ───────────────────────────────────── */
  var closeBtn = document.getElementById('mini-cart-close');
  if (closeBtn)  closeBtn.addEventListener('click', closeMiniCart);
  if (overlay)   overlay.addEventListener('click', closeMiniCart);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMiniCart();
  });

  /* ── Qty controls ─────────────────────────────────────── */
  function updateSubtotal() {
    var items   = document.querySelectorAll('#mini-cart .cart-item');
    var total   = 0;
    var count   = 0;

    items.forEach(function (item) {
      var qtyEl    = item.querySelector('.qty-val');
      var priceEl  = item.querySelector('.product-price');
      if (!qtyEl || !priceEl) return;

      var qty   = parseInt(qtyEl.textContent, 10) || 0;
      var price = parseFloat(priceEl.dataset.price) || 0;
      total += qty * price;
      count += qty;
    });

    var subtotalEl = document.getElementById('mini-cart-subtotal-value');
    var countEl    = document.getElementById('mini-cart-item-count');
    var titleCount = document.getElementById('mini-cart-title-count');

    if (subtotalEl) subtotalEl.textContent = '$' + total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (countEl)    countEl.textContent    = count + (count === 1 ? ' item' : ' items');
    if (titleCount) titleCount.textContent = '(' + count + ')';
  }

  document.addEventListener('click', function (e) {
    /* Qty decrease */
    if (e.target.closest('#mini-cart .qty-btn:first-of-type') ||
        (e.target.closest('#mini-cart .qty-ctrl') && e.target.textContent.trim() === '−')) {
      var qtyEl = e.target.closest('.qty-ctrl').querySelector('.qty-val');
      var val   = parseInt(qtyEl.textContent, 10);
      if (val > 1) {
        qtyEl.textContent = val - 1;
        updateSubtotal();
      }
    }

    /* Qty increase */
    if (e.target.closest('#mini-cart .qty-ctrl') && e.target.textContent.trim() === '+') {
      var qtyEl = e.target.closest('.qty-ctrl').querySelector('.qty-val');
      qtyEl.textContent = parseInt(qtyEl.textContent, 10) + 1;
      updateSubtotal();
    }

    /* Delete item */
    if (e.target.closest('#mini-cart .icon-circle-btn[data-remove]')) {
      var item = e.target.closest('.cart-item');
      if (item) {
        item.remove();
        updateSubtotal();
      }
    }
  });

})();
