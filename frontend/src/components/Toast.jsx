import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '🎉';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return '🎉';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'linear-gradient(135deg, #48bb78, #38a169)';
      case 'error':
        return 'linear-gradient(135deg, #f56565, #e53e3e)';
      case 'info':
        return 'linear-gradient(135deg, #4299e1, #3182ce)';
      default:
        return 'linear-gradient(135deg, #48bb78, #38a169)';
    }
  };

  return (
    <div 
      className={`toast ${isVisible ? 'toast-enter' : 'toast-exit'}`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getBackgroundColor(),
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        minWidth: '300px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        opacity: isVisible ? 1 : 0
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>{getIcon()}</span>
      <span style={{ fontWeight: '500', flex: 1 }}>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '0',
          opacity: 0.7,
          transition: 'opacity 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.opacity = 1}
        onMouseLeave={(e) => e.target.style.opacity = 0.7}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;