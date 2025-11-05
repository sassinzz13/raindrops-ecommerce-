from django.contrib import admin
from .models import Product

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('ProductID', 'product_name', 'price', 'stock')
    search_fields = ('product_name',)
    list_filter = ('price',)
