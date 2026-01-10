import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext.jsx';
import NotificationToast from './NotificationToast';
import '../styles/NotificationsManager.css';

const NotificationsManager = () => {
  const { notifications, removeNotification } = useAppContext();

  return (
    <div className="notifications-manager">
      <AnimatePresence>
        {notifications.map(notification => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onClose={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsManager;