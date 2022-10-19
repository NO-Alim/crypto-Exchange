import React, { useEffect, useState } from 'react';
import Headroom from 'react-headroom';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useGetReferenceCurrenciesQuery } from '../features/coinRanking/coinRankingApi';
import { changeCurrencies } from '../features/currencies/currenciesSlice';
import useCurrencies from '../hooks/useCureencies';
import CalculatorModal from './CalculatorModal';
import SelectOption from './ui/SelectOption';

const Navbar = () => {
  const currency = useCurrencies();

  const { data } = useGetReferenceCurrenciesQuery(10);
  const dispatch = useDispatch();
  const [isCalculator, setIsCalculator] = useState(false);

  //used for selector
  const [currencies, setCurrencies] = useState([currency]);

  const [selectedOption, setSelectedOption] = useState(currency);

  //react-select selector handler
  const handleSelect = (e) => {
    setSelectedOption(e);
    localStorage.setItem(
      'currencies',
      JSON.stringify({
        value: e.value,
        label: e.label,
      })
    );
  };

  //calculator modal control
  const control = () => {
    setIsCalculator(!isCalculator);
  };

  //when selector value change reselect store currencies
  useEffect(() => {
    dispatch(changeCurrencies(selectedOption.value));
  }, [dispatch, selectedOption]);

  //after fetch useGetReferenceCurrenciesQuery reset react-selector options
  useEffect(() => {
    if (data?.data?.currencies) {
      let fetchedCurrencies = data.data.currencies.map((item) => {
        return {
          value: { sign: item.sign, symbol: item.symbol, uuid: item.uuid },
          label: item.sign + ' ' + item.symbol,
        };
      });
      setCurrencies(fetchedCurrencies);
    }
  }, [data]);

  return (
    <Headroom style={{ zIndex: '1000' }}>
      <nav className="section py-2 bg-background text-textPrimary flex justify-between items-center shadow-sm shadow-cyan-900">
        <div>
          <NavLink to="/">
            <img className="w-20" src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="flex gap-5 items-center">
          <div className="text-xl hidden md:flex items-center gap-5">
            <NavLink className="font-thin all hover:text-brand" to="/">
              Home
            </NavLink>
            <NavLink className="font-thin all hover:text-brand" to="/ranking">
              Ranking
            </NavLink>
            <NavLink className="font-thin all hover:text-brand" to="/newses">
              Newses
            </NavLink>
            <button
              className="text-base bg-brand all hover:bg-brand text-background px-3 py-2 rounded-md"
              onClick={control}
            >
              Calculator
            </button>
          </div>
          <div>
            <SelectOption
              options={currencies}
              placeholder="Team"
              value={selectedOption}
              onChange={(e) => handleSelect(e)}
              required
            />
          </div>
        </div>
        <CalculatorModal open={isCalculator} control={control} />
      </nav>
    </Headroom>
  );
};

export default Navbar;
