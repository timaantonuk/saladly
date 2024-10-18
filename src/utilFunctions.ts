import { ICartItem } from './types.ts';

export function calculateTotal(arr: ICartItem[]) {
  return arr
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
}

export function calculateItem(price: number, quantity: number) {
  return (quantity * price).toFixed(2);
}

export function convertTimestampToDate(timestamp: number): string {
  // Create a new Date object using the timestamp (seconds)
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // Format the date as desired (e.g., 'MM/DD/YYYY')
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(undefined, options); // Use default locale
}
