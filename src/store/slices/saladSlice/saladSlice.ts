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
    sortByType: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'price-low-first':
          state.allSalads = [...state.allSalads].sort(
            (salad1, salad2) => salad1.price - salad2.price,
          );
          break;
        case 'price-high-first':
          state.allSalads = [...state.allSalads].sort(
            (salad1, salad2) => salad2.price - salad1.price,
          );
          break;
        case 'popularity-low-first':
          state.allSalads = [...state.allSalads].sort(
            (salad1, salad2) => salad1.popularity - salad2.popularity,
          );
          break;
        case 'popularity-high-first':
          state.allSalads = [...state.allSalads].sort(
            (salad1, salad2) => salad2.popularity - salad1.popularity,
          );
          break;
        case 'alphabetical':
          state.allSalads = [...state.allSalads].sort((salad1, salad2) =>
            salad1.name.localeCompare(salad2.name),
          );
          break;
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

export const { filterByType, sortByType } = saladSlice.actions;

export default saladSlice.reducer;
