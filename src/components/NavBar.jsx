import React from 'react';
import { Menu } from 'lucide-react';

function Navbar({ toggleSidebar, username, setUsername, handleUsernameSubmit }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="menu-button" onClick={toggleSidebar} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
          <div className="logo">
            <span className="logo-text">BAXUS</span>
            <span className="logo-subtitle">Whisky Recommender</span>
          </div>
        </div>
        
        <form className="search-form" onSubmit={handleUsernameSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="search-button">
            Get Recommendations
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;