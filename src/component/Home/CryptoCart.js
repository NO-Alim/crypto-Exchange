import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { abbreviateNumber } from '../../utils/millionBillionConverter';
import { precisionRound } from '../../utils/PrecisionRound';

const CryptoCart = ({ item }) => {
  const { sign } = useSelector((state) => state.currencies);

  return (
    <Link to={`/crypto/${item.uuid}`}>
      <div className="bg-textPrimary/90 all hover:bg-brand/90 rounded-md p-2 cursor-pointer">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold">
            {item.rank}. {item.name}
          </h1>
          <img className="w-10 h-10 rounded-full" src={item.iconUrl} alt="" />
        </div>
        <h4 className="text-lg">
          Price:{' '}
          <span className="font-semibold">
            {sign}
            {precisionRound(Number(item.price), 2)}
          </span>
        </h4>
        <p>
          Market Cap: {sign} {abbreviateNumber(Number(item.marketCap))}
        </p>
      </div>
    </Link>
  );
};

export default CryptoCart;
