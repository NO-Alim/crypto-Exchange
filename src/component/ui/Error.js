import React from 'react';

const Error = ({ message }) => {
  return (
    <div className="text-center text-red-600 text-xl font-semibold">
      {message}
    </div>
  );
};

export default Error;
