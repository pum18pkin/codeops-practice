export function subtotal(...prices) {
  return prices.reduce((total, price) => total + price, 0);
}

export function discountBy(rate) {
  return (amount) => amount * (1 - rate);
}

export function withVat(amount, vatRate = 0.15) {
  return amount * (1 + vatRate);
}

export function toETB(amount) {
  return `${amount.toFixed(2)} ETB`;
}

export function makeReceiptMaker() {
  let orderNumber = 0;

  return function (amount) {
    orderNumber++;
    return `#${orderNumber}: ${toETB(amount)}`;
  };
}