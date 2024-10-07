import { configureStore } from '@reduxjs/toolkit';
import saladReducer from '../store/slices/saladSlice/saladSlice.ts';

export const store = configureStore({
  reducer: {
    salad: saladReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
