import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/LOGO_BLACK_TRANSPARENT_CORRADO_CO.svg';

function Header() {
  const [currentPage, setCurrentPage] = useState('home');
  const [animatingTo, setAnimatingTo] = useState(null);
  const [animatingFrom, setAnimatingFrom] = useState(null);

  useEffect(() => {
    // Determine current page from pathname
    const path = window.location.pathname;
    if (path === '/') setCurrentPage('home');
    else if (path.includes('about')) setCurrentPage('about');
    else if (path.includes('services')) setCurrentPage('services');
    else if (path.includes('blog')) setCurrentPage('blog');
  }, []);

  const handleLinkClick = (e, linkName) => {
    if (linkName === currentPage) {
      e.preventDefault();
      return; // Don't re-animate if already on the page
    }
    
    e.preventDefault();
    
    // Start both animations simultaneously
    setAnimatingFrom(currentPage); // Animate down from current
    setAnimatingTo(linkName); // Animate up to new
    
    // Navigate after animation completes
    setTimeout(() => {
      setCurrentPage(linkName);
      setAnimatingFrom(null);
      setAnimatingTo(null);
      window.location.href = e.currentTarget.href;
    }, 250);
  };

  const getNavClass = (linkName) => {
    let classes = ['nav-link'];
    
    // Current page state (filled, no animation)
    if (currentPage === linkName && !animatingFrom) {
      classes.push('current-page');
    }
    
    // Animating up (filling)
    if (animatingTo === linkName) {
      classes.push('animating-up');
    }
    
    // Animating down (emptying)
    if (animatingFrom === linkName) {
      classes.push('animating-down');
    }
    
    return classes.join(' ');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-section header-logo-section">
          <div className="logo-link">
            <img src={logo} alt="Corrado & Co." className="logo" />
          </div>
        </div>
        
        <div className="header-section header-nav-section">
          <a 
            href="/" 
            className={getNavClass('home')}
            onClick={(e) => handleLinkClick(e, 'home')}
          >
            <span className="nav-text">Home</span>
            <div className="nav-fill"></div>
          </a>
        </div>
        
        <div className="header-section header-nav-section">
          <a 
            href="/about" 
            className={getNavClass('about')}
            onClick={(e) => handleLinkClick(e, 'about')}
          >
            <span className="nav-text">About</span>
            <div className="nav-fill"></div>
          </a>
        </div>
        
        <div className="header-section header-nav-section">
          <a 
            href="/services" 
            className={getNavClass('services')}
            onClick={(e) => handleLinkClick(e, 'services')}
          >
            <span className="nav-text">Services</span>
            <div className="nav-fill"></div>
          </a>
        </div>
        
        <div className="header-section header-nav-section">
          <a 
            href="/blog" 
            className={getNavClass('blog')}
            onClick={(e) => handleLinkClick(e, 'blog')}
          >
            <span className="nav-text">Blog</span>
            <div className="nav-fill"></div>
          </a>
        </div>
        
        <div className="header-section header-end-section"></div>
      </div>
    </header>
  );
}

export default Header;