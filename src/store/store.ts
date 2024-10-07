import { configureStore } from '@reduxjs/toolkit';
import saladReducer from '../store/slices/saladSlice/saladSlice.ts';
import cartReducer from '../store/slices/cartSlice/cartSlice.ts';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    salad: saladReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
