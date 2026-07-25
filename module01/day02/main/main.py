transactions = {}

try:
    file = open("transactions.txt", "r")

    for line in file:
        name, amount = line.strip().split(",")
        amount = float(amount)

        if name in transactions:
            transactions[name] += amount
        else:
            transactions[name] = amount

    file.close()
    print("Transaction Summary")
    print("-------------------")

    sorted_transaction = sorted(transactions.items(), key=lambda x: x[1], reverse=True)

    for name, total in sorted_transaction:
        print(name, ":", total)
except FileNotFoundError:
    print("Error: transactions.txt file not found.")