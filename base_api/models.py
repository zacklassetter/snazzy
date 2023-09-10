from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

# Create your models here.

def upload_to(instance, filename):
    return 'items/{filename}'.format(filename=filename)

class Item(models.Model):
    # model for ecommerce item
    id = models.AutoField(primary_key=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    description = models.CharField(max_length=400)
    category = models.CharField(max_length=200, default="default")
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to=upload_to)

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    items = models.ManyToManyField(Item)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Cart"
    
    def add_item(self, item):
        self.items.add(item)
        self.updated = timezone.now()
        self.save(update_fields=['updated'])
    
@receiver(post_save, sender=User)
def create_user_cart(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)
