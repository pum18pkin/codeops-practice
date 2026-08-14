const list = document.getElementById("list");

async function load() {
    list.textContent = "Loading…";

    try {
        const res = await fetch(
            "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian"
        );

        if (!res.ok) {
            throw new Error("Request failed");
        }

        const data = await res.json();

        list.innerHTML = "";

        data.meals.forEach(item => {
            const li = document.createElement("li");

            li.textContent = item.strMeal;

            list.appendChild(li);
        });

    } catch (error) {
        list.textContent =
            "Sorry, something went wrong. Please try again.";
    } finally {
        if (list.textContent === "Loading…") {
            list.textContent = "";
        }
    }
}

load();