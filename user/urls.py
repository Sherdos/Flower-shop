from django.urls import path

from user import views


urlpatterns = [
    path('login/', views.login_view, name='api-login'),
    path('register/', views.register_view, name='api-register'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('whoami/', views.whoami_view, name='api-whoami'),
]