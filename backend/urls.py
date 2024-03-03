"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from flower import views
schema_view = get_schema_view(
    openapi.Info(
        title='Flower API',
        default_version='v1',
        description='Test description',
        terms_of_service='https://github.com/Sherdos',
        contact=openapi.Contact(email='sherdo26@gmail.com')
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('card/', views.CardList.as_view()),
    path('reviews/', views.ReviewsList.as_view()),
    path('order/', views.OrderList.as_view()),
    path('users/', views.UserList.as_view()),
    path('docs<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/login/', views.login_view, name='api-login'),
    path('api/register/', views.register_view, name='api-register'),
    path('api/logout/', views.logout_view, name='api-logout'),
    path('api/session/', views.session_view, name='api-session'),
    path('api/whoami/', views.whoami_view, name='api-whoami'),
    
    path('', TemplateView.as_view(template_name = 'index.html')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)