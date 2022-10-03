from django.shortcuts import render
from rest_framework import viewsets, filters

from gameservice.models import Platform, Game
from gameservice.serializers import PlatformSerializer, GameSerializer

# Create your views here.
class PlatformViewSet(viewsets.ModelViewSet):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    filterset_fields = ["platform_id",]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filterset_fields = ["game_id",]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']