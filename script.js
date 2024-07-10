document.addEventListener('DOMContentLoaded', loadTransactions);

document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description && !isNaN(amount)) {
        const transaction = { description, amount };
        addTransaction(transaction);
        saveTransaction(transaction);

        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    }
});

function addTransaction(transaction) {
    const transactionList = document.getElementById('transaction-list');
    const newTransaction = document.createElement('li');
    newTransaction.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
    transactionList.appendChild(newTransaction);

    updateBalance(transaction.amount);
}

function updateBalance(amount) {
    const balanceElement = document.getElementById('balance');
    const currentBalance = parseFloat(balanceElement.textContent);
    balanceElement.textContent = (currentBalance + amount).toFixed(2);
}

function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        addTransaction(transaction);
    });
}
