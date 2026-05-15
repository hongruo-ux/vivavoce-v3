window.addEventListener('DOMContentLoaded', () => {

  function getCount() {
    return document.querySelectorAll('.product-card-wishlist.is-wishlisted').length;
  }

  function updateBadge() {
    const badge = document.getElementById('wl-count');
    if (!badge) return;
    const count = getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  document.querySelectorAll('.product-card-wishlist').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('is-wishlisted');
      updateBadge();
    });
  });

});