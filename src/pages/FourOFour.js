import React from 'react';
import { Link } from 'react-router-dom';

const FourOFour = () => {
  return (
    <div className="bg-background text-textPrimary h-screen section py-0 flex flex-col items-center justify-center gap-5">
      <h1 className="text-5xl md:text-[100px] text-brand font-bold">404</h1>
      <h1 className="text-3xl">Page Not Found</h1>
      <Link
        to="/"
        className="bg-brand/80 hover:bg-brand all text-background px-5 py-3 rounded text-xl font-semibold"
      >
        Back To Home
      </Link>
    </div>
  );
};

export default FourOFour;
