import React, { useState } from 'react';

const Pagination = ({ totalPage }) => {
  const [activePage, setActivePage] = useState(2);
  return (
    <div className="flex gap-2">
      {[...Array(totalPage)].map((e, i) => (
        <div
          className={`flex items-center justify-center w-5 h-5  cursor-pointer rounded ${
            i === activePage
              ? 'bg-brand text-background'
              : 'bg-brand/50 text-textPrimary'
          } ${(activePage === 0 || 1 || 2) && i > 4 ? 'hidden' : null}
          }`}
          key={i}
          onClick={() => setActivePage(i)}
        >
          {i}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
