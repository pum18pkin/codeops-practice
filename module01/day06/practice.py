#! spot the SRP violation
print("\n===== Question 1: SRP =====")
class ReportBuilder:
    def build(self):
        return "Monthly Sales Report"
class ReportSaver:
    def save(self, report):
        print(f"Saving report: {report}")
class ReportEmailer:
    def send_email(self, report):
        print(f"Sending email: {report}")
builder = ReportBuilder()
saver = ReportSaver()
emailer = ReportEmailer()

report = builder.build()
saver.save(report)
emailer.send_email(report)


#!refactor to OCP
class Shape:
    def area(self):
        pass
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14 * self.radius ** 2
    
class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height

shapes = [
    Circle(5),
    Square(4),
    Triangle(6, 3)
]

for shape in shapes:
    print(shape.area())


#! write a singleton
class AppSettings:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance

settings1 = AppSettings()
settings2 = AppSettings()

print(settings1.currency)

print(settings1 is settings2)


#! write factory
class FactoryCircle:
    def area(self):
        return 3.14 * 5 * 5

class FactorySquare:
    def area(self):
        return 4 * 4

class FactoryTriangle:
    def area(self):
        return 0.5 * 6 * 3

class ShapeFactory:
    @staticmethod
    def create(kind):
        if kind == "circle":
            return FactoryCircle()
        elif kind == "square":
            return FactorySquare()
        elif kind == "triangle":
            return FactoryTriangle()
        else:
            raise ValueError("Unknown shape")

shape = ShapeFactory.create("circle")

print(shape.area())


#!write an obsserver pair
class NewsAgency:
    def __init__(self):
        self.subscribers = []
    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)
    def notify(self, news):
        for subscriber in self.subscribers:
            subscriber.update(news)

class EmailSubscriber:
    def update(self, news):
        print("Email received:", news)

class SMSSubscriber:
    def update(self, news):
        print("SMS received:", news)

agency = NewsAgency()

email_user = EmailSubscriber()

sms_user = SMSSubscriber()

agency.subscribe(email_user)

agency.subscribe(sms_user)

agency.notify("Breaking News!")