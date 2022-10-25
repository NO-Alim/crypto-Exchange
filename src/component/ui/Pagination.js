import React, { useEffect, useState } from 'react';

const Pagination = ({ totalPage, handlePageChange, page }) => {
  const [activePage, setActivePage] = useState(page);

  useEffect(() => {
    setActivePage(page);
  }, [page]);

  return (
    <div className="flex gap-2">
      {[...Array(totalPage)].map((e, i) => (
        <div
          className={`flex items-center justify-center w-5 h-5  cursor-pointer rounded ${
            i === activePage
              ? 'bg-brand text-background'
              : 'bg-brand/50 text-textPrimary'
          } ${
            //1st start
            activePage < 2 || activePage > totalPage - 3
              ? //1st execution when true
                //2nd start
                activePage < 2 && i > 4
                ? //2nd when true
                  'hidden'
                : //2nd when false
                //3rd start
                activePage > totalPage - 3 && i < totalPage - 5
                ? //3rd true
                  'hidden'
                : //3rd false
                  null
              : //1st execution when false
              i < activePage + 3 && i > activePage - 3
              ? null
              : 'hidden'
          }
          `}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
