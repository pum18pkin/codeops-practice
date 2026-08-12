import { subtotal, discountBy, withVat, toETB, makeReceiptMaker } from "./order.js";
const memberRate = 0.10;
const prices = [100, 200, 50]
const total = withVat(
  discountBy(memberRate)(
    subtotal(...prices)
  )
);
const receipt = makeReceiptMaker();

console.log(receipt(total));