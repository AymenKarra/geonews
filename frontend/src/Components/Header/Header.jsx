import React from 'react';
import './header.css';
import logo from '../../assets/Geonews_logo.png';

const Header = () => {
  return (
    <div className="navbar">
      <div className="navbar_logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar-links">
        <div className="navbar-links_container"> 
          <button>Latest News</button>
          <a href="#">About Us</a>
        </div>
      </div>
    </div>
  )
}

export default Header
