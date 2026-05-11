document.querySelectorAll('.eco-tooltip-btn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var wrap = btn.closest('.eco-tooltip-wrap');
    var isOpen = wrap.classList.contains('is-open');
    document.querySelectorAll('.eco-tooltip-wrap.is-open').forEach(function(w) { w.classList.remove('is-open'); });
    if (!isOpen) wrap.classList.add('is-open');
  });
});

document.addEventListener('click', function(e) {
  if (!e.target.closest('.eco-tooltip-wrap')) {
    document.querySelectorAll('.eco-tooltip-wrap.is-open').forEach(function(w) { w.classList.remove('is-open'); });
  }
});