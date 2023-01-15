from django.db import models
import uuid

# Create your models here.
class Hologram(models.Model):
    holo_uuid = models.UUIDField(default=uuid.uuid4(), editable=False, unique=True, primary_key=True)
    holo_url = models.URLField(blank=False)