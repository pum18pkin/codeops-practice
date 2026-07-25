#! vehicle hirarchy
class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")

class Car(Vehicle):
   pass

#! use super()
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity
#! override 
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def describe(self):
        print(f"{self.make} {self.model} - Capacity: {self.capacity} tons")

#! 4. Polymorphism
vehicles = [car1, car2, truck1]

for vehicle in vehicles:
    vehicle.describe()

    
#! abstract method 
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"Make: {self.make}, Model: {self.model}")

    @abstractmethod
    def wheels(self):
        pass