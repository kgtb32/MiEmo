from rest_framework import serializers
from hologram.models import Hologram

class HologramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hologram
        fields = [
            "holo_uuid",
            "holo_url"
        ]