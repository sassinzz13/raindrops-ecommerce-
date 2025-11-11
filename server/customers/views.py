from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Customer
from .serializers import RegisterSerializer, ProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

# register view
class RegisterUsersView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        # check if the submitted json is valid
        if serializer.is_valid():
            # save as customer
            customer = serializer.save()
            # give them a token
            tokens = customer.get_tokens()
            # give a response and let them in
            return Response({"user": serializer.data, "tokens": tokens}, status=status.HTTP_201_CREATED)
        # if json is not valid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserProfileView(APIView):
    # you must be logged in to have or view a profile
    permission_classes = [IsAuthenticated]
    # only give them profile access if the json returns true
    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)

class LogoutView(APIView):
    # you must be logged in to logged out
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # refresh your credentials
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist() # no longer accept old tokens for security purposes
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
