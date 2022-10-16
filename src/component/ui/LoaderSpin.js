import React from 'react';

const LoaderSpin = () => {
  return (
    <div className="overflow-hidden bg-transparent flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    </div>
  );
};

export default LoaderSpin;
