from django.db import models
import uuid
import requests
import os
import shutil

try:
    import urlparse
except ImportError:
    from urllib.parse import urlparse


# Create your models here.
class Hologram(models.Model):
    holo_uuid = models.UUIDField(default=uuid.uuid4(), editable=False, unique=True, primary_key=True)
    holo_url = models.URLField(blank=False)
    
    def save_file(self, filename, raw):
        with open(filename,'wb') as f:
            shutil.copyfileobj(raw, f)
    
    def save(self, *args, **kwargs):
        r = requests.get(self.holo_url, stream=True)
        if(r.status_code == 200):
            path = urlparse(self.holo_url).path
            ext = os.path.splitext(path)[1]
            relative_filename = "/static/static/holo/{}{}".format(uuid.uuid4(),ext)
            self.holo_url = relative_filename
            self.holo_uuid = uuid.uuid4()
            self.save_file("{}{}".format(os.getcwd(),relative_filename),r.raw)
            super().save(*args, **kwargs)
        else:
            return requests.Response(status_code=412)