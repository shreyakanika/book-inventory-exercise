import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  variant = 'primary',
  size = 'md', 
  icon: Icon,
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    success: "bg-green-500 text-white hover:bg-green-600 shadow-lg",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2 text-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};
