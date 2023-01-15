from rest_framework import viewsets

from hologram.models import Hologram
from hologram.serializers import HologramSerializer

# Create your views here.
class HologramViewSet(viewsets.ModelViewSet):
    queryset = Hologram.objects.all()
    serializer_class = HologramSerializer