class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []

    def add(self, account):
        self.by_number[
            account.account_number
        ] = account
        self.order.append(
            account.account_number
        )

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        return [
            self.by_number[number]
            for number in self.order
        ]

class Account:
    def __init__(
        self,
        owner,
        account_number,
        balance=0
    ):
        self.owner = owner
        self.account_number = account_number
        self.balance = balance
        self.history = []

    def deposit(self, amount):
        self.balance += amount
        self.history.append(
            ("deposit", amount)
        )
        print(
            f"Deposited {amount}"
        )

    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            self.history.append(
                ("withdraw", amount)
            )
            print(
                f"Withdrawn {amount}"
            )
        else:
            print(
                "Insufficient balance"
            )

    def undo_last(self):
        if len(self.history) == 0:
            print(
                "No transactions"
            )
            return
        action, amount = self.history.pop()
        if action == "deposit":

            self.balance -= amount
        elif action == "withdraw":
            self.balance += amount
        print(
            f"Undo {action}: {amount}"
        )

    def show_balance(self):
        print(
            f"{self.owner}: {self.balance}"
        )

if __name__ == "__main__":
    registry = AccountRegistry()
    acc1 = Account(
        "Edom",
        "ACC001",
        5000
    )
    acc2 = Account(
        "John",
        "ACC002",
        3000
    )
    registry.add(acc1)
    registry.add(acc2)
    found = registry.find(
        "ACC001"
    )
    found.show_balance()
    acc1.deposit(1000)
    acc1.withdraw(500)
    acc1.show_balance()
    acc1.undo_last()
    acc1.show_balance()
    print("\nAll accounts:")
    for account in registry.list_all():
        account.show_balance()