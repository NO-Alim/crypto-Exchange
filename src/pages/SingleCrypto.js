import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Calculator from '../component/SingleCrypto/Calculator';
import CryptoExchange from '../component/SingleCrypto/CryptoExchange';
import CryptoMarkets from '../component/SingleCrypto/CryptoMarkets';
import Links from '../component/SingleCrypto/Links';
import PriceChart from '../component/SingleCrypto/PriceChart';
import SingleCryptoHeader from '../component/SingleCrypto/SingleCryptoHeader';
import SupplyInformation from '../component/SingleCrypto/SupplyInformation';
import ValueStatics from '../component/SingleCrypto/ValueStatics';
import Error from '../component/ui/Error';
import LoaderSpin from '../component/ui/LoaderSpin';
import { useGetCryptoDetailsQuery } from '../features/coinRanking/coinRankingApi';
const SingleCrypto = () => {
  const { uuid, sign, symbol } = useSelector((state) => state.currencies);

  const { cryptoId } = useParams();
  const { data, isLoading, isError, error } = useGetCryptoDetailsQuery({
    coinId: cryptoId,
    referenceCurrencyUuid: uuid,
  });

  let content;

  if (isLoading)
    content = (
      <div className="w-full h-screen flex items-center justify-center">
        <LoaderSpin />
      </div>
    );

  if (!isLoading && isError) {
    content = <Error message={error.data} />;
  }

  if (!isLoading && !isError && data?.data?.coin) {
    const coin = data?.data?.coin;
    content = (
      <div>
        <SingleCryptoHeader coin={coin} />
        <PriceChart coin={coin} />
        <div className="grid grid-cols-1 lg:grid-cols-2 section pt-0 mt-10 gap-20">
          <div className="col-span-1 ">
            <ValueStatics coin={coin} />
          </div>
          <div className="col-span-1">
            <SupplyInformation coin={coin} />
          </div>
          <div className="col-span-1">
            <CryptoExchange coin={coin} />
          </div>
          <div className="col-span-1">
            <CryptoMarkets coin={coin} />
          </div>
          <div className="col-span-1">
            <Calculator coin={coin} />
          </div>
          <div className="col-span-1">
            <Links coin={coin} />
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
