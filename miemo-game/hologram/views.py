from rest_framework import viewsets
from rest_framework.response import Response

from hologram.models import Hologram
from hologram.serializers import HologramSerializer

from hologram.hologram_service import get_settings, save_settings, holo_mode_get,set_holo_mode

# Create your views here.
class HologramViewSet(viewsets.ModelViewSet):
    queryset = Hologram.objects.all()
    serializer_class = HologramSerializer
    
class HologramSettingsViewSet(viewsets.ViewSet):
    def list(self, request, **kwargs):
        return Response(get_settings())
    
    def post(self, request, **kwargs):
        res = save_settings(request.data)        
        if(res):
            return Response("ok")
        else:
            return Response("error", status=412)
        
class HologramModeViewSet(viewsets.ViewSet):
    def list(self, request, *args, **kwargs):
        return Response(data=holo_mode_get())
    
    def post(self, request, **kwargs):
        if(request.data and "mode" in request.data.keys()):
            res = set_holo_mode(request.data["mode"])
            if(res):
                return Response("ok")
            else:
                return Response("error", status=412)
        return Response("error", status=400)