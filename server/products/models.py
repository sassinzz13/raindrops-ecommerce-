from django.db import models

# Create your models here.
class Product(models.Model):
    ProductID = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()

    def __str__(self):
        return self.product_name


