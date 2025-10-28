import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p style={{ 
        fontFamily: 'Orbitron, monospace',
        fontSize: '1.2rem',
        fontWeight: '600',
        margin: '0',
        color: 'var(--primary-cyan)',
        textShadow: '0 0 10px var(--primary-cyan)',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;