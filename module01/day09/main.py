class Account:
    def __init__(self, number, balance):
        self.number = number
        self.balance = balance

class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_child(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):
        total = sum(
            account.balance
            for account in self.accounts
        )
        for child in self.children:
            total += child.total_balance()
        return total

head_office = Branch("Head Office")

north_region = Branch("North Region")
south_region = Branch("South Region")

addis_branch = Branch("Addis Branch")
mekelle_branch = Branch("Mekelle Branch")
hawassa_branch = Branch("Hawassa Branch")

head_office.children.append(north_region)
head_office.children.append(south_region)

north_region.children.append(addis_branch)
north_region.children.append(mekelle_branch)

south_region.children.append(hawassa_branch)

addis_branch.accounts.append(
    Account("CBE-1", 5000)
)
addis_branch.accounts.append(
    Account("CBE-2", 3000)
)
mekelle_branch.accounts.append(
    Account("CBE-3", 7000)
)
hawassa_branch.accounts.append(
    Account("CBE-4", 4000)
)

print(head_office.total_balance())

transfers = {
    "CBE-1": [
        "CBE-2",
        "CBE-3"
    ],

    "CBE-2": [
        "CBE-4"
    ],

    "CBE-3": [
        "CBE-4"
    ],
    "CBE-4": []
}

def bfs(transfers, start):
    visited = set()
    queue = [start]
    while queue:
        account = queue.pop(0)
        if account not in visited:
            visited.add(account)
            for receiver in transfers[account]:
                queue.append(receiver)

    return visited

print(bfs(transfers, "CBE-1"))