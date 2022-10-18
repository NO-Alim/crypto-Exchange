import React, { useEffect, useState } from 'react';
import {
  useGetCryptoPriceCalculateQuery,
  useGetReferenceCurrenciesQuery,
} from '../../features/coinRanking/coinRankingApi';
import useCurrencies from '../../hooks/useCureencies';
import CalculatorInputSelectOptions from '../ui/CalculatorInputSelectOptions';

const Calculator = ({ coin }) => {
  const { uuid, symbol, name } = coin;
  const currency = useCurrencies();
  const timeStamp = new Date().getTime() / 1000;

  const { data: referenceCurrencies } = useGetReferenceCurrenciesQuery(10);

  //for react-select
  const [currencies, setCurrencies] = useState([currency]);
  const [inputSelectedOption, setInputSelectedOption] = useState({
    value: {
      symbol: name,
      sign: symbol,
      uuid: uuid,
    },
    label: symbol + '-' + name,
  });
  const [resultSelectedOption, setResultSelectedOption] = useState(currency);
  //input
  const [inputValue, setInputValue] = useState(1);
  const [resultValue, setResultValue] = useState(1);

  //get calculate
  const { data: calculateData } = useGetCryptoPriceCalculateQuery({
    uuid: inputSelectedOption.value.uuid,
    referenceCurrencyUuid: resultSelectedOption.value.uuid,
    timeStamp,
  });

  const inputHandleSelect = (e) => {
    setInputSelectedOption(e);
  };
  const resultHandleSelect = (e) => {
    setResultSelectedOption(e);
  };

  //when currencies fetched
  useEffect(() => {
    if (referenceCurrencies?.data?.currencies) {
      let fetchedCurrencies = referenceCurrencies.data.currencies.map(
        (item) => {
          return {
            value: { sign: item.sign, symbol: item.symbol, uuid: item.uuid },
            label: item.sign + ' ' + item.symbol,
          };
        }
      );
      setCurrencies(fetchedCurrencies);
    }
  }, [referenceCurrencies]);

  useEffect(() => {
    console.log(calculateData);
  }, [calculateData]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl">Calculator</h1>
        <p>
          Use the calculator to convert real-time prices between all available
          cryptocurrencies and fiat..
        </p>
        <form className="flex flex-col gap-5 w-full">
          <div className="grid grid-cols-3 border border-brand rounded">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="col-span-2 bg-transparent focus:outline-none hover:outline-none px-3"
            />
            <CalculatorInputSelectOptions
              options={currencies}
              placeholder="Input"
              value={inputSelectedOption}
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={(e) => inputHandleSelect(e)}
              required
            />
          </div>
          <div className="grid grid-cols-3 border border-brand rounded">
            <input
              type="number"
              placeholder="result"
              value={resultValue}
              onChange={(e) => setResultValue(e.target.value)}
              className="col-span-2 bg-transparent focus:outline-none hover:outline-none px-3"
            />
            <CalculatorInputSelectOptions
              options={currencies}
              placeholder="Result"
              components={{
                IndicatorSeparator: () => null,
              }}
              value={resultSelectedOption}
              onChange={(e) => resultHandleSelect(e)}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
