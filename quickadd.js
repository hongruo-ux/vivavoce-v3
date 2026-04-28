window.addEventListener('DOMContentLoaded', () => {

  const modal   = document.getElementById('qa-modal');
  const mask    = document.getElementById('qa-mask');
  const closeBtn= document.getElementById('qa-close');
  const addBtn  = document.getElementById('qa-add-btn');
  if (!modal || !mask) return;

  function openModal(card) {
    // Read from data attributes if present, otherwise fall back to DOM content
    const name   = card.dataset.name  || card.querySelector('.product-name')?.textContent.trim()  || '';
    const price  = card.dataset.price || card.querySelector('.product-price')?.textContent.trim() || '';
    const brand  = card.dataset.brand || card.querySelector('.product-brand')?.textContent.trim() || '';
    const colors = card.dataset.colors ? card.dataset.colors.split(',') : [];
    const sizeEls = card.querySelectorAll('.product-size');
    const sizes = card.dataset.sizes
      ? card.dataset.sizes.split(',')
      : sizeEls.length ? Array.from(sizeEls).map(el => el.textContent.trim()) : [];

    document.getElementById('qa-title').textContent        = name;
    document.getElementById('qa-product-name').textContent = name;
    document.getElementById('qa-price').textContent        = price;
    const brandEl = document.getElementById('qa-brand');
    brandEl.textContent = brand;

    // Swatches
    const swatchContainer = document.getElementById('qa-swatches');
    swatchContainer.innerHTML = colors.map((c, i) =>
      `<button class="qa-swatch${i===0?' is-selected':''}" style="background:${c.trim()}" aria-label="Color ${i+1}"></button>`
    ).join('');
    swatchContainer.querySelectorAll('.qa-swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        swatchContainer.querySelectorAll('.qa-swatch').forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
      });
    });

    // Sizes
    const sizeContainer = document.getElementById('qa-sizes');
    sizeContainer.innerHTML = sizes.map((s, i) =>
      `<button class="size-btn${i===0?' active':''}">${s.trim()}</button>`
    ).join('');
    sizeContainer.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sizeContainer.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    modal.classList.add('is-open');
    mask.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    mask.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Delegate clicks on all quick-add buttons
  document.addEventListener('click', e => {
    const btn = e.target.closest('.product-quick-add');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      openModal(btn.closest('.product-card'));
    }
  });

  closeBtn?.addEventListener('click', closeModal);
  mask?.addEventListener('click', closeModal);
  addBtn?.addEventListener('click', () => { closeModal(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

});
