from django.urls import include, path
from rest_framework import routers

from cart.views import CartViewSet

router = routers.DefaultRouter()
router.register(r'cart', CartViewSet, basename='cart')
urlpatterns = [
    path('', include(router.urls))
]