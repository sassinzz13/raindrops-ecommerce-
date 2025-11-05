from django.urls import path
from .views import ProductList, CreateProduct, EditProduct, DeleteProduct, ProductDetail

urlpatterns = [
    # http://127.0.0.1:8000/shop/products/
    path('products/', ProductList.as_view(), name='product-list'),
    # http://127.0.0.1:8000/shop/products/1/
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    # http://127.0.0.1:8000/shop/create/
    path('create/', CreateProduct.as_view(), name='product-create'),
    # http://127.0.0.1:8000/shop/products/1/edit/
    path('products/<int:pk>/edit/', EditProduct.as_view(), name='product-edit'),
    # http://127.0.0.1:8000/shop/products/1/delete/
    path('products/<int:pk>/delete/', DeleteProduct.as_view(), name='product-delete')
]
