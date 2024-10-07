import { createSlice } from '@reduxjs/toolkit';
import { Salad } from '../../../types.ts';
import { fetchSalads } from './saladActions.ts';

export interface SaladState {
  allSalads: Salad[];
  activeFilterKey: string;
}

const initialState: SaladState = {
  allSalads: [],
  activeFilterKey: 'all',
};

export const saladSlice = createSlice({
  name: 'salad',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSalads.fulfilled, (state, action) => {
      state.allSalads = action.payload;
      console.log('Salads from builder', action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
// export const {  } = saladSlice.actions;

export default saladSlice.reducer;
