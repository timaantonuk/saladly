import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Salad } from '../../../types.ts';
import { fetchSalads } from './saladActions.ts';

export interface SaladState {
  allSalads: Salad[];
  originalSalads: Salad[];
  activeFilterKey: string;
  filteredSalads: Salad[];
  currentSortKey: string;
  currentPage: number; // Добавляем текущую страницу
}

const initialState: SaladState = {
  allSalads: [],
  originalSalads: [],
  activeFilterKey: 'all',
  filteredSalads: [],
  currentSortKey: '',
  currentPage: 1, // Инициализируем с первой страницы
};

export const saladSlice = createSlice({
  name: 'salad',
  initialState,
  reducers: {
    filterByType: (state, action: PayloadAction<string>) => {
      state.activeFilterKey = action.payload;

      // Если выбран 'all', сбрасываем отфильтрованные салаты на оригинальные
      if (action.payload === 'all') {
        state.filteredSalads = [...state.originalSalads];
      } else {
        // Фильтруем по выбранному фильтру
        state.filteredSalads = state.originalSalads.filter((salad) =>
          salad.filters?.includes(action.payload),
        );
      }

      // После фильтрации сбрасываем текущую страницу на первую
      state.currentPage = 1;

      // После фильтрации повторно применяем сортировку, если она была
      if (state.currentSortKey) {
        state.filteredSalads = applySorting(
          state.filteredSalads,
          state.currentSortKey,
        );
      }

      // Обновляем allSalads
      state.allSalads = [...state.filteredSalads];
    },
    sortByType: (state, action: PayloadAction<string>) => {
      state.currentSortKey = action.payload; // Store the current sort key

      // Sort the filtered salads based on the current sort key
      state.filteredSalads = applySorting(state.filteredSalads, action.payload);
      // Update allSalads to reflect the sorted filtered salads
      state.allSalads = [...state.filteredSalads];
    },
    searchByName: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.allSalads = state.filteredSalads.filter((salad) =>
        salad.name.toLowerCase().includes(searchTerm),
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSalads.fulfilled, (state, action) => {
      state.allSalads = action.payload;
      state.originalSalads = action.payload; // Store original salads
      state.filteredSalads = action.payload; // Initialize filtered salads
      console.log('Salads from builder', action.payload);
    });
  },
});

// Helper function to sort salads based on the current sort key
const applySorting = (salads: Salad[], sortKey: string) => {
  switch (sortKey) {
    case 'price-low-first':
      return [...salads].sort((salad1, salad2) => salad1.price - salad2.price);
    case 'price-high-first':
      return [...salads].sort((salad1, salad2) => salad2.price - salad1.price);
    case 'popularity-low-first':
      return [...salads].sort(
        (salad1, salad2) => salad1.popularity - salad2.popularity,
      );
    case 'popularity-high-first':
      return [...salads].sort(
        (salad1, salad2) => salad2.popularity - salad1.popularity,
      );
    case 'alphabetical':
      return [...salads].sort((salad1, salad2) =>
        salad1.name.localeCompare(salad2.name),
      );
    default:
      return salads; // No sorting
  }
};

export const { filterByType, sortByType, searchByName } = saladSlice.actions;

export default saladSlice.reducer;
