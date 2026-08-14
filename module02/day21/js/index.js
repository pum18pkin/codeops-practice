const form = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const error = document.getElementById("error");
const count = document.getElementById("count");

const phonePattern = /^(?:0[97]\d{8}|\+251[97]\d{8})$/;

let people = JSON.parse(localStorage.getItem("people")) || [];

function updateCount() {
    count.textContent = `${people.length} people have signed up`;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    error.textContent = "";

    // Remove old error styles
    nameInput.classList.remove("input-error");
    phoneInput.classList.remove("input-error");

    if (name.length < 2) {
        nameInput.classList.add("input-error");
        error.textContent = "Name must be at least 2 characters.";
        return;
    }

    if (!phonePattern.test(phone)) {
        phoneInput.classList.add("input-error");
        error.textContent = "Please enter a valid Ethiopian phone number.";
        return;
    }

    const person = {
        name: name,
        phone: phone
    };

    people.push(person);

    localStorage.setItem("people", JSON.stringify(people));

    form.reset();

    updateCount();
});

updateCount();