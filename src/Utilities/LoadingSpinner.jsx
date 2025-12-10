import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f8fafc] bg-opacity-50 z-50">
      <div className="animate-spin w-16 h-16 border-4 border-t-4 border-primary border-t-accent rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;