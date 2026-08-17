const amount = document.getElementById("amount");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const reverseBtn = document.getElementById("reverseBtn");
const refreshBtn = document.getElementById("refreshBtn");

const convertedAmount = document.getElementById("convertedAmount");
const status = document.getElementById("status");
const watchlist = document.getElementById("watchlist");
const lastUpdated = document.getElementById("lastUpdated");

const amountLabel = document.querySelector('label[for="amount"]');

let reversed = false;
let rate = null;

let watchlistItems =
    JSON.parse(localStorage.getItem("watchlist")) || [];


async function loadCurrencies() {
    try {
        const response = await fetch(
            "https://api.frankfurter.dev/v2/currencies"
        );

        if (!response.ok) {
            throw new Error("Could not load currencies");
        }

        const data = await response.json();

        toCurrency.innerHTML = "";

        data.forEach(currency => {
            if (currency.iso_code === "ETB") return;

            const option = document.createElement("option");

            option.value = currency.iso_code;
            option.textContent =
                currency.name;

            toCurrency.appendChild(option);
        });

        const usd = toCurrency.querySelector(
            'option[value="USD"]'
        );

        if (usd) {
            toCurrency.value = "USD";
        }

    } catch (error) {
        console.error(error);

        toCurrency.innerHTML =
            `<option value="">Could not load currencies</option>`;

        status.textContent =
            "Could not load currencies.";

        status.style.color = "red";
    }
}


function getCurrencies() {
    if (reversed) {
        return {
            from: toCurrency.value,
            to: "ETB"
        };
    }

    return {
        from: "ETB",
        to: toCurrency.value
    };
}


async function loadRate() {
    const { from, to } = getCurrencies();

    if (!from || !to) {
        return false;
    }

    status.textContent =
        `Loading ${from} → ${to}...`;

    status.style.color = "#6b7280";

    try {
        const response = await fetch(
            `https://api.frankfurter.dev/v2/rate/${from}/${to}?providers=NBE`
        );

        if (!response.ok) {
            throw new Error("Rate unavailable");
        }

        const data = await response.json();

        rate = Number(data.rate);

        if (!Number.isFinite(rate)) {
            throw new Error("Invalid rate");
        }

        status.textContent =
            `1 ${from} = ${rate} ${to}`;

        status.style.color = "green";

        lastUpdated.textContent =
            new Date().toLocaleTimeString();

        return true;

    } catch (error) {
        console.error(error);

        rate = null;

        status.textContent =
            `Rate for ${from} → ${to} is not available.`;

        status.style.color = "red";

        return false;
    }
}


async function convert() {
    const value = Number(amount.value);

    if (
        amount.value.trim() === "" ||
        !Number.isFinite(value) ||
        value <= 0
    ) {
        convertedAmount.textContent = "—";

        status.textContent =
            "Please enter a valid amount.";

        status.style.color = "red";

        return;
    }

    if (!toCurrency.value) {
        status.textContent =
            "Please select a currency.";

        status.style.color = "red";

        return;
    }

    convertBtn.disabled = true;
    convertBtn.textContent = "Loading...";

    const success = await loadRate();

    if (success) {
        const { from, to } = getCurrencies();

        const converted =
            value * rate;

        convertedAmount.textContent =
            `${converted.toFixed(2)} ${to}`;

        watchlistItems.unshift({
            from: from,
            to: to,
            amount: value.toFixed(2),
            result: converted.toFixed(2),
            time: new Date().toLocaleString()
        });

        localStorage.setItem(
            "watchlist",
            JSON.stringify(watchlistItems)
        );

        renderWatchlist();
    }

    convertBtn.disabled = false;
    convertBtn.textContent = "Convert";
}


async function reverse() {
    reversed = !reversed;

    const { from, to } = getCurrencies();

    amountLabel.textContent =
        `Amount in ${from}`;

    amount.placeholder =
        `Enter amount in ${from}`;

    convertedAmount.textContent = "—";

    await loadRate();
}


async function refresh() {
    refreshBtn.disabled = true;
    refreshBtn.textContent = "↻ Loading...";

    await loadRate();

    refreshBtn.disabled = false;
    refreshBtn.textContent = "↻ Refresh";
}


function renderWatchlist() {
    watchlist.innerHTML = "";

    if (watchlistItems.length === 0) {
        watchlist.innerHTML =
            `<p class="empty-message">
                No conversions yet.
            </p>`;

        return;
    }

    watchlistItems.forEach((item, index) => {
        const div = document.createElement("div");

        div.className = "watchlist-item";

        const info = document.createElement("div");

        const conversion =
            document.createElement("strong");

        conversion.textContent =
            `${item.from} ${item.amount} → ${item.to} ${item.result}`;

        const time =
            document.createElement("small");

        time.textContent =
            item.time;

        const remove =
            document.createElement("button");

        remove.type = "button";
        remove.className = "remove-btn";
        remove.textContent = "Remove";

        remove.addEventListener("click", () => {
            watchlistItems.splice(index, 1);

            localStorage.setItem(
                "watchlist",
                JSON.stringify(watchlistItems)
            );

            renderWatchlist();
        });

        info.appendChild(conversion);
        info.appendChild(document.createElement("br"));
        info.appendChild(time);

        div.appendChild(info);
        div.appendChild(remove);

        watchlist.appendChild(div);
    });
}


convertBtn.addEventListener(
    "click",
    convert
);

reverseBtn.addEventListener(
    "click",
    reverse
);

refreshBtn.addEventListener(
    "click",
    refresh
);

toCurrency.addEventListener(
    "change",
    () => {
        convertedAmount.textContent = "—";
        loadRate();
    }
);


async function start() {
    renderWatchlist();

    await loadCurrencies();

    if (toCurrency.value) {
        await loadRate();
    }
}


start();