// let collection = document.getElementsByClassName("blue")
// let list = document.querySelectorAll(".blue")
// console.log(collection)
// console.log(list)
let cart = document.createElement("strong")
cart.textContent = "cart"
cart.id = "cart"
let newDiv = document.createElement("div")
newDiv.appendChild(cart)
document.getElementById("nav-bar").appendChild(newDiv)
newDiv.classList.add("blue")
document.getElementById("logo").addEventListener("click",(e) =>{alert("logo was clicked!")})

cart.addEventListener("click",(e) =>{alert("cart was clicked!")})
// const handelSubmit = (event) => {
//     event.preventDefult();
//     email = document.getElementById("email").value;
//     password = document.getElementById("password").value;
//     console.log("email")
//     console.log("password")
// }
let form = document.getElementById("form")

form.addEventListener("submit", function (event) {

    event.preventDefault();

    console.log("FORM SUBMITTED!");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Email:", email);
    console.log("Password:", password);
});