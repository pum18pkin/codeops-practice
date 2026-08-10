// let --- block-scoped, cant be redeclared
// var --- global, can be redeclared
// const --- block-scoped, immutable which means it cannot be reassigned, but the value can be mutated if it's an object or array
//console.log(typeof variable) shows the type of variable
// let ishidden = true
// function handleClick() {
//     ishidden = !ishidden;
//     let type = ishidden ? "password" : "text";
//     document.getElementById("password").type = type;
// }
// let x = 10;
// let y = 15;
// if (x == y) {
//     console.log("x is equal to y");
// }else if (x > y) {
//     console.log("x is greater than y");
// } else {
//     console.log("x is less than y");
// }
let bill = Number(450);
let partysize = 3;
let paymentMethod = "TeleBirr";

let tip;
if(bill > 300){
    tip = bill * 0.1;
}else{
    tip = bill * 0.05;
}

let total = bill + tip;

let serviceFee = 0;

switch(paymentMethod){
    case "TeleBirr":
        serviceFee = 5;
        break;
    case "CBE Birr":
        serviceFee = 3;
        break;
    default:
        serviceFee = 0;
}
total += serviceFee;

let perPerson = total / partysize;

console.log(`Bill: ${bill.toFixed(2)} ETB`);
console.log(`Tip: ${tip.toFixed(2)} ETB`);
console.log(`Service Fee: ${serviceFee.toFixed(2)} ETB`);
console.log(`Total: ${total.toFixed(2)} ETB`);
console.log(`Amount per Person: ${perPerson.toFixed(2)} ETB`);