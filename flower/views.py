from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework import generics
import json
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from django.contrib.auth import authenticate, login, logout

from flower.models import Card, Order, Reviews
from flower.serializers import CardSerializer, OrderSerializer, ReviewsSerializer, UserSerializer
# Create your views here.


class CardList(generics.ListAPIView):
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
    
    
@require_POST
def register_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Укажите имя пользователя, почту и пароль.'}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    user = authenticate(username=username, password=password)
    login(request, user)
    return JsonResponse({'detail': 'Вы успешно вошли в аккаунт'})



@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Укажите имя пользователя и пароль.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Неверные учетные данные.'}, status=400)
    
    login(request, user)
    return JsonResponse({'detail': 'Вы успешно вошли в аккаунт'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'Вы не зарегестрированы'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Вы успешно вышли из аккаунт'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username})
 

