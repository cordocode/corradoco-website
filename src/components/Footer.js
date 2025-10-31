import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                <Link to="/blog" className="footer-link">Blog</Link>
                <Link to="/flow" className="footer-link">Flow</Link>
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
          <p className="footer-copyright">
            © 2025 Corrado & Co. · Founded in Denver
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;