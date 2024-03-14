
from django.contrib.auth.models import User
from rest_framework import generics


from flower.models import Card, Order, Reviews
from flower.serializers import CardSerializer, OrderSerializer, ReviewsSerializer, UserSerializer
# Create your views here.


class CardList(generics.ListAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class CardRetrieve(generics.RetrieveAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    
class ReviewsList(generics.ListCreateAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer
    
class OrderList(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
  
class CategoryAPIView(generics.ListAPIView):
    serializer_class = CardSerializer

    def get_queryset(self):
        slug = self.kwargs.get('slug')
        cards = Card.objects.filter(category__slug=slug)
        return cards