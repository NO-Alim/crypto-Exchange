import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PriceChart from '../component/SingleCrypto/PriceChart';
import SingleCryptoHeader from '../component/SingleCrypto/SingleCryptoHeader';
import SupplyInformation from '../component/SingleCrypto/SupplyInformation';
import ValueStatics from '../component/SingleCrypto/ValueStatics';
import { useGetCryptoDetailsQuery } from '../features/coinRanking/coinRankingApi';
const SingleCrypto = () => {
  const { uuid, sign, symbol } = useSelector((state) => state.currencies);

  const { cryptoId } = useParams();
  const { data, isLoading, isError } = useGetCryptoDetailsQuery({
    coinId: cryptoId,
    referenceCurrencyUuid: uuid,
  });

  let content;

  if (isLoading)
    content = (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="flex items-center justify-center  relative w-20 h-20 rounded-full">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </div>
    );

  if (!isLoading && isError) {
    content = <h1>Some Thing Wrong!</h1>;
  }

  if (!isLoading && !isError && data?.data?.coin) {
    const coin = data?.data?.coin;
    content = (
      <div>
        <SingleCryptoHeader coin={coin} />
        <PriceChart coin={coin} />
        <div className="grid grid-cols-1 lg:grid-cols-2 section py-0 mt-10 gap-20">
          <div className="col-span-1 ">
            <ValueStatics coin={coin} />
          </div>
          <div className="col-span-1">
            <SupplyInformation coin={coin} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-textPrimary">{content}</div>
  );
};

export default SingleCrypto;
