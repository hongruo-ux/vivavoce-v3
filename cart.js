window.addEventListener('DOMContentLoaded', () => {

  const toggle = document.getElementById('cart-summary-toggle');
  const panel  = document.getElementById('cart-summary-panel');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.classList.toggle('is-open', !isOpen);
    if (isOpen) {
      panel.setAttribute('hidden', '');
    } else {
      panel.removeAttribute('hidden');
    }
  });

});
