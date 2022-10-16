import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../../features/coinRanking/coinRankingApi';
import { precisionRound } from '../../utils/PrecisionRound';
import Loader from '../ui/Loader';

const TenCryptos = () => {
  const cryptoCount = 10;
  const { uuid, sign, symbol } = useSelector((state) => state.currencies);
  const { data, isLoading, isError, error } = useGetCryptosQuery({
    cryptoCount,
    referenceCurrencyUuid: uuid,
  });
  let content;
  if (isLoading)
    content = (
      <div className="grid grid-cols-2 sm:grid-cols-3">
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  if (isError) content = <h1>Something Wrong</h1>;
  if (data?.data?.coins) {
    const coins = data.data.coins;
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {coins.map((item) => {
          return (
            <Link to={`/crypto/${item.uuid}`} key={item.uuid}>
              <div className="bg-textPrimary/90 all hover:bg-brand/90 rounded-md p-2 cursor-pointer">
                <div className="flex justify-between items-center mb-3">
                  <h1 className="text-xl font-semibold">
                    {item.rank}. {item.name}
                  </h1>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.iconUrl}
                    alt=""
                  />
                </div>
                <h4 className="text-lg">
                  Price:{' '}
                  <span className="font-semibold">
                    {sign}
                    {precisionRound(Number(item.price), 2)}
                  </span>
                </h4>
                <p>Market Cap: {precisionRound(Number(item.marketCap), 2)}</p>
              </div>
            </Link>
          );
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
