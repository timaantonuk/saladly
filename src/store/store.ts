// import { configureStore } from '@reduxjs/toolkit';
// import saladReducer from '../store/slices/saladSlice/saladSlice.ts';
// import cartReducer from '../store/slices/cartSlice/cartSlice.ts';
// import { useDispatch } from 'react-redux';
//
// export const store = configureStore({
//   reducer: {
//     salad: saladReducer,
//     cart: cartReducer,
//   },
// });
//
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppStore = typeof store;
// export type AppDispatch = AppStore['dispatch'];
//
// export const useAppDispatch: () => AppDispatch = useDispatch;

import { configureStore } from '@reduxjs/toolkit';
import saladReducer from '../store/slices/saladSlice/saladSlice.ts';
import cartReducer from '../store/slices/cartSlice/cartSlice.ts';
import userReducer from '../store/slices/userSlice/userSlice.ts';

import { useDispatch } from 'react-redux';
import { ICartItem, IUserState } from '../types.ts';

const saveCartToLocalStorage = (state: { cartItems: ICartItem[] }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.error('Не удалось сохранить состояние в localStorage:', e);
  }
};

const saveUserToLocalStorage = (state: IUserState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('user', serializedState);
  } catch (e) {
    console.log(e);
  }
};

//TODO CHANGE ROUTES IF USER LOGGED IN

const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined; // Если данных нет, возвращаем undefined, чтобы использовать initialState
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Не удалось загрузить состояние из localStorage:', e);
    return undefined;
  }
};

const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) {
      return undefined; // Если данных нет, возвращаем undefined, чтобы использовать initialState
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Не удалось загрузить состояние из localStorage:', e);
    return undefined;
  }
};

const preloadedCartState = loadCartFromLocalStorage();
const preloadedUserState = loadUserFromLocalStorage();

export const store = configureStore({
  reducer: {
    salad: saladReducer,
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState: {
    cart: preloadedCartState || { cartItems: [] }, // Восстанавливаем состояние корзины
    user: preloadedUserState || { name: '', email: '', avatar: '' },
  },
});

// Подписываемся на изменения состояния и сохраняем корзину в localStorage
store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart);
  saveUserToLocalStorage(store.getState().user);
});

// Типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

// Хук для использования dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
