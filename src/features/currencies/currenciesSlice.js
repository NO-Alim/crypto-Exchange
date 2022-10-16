import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sign: '',
  symbol: '',
  uuid: '',
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    changeCurrencies: (state, action) => {
      state.sign = action.payload.sign;
      state.symbol = action.payload.symbol;
      state.uuid = action.payload.uuid;
    },
  },
});

export default currenciesSlice.reducer;
export const { changeCurrencies } = currenciesSlice.actions;
