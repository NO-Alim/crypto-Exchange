import { configureStore } from '@reduxjs/toolkit';
import { coinRankingApi } from '../features/coinRanking/coinRankingApi';
import { cryptoNewsApi } from '../features/cryptoNews/cryptoNewsApi';
import currenciesReducer from '../features/currencies/currenciesSlice';
import filterReducer from '../features/filter/filterSlice';
export const store = configureStore({
  reducer: {
    [coinRankingApi.reducerPath]: coinRankingApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    currencies: currenciesReducer,
    filter: filterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(
      coinRankingApi.middleware,
      cryptoNewsApi.middleware
    ),
});
