import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function useCurrencies() {
  const dispatch = useDispatch();
  let currency;
  const obj = {
    value: { sign: '$', symbol: 'USD', uuid: 'yhjMzLPhuIDl' },
    label: '$ USD',
  };
  let localStorageCurrency = localStorage?.getItem('currencies');

  useEffect(() => {
    if (!localStorageCurrency) {
      localStorage.setItem(
        'currencies',
        JSON.stringify({
          value: obj.value,
          label: obj.label,
        })
      );
    }
  }, []);

  if (!localStorageCurrency) {
    currency = obj;
  } else {
    currency = JSON.parse(localStorageCurrency);
  }
  console.log(currency);
  return currency;
}
