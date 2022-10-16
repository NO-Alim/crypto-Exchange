import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { abbreviateNumber } from '../../utils/millionBillionConverter';
import { precisionRound } from '../../utils/PrecisionRound';
const ValueStatics = ({ coin }) => {
  const { symbol: currSymbol, sign } = useSelector((state) => state.currencies);
  console.log(coin);
  const {
    name,
    iconUrl,
    numberOfExchanges,
    price,
    rank,
    symbol,
    numberOfMarkets,
    change,
    btcPrice,
    marketCap,
    fullyDilutedMarketCap,
    allTimeHigh,
  } = coin;
  const twintyFourHourVolume = coin['24hVolume'];

  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl">Value Statistics</h1>
        <p>
          An overview showing the statistics of {name}, such as the base and
          quote currency, the rank, and trading volume.
        </p>
        <div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">Price to {currSymbol}</p>
            <h2 className="text-xl font-bold">
              {sign} {precisionRound(Number(price), 2)}
            </h2>
          </div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">Price to BTC</p>
            <h2 className="text-xl font-bold">
              {precisionRound(Number(btcPrice), 2)} BTC
            </h2>
          </div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">Rank{currSymbol}</p>
            <h2 className="text-xl font-bold">{rank}</h2>
          </div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">24h Volume</p>
            <h2 className="text-xl font-bold">
              {sign} {abbreviateNumber(Number(twintyFourHourVolume))}
            </h2>
          </div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">Market Cap</p>
            <h2 className="text-xl font-bold">
              {sign} {abbreviateNumber(Number(marketCap))}
            </h2>
          </div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">Fully diluted market cap</p>
            <h2 className="text-xl font-bold">
              {sign} {abbreviateNumber(Number(fullyDilutedMarketCap))}
            </h2>
          </div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">All-time high (daily avg.)</p>
            <div className="flex flex-col items-end">
              <h2 className="text-xl font-bold">
                {sign} {precisionRound(Number(allTimeHigh.price), 2)}
              </h2>
              <p>on {moment.unix(allTimeHigh.timestamp).format('L')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueStatics;
