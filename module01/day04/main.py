class Account:
    def init(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.__balance += amount
        return self.__balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.__balance:
            raise ValueError("Insufficient funds: withdrawal exceeds balance.")
        self.__balance -= amount
        return self.__balance


if __name == "main":
    acc1 = Account("edom", "001", 10000)
    acc2 = Account("belay", "002", 800)

    acc1.deposit(400)
    acc2.withdraw(200)

    print(f"{acc1.owner}'s balance: {acc1.balance}")
    print(f"{acc2.owner}'s balance: {acc2.balance}")

    try:
        acc1.withdraw(10000)
    except ValueError as e:
        print(f"Error: {e}")