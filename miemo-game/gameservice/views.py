import subprocess
from rest_framework import viewsets, filters
from rest_framework.response import Response

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
    
class PlayGameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def retrieve(self, request, pk=None):
        game = Game.objects.filter(game_id=pk).first()
        if(game):
            print(game.game.path)
            subprocess.run(["flatpak", "run", "org.libretro.RetroArch", "-L", game.core.core_path, game.game.path, "-f"])
            return Response(status=200, data=GameSerializer(game).data)
        else:
            return Response(status=404)
