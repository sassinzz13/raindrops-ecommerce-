from django.urls import path
from .views import OrderListView, OrderDetailView, OrderCreateView, OrderDeleteView

urlpatterns = [
    path("orders/", OrderListView.as_view(), name="order-list"),
    path("orders/create/", OrderCreateView.as_view(), name="order-create"),
    path("orders/<int:order_id>/", OrderDetailView.as_view(), name="order-detail"),
    path("orders/<int:order_id>/delete/", OrderDeleteView.as_view(), name="order-delete"),
]
