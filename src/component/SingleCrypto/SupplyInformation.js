import React from 'react';

const SupplyInformation = ({ coin }) => {
  const { name, supply } = coin;
  const { circulating, confirmed, supplyAt, total } = supply;
  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl">Value Statistics</h1>
        <p>
          View the total and circulating supply of {name}, including details on
          how the supplies are calculated.
        </p>
        <div className="bg-brand/10 rounded p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Verified Supply</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyInformation;
