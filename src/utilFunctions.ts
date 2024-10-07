export function calculateTotal(arr) {
  return arr
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
}

export function calculateItem(price, quantity) {
  return (quantity * price).toFixed(2);
}
