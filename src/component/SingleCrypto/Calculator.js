import React, { useState } from 'react';
import useCurrencies from '../../hooks/useCureencies';
import SelectOption from '../ui/SelectOption';

const Calculator = () => {
  const currency = useCurrencies();
  const [currencies, setCurrencies] = useState([currency]);
  const [selectedOption, setSelectedOption] = useState(currency);
  const [inputValueOne, setInputValueOne] = useState(1);
  const [resultValue, setResultValue] = useState()
  const handleSelect = (e) => {
    setSelectedOption(e);
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl">Calculator</h1>
        <p>
          Use the calculator to convert real-time prices between all available
          cryptocurrencies and fiat..
        </p>
        <form className="flex flex-col gap-5 w-full">
          <div className="grid grid-cols-3 border border-brand rounded overflow-hidden">
            <input
              type="number"
              value="1"
              className="col-span-2 bg-transparent focus:outline-none hover:outline-none px-3"
            />
            <SelectOption
              options={currencies}
              placeholder="Team"
              value={selectedOption}
              onChange={(e) => handleSelect(e)}
              required
            />
          </div>
          <div className="grid grid-cols-3 border border-brand rounded overflow-hidden">
            <input
              type="number"
              value="1"
              className="col-span-2 bg-transparent focus:outline-none hover:outline-none px-3"
            />
            <SelectOption
              options={currencies}
              placeholder="Team"
              value={selectedOption}
              onChange={(e) => handleSelect(e)}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
