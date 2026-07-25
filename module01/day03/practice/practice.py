#! unique cities
cities =["Addis Abeba", "Assosa", "Gonder", "Woliayta", "Addis Abeba", "Assosa", "Bahirdar" ]
unique = set(cities)


#! price report
grocery =[("banana", 550), ("potato", 50), ("milk", 90), ("bread", 15), ("Sun Flower Oil", 1500)]
with open("grocery") as f:
    for line in f :
        print(line.strip())


#! tax comprehension 15% tax
prices =[100, 250, 400, 80]
with_tax = [p * 0.15 for p in prices]
print({with_tax})

#! cheap items 
prices =[100, 250, 400, 80]
cheap = [p for p  in prices if p < 200]
print({cheap})

#! write and read 
with open("names.txt", "a") as f:
    f.write("samson")
    f.write("abem")
    f.write("haylu")
with open ("names.txt") as f:
    for line in f:
        print(line.strip())


#! safe division
try:
    number = int(input("enter the number you want: "))
    result = 100 / number
except ValueError:
    print("you didnt enter a number: ")
except ZeroDivisionError:
    print("the number cant be zero: ")
else:
    print(result)
finally:
    print("done")