from rest_framework import serializers
from gameservice.models import Core, Game, Genre, Platform, PopularGame, Favorite

class PopularGameSerializer(serializers.ModelSerializer):
    class Meta: 
        model = PopularGame
        fields = [
            "game_id",
            "game_name",
            "cover"
        ]

class CoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Core
        fields = [
            "core_uuid",
            "name",
            "core_path",
            "config_file"
        ]

class PlatformSerializer(serializers.ModelSerializer):
    popular_games = PopularGameSerializer(many=True, read_only=True)
    class Meta:
        model = Platform
        fields = [
            "platform_id",
            "name",
            "console_logo",
            "console_preview",
            "controls",
            "game_box",
            "year_created",
            "end_year",
            "description",
            "music",
            "popular_games"
        ]

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields= [
            "genre_uuid",
            "genre_name",
            "background",
            "color"
        ]

class GameSerializer(serializers.ModelSerializer):
    platform = PlatformSerializer(many = False, read_only = True)
    core = CoreSerializer(many = False, read_only = True)
    genres = GenreSerializer(many = True, read_only = True)
    class Meta:
        model = Game
        fields = [
            "game_id",
            "name",
            "year_created",
            "nb_played",
            "cover",
            "platform",
            "core",
            "config",
            "genres",
            "nb_player",
            "trailer_url"
        ]


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = [
            "game_id",
            "favorite"
        ]