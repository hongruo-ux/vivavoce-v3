window.addEventListener('DOMContentLoaded', () => {
  const html = `
    <footer class="footer" id="main-footer">
      <div class="footer-grid container">
        <div>
          <div class="footer-brand">Viva Voce</div>
          <p class="footer-desc">A curated fashion marketplace connecting you with the world's most exciting brands.</p>
        </div>
        <div>
          <div class="footer-col-title">Shop</div>
          <a href="plp.html" class="footer-link">Women</a>
          <a href="plp.html" class="footer-link">Men</a>
          <a href="plp.html" class="footer-link">New In</a>
          <a href="plp.html" class="footer-link">Sale</a>
          <a href="brands.html" class="footer-link">Brands</a>
        </div>
        <div>
          <div class="footer-col-title">Info</div>
          <a href="#" class="footer-link">About Us</a>
          <a href="#" class="footer-link">Sustainability</a>
          <a href="editorial.html" class="footer-link">Editorial</a>
          <a href="#" class="footer-link">Careers</a>
        </div>
        <div>
          <div class="footer-col-title">Help</div>
          <a href="#" class="footer-link">Shipping & Returns</a>
          <a href="#" class="footer-link">Size Guide</a>
          <a href="#" class="footer-link">Contact Us</a>
          <a href="account.html" class="footer-link">My Account</a>
        </div>
      </div>
      <div class="footer-bottom container">
        <span>© 2025 Viva Voce Fashion Marketplace</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>`;

  const container = document.getElementById('main-footer');
  if (container) {
    container.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML('beforeend', html);
  }
});
