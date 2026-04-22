/**
 * SPLIT BANNER REVEAL AUTO-PLAY
 * Logic for 2-image toggle with opacity transition
 */
document.addEventListener('DOMContentLoaded', () => {
  const revealSlides = document.querySelectorAll('.split-img');
  let currentRevealIdx = 0;
  const totalRevealSlides = revealSlides.length;
  const slideDuration = 4000; // 4 seconds per image

  if (totalRevealSlides === 0) return;

  // Set the first image to active immediately
  revealSlides[0].classList.add('active');

  function playReveal() {
    // Current slide fades out
    revealSlides[currentRevealIdx].classList.remove('active');
    
    // Calculate and fade in next slide
    currentRevealIdx = (currentRevealIdx + 1) % totalRevealSlides;
    revealSlides[currentRevealIdx].classList.add('active');
  }

  // Start the auto-play loop
  setInterval(playReveal, slideDuration);
});