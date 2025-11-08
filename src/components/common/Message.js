import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, Loader2 } from 'lucide-react';

export const Message = ({ 
  type = 'info', 
  title,
  message,
  className = '' ,
}) => {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      textColor: 'text-green-800',
      iconColor: 'text-green-600',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      textColor: 'text-red-800',
      iconColor: 'text-red-600',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600',
    },
    loading: {
      icon: Loader2,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-800',
      iconColor: 'text-indigo-600',
    },
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];
  const isLoading = type === 'loading';

  return (
    <div className={`${bgColor} border-l-4 ${borderColor} ${textColor} p-4 rounded-lg ${className}`}>
      <div className="flex items-start">
        <Icon className={`w-5 h-5 ${iconColor} mt-0.5 mr-3 flex-shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
        <div className="flex-1">
          {title && <h4 className="font-bold mb-1">{title}</h4>}
          {message && <p className="text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
};