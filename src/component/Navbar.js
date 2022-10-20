import Drawer from '@material-ui/core/Drawer';
import { useWindowWidth } from '@react-hook/window-size';
import React, { useEffect, useRef, useState } from 'react';
import Headroom from 'react-headroom';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useGetReferenceCurrenciesQuery } from '../features/coinRanking/coinRankingApi';
import { changeCurrencies } from '../features/currencies/currenciesSlice';
import useCurrencies from '../hooks/useCureencies';
import CalculatorModal from './CalculatorModal';
import SelectOption from './ui/SelectOption';

import { makeStyles } from '@material-ui/core/styles';

//drawer style
const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  list: {
    width: 'auto',
  },
  fullList: {
    width: 'auto',
  },
  drawerPaper: {
    width: 'auto',
    background: '#0b162a',
    color: '#e9e9e9',
  },
});

const Navbar = () => {
  const currency = useCurrencies();

  const { data } = useGetReferenceCurrenciesQuery(10);
  const dispatch = useDispatch();
  const [isCalculator, setIsCalculator] = useState(false);

  //used for selector
  const [currencies, setCurrencies] = useState([currency]);
  const [selectedOption, setSelectedOption] = useState(currency);

  //for drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const DrawerRef = useRef(null);
  const classes = useStyles();
  const width = useWindowWidth();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleKeydown = (e) => {
    if (e.type === 'keydown' && (e.key === 'Enter' || e.key === 'shift')) {
      setDrawerOpen(false);
    }
  };

  const handleClick = (e) => {
    if (!menuBtnRef.current.contains(e.target)) {
      if (!DrawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    }
  };
  const mediumWidthDrawerControll = () => {
    if (width > 768) {
      setDrawerOpen(false);
    }
  };

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

  //for drawer
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleClick);
    };
  });

  //when width > 768 set drawer close
  useEffect(() => {
    mediumWidthDrawerControll();

    return () => {
      mediumWidthDrawerControll();
    };
  }, [width]);

  return (
    <>
      <Headroom style={{ zIndex: '1000' }}>
        <nav className="section py-2 bg-background text-textPrimary flex justify-between items-center shadow-sm shadow-cyan-900">
          <div>
            <NavLink to="/">
              <img className="w-14 md:w-20" src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="flex gap-5 items-center">
            <div className="text-xl hidden md:flex items-center gap-5">
              <NavLink
                className="font-thin all hover:text-brand"
                style={({ isActive }) => (isActive ? { color: '#75efff' } : {})}
                to="/"
                end
              >
                Home
              </NavLink>
              <NavLink
                className="font-thin all hover:text-brand"
                style={({ isActive }) => (isActive ? { color: '#75efff' } : {})}
                to="/ranking"
              >
                Ranking
              </NavLink>
              <NavLink
                className="font-thin all hover:text-brand"
                style={({ isActive }) => (isActive ? { color: '#75efff' } : {})}
                to="/newses"
              >
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
            <div className="menu md:hidden cursor-pointer">
              <div
                className={`w-[30px] h-[30px] flex flex-col justify-around`}
                onClick={() => toggleDrawer()}
                ref={menuBtnRef}
              >
                <span
                  className={`all menu-bar bg-textPrimary block h-[2px] ${
                    drawerOpen ? 't -rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span
                  className={`all menu-bar bg-textPrimary block h-[2px] ${
                    drawerOpen ? 'hidden' : ''
                  }`}
                ></span>
                <span
                  className={`all menu-bar bg-textPrimary block h-[2px] ${
                    drawerOpen ? 'rotate-45 -translate-y-[7px]' : ''
                  }`}
                ></span>
              </div>
            </div>
          </div>
          <CalculatorModal open={isCalculator} control={control} />
        </nav>
      </Headroom>
      <Drawer
        className={classes.list}
        palette="secondary"
        variant="persistent"
        open={drawerOpen}
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        ref={DrawerRef}
      >
        <div className="p-2 max-w-[300px] w-screen flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <NavLink to="/">
              <img className="w-16" src={logo} alt="mralim" />
            </NavLink>
            <i onClick={() => setDrawerOpen(false)}>
              <FaTimes />
            </i>
          </div>
          <div>
            <ul className="list-none flex flex-col items-center gap-5">
              <NavLink
                className="font-thin all hover:text-brand"
                style={({ isActive }) => (isActive ? { color: '#75efff' } : {})}
                to="/"
                end
                onClick={() => setDrawerOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                className="font-thin all hover:text-brand"
                style={({ isActive }) => (isActive ? { color: '#75efff' } : {})}
                to="/ranking"
                onClick={() => setDrawerOpen(false)}
              >
                Ranking
              </NavLink>
              <NavLink
                className="font-thin all hover:text-brand"
                style={({ isActive }) => (isActive ? { color: '#75efff' } : {})}
                to="/newses"
                onClick={() => setDrawerOpen(false)}
              >
                Newses
              </NavLink>
              <button
                className="text-base bg-brand all hover:bg-brand text-background px-3 py-2 rounded-md"
                onClick={() => {
                  control();
                  setDrawerOpen(false);
                }}
              >
                Calculator
              </button>
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
