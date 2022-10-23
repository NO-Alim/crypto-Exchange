import React from 'react';
import { useSelector } from 'react-redux';
import { useGetCryptosQuery } from '.././features/coinRanking/coinRankingApi';
import CryptoCart from '../component/Home/CryptoCart';
import RankingFilter from '../component/RankingFilter';
import Error from '../component/ui/Error';
import Loader from '../component/ui/Loader';

const Ranking = () => {
  const cryptoCount = 50;
  const { uuid } = useSelector((state) => state.currencies);
  const { rankingQuery } = useSelector((state) => state.filter);

  const { data, isLoading, isError, error } = useGetCryptosQuery({
    cryptoCount,
    referenceCurrencyUuid: uuid,
    query: rankingQuery,
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

    if (coins?.length > 0) {
      content = (
        <div>
          <RankingFilter />
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {coins.map((item) => {
              return <CryptoCart item={item} key={item.uuid} />;
            })}
          </div>
        </div>
      );
    } else {
      content = (
        <div>
          <RankingFilter />
          <Error message="No Cryptocurrency Found" />;
        </div>
      );
    }
  }
  return (
    <div className="bg-background section min-h-screen">
      <div>{content}</div>
    </div>
  );
};

export default Ranking;
