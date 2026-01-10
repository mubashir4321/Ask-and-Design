import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleCardClick = () => {
    setShowOptions(true);
  };

  const options = [
    { id: 1, title: 'Ask Anything', path: '/ask-anything', icon: '💬' },
    { id: 2, title: 'Make Design', path: '/make-design', icon: '🎨' },
    { id: 3, title: 'Rebuild Anything', path: '/rebuild-anything', icon: '🔄' }
  ];

  return (
    <div className="home-container">
      <div className="home-content">
        {!showOptions ? (
          <motion.div 
            className="center-card"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCardClick}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px',
              height: '200px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              margin: 'auto',
              textAlign: 'center'
            }}
          >
            <span className="fade-in">Ask Anything</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="options-grid"
          >
            {options.map((option, index) => (
              <Link to={option.path} key={option.id} className="option-link">
                <motion.div
                  className="option-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="option-icon">{option.icon}</div>
                  <div className="option-title">{option.title}</div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;