const STORAGE_KEY = "birrBudgetTransactions"; 
//loads transactions 
function loadTransactions() {
const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        return JSON.parse(data);
    }
    return [];
}
function saveTransactions(transactions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}
function addTransaction(transaction) {
    const transactions = loadTransactions();
    transactions.push(transaction);
    saveTransactions(transactions);
}
function deleteTransaction(id) {
    const transactions = loadTransactions();
    const updated = transactions.filter(function (t) {
        return t.id !== id;
    });
    saveTransactions(updated);
}
function calculateTotals(transactions) {
    const totalIncome = transactions
        .filter(function (t) {
            return t.type === "income";
        })
        .reduce(function (sum, t) {
            return sum + t.amount;
        }, 0);
    const totalExpenses = transactions
        .filter(function (t) {
            return t.type === "expense";
        })
        .reduce(function (sum, t) {
            return sum + t.amount;
        }, 0);
    const balance = totalIncome - totalExpenses;
    return {
        totalIncome: totalIncome,
        totalExpenses: totalExpenses,
        balance: balance,
    };
}
function formatBirr(amount) {
    return "ETB " + amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
}
function renderDashboard(transactions) {
    const totals = calculateTotals(transactions);
    document.getElementById("total-income").textContent = formatBirr(totals.totalIncome);
    document.getElementById("total-expenses").textContent = formatBirr(totals.totalExpenses);
    document.getElementById("current-balance").textContent = formatBirr(totals.balance);
}
function renderTransactions(transactions) {
    const tableBody = document.getElementById("transaction-list");
    const emptyMessage = document.getElementById("empty-message");
    const table = document.querySelector(".history-table");
    tableBody.innerHTML = "";
    if (transactions.length === 0) {
        emptyMessage.classList.remove("hidden");
        table.classList.add("hidden");
        return;
    }
    emptyMessage.classList.add("hidden");
    table.classList.remove("hidden");
    const sorted = transactions.slice().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    sorted.forEach(function (transaction) {
    const row = document.createElement("tr");
        const amountClass = transaction.type === "income" ? "amount-income" : "amount-expense";
        const badgeClass = transaction.type === "income" ? "badge-income" : "badge-expense";
        const amountPrefix = transaction.type === "income" ? "+" : "-";
row.innerHTML =
            '<td>' + escapeHTML(transaction.description) + '</td>' +
            '<td>' + escapeHTML(transaction.category) + '</td>' +
            '<td>' + formatDate(transaction.date) + '</td>' +
            '<td class="' + amountClass + '">' + amountPrefix + ' ' + formatBirr(transaction.amount) + '</td>' +
            '<td><span class="badge ' + badgeClass + '">' + transaction.type + '</span></td>' +
            '<td><button class="btn-delete" data-id="' + transaction.id + '">Delete</button></td>';
        tableBody.appendChild(row);
    });
}

function render() {
    const transactions = loadTransactions();
    renderDashboard(transactions);
    renderTransactions(transactions);
}
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}
function escapeHTML(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
function setDefaultDate() {
    const dateInput = document.getElementById("date");
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    dateInput.value = year + "-" + month + "-" + day;
}
function handleFormSubmit(event) {
    event.preventDefault();
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    if (!type) {
        alert("Please select a transaction type.");
        return;
    }
    if (!description) {
        alert("Please enter a description.");
        return;
    }
    if (!amount || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }
    if (!category) {
        alert("Please select a category.");
        return;
    }
    if (!date) {
        alert("Please select a date.");
        return;
    }
    const transaction = {
        id: generateId(),
        type: type,
        description: description,
        amount: amount,
        category: category,
        date: date,
    };
    addTransaction(transaction);
    document.getElementById("transaction-form").reset();
    setDefaultDate();
    render();
}
function handleDelete(event) {
    if (event.target.classList.contains("btn-delete")) {
        const id = event.target.getAttribute("data-id");

        if (confirm("Are you sure you want to delete this transaction?")) {
            deleteTransaction(id);
            render();
        }
    }
}
function init() {
    setDefaultDate();
    render();
    document.getElementById("transaction-form").addEventListener("submit", handleFormSubmit);
    document.getElementById("transaction-list").addEventListener("click", handleDelete);
}
document.addEventListener("DOMContentLoaded", init);