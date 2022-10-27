from django.contrib import admin

from gameservice.models import Game, Genre, Platform, PopularGame, Core

# Register your models here.
@admin.register(PopularGame)
class PopularGameAdmin(admin.ModelAdmin):
    list_display = ("game_id","game_name","cover",)
    search_fields = ["game_name"]

@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    list_display = (
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
    )
    search_fields = ["platform_id","name"]    

@admin.register(Core)    
class CoreAdmin(admin.ModelAdmin):
    list_display = ("core_uuid","name","core_path","config_file",)
    search_fields = ["name"]

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ("genre_uuid","genre_name","background","color",)
    search_fields = ["genre_name"]

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ("game_id","name","year_created","nb_played","favorite","cover","platform","core","config","nb_player","trailer_url",)
    search_fields = ["name", "platform", "year_created"]

