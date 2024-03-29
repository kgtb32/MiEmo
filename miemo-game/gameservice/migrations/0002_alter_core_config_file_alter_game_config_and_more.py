# Generated by Django 4.1.1 on 2022-10-17 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gameservice', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='core',
            name='config_file',
            field=models.FileField(blank=True, null=True, upload_to='static/core/config'),
        ),
        migrations.AlterField(
            model_name='game',
            name='config',
            field=models.FileField(blank=True, null=True, upload_to='static/game/config'),
        ),
        migrations.AlterField(
            model_name='game',
            name='trailer_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
