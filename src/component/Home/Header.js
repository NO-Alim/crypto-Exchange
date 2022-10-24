import React from 'react';
import { useSelector } from 'react-redux';
import { useGetCryptosQuery } from '../../features/coinRanking/coinRankingApi';
import { abbreviateNumber } from '../../utils//millionBillionConverter';
import Error from '../ui/Error';
import Loader from '../ui/Loader';

const Header = () => {
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
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  if (!isLoading && isError) content = <Error message={error.error} />;

  if (!isLoading && !isError && data?.data?.stats) {
    const globalStats = data.data.stats;
    content = (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-5">
        <div className="bg-textPrimary/90 rounded p-2 col-span-1 text-center">
          <h2 className="text-xl font-normal">Total</h2>
          <h2 className="text-2xl font-semibold">{globalStats.total}</h2>
        </div>
        <div className="bg-textPrimary/90 rounded p-2 col-span-1 text-center">
          <h2 className="text-xl font-normal">Total 24Hr Volume</h2>
          <h2 className="text-2xl font-semibold">
            {abbreviateNumber(Number(globalStats.total24hVolume))}
            {/* {globalStats.total24hVolume} */}
          </h2>
        </div>
        <div className="bg-textPrimary/90 rounded p-2 col-span-1 text-center">
          <h2 className="text-xl font-normal">Total Coins</h2>
          <h2 className="text-2xl font-semibold">{globalStats.totalCoins}</h2>
        </div>
        <div className="bg-textPrimary/90 rounded p-2 col-span-1 text-center">
          <h2 className="text-xl font-normal">Total Exchanges</h2>
          <h2 className="text-2xl font-semibold">
            {globalStats.totalExchanges}
          </h2>
        </div>
        <div className="bg-textPrimary/90 rounded p-2 col-span-1 text-center">
          <h2 className="text-xl font-normal">Total Market Cap</h2>
          <h2 className="text-2xl font-semibold">
            {/* {globalStats.totalMarketCap} */}
            {abbreviateNumber(Number(globalStats.totalMarketCap))}
          </h2>
        </div>
        <div className="bg-textPrimary/90 rounded p-2 col-span-1 text-center">
          <h2 className="text-xl font-normal">Total Markets</h2>
          <h2 className="text-2xl font-semibold">{globalStats.totalMarkets}</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-background section">
      <div className="mb-10">
        <h1 className="text-3xl font-thin text-textPrimary">
          Global Crypto Stats
        </h1>
      </div>
      {content}
    </div>
  );
};

export default Header;
