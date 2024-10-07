import { createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../../../types.ts';

interface ICart {
  cartItems: ICartItem[];
}

const initialState: ICart = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.name === action.payload.name,
      );

      if (existingItemIndex !== -1) {
        // Если элемент уже существует, увеличиваем его количество
        state.cartItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // Если элемента нет, добавляем его в корзину
        state.cartItems.push(action.payload);
      }
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
