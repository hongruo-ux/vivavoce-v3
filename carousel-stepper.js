window.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('.hero-carousel-wrap');
  if (!wrap) return;

  const track = wrap.querySelector('.carousel-track');
  const items = wrap.querySelectorAll('.carousel-item--hero');
  if (!track || items.length === 0) return;

  // Build dots container after the carousel-wrap
  const dotsEl = document.createElement('div');
  dotsEl.className = 'hero-dots';

  items.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => {
      track.scrollTo({ left: items[i].offsetLeft, behavior: 'smooth' });
    });
    dotsEl.appendChild(dot);
  });

  wrap.parentElement.insertAdjacentElement('afterend', dotsEl);

  // Sync active dot on scroll
  const dots = dotsEl.querySelectorAll('.hero-dot');
  track.addEventListener('scroll', () => {
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    items.forEach((item, i) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(center - itemCenter);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('is-active', i === closest));
  }, { passive: true });
});