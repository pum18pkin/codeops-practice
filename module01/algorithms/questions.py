#get evens 
nums = [1, 2, 3, 4, 5, 6, 7, 8]
even_indexes = nums[::2]
print(even_indexes)
for num in nums:
    if num % 2 ==0:
        print([num])

# reversecompair
def __init__(self,num1 ):
    self.num1 = num1

def reverse_number(num1): 
    return int (str(num1)[::-1])
def reverseCompair(num1):    
    if num1 > reverse_number(num1):
        print("not ok ")
    elif num1 < reverse_number(num1):
        print("ok")
    else:
        print ("they are equal")
reverseCompair(72)
reverseCompair(23)
reverseCompair(55)

#factorial
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)
print(factorial(5))

# meera
def checkmeera(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            if i != j and arr[j] == arr [i] * 2:
                 return False
    return True
if checkmeera([10, 4, 0, 5]):
    print("I am a Meera array")
else:
    print("I am not a Meera array")

if checkmeera([7, 4, 9]):
    print("I am a Meera array")
else:
    print("I am not a Meera array")

if checkmeera([1, -6, 4, -3]):
    print("I am a Meera array")
else:
    print("I am not a Meera array")
# dual array 
def isdual(array):
    count = {}
    for i in array:
        if i in count:
            count[i] += 1
        else:
            count[i] = 1

    print(count)


isdual([1, 2, 1, 3, 3, 2])

# digital clock 
def digitalclock(seconds):
    hours = seconds // 3600
    seconds = seconds % 3600
    minutes = seconds // 60
    seconds = seconds % 60
    print(f"{hours:02}:{minutes:02}:{seconds:02}")


digitalclock(61201)
digitalclock(87000)