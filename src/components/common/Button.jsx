/* ================================================
   HGASYS - Composant Button
   ================================================ */

import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    success: 'btn-success',
    warning: 'btn-warning',
  };

  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" color={variant === 'primary' ? 'white' : 'primary'} />
          <span>Chargement...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon style={{ fontSize: '1rem' }} />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon style={{ fontSize: '1rem' }} />
          )}
        </>
      )}
    </button>
  );
};

export default Button;