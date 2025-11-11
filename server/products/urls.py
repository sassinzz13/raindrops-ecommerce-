from django.urls import path
from .views import ProductCreateView, ProductListView, ProductDetailView, ProductUpdateView, ProductDeleteView

urlpatterns = [
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/create/", ProductCreateView.as_view(), name="product-create"),
    path("products/<int:product_id>/", ProductDetailView.as_view(), name="product-detail"),
    path("products/<int:product_id>/update/", ProductUpdateView.as_view(), name="product-update"),
    path("products/<int:product_id>/delete/", ProductDeleteView.as_view(), name="product-delete"),
]
