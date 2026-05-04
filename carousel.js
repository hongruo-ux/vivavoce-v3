window.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.carousel-wrap').forEach(wrap => {
    const track = wrap.querySelector('.carousel-track');
    const btnPrev = wrap.querySelector('.carousel-btn--prev');
    const btnNext = wrap.querySelector('.carousel-btn--next');
    if (!track) return; // only require track — buttons are optional

    function updateButtons() {
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (btnPrev) btnPrev.classList.toggle('is-visible', isDesktop && scrollLeft > 4);
      if (btnNext) btnNext.classList.toggle('is-visible', isDesktop && maxScroll > 4 && scrollLeft < maxScroll - 4);
    }

    function scrollByItem(direction) {
      const firstItem = track.querySelector('[class*="carousel-item"]');
      const itemWidth = firstItem ? firstItem.offsetWidth + 16 : track.clientWidth * 0.8;
      track.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
    }

    if (btnPrev) btnPrev.addEventListener('click', () => scrollByItem(-1));
    if (btnNext) btnNext.addEventListener('click', () => scrollByItem(1));
    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    // Defer initial state until after layout has painted
    requestAnimationFrame(() => requestAnimationFrame(updateButtons));
  });

});

