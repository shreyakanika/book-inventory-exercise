import React, { useState, useEffect } from 'react';
import { ImageIcon, ImageOff } from 'lucide-react';

export const BookImage = ({ imageURL, title }) => {
  const [imageError, setImageError] = useState(false);
  const hasValidUrl = !!imageURL && imageURL.trim() !== '';
  const showPlaceholder = !hasValidUrl || imageError;

  useEffect(() => {
    setImageError(false);
  },
[imageURL]);

  return (
    <div className="flex-shrink-0 w-16 h-20 flex items-center justify-center rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-gray-50">
      {showPlaceholder ? (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-400 text-xs text-center p-1">
          {imageError ? <ImageOff className="w-5 h-5 mb-1" /> : <ImageIcon className="w-5 h-5 mb-1" />}
          <span className="text-[10px]">{imageError ? "Load Error" : "No Cover"}</span>
        </div>
      ) : (
        <img
          src={imageURL}
          alt={`Cover for ${title}`}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};