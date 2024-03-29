from rest_framework import serializers
from cart.models import Cart, CartUser
from rest_framework.renderers import JSONRenderer

class CartUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartUser
        fields = '__all__'
        depth = 1
        
class AddCartUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartUser
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    cards = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ['id','user','cards']
        
        
    def get_cards(self, obj: Cart):
        cart_users = CartUser.objects.filter(cart_id=obj.pk)
        serializer = CartUserSerializer(cart_users, many=True)
        return serializer.data
    
    
        
