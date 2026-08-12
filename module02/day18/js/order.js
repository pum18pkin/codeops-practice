// Add up all prices
export function subtotal(...prices) {
  return prices.reduce((total, price) => total + price, 0);
}

// Factory function for discounts
export function discountBy(rate) {
  return (amount) => amount * (1 - rate);
}

// Add VAT
export function withVat(amount, vatRate = 0.15) {
  return amount * (1 + vatRate);
}

// Format amount in ETB
export function toETB(amount) {
  return `${amount.toFixed(2)} ETB`;
}

// Receipt maker with a private running order number
export function makeReceiptMaker() {
  let orderNumber = 0;

  return function makeReceipt(amount) {
    orderNumber++;

    return `#${orderNumber}: ${toETB(amount)}`;
  };
}