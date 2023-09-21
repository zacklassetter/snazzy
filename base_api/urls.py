from django.urls import path
from . import views

urlpatterns = [
    
    path('items', views.getItems),
    path('items/upload/', views.UploadItem.as_view()),
    path('items/<int:pk>/', views.specificItem),
    path('users/current/', views.current_user),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('cart/<int:pk>/', views.specificCartItem),
    path('cart', views.AddItemToCart.as_view()),
    path('reviews/<int:pk>/', views.reviewsForItem),
]