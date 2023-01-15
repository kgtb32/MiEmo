"""miemogame URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.conf import settings
from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from pathlib import Path
from django.conf.urls.static import static

from gameservice.views import PlatformViewSet, GameViewSet, PlayGameViewSet
from hologram.views import HologramViewSet

router = routers.DefaultRouter()
router.register(r'platform', PlatformViewSet)
router.register(r'game', GameViewSet)
router.register(r'play', PlayGameViewSet)
router.register(r'holo', HologramViewSet)

doc_root = Path(__file__).resolve().parent.parent
print(doc_root / 'static')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
