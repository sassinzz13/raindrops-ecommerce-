from rest_framework import generics, permissions
from .models import Order
from .serializers import OrderSerializer

class OrderListView(generics.ListAPIView):
    queryset = Order.objects.select_related("product", "customer").order_by("-order_date")
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.select_related("product", "customer")
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "order_id"


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # automatically set the logged-in customer
        serializer.save(customer=self.request.user)


class OrderDeleteView(generics.DestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = "order_id"
