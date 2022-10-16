import React from 'react';
import { useSelector } from 'react-redux';
import { precisionRound } from '../../utils/PrecisionRound';

const SingleCryptoHeader = ({ coin }) => {
  const {
    name,
    iconUrl,
    numberOfExchanges,
    price,
    rank,
    symbol,
    numberOfMarkets,
    change,
  } = coin;
  const { sign } = useSelector((state) => state.currencies);

  return (
    <div className="section flex flex-col md:flex-row gap-5 justify-between items-start md:items-center py-5 border-b border-brand/50">
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        <div className="flex gap-2 items-center">
          <img className="x w-10 h-10 rounded-full" src={iconUrl} alt="" />
          <h2 className="text-2xl font-semibold">{name}</h2>
          <h5 className="text-xl font-thin text-textPrimary/70">{symbol}</h5>
          <h5 className="bg-brand text-background text-sm px-1 rounded">
            # {rank}
          </h5>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            {sign} {precisionRound(Number(price), 2)}
          </h2>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex gap-2">
          <h1 className="font-semibold">Exchanges</h1>
          <h1 className="bg-brand/50 rounded text-sm flex items-center justify-center px-1">
            {numberOfExchanges}
          </h1>
        </div>
        <div className="flex gap-2">
          <h1 className="font-semibold">Markets</h1>
          <h1 className="bg-brand/50 rounded text-sm flex items-center justify-center px-1">
            {numberOfMarkets}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SingleCryptoHeader;
