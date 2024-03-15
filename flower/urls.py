from django.urls import path

from flower import views


urlpatterns = [
    
    path('card/', views.CardList.as_view()),
    path('card/<int:pk>/', views.CardRetrieve.as_view()),
    path('card/category/<slug:slug>/', views.CategoryAPIView.as_view()),
    
    path('reviews/', views.ReviewsList.as_view()),
    path('order/', views.OrderCreate.as_view()),
    path('users/', views.UserList.as_view()),
    
]