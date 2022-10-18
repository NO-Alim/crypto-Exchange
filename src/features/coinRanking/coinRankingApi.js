import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeader = {
  'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
};

const createRequest = (url) => ({ url, headers: cryptoApiHeader });

export const coinRankingApi = createApi({
  reducerPath: 'coinRanking',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CRYPTO_API_URL,
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: ({ cryptoCount, referenceCurrencyUuid }) =>
        createRequest(
          `/coins?referenceCurrencyUuid=${referenceCurrencyUuid}&limit=${cryptoCount}`
        ),
    }),
    getCryptoDetails: builder.query({
      query: ({ coinId, referenceCurrencyUuid }) =>
        createRequest(
          `/coin/${coinId}?referenceCurrencyUuid=${referenceCurrencyUuid}`
        ),
    }),
    getReferenceCurrencies: builder.query({
      query: (referenceCount) =>
        createRequest(`/reference-currencies?limit=${referenceCount}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod, referenceCurrencyUuid }) =>
        createRequest(
          `coin/${coinId}/history?referenceCurrencyUuid=${referenceCurrencyUuid}&timePeriod=${timePeriod}`
        ),
    }),
    getCryptoExchanges: builder.query({
      query: ({ coinId, referenceCurrencyUuid, limit }) =>
        createRequest(
          `coin/${coinId}/exchanges?referenceCurrencyUuid=${referenceCurrencyUuid}&limit=${limit}`
        ),
    }),
    getCryptoMarkets: builder.query({
      query: ({ coinId, referenceCurrencyUuid, limit }) =>
        createRequest(
          `coin/${coinId}/markets?referenceCurrencyUuid=${referenceCurrencyUuid}&limit=${limit}`
        ),
    }),
    getCryptoPriceCalculate: builder.query({
      query: ({ uuid, referenceCurrencyUuid, timeStamp }) =>
        createRequest(
          //https://coinranking1.p.rapidapi.com/coin/yhjMzLPhuIDl/price?referenceCurrencyUuid=yhjMzLPhuIDl
          `coin/${uuid}/price?referenceCurrencyUuid=${referenceCurrencyUuid}&timestamp=${timeStamp}`
        ),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetReferenceCurrenciesQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoExchangesQuery,
  useGetCryptoMarketsQuery,
  useGetCryptoPriceCalculateQuery,
} = coinRankingApi;
