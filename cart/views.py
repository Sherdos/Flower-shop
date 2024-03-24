from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from cart.models import Cart, CartUser
from cart.serializers import CartSerializer, CartUserSerializer

from cart.models import Cart
from cart.serializers import CartSerializer
# Create your views here.

# class CartViewSet(viewsets.ModelViewSet):
#     queryset = Cart.objects.all()
#     serializer_class = CartSerializer


class CartByUserIdAPIView(APIView):
    def get(self, request, user_id):
        try:
            cart = Cart.objects.get(user_id=user_id)
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Cart.DoesNotExist:
            return Response({"message": "Cart does not exist for the given user_id"}, status=status.HTTP_404_NOT_FOUND)


class AddCardAPIView(generics.CreateAPIView):
    query = CartUser.objects.all()
    serializer_class = CartUserSerializer
        
