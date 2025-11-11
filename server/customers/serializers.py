from rest_framework import serializers
from .models import Customer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Customer
        fields = ["email", "password", "first_name", "last_name", "contact_number", "address"]

    def create(self,validated_data):
        return Customer.objects.create_user(**validated_data)
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["customer_id", "email", "first_name", "last_name", "contact_number", "address"]