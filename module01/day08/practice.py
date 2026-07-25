#!RECURSIVE SUM

def total(nums):
    if len(nums) == 0:
        return 0

    return nums[0] + total(nums[1:])


def count_down(n):
    if n == 0:
        return

    print(n)
    count_down(n - 1)


numbers = [1, 2, 3, 4, 5]

print("Recursive sum:")
print(total(numbers))

print("Count down:")
count_down(5)



#!BINARY SEARCH

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


balances = [100, 250, 400, 600, 900]

print("\nBinary search:")
print(binary_search(balances, 600))
print(binary_search(balances, 300))



#!MERGE SORT

def merge(left, right):

    result = []

    i = 0
    j = 0


    while i < len(left) and j < len(right):

        if left[i] <= right[j]:
            result.append(left[i])
            i += 1

        else:
            result.append(right[j])
            j += 1


    result.extend(left[i:])
    result.extend(right[j:])

    return result



def merge_sort(items):

    if len(items) <= 1:
        return items


    middle = len(items) // 2

    left = merge_sort(items[:middle])
    right = merge_sort(items[middle:])


    return merge(left, right)



numbers = [8, 3, 5, 1, 9, 2]

print("\nMerge sort:")
print(merge_sort(numbers))
print(sorted(numbers))



#!SORT WITH A KEY

accounts = [
    ("Sara", 500),
    ("John", 1200),
    ("Mika", 800),
    ("Anna", 300)
]


sorted_accounts = sorted(
    accounts,
    key=lambda account: account[1],
    reverse=True
)


print("\nSort by balance descending:")
print(sorted_accounts)



#!TWO POINTERS

def has_pair(nums, target):

    left = 0
    right = len(nums) - 1


    while left < right:

        total = nums[left] + nums[right]


        if total == target:
            return True


        elif total < target:
            left += 1


        else:
            right -= 1


    return False



values = [1, 3, 5, 7, 9]

print("\nTwo pointers:")
print(has_pair(values, 10))
print(has_pair(values, 20))