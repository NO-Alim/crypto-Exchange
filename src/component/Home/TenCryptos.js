import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../../features/coinRanking/coinRankingApi';
import Error from '../ui/Error';
import Loader from '../ui/Loader';
import CryptoCart from './CryptoCart';

const TenCryptos = () => {
  const cryptoCount = 10;
  const { uuid } = useSelector((state) => state.currencies);
  const { data, isLoading, isError, error } = useGetCryptosQuery({
    cryptoCount,
    referenceCurrencyUuid: uuid,
    offset: 0,
    query: '',
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
  if (data?.data?.coins) {
    const coins = data.data.coins;
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {coins.map((item) => {
          return <CryptoCart item={item} key={item.uuid} />;
        })}
      </div>
    );
  }
  return (
    <div className="bg-background section">
      <div className="pb-5 text-textPrimary flex justify-between item-center mb-10 border-b border-brand/50">
        <h1 className="text-2xl font-semibold">Top Ten Cryptos</h1>
        <Link
          className="text-lg font-semibold text-brand/80 all hover:text-brand"
          to="/ranking"
        >
          See More
        </Link>
      </div>
      {content}
    </div>
  );
};

export default TenCryptos;
