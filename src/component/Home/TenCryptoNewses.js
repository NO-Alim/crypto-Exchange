import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptoNewsQuery } from '../../features/cryptoNews/cryptoNewsApi';
import Error from '../ui/Error';
import Loader from '../ui/Loader';
import NewsCart from './NewsCart';

const TenCryptoNewses = () => {
  const { data, isLoading, isError, error } = useGetCryptoNewsQuery({
    newsCategory: 'crypto',
    count: 10,
  });

  let content;
  if (isLoading)
    content = (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        <div className="col-span-1">
          <Loader />
        </div>
        <div className="col-span-1">
          <Loader />
        </div>
        <div className="col-span-1">
          <Loader />
        </div>
      </div>
    );
  if (!isLoading && isError) content = <Error message={error.error} />;
  if (data?.value?.length > 0) {
    const newses = data.value;
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  gap-5">
        {newses.map((item, ind) => {
          return <NewsCart item={item} key={ind} />;
        })}
      </div>
    );
  }

  return (
    <div className="bg-background section">
      <div className="pb-5 text-textPrimary flex justify-between item-center mb-10 border-b border-brand/50">
        <h1 className="text-2xl font-semibold">Top Ten Crypto Newses</h1>
        <Link
          className="text-lg font-semibold text-brand/80 all hover:text-brand"
          to="/newses"
        >
          See More
        </Link>
      </div>
      {content}
    </div>
  );
};

export default TenCryptoNewses;
