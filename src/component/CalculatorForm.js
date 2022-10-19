import React, { useEffect, useState } from 'react';
import {
  useGetCryptoPriceCalculateQuery,
  useGetReferenceCurrenciesQuery,
} from '.././features/coinRanking/coinRankingApi';
import useCurrencies from '.././hooks/useCureencies';
import CalculatorInputSelectOptions from './ui/CalculatorInputSelectOptions';
import Error from './ui/Error';

const CalculatorForm = ({ coin }) => {
  const { uuid, symbol, name } = coin;
  const currency = useCurrencies();

  const {
    data: referenceCurrencies,
    isError,
    error,
  } = useGetReferenceCurrenciesQuery(10);

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
  const [coinUuid, setCoinUuid] = useState(uuid);

  //input
  const [inputValue, setInputValue] = useState(1);
  const [resultValue, setResultValue] = useState(1);
  const [result, setResult] = useState(true);

  //get calculate
  const { data: calculateData, isLoading } = useGetCryptoPriceCalculateQuery({
    uuid: coinUuid,
    referenceCurrencyUuid: resultSelectedOption.value.uuid,
  });

  const inputHandleSelect = (e) => {
    setInputSelectedOption(e);
    setCoinUuid(e.value.uuid);
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
    if (calculateData?.data?.price) {
      if (result) {
        setResultValue(inputValue * calculateData.data.price);
      } else {
        setInputValue(resultValue / calculateData.data.price);
      }
    }
  }, [calculateData, result, inputValue, resultValue, isLoading]);

  if (!isLoading && isError) {
    return <Error message={error.error} />;
  }
  return (
    !isError && (
      <form className="flex flex-col gap-5 w-full">
        <div className="grid grid-cols-3 border border-brand rounded">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setResult(true);
            }}
            placeholder="Input"
            className={`col-span-2 bg-transparent focus:outline-none hover:outline-none px-3 ${
              !result ? (isLoading ? 'hidden' : '') : null
            }`}
          />
          <div
            className={`col-span-2 h-full items-center pl-3 ${
              !result ? (isLoading ? 'flex' : 'hidden') : 'hidden'
            }`}
          >
            <span className="">Loading...</span>
          </div>
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
            onChange={(e) => {
              setResultValue(e.target.value);
              setResult(false);
            }}
            className={`col-span-2 bg-transparent focus:outline-none hover:outline-none px-3 ${
              result ? (isLoading ? 'hidden' : '') : ''
            }`}
          />
          <div
            className={`col-span-2 h-full items-center pl-3 ${
              result ? (isLoading ? 'flex' : 'hidden') : 'hidden'
            }`}
          >
            <span className="">Loading...</span>
          </div>
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
    )
  );
};

export default CalculatorForm;
