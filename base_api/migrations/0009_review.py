# Generated by Django 4.1.4 on 2023-09-12 11:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base_api', '0008_alter_item_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=200)),
                ('rating', models.FloatField()),
                ('message', models.CharField(max_length=400)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base_api.item')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
