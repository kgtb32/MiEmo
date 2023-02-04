import subprocess
from django_filters.rest_framework import DjangoFilterBackend
from django.core.cache import cache

from rest_framework import viewsets, filters
from rest_framework.response import Response

from gameservice.models import Platform, Game
from gameservice.serializers import PlatformSerializer, GameSerializer
from hologram.hologram_service import game_launch, game_close

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
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    search_fields = ['name']
    filterset_fields = ["platform__platform_id",]
    
    def get_platform_id_from_request(self, res):
        try:
           return res.data["game"]["platform_id"]
        except Exception:
            return None
    
    def update(self, request, *args, **kwargs):
        res = super().update(request, *args, **kwargs)
        plat_id = self.get_platform_id_from_request(res)
        if(plat_id):
            cache.delete('gm_'+plat_id)
        return res
    
    
    def create(self, request, *args, **kwargs):
        res = super().create(request, *args, **kwargs)
        plat_id = self.get_platform_id_from_request(res)
        if(plat_id):
            cache.delete('gm_'+plat_id)
        return res
    
    def list(self, request, *args, **kwargs):
        plat_id = request.GET["platform__platform_id"]
        cached_res = cache.get('gm_'+plat_id)
        if(cached_res):
            return Response(status=200, data=cached_res)
        res = super().list(request, *args, **kwargs)
        cache.set('gm_'+plat_id, res.data, 3600)
        return res
    
class PlayGameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def retrieve(self, request, pk=None):
        game = Game.objects.filter(game_id=pk).first()
        if(game):
            print(game.game.path, game.core.core_path)
            game_launch()
            res = subprocess.run(["flatpak", "run", "org.libretro.RetroArch", "-L", game.core.core_path, game.game.path, "-f", "-v"])
            print(res.stderr)
            game_close()
            return Response(status=200, data=GameSerializer(game).data)
        else:
            return Response(status=404)
