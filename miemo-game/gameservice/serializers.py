from rest_framework import serializers
from gameservice.models import Game, Platform

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ["platform_id", "name", "core_location", "image", "year_created", "company", "controls"]

class GameSerializer(serializers.ModelSerializer):
    platform = PlatformSerializer(many = False, read_only = True)
    
    class Meta:
        model = Game
        fields = ["game_id", "name", "platform", "year_created", "cover", "desc", "game_location", "count_played", "platform", "game_path"]

