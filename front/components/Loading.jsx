import React from 'react';

const Loading = ({ message, className = '' }) => (
  <div className={`flex items-center justify-center py-8 ${className}`}>
    <div className="text-center">
      <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
      {message && <p className="text-sm text-text-secondary">{message}</p>}
    </div>
  </div>
);

export default Loading;
