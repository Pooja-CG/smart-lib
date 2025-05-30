// components/BadgeNotification.jsx
import React from 'react';
import './BadgeNotification.css';

const BadgeNotification = ({ badgeName, onClose }) => {
  return (
    <div className="badge-popup">
      <h2>🎉 Bravo!</h2>
      <p>You earned the <strong>{badgeName}</strong> badge!</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BadgeNotification;
