from abc import ABC, abstractmethod
class Account(ABC) :
    def __init__(self, owner, account_number, balance=0, interest_rate=0.01, type="none"):
        self.owner = owner
        self.account_number = account_number
        self.balance = balance
        self.interest_rate = interest_rate
        self.type = type
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount
        return self.balance
    @abstractmethod
    def statement(self):
        pass
class SavingAccount(Account):
    def __init__(self, owner, account_number, balance=0, interest_rate=0.01):
        super().__init__(owner, account_number, balance, interest_rate, type="savings")

    def apply_interest(self):
        self.balance += self.balance * self.interest_rate
    def statement(self):
        return self.balance + self.balance * self.interest_rate

class CheckingAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft_limit=0):
        super().__init__(owner, account_number, balance, interest_rate=0.01, type="checking")
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount > self.balance + self.overdraft_limit:
            raise ValueError("Insufficient funds: withdrawal exceeds balance and overdraft limit.")
        self.balance -= amount
    def statement(self):
        return self.balance

accounts=[
    SavingAccount("edom", "001", 1000),
    CheckingAccount("belay", "002", 800, overdraft_limit=200)
    ]
for account in accounts:
    print(f"{account.owner}'s balance: {account.statement()}")