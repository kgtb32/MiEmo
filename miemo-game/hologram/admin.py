from django.contrib import admin
from hologram.models import Hologram

# Register your models here.
@admin.register(Hologram)
class PopularGameAdmin(admin.ModelAdmin):
    list_display = ("holo_uuid","holo_url",)
    search_fields = ["holo_uuid"]