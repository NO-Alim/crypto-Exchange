import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { rankingFilter } from '../features/filter/filterSlice';

const RankingFilter = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { rankingQuery } = useSelector((state) => state.filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(rankingFilter(input));
    setInput('');
  };
  const handleClear = () => {
    dispatch(rankingFilter(''));
  };
  return (
    <div className="mb-10 w-full flex flex-wrap gap-5 justify-between items-center">
      <form
        className="flex items-center border border-brand rounded bg-textPrimary px-2"
        onSubmit={handleSubmit}
      >
        <input
          className="outline-none border-none py-2 text-background"
          type="text"
          name="search"
          value={input}
          placeholder="Search"
          onChange={(e) => setInput(e.target.value)}
        />
        <button>
          <i className="">
            <FaSearch />
          </i>
        </button>
      </form>
      {rankingQuery && (
        <button
          className="px-3 py-2 text-lg font-semibold bg-brand/80 all hover:bg-brand rounded "
          onClick={handleClear}
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default RankingFilter;
