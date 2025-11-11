from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    customer_email = serializers.CharField(source="customer.email", read_only=True)

    class Meta:
        model = Order
        fields = [
            "order_id",
            "product",
            "product_name",
            "customer",
            "customer_email",
            "quantity",
            "total_amount",
            "order_date",
        ]
