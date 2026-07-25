#! temprature 
Temp_text = input("temprature in degree celcius: ")
Temp = float(Temp_text)
if Temp < 15:
    print("it is cold")
elif 15 >= Temp <= 28:
    print("it is warm")
else:
    print("it is hot")


#! receipt loop
for i in range (1, 10):
    print(f"Receipt #{i}")


#! even numbers
for i in range (1, 20):
    if i % 2 == 0:
        print  (f"{i}")

#! discount function 
def apply_discount(price, percent=10):
    return price + price * 0.1
total = apply_discount(20000)

#! countdown 
count = 5
while count > 5:
    print(f"{count}")
    count = count - 1