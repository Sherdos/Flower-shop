from django.urls import path

from user import views


urlpatterns = [
    path('api/login/', views.login_view, name='api-login'),
    path('api/register/', views.register_view, name='api-register'),
    path('api/logout/', views.logout_view, name='api-logout'),
    path('api/session/', views.session_view, name='api-session'),
    path('api/whoami/', views.whoami_view, name='api-whoami'),
]