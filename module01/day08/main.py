class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.transactions = []

    def deposit(self, amount):
        self.balance += amount
        self.transactions.append(amount)

    def withdraw(self, amount):
        self.balance -= amount
        self.transactions.append(-amount)


def binary_search(items, target):
    left = 0
    right = len(items) - 1

    while left <= right:
        middle = (left + right) // 2

        if items[middle] == target:
            return middle

        elif items[middle] < target:
            left = middle + 1

        else:
            right = middle - 1

    return -1


def recursive_sum(items, index=0):
    if index == len(items):
        return 0

    return items[index] + recursive_sum(items, index + 1)


class AccountRegistry:

    def __init__(self):
        self.by_number = {}

    def add(self, account):
        self.by_number[account.number] = account


    def top_by_balance(self, n=5):
        accts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )

        return accts[:n]


    def find_by_number(self, number):
        nums = sorted(self.by_number)

        i = binary_search(nums, number)

        if i >= 0:
            return self.by_number[nums[i]]

        return None


    def total_transactions(self, number):

        account = self.find_by_number(number)

        if account is None:
            return 0

        return recursive_sum(account.transactions)