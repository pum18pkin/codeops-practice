// function myfun(a, b){
//     console.log(`the sum is ${a + b}`);
// }
// myfun(5, 10);

//const { useCallback } = require("react");

// const sum = function (...a){
//     console.log(`the sum with 10 is ${a + 10}`);
// }
// sum(50)

// function makeGreeter(city) {
//     return function (name) {
//         console.log(`Selam ${name}, from ${city}`);
//     };
// }
// const addis = makeGreeter("Addis Ababa");
// addis("Almaz"); // "Selam Almaz, from..."



// function adder(num1, num2, fun){
//     // number++
//     return fun(num1, num2)
// }

// function sum(a,b){
//     return a+b
// }
// console.log(adder(10, 20, sum));


function adder (num1, num2, callback){
    return callback(num1, num2)
}

function substractor(a, b){
    return a-b
}


console.log(adder(10, 20, substractor))