import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineDone } from 'react-icons/md';
import { abbreviateNumber } from '../../utils/millionBillionConverter';

const SupplyInformation = ({ coin }) => {
  const { name, supply } = coin;
  const { circulating, confirmed, supplyAt, total, max } = supply;
  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl">Supply information</h1>
        <p>
          View the total and circulating supply of {name}, including details on
          how the supplies are calculated.
        </p>
        <div className="bg-brand/20 rounded">
          <div className="h-20 flex items-center justify-between px-5">
            <div className="flex gap-3 items-center">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  confirmed ? 'bg-green-500' : 'bg-red-600'
                }`}
              >
                <i>{confirmed ? <MdOutlineDone /> : <FaTimes />}</i>
              </span>
              <h1 className="text-lg font-semibold">Verified supply</h1>
            </div>
          </div>
        </div>
        <div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">Circulating supply </p>
            <h2 className="text-xl font-bold">
              {abbreviateNumber(Number(circulating))} BTC
            </h2>
          </div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">Total supply</p>
            <h2 className="text-xl font-bold">
              {abbreviateNumber(Number(total))} BTC
            </h2>
          </div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">Max supply</p>
            <h2 className="text-xl font-bold">
              {abbreviateNumber(Number(max))} BTC
            </h2>
          </div>
          <div className="border-b border-brand/50 flex justify-between items-center py-3">
            <p className="text-lg">Issuance blockchain</p>
            <h2 className="text-xl font-bold">{name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyInformation;
