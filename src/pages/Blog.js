import React from 'react';
import './Blog.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <div className="blog">
      <Header />
      
      <section className="blog-coming-soon">
        <div className="coming-soon-container">
          <h1 className="coming-soon-text">Coming Soon</h1>
          <p className="coming-soon-subtitle">
            We're crafting thoughtful content about automation, efficiency, and the future of work.
          </p>
          <div className="animation-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>

      {/* CTA SECTION - Blog Version */}
      <section className="blog-cta">
        <div className="blog-cta-container">
          <h2 className="blog-cta-title">
            Discover the Possibilities
          </h2>
          <a href="mailto:ben@corradoco.com" className="blog-cta-button">
            Book Your Free Automation Audit
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;