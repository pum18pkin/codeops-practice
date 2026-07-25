class BankConfig:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instanc
    
class SMSAlert:
    def update(self, account, message):
        print(f"SMS Alert to {account.owner}: {message}")

class AuditLog:
    def update(self, account, message):
        print(f"Audit Log: Account {account.number} - {message}")

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.observers = []
        self.config = BankConfig()
        self.registry = None

    def subscribe(self, observer):
        self.observers.append(observer)

    def _notify(self, message):
        for observer in self.observers:
            observer.update(self, message)

    def deposit(self, amount):
        self.balance += amount
        self._notify(
            f"Deposited ${amount}. New balance: ${self.balance}"
        )
        if self.registry:
            self.registry.record_transaction(
                self,
                {
                    "type": "deposit",
                    "amount": amount
                }
            )

    def withdraw(self, amount):
        if self.balance - amount < -self.config.overdraft_limit:
            raise Exception(
                "Overdraft limit exceeded"
            )
        self.balance -= amount
        self._notify(
            f"Withdrawn ${amount}. New balance: ${self.balance}"
        )
        if self.registry:
            self.registry.record_transaction(
                self,
                {
                    "type": "withdraw",
                    "amount": amount
                }
            )

    def show_balance(self):
        print(
            f"{self.owner}'s balance: ${self.balance}"
        )

class SavingsAccount(Account):
    def add_interest(self):
        interest = self.balance * self.config.interest_rate
        self.balance += interest
        self._notify(
            f"Interest added: ${interest}"
        )

class CurrentAccount(Account):
    def withdraw(self, amount):
        if self.balance - amount < -self.config.overdraft_limit:
            raise Exception(
                "Current account overdraft exceeded"
            )
        self.balance -= amount
        self._notify(
            f"Withdrawn ${amount}. Balance: ${self.balance}"
        )
        if self.registry:
            self.registry.record_transaction(
                self,
                {
                    "type": "withdraw",
                    "amount": amount
                }
            )

class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind.lower() == "savings":
            return SavingsAccount(
                owner,
                number,
                balance
            )
        elif kind.lower() == "current":
            return CurrentAccount(
                owner,
                number,
                balance
            )
        else:
            raise ValueError(
                "Unknown account type"
            )
        
class AccountRegistry:
    def __init__(self):
        self.accounts = {}
        self.account_list = []
        self.transactions = {}

    def add(self, account):
        self.accounts[account.number] = account
        self.account_list.append(account)
        self.transactions[account.number] = []
        account.registry = self

    def find(self, number):
        return self.accounts.get(number)

    def list_all(self):
        return self.account_list

    def record_transaction(self, account, transaction):
        self.transactions[account.number].append(
            transaction
        )

    def undo_last_transaction(self, account):
        stack = self.transactions[account.number]
        if not stack:
            print("No transactions to undo")
            return
        last_transaction = stack.pop()
        if last_transaction["type"] == "deposit":
            account.balance -= last_transaction["amount"]
        elif last_transaction["type"] == "withdraw":
            account.balance += last_transaction["amount"]

        print(
            f"Undo successful: {last_transaction['type']} ${last_transaction['amount']}"
        )

if __name__ == "__main__":
    registry = AccountRegistry()

    account1 = AccountFactory.create(
        "savings",
        "Edom",
        "ACC001",
        5000
    )

    account2 = AccountFactory.create(
        "current",
        "Sara",
        "ACC002",
        3000
    )

    sms = SMSAlert()

    audit = AuditLog()

    account1.subscribe(sms)

    account1.subscribe(audit)

    account2.subscribe(sms)

    account2.subscribe(audit)

    registry.add(account1)

    registry.add(account2)

    account1.deposit(1000)

    account1.withdraw(2000)

    account1.add_interest()

    print("\n--- Find Account ---")

    found = registry.find("ACC001")

    print(found.owner)

    print("\n--- All Accounts ---")

    for account in registry.list_all():
        print(
            account.number,
            account.owner,
            account.balance
        )

    print("\n--- Undo Last Transaction ---")

    registry.undo_last_transaction(account1)

    account1.show_balance()