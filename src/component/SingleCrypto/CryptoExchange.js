import React from 'react';
import { useSelector } from 'react-redux';
import { useGetCryptoExchangesQuery } from '../../features/coinRanking/coinRankingApi';
import { abbreviateNumber } from '../../utils/millionBillionConverter';
import { precisionRound } from '../../utils/PrecisionRound';
import LoaderSpin from '../ui/LoaderSpin';

const CryptoExchange = ({ coin }) => {
  const { uuid: referenceCurrencyUuid, sign } = useSelector(
    (state) => state.currencies
  );
  const limit = 5;
  const { uuid, name } = coin;

  const { data, isLoading, isError } = useGetCryptoExchangesQuery({
    coinId: uuid,
    referenceCurrencyUuid: referenceCurrencyUuid,
    limit: limit,
  });

  let content;
  if (isLoading)
    content = (
      <div className="w-full py-10">
        <LoaderSpin />
      </div>
    );
  if (!isLoading && isError) content = <h1>Something Wrong</h1>;

  if (!isLoading && !isError && data?.data?.exchanges?.length > 0) {
    const exchanges = data?.data?.exchanges;
    content = exchanges.map((item) => {
      const { uuid: itemUuid, iconUrl, rank, price, name } = item;
      const twentyFourHrVolume = item['24hVolume'];
      return (
        <div
          className="border-b border-brand/50 flex justify-between items-center py-3"
          key={itemUuid}
        >
          <div className="flex gap-5 items-center justify-center">
            <p>{rank}</p>
            <img className="w-10 h-10" src={iconUrl} alt={name} />
            <h3 className="text-lg">{name}</h3>
          </div>
          <div className="flex flex-col items-end">
            <h2 className="text-lg font-semibold">
              {sign} {abbreviateNumber(Number(twentyFourHrVolume))}
            </h2>
            <h2 className="text-lg">
              {sign} {precisionRound(Number(price), 2)}
            </h2>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl">Best exchanges to buy Bitcoin</h1>
        <p>
          The top crypto exchanges that have {name} available for trading,
          ranked by 24h trading volume and the current price.
        </p>
        <div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <h2 className="text-xl font-bold">Exchange</h2>
            <h2 className="text-xl font-bold">24H Volume</h2>
          </div>
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default CryptoExchange;
