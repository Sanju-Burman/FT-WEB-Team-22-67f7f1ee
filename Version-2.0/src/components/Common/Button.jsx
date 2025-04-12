import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-${disabled ? 'disabled' : variant} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;