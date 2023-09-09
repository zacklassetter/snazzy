from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Item, Cart
from .serializers import ItemSerializer, UserSerializer, CartSerializer
from rest_framework import generics, permissions, status
from django.contrib.auth.models import User
# Create your views here.



# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def getItems(request):
    # parser_classes = [MultiPartParser, FormParser]
    if request.method == "GET":
        items = Item.objects.all()
        category = request.query_params.get('category')
        if category is not None:
            items = items.filter(category=category)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
    # elif request.method == "POST":
    #     serializer = ItemSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #     return Response(serializer.data)

class UploadItem(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK) 
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
def specificItem(request, pk):
    item = Item.objects.get(id=pk)
    if request.method == "GET":
        serializer = ItemSerializer(item, many=False)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = ItemSerializer(instance=item, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    elif request.method == "DELETE":
        item.delete()
        return Response("Item deleted")


@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AddItemToCart(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        item_id = request.data.get('item_id')
        user = request.user

        item = Item.objects.get(pk=item_id)
        cart = Cart.objects.get(user=user)

        cart.add_item(item)

        return Response({'message': 'Item added to cart'})
    
    def get(self, request):
        user = request.user
        cart = Cart.objects.get(user=user)
        serializer = CartSerializer(cart)
        # Calculate total cart price
        total = 0
        for item in cart.items.all():
            total += item.price

        # Add total to response data
        data = serializer.data
        data['total'] = total
        
        return Response(data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def specificCartItem(request, pk):
    user = request.user
    item = Item.objects.get(id=pk)
    cart = Cart.objects.get(user=user)
    if request.method == "DELETE":
        cart.items.remove(item)
        return Response("Item deleted from cart")



