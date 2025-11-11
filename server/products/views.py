
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product
from .serializers import ProductSerializer
from rest_framework import generics, permissions, filters

# Create your views here.
class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission:
    - Read: anyone
    - Write: only admin
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    
class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["name", "price", "stock"]
    search_fields = ["name", "description"]
    ordering_fields = ["price", "stock", "name"]

    def get_queryset(self):
        # fetch only the essentials and order to avoid pagination issues
        return Product.objects.filter(stock__gte=1).order_by("product_id")


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "product_id" 
    def get_queryset(self):
        # fetch all fields for a single product detail
        return Product.objects.all()
    
class ProductUpdateView(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "product_id"
    def get_queryset(self):
        # fetch fields relevant for update
        return Product.objects.only("product_id", "name", "description", "price", "stock")

class ProductDeleteView(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "product_id"

    def get_queryset(self):
        # need only product_id for delete
        return Product.objects.only("product_id")