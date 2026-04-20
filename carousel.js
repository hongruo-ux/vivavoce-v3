window.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.carousel-wrap').forEach(wrap => {
    const track = wrap.querySelector('.carousel-track');
    const btnPrev = wrap.querySelector('.carousel-btn--prev');
    const btnNext = wrap.querySelector('.carousel-btn--next');
    if (!track || !btnPrev || !btnNext) return;

    function updateButtons() {
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      // Only show buttons on desktop (not touch-primary devices)
      const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      btnPrev.classList.toggle('is-visible', isDesktop && scrollLeft > 4);
      btnNext.classList.toggle('is-visible', isDesktop && scrollLeft < maxScroll - 4);
    }

    function scrollByItem(direction) {
      const firstItem = track.querySelector('[class*="carousel-item"]');
      const itemWidth = firstItem ? firstItem.offsetWidth + 16 : track.clientWidth * 0.8;
      track.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
    }

    btnPrev.addEventListener('click', () => scrollByItem(-1));
    btnNext.addEventListener('click', () => scrollByItem(1));
    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    // Initial state
    updateButtons();
  });

});
