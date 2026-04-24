window.addEventListener('DOMContentLoaded', () => {


  /* ─── Arrow SVG for newsletter submit ─── */
  const arrowSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

  const html = `
    <footer class="footer" id="main-footer">

      <!-- Newsletter Band -->
      <div class="footer-newsletter-band">
        <div class="newsletter-banner">
          <img
            src="images/home/subscribe.png"
            alt="Newsletter — curated fashion"
            class="newsletter-img ratio 16-9"
          />
          <div class="newsletter-content">
            <h3 class="newsletter-title">Join our Newsletter — Get Updates, Offers and Invites.</h3>
            <div class="newsletter-form">
              <input type="email" placeholder="Email address" aria-label="Email address" />
              <button class="newsletter-submit" aria-label="Subscribe">${arrowSVG}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Footer Grid -->
      <div class="footer-grid">

        <!-- Brand Column -->
        <div class="footer-brand-col">
          <img src="images/logo/logo.png" alt="Viva Voce" class="footer-logo" />
          <div class="footer-social-label">Follow us on social media</div>
          <div class="footer-social-icons">
            <a href="#" aria-label="Facebook">
              <span class="material-icons">facebook</span>
            </a>
            <a href="#" aria-label="Instagram">
              <span class="material-icons">photo_camera</span>
            </a>
            <a href="#" aria-label="YouTube">
              <span class="material-icons">smart_display</span>
            </a>
            <a href="#" aria-label="TikTok">
              <span class="material-icons">music_note</span>
            </a>
          </div>
        </div>

        <!-- Company Column -->
        <div class="footer-nav-col">
          <button class="footer-accordion-btn" aria-expanded="false" data-target="footer-col-company">
            Company <span class="material-icons">add</span>
          </button>
          <div class="footer-col-title">Company</div>
          <div class="footer-accordion-body" id="footer-col-company">
            <a href="#" class="footer-link">About Us</a>
            <a href="#" class="footer-link">Brand Ambassadors</a>
            <a href="#" class="footer-link">Community Spotlight</a>
            <a href="#" class="footer-link">Sustainability</a>
            <a href="#" class="footer-link">Careers</a>
          </div>
        </div>

        <!-- Customer Care Column -->
        <div class="footer-nav-col">
          <button class="footer-accordion-btn" aria-expanded="false" data-target="footer-col-care">
            Customer Care <span class="material-icons">add</span>
          </button>
          <div class="footer-col-title">Customer Care</div>
          <div class="footer-accordion-body" id="footer-col-care">
            <a href="#" class="footer-link">Shipping &amp; Returns</a>
            <a href="#" class="footer-link">Size Guide</a>
            <a href="#" class="footer-link">FAQ</a>
            <a href="#" class="footer-link">Contact Us</a>
            <a href="account.html" class="footer-link">My Account</a>
          </div>
        </div>

        <!-- Legal Column -->
        <div class="footer-nav-col">
          <button class="footer-accordion-btn" aria-expanded="false" data-target="footer-col-legal">
            Legal <span class="material-icons">add</span>
          </button>
          <div class="footer-col-title">Legal</div>
          <div class="footer-accordion-body" id="footer-col-legal">
            <a href="#" class="footer-link">Privacy Policy</a>
            <a href="#" class="footer-link">Cookie Policy</a>
            <a href="#" class="footer-link">Cookie Preferences</a>
            <a href="#" class="footer-link">Terms &amp; Conditions</a>
            <a href="#" class="footer-link">Disclaimer</a>
          </div>
        </div>

      </div><!-- /footer-grid -->

      <!-- Payment Strip -->
      <div class="footer-payment-strip">
        <span class="footer-payment-label">Viva Voce Accepts</span>
        <div class="footer-payment-icons">
          <div class="footer-payment-icon"><img src="images/payments/UnionPay.png" alt="UnionPay" /></div>
          <div class="footer-payment-icon"><img src="images/payments/Visa.png" alt="Visa" /></div>
          <div class="footer-payment-icon"><img src="images/payments/DinersClub.png" alt="Diners Club" /></div>
          <div class="footer-payment-icon"><img src="images/payments/Discover.png" alt="Discover" /></div>
          <div class="footer-payment-icon"><img src="images/payments/GooglePay.png" alt="Google Pay" /></div>
          <div class="footer-payment-icon"><img src="images/payments/Amex.png" alt="Amex" /></div>
          <div class="footer-payment-icon"><img src="images/payments/ApplePay.png" alt="Apple Pay" /></div>
          <div class="footer-payment-icon"><img src="images/payments/Mastercard.png" alt="Mastercard" /></div>

        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="footer-bottom-inner">
          <div class="footer-bottom-left">
            <span class="material-icons">language</span>
            <span>Ships Globally</span>
            <span style="opacity:0.4">·</span>
            <select aria-label="Language">
              <option>English</option>
              <option>한국어</option>
              <option>日本語</option>
              <option>Français</option>
            </select>
            <span class="material-icons" style="font-size:16px;opacity:0.6">expand_more</span>
            <span style="opacity:0.4">·</span>
            <a href="#" style="color:inherit;font-size:0.8125rem;">Need Help?</a>
          </div>
          <div class="footer-bottom-right">© 2026, Viva Voce Live.</div>
        </div>
      </div>

    </footer>`;

  /* ─── Inject footer ─── */
  const container = document.getElementById('main-footer');
  if (container) {
    container.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML('beforeend', html);
  }

  /* ─── Accordion logic (mobile) ─── */
  document.querySelectorAll('.footer-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const body = document.getElementById(targetId);
      const isOpen = body.classList.contains('is-open');

      /* Close all */
      document.querySelectorAll('.footer-accordion-body').forEach(b => b.classList.remove('is-open'));
      document.querySelectorAll('.footer-accordion-btn').forEach(b => {
        b.classList.remove('is-open');
        b.setAttribute('aria-expanded', 'false');
        b.querySelector('.material-icons').textContent = 'add';
      });

      /* Open clicked if it was closed */
      if (!isOpen) {
        body.classList.add('is-open');
        btn.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.material-icons').textContent = 'remove';
      }
    });
  });

});
