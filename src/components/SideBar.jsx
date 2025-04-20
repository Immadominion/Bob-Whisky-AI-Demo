import React from 'react';
import { X } from 'lucide-react';

function Sidebar({ isOpen, endpoints, activeEndpoint, onEndpointChange, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Recommendations</h2>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <X size={24} />
        </button>
      </div>
      
      <ul className="sidebar-menu">
        {endpoints.map((endpoint) => (
          <li 
            key={endpoint.id}
            className={`sidebar-item ${activeEndpoint === endpoint.id ? 'active' : ''}`}
            onClick={() => onEndpointChange(endpoint.id)}
          >
            <span className="sidebar-item-text">{endpoint.label}</span>
          </li>
        ))}
      </ul>
      
      <div className="sidebar-footer">
        <div className="powered-by">
          <span>Powered by</span>
          <span className="bob-name">Baxus</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;