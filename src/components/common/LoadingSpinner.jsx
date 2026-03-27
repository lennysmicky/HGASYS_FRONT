/* ================================================
   HGASYS - Composant LoadingSpinner
   ================================================ */

import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  fullScreen = false,
  text = ''
}) => {
  const sizeClasses = {
    sm: 'spinner-sm',
    md: '',
    lg: 'spinner-lg',
  };

  const colorClasses = {
    primary: 'border-t-primary-500',
    white: 'border-t-white',
    secondary: 'border-t-secondary-500',
  };

  const spinner = (
    <div className={`spinner ${sizeClasses[size]} ${colorClasses[color]}`} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          {spinner}
          {text && <p className="text-sm text-text-secondary">{text}</p>}
        </div>
      </div>
    );
  }

  if (text) {
    return (
      <div className="flex items-center justify-center gap-2">
        {spinner}
        <span className="text-sm text-text-secondary">{text}</span>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;