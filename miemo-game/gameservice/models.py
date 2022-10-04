from email.policy import default
from django.db import models
import uuid

# Create your models here.
class Platform(models.Model):
    platform_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    name = models.CharField(max_length=100)
    core_location = models.TextField(blank=False, null=False)
    image = models.ImageField(upload_to="static/images/platform/cover/")
    year_created = models.IntegerField()
    company = models.CharField(max_length=100)
    controls = models.ImageField(upload_to="static/images/platform/controls") #image des contrôles

class Game(models.Model):
    def game_path(self):
        return self.game_location.path
    
    game_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    name = models.CharField(max_length=100)
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE)
    year_created = models.IntegerField()
    cover = models.ImageField(upload_to="static/images/game/cover")
    desc = models.TextField(blank=True, null=False)
    game_location = models.FileField(upload_to="static/game/")
    count_played = models.IntegerField(default=0)