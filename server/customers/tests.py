# customers/tests.py
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Customer

class CustomerTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse("register")
        self.login_url = reverse("login")
        self.profile_url = reverse("profile")

        self.customer_data = {
            "email": "test@example.com",
            "password": "strongpassword123",
            "first_name": "Test",
            "last_name": "User",
            "contact_number": "09123456789",
            "address": "123 Test Street"
        }

    def test_register_customer(self):
        response = self.client.post(self.register_url, self.customer_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("tokens", response.data)

    def test_login_customer(self):
        # Register first
        self.client.post(self.register_url, self.customer_data, format="json")
        # Login
        response = self.client.post(self.login_url, {
            "email": self.customer_data["email"],
            "password": self.customer_data["password"]
        }, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_profile_access(self):
        # Register + login
        self.client.post(self.register_url, self.customer_data, format="json")
        login_response = self.client.post(self.login_url, {
            "email": self.customer_data["email"],
            "password": self.customer_data["password"]
        }, format="json")
        token = login_response.data["access"]

        # Access profile with token
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], self.customer_data["email"])
