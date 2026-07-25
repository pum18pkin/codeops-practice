class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)

            # Shared bank settings
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000

        return cls._instance
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

    def withdraw(self, amount):

        if self.balance - amount < -self.config.overdraft_limit:
            raise Exception("Overdraft limit exceeded")

        self.balance -= amount

        self._notify(
            f"Withdrawn ${amount}. New balance: ${self.balance}"
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


if __name__ == "__main__":

    account = AccountFactory.create(
        "savings",
        "Edom",
        "ACC001",
        5000
    )

    sms = SMSAlert()
    audit = AuditLog()

    account.subscribe(sms)
    account.subscribe(audit)

    account.deposit(1000)

    account.withdraw(2000)

    account.add_interest()


    account.show_balance()


    config1 = BankConfig()
    config2 = BankConfig()

    print(config1 is config2)