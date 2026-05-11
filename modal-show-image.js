<script>
  document.querySelectorAll('.pdp-ig-trigger').forEach(function(el) {
    el.addEventListener('click', function() {
      if (window.innerWidth > 960) return;
      var url = el.getAttribute('data-ig-url');
      var body = document.getElementById('pdp-ig-modal-body');
      body.innerHTML = '<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="' + url + '?utm_source=ig_embed" data-instgrm-version="14"></blockquote>';
      if (window.instgrm) window.instgrm.Embeds.process();
      document.getElementById('pdp-ig-modal').classList.add('is-open');
    });
  });
  function closePdpIgModal() {
    document.getElementById('pdp-ig-modal').classList.remove('is-open');
    document.getElementById('pdp-ig-modal-body').innerHTML = '';
  }
</script>