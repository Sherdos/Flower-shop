from rest_framework import serializers
from django.contrib.auth.models import User
from flower.models import Card, Order, Reviews, FlowerOrder
from django.contrib.auth import login


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'
        depth = 1
        
class FlowerOrderSerializer(serializers.Serializer):
    card_id = serializers.IntegerField()

class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    cards = FlowerOrderSerializer(many=True, required=False)  # Use 'cards' instead of 'card'

    class Meta:
        model = Order
        fields = ['id', 'user', 'cards']

    def create(self, validated_data):
        cards_data = validated_data.pop('cards', [])  # Retrieve card data
        order = Order.objects.create(user_id=validated_data['user'].pk)
        for card_data in cards_data:
            FlowerOrder.objects.create(order=order, **card_data)  # Create FlowerOrder objects
        return order
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')       
        
        


