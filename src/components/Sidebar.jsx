import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { id: 1, title: 'Ask Anything', path: '/ask-anything', icon: '💬' },
    { id: 2, title: 'Make Design', path: '/make-design', icon: '🎨' },
    { id: 3, title: 'Rebuild Anything', path: '/rebuild-anything', icon: '🔄' }
  ];

  return (
    <div className="sidebar">
      <div className="logo-section">
        <h3>Ask & Design</h3>
      </div>
      
      <nav className="menu-nav">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id} className="menu-item">
              <Link 
                to={item.path} 
                className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;