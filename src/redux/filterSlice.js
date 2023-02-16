import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setNameFilter(state, action) {
      return state = action.payload;
    },
  },
});

export const { setNameFilter } = filterSlice.actions;

// Selectors
export const getNameFilter = (state) => state.filter;