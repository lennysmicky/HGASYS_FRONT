/* ================================================
   HGASYS - Composant InputField
   ================================================ */

import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  required = false,
  disabled = false,
  autoComplete,
  icon: Icon,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const hasError = touched && error;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Icône à gauche */}
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">
            <Icon style={{ fontSize: '1rem' }} />
          </div>
        )}

        {/* Input */}
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`
            input
            ${Icon ? 'pl-9' : ''}
            ${isPassword ? 'pr-9' : ''}
            ${hasError ? 'input-error' : ''}
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          `}
          {...props}
        />

        {/* Toggle password visibility */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <VisibilityOffIcon style={{ fontSize: '1rem' }} />
            ) : (
              <VisibilityIcon style={{ fontSize: '1rem' }} />
            )}
          </button>
        )}
      </div>

      {/* Message d'erreur */}
      {hasError && (
        <p className="input-error-text">{error}</p>
      )}
    </div>
  );
};

export default InputField;