import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetCryptosQuery } from '.././features/coinRanking/coinRankingApi';
import CryptoCart from '../component/Home/CryptoCart';
import RankingFilter from '../component/RankingFilter';
import Error from '../component/ui/Error';
import Loader from '../component/ui/Loader';
import Pagination from '../component/ui/Pagination';

const Ranking = () => {
  const cryptoCount = 30;
  const { uuid } = useSelector((state) => state.currencies);
  const { rankingQuery } = useSelector((state) => state.filter);
  const [page, setPage] = useState(0);

  const { data, isLoading, isError, error } = useGetCryptosQuery({
    cryptoCount,
    referenceCurrencyUuid: uuid,
    offset: page,
    query: rankingQuery,
  });

  //for hasMore
  useEffect(() => {
    if (data) {
      const totalCount = data?.data?.stats?.totalCoins || cryptoCount;
      const paginatePage = Math.ceil(totalCount / cryptoCount);
    }
  }, [data, cryptoCount]);

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
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {coins.map((item) => {
            return <CryptoCart item={item} key={item.uuid} />;
          })}
        </div>
      );
    } else {
      content = (
        <div>
          <Error message="No Cryptocurrency Found" />;
        </div>
      );
    }
  }
  return (
    <div className="bg-background section min-h-screen scrollbar-hide">
      {!isLoading && !isError && data && <RankingFilter />}

      <div className="scrollbar-hide">{content}</div>
      <div className="flex items-center justify-center pt-10">
        <Pagination totalPage={15}/>
      </div>
    </div>
  );
};

export default Ranking;
