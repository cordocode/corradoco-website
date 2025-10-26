import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter signup here
      console.log('Newsletter signup:', email);
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      {/* CTA Section */}
      <div className="footer-cta">
        <div className="footer-cta-container">
          <h2 className="footer-cta-title">
            Efficiency Without Compromise
          </h2>
          <a href="mailto:ben@corradoco.com" className="footer-cta-button">
            Book Your Free Automation Audit
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Contact Column */}
            <div className="footer-column footer-contact">
              <h3 className="footer-heading">Contact</h3>
              <div className="contact-info">
                <a href="mailto:ben@corradoco.com" className="contact-link">
                  ben@corradoco.com
                </a>
                <a href="tel:720-262-1635" className="contact-link">
                  720.262.1635
                </a>
                <p className="contact-location">
                  Denver, Colorado
                </p>
              </div>
            </div>

            {/* Resources Column */}
            <div className="footer-column">
              <h3 className="footer-heading">Resources</h3>
              <nav className="footer-nav">
                <a href="/blog" className="footer-link">Blog</a>
                <a href="/about" className="footer-link">About</a>
                <a href="/calculator" className="footer-link">Calculator</a>
              </nav>
            </div>

            {/* Newsletter Column */}
            <div className="footer-column footer-newsletter">
              <h3 className="footer-heading">Stay Informed</h3>
              <p className="newsletter-text">
                Weekly automation insights for operations leaders.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  →
                </button>
              </form>
              {isSubscribed && (
                <p className="newsletter-success">✓ Subscribed</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © 2025 Corrado & Co. · Founded in Denver
            </p>
          </div>
          <div className="footer-bottom-right">
            <a href="/privacy" className="footer-legal-link">Privacy Policy</a>
            <span className="footer-separator">·</span>
            <a href="/terms" className="footer-legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;