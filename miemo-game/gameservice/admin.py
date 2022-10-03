from django.contrib import admin

from gameservice.models import Game, Platform

# Register your models here.
@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    list_display = ("platform_id", "name", "core_location", "image", "year_created", "company", "controls",)
    search_fields = ["name", "year_created","company" ]    
    
@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ("game_id", "name", "platform", "year_created", "cover", "desc","game_location", "count_played",)
    search_fields = ["name", "platform", "year_created"]
