from django.db import models
import uuid

# Create your models here.
class PopularGame(models.Model):
    game_id = models.UUIDField(default=uuid.uuid4,unique=True, editable=False, primary_key=True)
    game_name = models.CharField(max_length=255)
    cover = models.FileField(upload_to="static/images/platform/popular_games/cover/")
    
    def __str__(self) -> str:
        return "{}/{}".format(self.game_name, self.game_id)

class Platform(models.Model):
    platform_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    name = models.CharField(max_length=100)
    console_logo = models.FileField(upload_to="static/images/platform/console_logo/")
    console_preview = models.FileField(upload_to="static/images/platform/console_preview/")
    controls = models.FileField(upload_to="static/images/platform/controls/")
    game_box = models.FileField(upload_to="static/images/platform/game_box/")
    year_created = models.IntegerField()
    end_year = models.IntegerField()
    description = models.TextField()
    music = models.FileField(upload_to="static/music/platform/")
    popular_games = models.ManyToManyField(PopularGame)
    
    def __str__(self) -> str:
        return self.name
    
class Core(models.Model):
    core_uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    name = models.CharField(max_length=255)
    core_path = models.TextField()
    config_file = models.FileField(upload_to="static/core/config", null=True, blank=True)   
    
    def __str__(self) -> str:
        return self.name
    
class Genre(models.Model):
    genre_uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    genre_name = models.CharField(max_length=255)
    background = models.CharField(max_length=255)
    color=models.CharField(max_length=255)
    
    def __str__(self) -> str:
        return self.genre_name
class Game(models.Model):
    game_id = models.UUIDField(default=uuid.uuid4, unique=True, editable = False, primary_key=True)
    name = models.CharField(max_length=255)
    year_created = models.IntegerField()
    nb_played = models.IntegerField()
    cover = models.FileField(upload_to="static/game/cover/")
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE)
    core = models.ForeignKey(Core, on_delete=models.CASCADE)
    config = models.FileField(upload_to="static/game/config", null=True, blank=True)
    genres = models.ManyToManyField(Genre)
    nb_player = models.IntegerField(default=1)
    trailer_url = models.URLField(null = True, blank=True)
    game = models.FileField(upload_to="static/game/games", null=True)
    
class Favorite(models.Model):
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE, blank=False)
    favorite = models.BooleanField(default=False)