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
        state.cartItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    //TODO INCREMENT ITEM, DECREMENT ITEM

    deleteItem: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.name === action.payload.name,
      );

      if (existingItemIndex !== -1) {
        state.cartItems.splice(existingItemIndex, 1);
      }
    },

    increment: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.name === action.payload.name,
      );
      state.cartItems[existingItemIndex].quantity += 1;
    },

    decrement: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.name === action.payload.name,
      );

      if (existingItemIndex !== -1) {
        if (state.cartItems[existingItemIndex].quantity > 1) {
          state.cartItems[existingItemIndex].quantity -= 1;
        } else {
          // Remove the item if quantity is 1 or less
          state.cartItems.splice(existingItemIndex, 1);
        }
      }
    },
  },
});

export const { addItem, deleteItem, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
