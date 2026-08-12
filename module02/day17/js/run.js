import {
  subtotal,
  discountBy,
  withVat,
  makeReceiptMaker
} from "./order.js";

const memberDiscount = discountBy(0.10);
const receipt = makeReceiptMaker();

const order1 = withVat(
  memberDiscount(
    subtotal(120, 180, 250)
  )
);

const order2 = withVat(
  memberDiscount(
    subtotal(300, 150, 200)
  )
);

const order3 = withVat(
  subtotal(100, 250)
);

console.log(receipt(order1));
console.log(receipt(order2));
console.log(receipt(order3));