#! Name the Big-O
numbers = [10, 20, 30, 40, 50]
value = numbers[3]
print("List index result:", value)

for number in numbers:
    print(number)

for i in numbers:
    for j in numbers:
        print(i, j)

accounts = {
    "1001": "Abebe",
    "1002": "Belay",
    "1003": "Chane"
}
print("Dictionary lookup result:", accounts["1002"])

def binary_search(array, target):
    left = 0
    right = len(array) - 1
    while left <= right:
        middle = (left + right) // 2
        if array[middle] == target:
            return middle
        elif array[middle] < target:
            left = middle + 1
        else:
            right = middle - 1
    return -1

sorted_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
print("Binary search result:", binary_search(sorted_numbers, 7))

#!List vs. Dict Lookup
import time
account_list = []
account_dict = {}
for i in range(100000):
    account_number = f"ACC{i}"
    account_list.append(account_number)
    account_dict[account_number] = True

search_account = "ACC99999"

start = time.time()

found = False

for account in account_list:
    if account == search_account:
        found = True
        break

list_time = time.time() - start

start = time.time()

found_dict = search_account in account_dict

dict_time = time.time() - start


print("List lookup found:", found)
print("List lookup time:", list_time)

print("Dict lookup found:", found_dict)
print("Dict lookup time:", dict_time)

#! Build a Stack

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.items:
            return self.items.pop()

    def peek(self):
        if self.items:
            return self.items[-1]
names = ["Abebe", "Belay", "Chane", "Dawit", "Efrata"]
stack = Stack()
for name in names:
    stack.push(name)
reversed_names = []
while stack.peek():
    reversed_names.append(stack.pop())
print("Original names:", names)
print("Reversed names:", reversed_names)

#!Build a Queue
from collections import deque
bank_line = deque()
customers = [
    "Customer 1",
    "Customer 2",
    "Customer 3",
    "Customer 4",
    "Customer 5"
]
for customer in customers:
    bank_line.append(customer)
print("Bank service order:")
while bank_line:
    customer = bank_line.popleft()
    print(customer)

#!Singly Linked List
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head
        while current:
            print(current.data)
            current = current.next
linked_list = LinkedList()
linked_list.push_front("Account 1003")
linked_list.push_front("Account 1002")
linked_list.push_front("Account 1001")
print("Linked List:")
linked_list.print_all()