#! Book Class
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
        

    def describe(self):
        print(f"{self.title} by {self.author} - {self.pages} pages")
book01 = Book("The Apothecary Diaries Volume 1", "Hyūganatsu", 178)
book02 = Book("The Fragrant Flower Blooms with Dignity Volume 1", "Saka Mikami", 192)

#! product class
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    def restock (self, n):
        self.quantity += n
    def sell(self, n):
        self.quantity -= n
P01 = Product("TV", 50000, 50)
print("before restock: ", P01.quantity)

P01.restock(10)
print("after restock: ", p1.quantity)

P01.sell(9)
print("after the sell: ", P01.quantity)

#! make it private 
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity
    @property
    def quantity(self):
        return self.__quantity
    def restock (self, n):
        self.quantity += n
    def sell(self, n):
        self.quantity -= n
P01 = Product("TV", 50000, 50)
print("the amount of TV is : ", P01.quantity)


#! validate
class Product:
    def __init__(self, name, priice, quantity):
        self.name = name
        self.price = priice
        self.__quantity = quantity
    @property
    def quantity(self):
        return self.__quantity
    def restock (self, n):
        self.quantity += n
    def sell(self, n):
        if n <= self.__quantity:
            self.quantity -= n
        else:
            print("not enough in stock")
P01 = Product("TV", 50000, 50)

P01.sell(10)
print("after sell: ", p1.quantity)

P01.sell(50)
print("after the sell: ", P01.quantity)

#! provide independence
class Product:
    def __init__(self, name, priice, quantity):
        self.name = name
        self.price = priice
        self.__quantity = quantity
    @property
    def quantity(self):
        return self.__quantity
    def restock (self, n):
        self.quantity += n
    def sell(self, n):
        if n <= self.__quantity:
            self.quantity -= n
        else:
            print("not enough in stock")

P01 = Product("mouse", 1700, 9)
P02 = Product("speaker", 2000, 6)
P03 = Product("PS 5", 150000, 5)

P01.sell(7)
print(f"{P01.name}: {P01.quantity}")
print(f"{P02.name}: {P02.quantity}")
print(f"{P03.name}: {P03.quantity}")
