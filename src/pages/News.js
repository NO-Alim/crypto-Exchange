import React from 'react';
import { useGetCryptoNewsQuery } from '.././features/cryptoNews/cryptoNewsApi';
import NewsCart from '../component/Home/NewsCart';
import Error from '../component/ui/Error';
import Loader from '../component/ui/Loader';
const News = () => {
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
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {newses.map((item, ind) => {
          return <NewsCart item={item} key={ind} />;
        })}
      </div>
    );
  }
  return <div className="bg-background section min-h-screen">{content}</div>;
};

export default News;
