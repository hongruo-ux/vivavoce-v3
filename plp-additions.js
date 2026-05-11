  <script>
  (function () {

    /* ─── SHARED FILTER STATE ─── */
    var activeFiltersBar = document.getElementById('active-filters-bar');

    function getAllFilterCheckboxes() {
      return Array.from(document.querySelectorAll('input.plp-filter'));
    }

    function getChecked() {
      return getAllFilterCheckboxes().filter(function (cb) { return cb.checked; });
    }

    /* Sync paired checkboxes (sidebar ↔ drawer share same data-label) */
    function syncPaired(changed) {
      var label = changed.getAttribute('data-label');
      getAllFilterCheckboxes().forEach(function (cb) {
        if (cb !== changed && cb.getAttribute('data-label') === label) {
          cb.checked = changed.checked;
        }
      });
    }

    function renderActiveTags() {
      /* remove all existing tags first */
      var existing = activeFiltersBar.querySelectorAll('.active-filter');
      existing.forEach(function (el) { el.remove(); });

      /* ── checkbox filters (Fit Type, Brand, Material, etc.) ── */
      var checked = getChecked();
      var seen = {};
      var unique = checked.filter(function (cb) {
        var lbl = cb.getAttribute('data-label');
        if (seen[lbl]) return false;
        seen[lbl] = true;
        return true;
      });
      unique.forEach(function (cb) {
        var lbl = cb.getAttribute('data-label');
        var btn = document.createElement('button');
        btn.className = 'active-filter';
        btn.textContent = lbl + ' ✕';
        btn.addEventListener('click', function () {
          getAllFilterCheckboxes().forEach(function (c) {
            if (c.getAttribute('data-label') === lbl) c.checked = false;
          });
          renderActiveTags();
          updateFilterDot();
        });
        activeFiltersBar.appendChild(btn);
      });

      /* ── size buttons ── */
      document.querySelectorAll('.filter-size-btn.is-active').forEach(function (sizeBtn) {
        var lbl = sizeBtn.getAttribute('data-size');
        var btn = document.createElement('button');
        btn.className = 'active-filter';
        btn.textContent = lbl + ' ✕';
        btn.addEventListener('click', function () {
          sizeBtn.classList.remove('is-active');
          renderActiveTags();
          updateFilterDot();
        });
        activeFiltersBar.appendChild(btn);
      });

      /* ── color buttons ── */
      document.querySelectorAll('.filter-color-btn.is-active').forEach(function (colorBtn) {
        var lbl = colorBtn.getAttribute('data-color');
        var btn = document.createElement('button');
        btn.className = 'active-filter';
        btn.textContent = lbl + ' ✕';
        btn.addEventListener('click', function () {
          colorBtn.classList.remove('is-active');
          renderActiveTags();
          updateFilterDot();
        });
        activeFiltersBar.appendChild(btn);
      });

      /* show/hide the bar */
      var hasAny = activeFiltersBar.querySelectorAll('.active-filter').length > 0;
      activeFiltersBar.style.display = hasAny ? 'flex' : 'none';
    }

    function updateFilterDot() {
      var dot = document.getElementById('filter-dot');
      var checked = getChecked();
      var seen = {};
      var count = 0;
      checked.forEach(function (cb) {
        var lbl = cb.getAttribute('data-label');
        if (!seen[lbl]) { seen[lbl] = true; count++; }
      });
      count += document.querySelectorAll('.filter-size-btn.is-active').length;
      count += document.querySelectorAll('.filter-color-btn.is-active').length;
      if (dot) {
                dot.classList.toggle('is-visible', count > 0);
                dot.textContent = count > 0 ? count : '';
              }
              var sidebarClearBtn = document.getElementById('sidebar-clear-btn');
              if (sidebarClearBtn) sidebarClearBtn.classList.toggle('is-visible', count > 0);
      
      
    }

    document.addEventListener('change', function (e) {
      if (e.target && e.target.classList.contains('plp-filter')) {
        syncPaired(e.target);
        renderActiveTags();
        renderModalTags();
        updateFilterDot();
      }
    });

    /* Sidebar clear */
    var sidebarClear = document.getElementById('sidebar-clear-btn');
    if (sidebarClear) sidebarClear.addEventListener('click', function () {
      getAllFilterCheckboxes().forEach(function (cb) { cb.checked = false; });
      document.querySelectorAll('.filter-size-btn.is-active, .filter-color-btn.is-active').forEach(function (b) { b.classList.remove('is-active'); });
      renderActiveTags();
      renderModalTags();
      updateFilterDot();
    });

    /* ─── MODAL ACTIVE TAGS ─── */
    function renderModalTags() {
  var container = document.getElementById('modal-active-tags');
  if (!container) return;
  container.innerHTML = '';

  var tags = [];

  var checked = getChecked();
  var seen = {};
  checked.filter(function(cb) {
    var lbl = cb.getAttribute('data-label');
    if (seen[lbl]) return false;
    seen[lbl] = true;
    return true;
  }).forEach(function(cb) {
    var lbl = cb.getAttribute('data-label');
    tags.push({ label: lbl, remove: function() {
      getAllFilterCheckboxes().forEach(function(c) {
        if (c.getAttribute('data-label') === lbl) c.checked = false;
      });
    }});
  });

  document.querySelectorAll('.filter-size-btn.is-active').forEach(function(btn) {
    var lbl = btn.getAttribute('data-size');
    tags.push({ label: lbl, remove: function() { btn.classList.remove('is-active'); }});
  });

  document.querySelectorAll('.filter-color-btn.is-active').forEach(function(btn) {
    var lbl = btn.getAttribute('data-color');
    tags.push({ label: lbl, remove: function() { btn.classList.remove('is-active'); }});
  });

  if (tags.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';

  tags.forEach(function(tag) {
    var btn = document.createElement('button');
    btn.className = 'active-filter';
    btn.textContent = tag.label + ' ✕';
    btn.addEventListener('click', function() {
      tag.remove();
      renderModalTags();
      renderActiveTags();
      updateFilterDot();
    });
    container.appendChild(btn);
  });

  var clearAll = document.createElement('button');
  clearAll.className = 'modal-tags-clear-btn';
  clearAll.textContent = 'Clear All';
  clearAll.addEventListener('click', function() {
    getAllFilterCheckboxes().forEach(function(cb) { cb.checked = false; });
    document.querySelectorAll('.filter-size-btn.is-active, .filter-color-btn.is-active').forEach(function(b) { b.classList.remove('is-active'); });
    renderActiveTags();
    renderModalTags();
    updateFilterDot();
  });
  container.appendChild(clearAll);
}


    /* ─── FILTER DRAWER ─── */
    var overlay  = document.getElementById('filter-overlay');
    var drawer   = document.getElementById('filter-drawer');
    var openBtn  = document.getElementById('filter-open-btn');
    var closeBtn = document.getElementById('filter-close-btn');
    var clearBtn = document.getElementById('filter-clear-btn');
    var applyBtn = document.getElementById('filter-apply-btn');
    var mobileToolbar = document.querySelector('.plp-toolbar-mobile');

    function openDrawer() {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
      if (mobileToolbar) mobileToolbar.classList.add('drawer-is-open');
      renderModalTags();
    }
    function closeDrawer() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      if (mobileToolbar) mobileToolbar.classList.remove('drawer-is-open');
    }

    if (openBtn)  openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay)  overlay.addEventListener('click', closeDrawer);
    if (clearBtn) clearBtn.addEventListener('click', function () {
      getAllFilterCheckboxes().forEach(function (cb) { cb.checked = false; });
      document.querySelectorAll('.filter-size-btn.is-active, .filter-color-btn.is-active').forEach(function (b) { b.classList.remove('is-active'); });
      renderActiveTags();
      renderModalTags();
      updateFilterDot();
    });
if (applyBtn) applyBtn.addEventListener('click', function() {
  renderActiveTags();
  renderModalTags();
  updateFilterDot();
  closeDrawer();
});
    /* Drawer accordions */
    var accBtns = drawer ? drawer.querySelectorAll('.filter-acc-btn') : [];
    accBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        var body = document.getElementById(this.getAttribute('aria-controls'));
        this.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (body) body.classList.toggle('is-open', !expanded);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    
    /* ─── SORT DROPDOWN ─── */
    var sortBtn      = document.getElementById('sort-open-btn');
    var sortDropdown = document.getElementById('sort-dropdown');
    var sortLabel    = document.getElementById('sort-label');

    function closeSortDropdown() {
      if (sortDropdown) sortDropdown.classList.remove('is-open');
      if (sortBtn) sortBtn.setAttribute('aria-expanded', 'false');
    }

    if (sortBtn) sortBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = sortDropdown.classList.toggle('is-open');
      sortBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    if (sortDropdown) sortDropdown.querySelectorAll('.sort-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        sortDropdown.querySelectorAll('.sort-option').forEach(function (o) { o.classList.remove('is-selected'); });
        this.classList.add('is-selected');
        if (sortLabel) sortLabel.textContent = this.textContent;
        closeSortDropdown();
      });
    });

    document.addEventListener('click', function (e) {
      if (sortDropdown && !sortDropdown.contains(e.target) && e.target !== sortBtn) {
        closeSortDropdown();
      }
    });



    /* ─── SIZE FILTER BUTTONS ─── */
    (function() {
      document.querySelectorAll('.filter-size-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          this.classList.toggle('is-active');
          renderActiveTags();
          renderModalTags();
          updateFilterDot();
        });
      });
    })();

    /* ─── COLOR FILTER BUTTONS ─── */
    (function() {
      document.querySelectorAll('.filter-color-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          this.classList.toggle('is-active');
          renderActiveTags();
          renderModalTags();
          updateFilterDot();
        });
      });
    })();

    /* ─── PRICE RANGE SLIDER ─── */
    (function() {
      function initSlider(minId, maxId, labelId, fillId, resetId) {
        var minEl = document.getElementById(minId);
        var maxEl = document.getElementById(maxId);
        var label = document.getElementById(labelId);
        var fill  = document.getElementById(fillId);
        var reset = document.getElementById(resetId);
        if (!minEl || !maxEl) return;

        function fmt(v) { return '$' + Number(v).toLocaleString(); }

        function update() {
          var lo = parseInt(minEl.value);
          var hi = parseInt(maxEl.value);
          if (lo > hi) { var t = lo; lo = hi; hi = t; minEl.value = lo; maxEl.value = hi; }
          var min = parseInt(minEl.min), max = parseInt(minEl.max);
          var pctLo = (lo - min) / (max - min) * 100;
          var pctHi = (hi - min) / (max - min) * 100;
          if (fill) { fill.style.left = pctLo + '%'; fill.style.width = (pctHi - pctLo) + '%'; }
          if (label) label.textContent = fmt(lo) + ' – ' + fmt(hi);
        }

        minEl.addEventListener('input', update);
        maxEl.addEventListener('input', update);
        if (reset) reset.addEventListener('click', function() {
          minEl.value = minEl.min;
          maxEl.value = maxEl.max;
          update();
        });
        update();
      }

      initSlider('price-min-sidebar', 'price-max-sidebar', 'price-label-sidebar', 'price-fill-sidebar', 'price-reset-sidebar');
      initSlider('price-min-drawer',  'price-max-drawer',  'price-label-drawer',  'price-fill-drawer',  'price-reset-drawer');
    })();

    /* ─── SUSTAINABILITY FILTER ─── */
    (function() {
      function applySustainFilter() {
        var checked = Array.from(document.querySelectorAll('.plp-filter-sustain:checked'))
                           .map(function(cb) { return cb.getAttribute('data-label'); });
        var cards = document.querySelectorAll('#plp-grid .product-card');
        cards.forEach(function(card) {
          if (checked.length === 0) {
            card.style.display = '';
            return;
          }
          var badge = card.getAttribute('data-sustain-badge') || '';
          card.style.display = checked.indexOf(badge) !== -1 ? '' : 'none';
        });
        updateFilterDot();
      }

      document.addEventListener('change', function(e) {
        if (e.target && e.target.classList.contains('plp-filter-sustain')) {
          /* sync paired checkboxes across sidebar + drawer */
          var label = e.target.getAttribute('data-label');
          document.querySelectorAll('.plp-filter-sustain[data-label="' + label + '"]').forEach(function(cb) {
            cb.checked = e.target.checked;
          });
          applySustainFilter();
          renderActiveTags();
        }
      });
    })();

    /* ─── DESKTOP SIDEBAR ACCORDION ─── */
    var sidebarAccBtns = document.querySelectorAll('.filter-sidebar .filter-group-title');
    sidebarAccBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        var bodyId = this.getAttribute('aria-controls');
        var body = document.getElementById(bodyId);
        this.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (body) body.classList.toggle('is-closed', expanded);
      });
    });

    /* ─── MOBILE INFINITE SCROLL + LOAD MORE ─── */
    var grid        = document.getElementById('plp-grid');
    var sentinel    = document.getElementById('plp-sentinel');
    var loadMoreWrap = document.getElementById('plp-load-more-wrap');
    var loadMoreBtn = document.getElementById('plp-load-more-btn');

    var AUTO_LIMIT  = 40;   /* auto-load up to this many visible cards */
    var BATCH       = 16;   /* cards revealed per load-more tap */
    var hiddenCards = grid ? Array.from(grid.querySelectorAll('.plp-hidden')) : [];
    var totalVisible = 12;  /* already visible on page load */
    var autoLoading = true;

    function isMobile() {
      return window.matchMedia('(max-width: 960px)').matches;
    }

    function revealBatch(count) {
      var revealed = 0;
      hiddenCards = grid ? Array.from(grid.querySelectorAll('.plp-hidden')) : [];
      for (var i = 0; i < hiddenCards.length && revealed < count; i++) {
        hiddenCards[i].classList.remove('plp-hidden');
        revealed++;
        totalVisible++;
      }
      return revealed;
    }

    function checkAutoLoad() {
      if (!isMobile()) return;
      if (!autoLoading) return;
      if (totalVisible >= AUTO_LIMIT) {
        autoLoading = false;
        /* show load-more if there are still hidden cards */
        var remaining = grid ? grid.querySelectorAll('.plp-hidden').length : 0;
        if (remaining > 0) {
          if (loadMoreWrap) loadMoreWrap.style.display = 'flex';
        }
        return;
      }
      revealBatch(BATCH);
      /* check if we hit the limit */
      if (totalVisible >= AUTO_LIMIT) {
        autoLoading = false;
        var rem = grid ? grid.querySelectorAll('.plp-hidden').length : 0;
        if (rem > 0 && loadMoreWrap) loadMoreWrap.style.display = 'flex';
      }
    }

    /* IntersectionObserver on sentinel */
    if ('IntersectionObserver' in window && sentinel) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) checkAutoLoad();
        });
      }, { rootMargin: '200px' });
      observer.observe(sentinel);
    }

    if (loadMoreBtn) loadMoreBtn.addEventListener('click', function () {
      var revealed = revealBatch(BATCH);
      var rem = grid ? grid.querySelectorAll('.plp-hidden').length : 0;
      if (rem === 0 && loadMoreWrap) loadMoreWrap.style.display = 'none';
    });

    /* Hide desktop pagination on mobile, hide load-more on desktop */
    function applyViewport() {
      var pagination = document.getElementById('plp-pagination');
      var paginationLabel = document.getElementById('pagination-label');
      if (isMobile()) {
        if (pagination) pagination.style.display = 'none';
        if (paginationLabel) paginationLabel.style.display = 'none';
        if (sentinel) sentinel.style.display = 'block';
      } else {
        if (pagination) pagination.style.display = '';
        if (paginationLabel) paginationLabel.style.display = '';
        if (sentinel) sentinel.style.display = 'none';
        if (loadMoreWrap) loadMoreWrap.style.display = 'none';
        /* restore hidden cards on desktop — all should show */
        if (grid) grid.querySelectorAll('.plp-hidden').forEach(function (c) {
          c.classList.remove('plp-hidden');
        });
      }
    }

    applyViewport();
    window.addEventListener('resize', applyViewport);

  })();
  </script>