import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rankingQuery: '',
  newsQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    rankingFilter: (state, action) => {
      state.rankingQuery = action.payload;
    },
    newsQuery: (state, action) => {
      state.newsQuery = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { rankingFilter, newsQuery } = filterSlice.actions;
