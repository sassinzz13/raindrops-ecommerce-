from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import Product

User = get_user_model()  # points to your Customer model


class ProductAPITestCase(APITestCase):
    def setUp(self):
        # Create admin user
        self.admin_user = User.objects.create_superuser(
            email="admin@example.com",
            password="admin123",
            first_name="Admin",
            last_name="User"
        )

        # Create regular user
        self.regular_user = User.objects.create_user(
            email="user@example.com",
            password="user123",
            first_name="Regular",
            last_name="User"
        )

        # Create some products
        self.product1 = Product.objects.create(
            name="Product 1",
            description="Description 1",
            price=10.00,
            stock=5
        )
        self.product2 = Product.objects.create(
            name="Product 2",
            description="Description 2",
            price=20.00,
            stock=0  # Out of stock
        )

    # -------------------------
    # Helper: authenticate via JWT
    # -------------------------
    def authenticate(self, user):
        url = reverse("login")
        response = self.client.post(url, {
            "email": user.email,
            "password": "admin123" if user.is_staff else "user123"
        })
        token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    # -------------------------
    # List Products
    # -------------------------
    def test_product_list(self):
        url = reverse("product-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # If pagination is enabled, results are inside "results"
        products = response.data.get("results", response.data)
        self.assertEqual(len(products), 1)
        self.assertEqual(products[0]["product_id"], self.product1.product_id)


    # -------------------------
    # Product Detail
    # -------------------------
    def test_product_detail(self):
        url = reverse("product-detail", args=[self.product1.product_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.product1.name)

    # -------------------------
    # Create Product (Admin Only)
    # -------------------------
    def test_create_product_admin(self):
        self.authenticate(self.admin_user)
        url = reverse("product-create")
        data = {
            "name": "Product 3",
            "description": "Description 3",
            "price": 15.0,
            "stock": 10
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 3)

    def test_create_product_non_admin(self):
        self.authenticate(self.regular_user)
        url = reverse("product-create")
        data = {"name": "Product 4", "price": 5, "stock": 1}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # -------------------------
    # Update Product (Admin Only)
    # -------------------------
    def test_update_product_admin(self):
        self.authenticate(self.admin_user)
        url = reverse("product-update", args=[self.product1.product_id])
        data = {"price": 99.99}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product1.refresh_from_db()
        self.assertEqual(float(self.product1.price), 99.99)

    def test_update_product_non_admin(self):
        self.authenticate(self.regular_user)
        url = reverse("product-update", args=[self.product1.product_id])
        data = {"price": 50.0}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # -------------------------
    # Delete Product (Admin Only)
    # -------------------------
    def test_delete_product_admin(self):
        self.authenticate(self.admin_user)
        url = reverse("product-delete", args=[self.product1.product_id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Product.objects.filter(product_id=self.product1.product_id).exists())

    def test_delete_product_non_admin(self):
        self.authenticate(self.regular_user)
        url = reverse("product-delete", args=[self.product1.product_id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
