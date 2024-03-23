from django.shortcuts import render
import json
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from django.contrib.auth import authenticate, login, logout

# Create your views here.
  
@require_POST
def register_view(request):
    try:
        data = json.loads(request.body)
        username = data['username']
        email = data['email']
        password = data['password']
    except KeyError:
        return JsonResponse({'detail': 'Отсутствуют обязательные данные'}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    login(request, user)
    return JsonResponse({'detail': 'Вы успешно зарегистрировались и вошли в аккаунт'})

@require_POST
def login_view(request):
    try:
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
    except KeyError:
        return JsonResponse({'detail': 'Отсутствуют обязательные данные'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Неверные учетные данные'}, status=400)
    
    login(request, user)
    return JsonResponse({'detail': 'Вы успешно вошли в аккаунт'})

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'Вы не вошли в аккаунт'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Вы успешно вышли из аккаунта'})

@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse(
        {
        'id':request.user.id,
        'username': request.user.username,
        }
        )
 

