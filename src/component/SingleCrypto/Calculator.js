import React from 'react';
import CalculatorForm from '../CalculatorForm';

const Calculator = ({ coin }) => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl">Calculator</h1>
        <p>
          Use the calculator to convert real-time prices between all available
          cryptocurrencies and fiat..
        </p>
        <CalculatorForm coin={coin} />
      </div>
    </div>
  );
};

export default Calculator;
