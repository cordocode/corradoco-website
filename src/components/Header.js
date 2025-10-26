import React from 'react';
import './Header.css';
import logo from '../assets/LOGO_BLACK_TRANSPARENT_CORRADO_CO.svg';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <a href="/" className="logo-link">
            <img src={logo} alt="Corrado & Co." className="logo" />
          </a>
        </div>
        <div className="header-center">
          <a href="/" className="nav-link">Home</a>
        </div>
        <div className="header-right">
          <a href="/blog" className="nav-link">Blog</a>
        </div>
      </div>
    </header>
  );
}

export default Header;