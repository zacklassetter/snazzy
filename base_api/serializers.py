from rest_framework import serializers
from .models import Item, User, Cart, Review

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'is_staff', 'groups', 'user_permissions', 'is_superuser', 'last_login', 'date_joined', 'email', 'first_name', 'last_name', 'is_active']

class CartSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['items', 'updated']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'