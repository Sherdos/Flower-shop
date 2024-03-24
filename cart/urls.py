from django.urls import include, path
from rest_framework import routers

from cart.views import CartByUserIdAPIView, AddCardAPIView
urlpatterns = [
    path('by_user_id/<int:user_id>/', CartByUserIdAPIView.as_view(), name='cart_by_user_id'),
    path('add/card/', AddCardAPIView.as_view())
]