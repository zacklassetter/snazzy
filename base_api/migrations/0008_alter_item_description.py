# Generated by Django 4.1.4 on 2023-09-09 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base_api', '0007_item_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='description',
            field=models.CharField(max_length=400),
        ),
    ]
