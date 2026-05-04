window.addEventListener('DOMContentLoaded', () => {

  const modal    = document.getElementById('wl-modal');
  const mask     = document.getElementById('wl-mask');
  const closeBtn = document.getElementById('wl-close');
  const select   = document.getElementById('wl-select');
  const newInput = document.getElementById('wl-new-input');
  const saveBtn  = document.getElementById('wl-save');

  if (!modal) return;

  document.querySelectorAll('.product-card-wishlist').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      select.value = 'new';
      newInput.classList.add('is-visible');
      modal.classList.add('is-open');
      mask.classList.add('is-open');
    });
  });

  select.addEventListener('change', () => {
    newInput.classList.toggle('is-visible', select.value === 'new');
  });

  function closeModal() {
    modal.classList.remove('is-open');
    mask.classList.remove('is-open');
  }

  closeBtn.addEventListener('click', closeModal);
  mask.addEventListener('click', closeModal);
  saveBtn.addEventListener('click', closeModal);

});