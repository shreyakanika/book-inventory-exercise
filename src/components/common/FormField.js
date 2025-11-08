import React, { forwardRef } from 'react';

export const FormField = forwardRef(({ 
  label, 
  error, 
  required = false,
  type = 'text',
  as = 'input', 
  rows = 3,
  className = '',
  ...props 
}, ref) => {
  const Component = as;
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Component
        ref={ref}
        rows={as === 'textarea' ? rows : undefined}
        className={`w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';