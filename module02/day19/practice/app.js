let items = [];

const form = document.querySelector("#add-form");
const input = document.querySelector("#name");
const list = document.querySelector("#list");
const count = document.querySelector("#count");

function render() {
    list.innerHTML = "";

    items.forEach(function (item) {
        const li = document.createElement("li");

        li.dataset.id = item.id;

        if (item.done) {
            li.classList.add("done");
        }

        li.textContent = item.name;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("del");

        li.appendChild(deleteButton);
        list.appendChild(li);
    });

    count.textContent = `${items.length} item${items.length !== 1 ? "s" : ""}`;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = input.value.trim();

    if (name === "") {
        return;
    }

    items.push({
        id: Date.now(),
        name: name,
        done: false
    });

    input.value = "";

    render();
});

list.addEventListener("click", function (e) {
    const row = e.target.closest("li");

    if (!row) {
        return;
    }

    const id = Number(row.dataset.id);

    if (e.target.classList.contains("del")) {
        items = items.filter(function (item) {
            return item.id !== id;
        });
    } else {
        const item = items.find(function (item) {
            return item.id === id;
        });

        if (item) {
            item.done = !item.done;
        }
    }

    render();
});

render();