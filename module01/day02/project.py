customers = [ 
("Almaz", 1500), ("Dawit", 700), ("Tigist", 200), 
("Hanna", 1200), ("Samuel", 450), ("Alemitu", 700), ("samuel", 500)
] 
premium = 0
standard = 0
basic = 0
def tier(balance):
    if balance >= 1000: 
        return "premium" 
    elif balance >= 500: 
        return "standard"
    else: 
        return "basic"
   
     
for name, balance in customers: 
    category = tier(balance)
    print(f"{name}: {tier(balance)} ({balance} ETB)") 
    if category == "premium":
        premium += 1
    elif category == "standard":
        standard += 1
    else:
        basic += 1

print(f"premium: {premium}, standard: {standard}, basic: {basic}")