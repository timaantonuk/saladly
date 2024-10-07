import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Salad } from '../../../types.ts';
import { fetchSalads } from './saladActions.ts';

export interface SaladState {
  allSalads: Salad[];
  originalSalads: Salad[];
  activeFilterKey: string;
}

const initialState: SaladState = {
  allSalads: [],
  originalSalads: [], // Храним оригинальные данные
  activeFilterKey: 'all',
};

export const saladSlice = createSlice({
  name: 'salad',
  initialState,
  reducers: {
    filterByType: (state, action: PayloadAction<string>) => {
      state.activeFilterKey = action.payload;
      if (action.payload === 'all') {
        // Если фильтр "All", возвращаем все
        state.allSalads = state.originalSalads;
      } else {
        // Иначе фильтруем
        state.allSalads = state.originalSalads.filter((salad) =>
          salad.filters?.includes(action.payload),
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSalads.fulfilled, (state, action) => {
      state.allSalads = action.payload;
      state.originalSalads = action.payload; // Сохраняем оригинальные салаты
      console.log('Salads from builder', action.payload);
    });
  },
});

export const { filterByType } = saladSlice.actions;

export default saladSlice.reducer;
