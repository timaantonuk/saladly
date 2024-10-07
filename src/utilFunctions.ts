import { ICartItem } from './types.ts';

export function calculateTotal(arr: ICartItem[]) {
  return arr
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
}

export function calculateItem(price: number, quantity: number) {
  return (quantity * price).toFixed(2);
}
