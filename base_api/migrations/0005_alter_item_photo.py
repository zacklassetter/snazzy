# Generated by Django 4.1.4 on 2023-09-08 12:28

import base_api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base_api', '0004_alter_item_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='photo',
            field=models.ImageField(upload_to=base_api.models.upload_to),
        ),
    ]
