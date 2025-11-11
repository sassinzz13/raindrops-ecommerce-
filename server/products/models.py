from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    image = CloudinaryField('image', blank=True, null=True) 

    def __str__(self):
        return self.name
