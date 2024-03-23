from django.shortcuts import render
from rest_framework import viewsets

from cart.models import Cart
from cart.serializers import CartSerializer
# Create your views here.

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
