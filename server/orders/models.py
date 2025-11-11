from django.db import models
from products.models import Product
from customers.models import Customer

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="orders")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="orders")
    quantity = models.PositiveIntegerField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.order_id} by {self.customer.first_name}"

    def save(self, *args, **kwargs):
        # Auto-calculate total if not provided
        if not self.total_amount:
            self.total_amount = self.product.price * self.quantity
        super().save(*args, **kwargs)
