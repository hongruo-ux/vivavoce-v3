window.addEventListener('DOMContentLoaded', () => {

  const stickyFooter = document.getElementById('cart-sticky-footer');
  const trigger = document.getElementById('cart-sticky-more-trigger');
  const panel = document.getElementById('cart-sticky-more-panel');

  if (stickyFooter && window.innerWidth <= 1080) {
    stickyFooter.classList.add('active');
  }

  if (trigger && panel) {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      trigger.classList.toggle('is-open', !isOpen);
      if (isOpen) {
        panel.setAttribute('hidden', '');
      } else {
        panel.removeAttribute('hidden');
      }
    });
  }

});