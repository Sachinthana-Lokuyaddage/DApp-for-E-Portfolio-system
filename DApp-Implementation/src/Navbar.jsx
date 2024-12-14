import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the custom CSS file

function Navbar() {
  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <div className="navbar-links">
          <Link className="nav-link" to="/Dapp">
            App
          </Link>
          <Link className="nav-link" to="/contract-addresses">
            Contract Addresses
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
