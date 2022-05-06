import { createSlice } from '@reduxjs/toolkit';
import { Document } from 'flexsearch';

export interface SearchState {
  searchIndex: Document<unknown, false> | null;
  hasPopulatedIndex: boolean;
}

const initialState: SearchState = {
  searchIndex: null,
  hasPopulatedIndex: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    add: (state, action) => {},
  },
});

export default searchSlice.reducer;
