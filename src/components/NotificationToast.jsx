import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/NotificationToast.css';

const NotificationToast = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  const getNotificationStyle = () => {
    switch (notification.type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className={`notification-toast ${getNotificationStyle()}`}
    >
      <div className="notification-content">
        <div className="notification-message">
          {notification.message}
        </div>
        <button 
          className="notification-close" 
          onClick={() => onClose(notification.id)}
        >
          ×
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationToast;