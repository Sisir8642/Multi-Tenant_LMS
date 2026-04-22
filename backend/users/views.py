from rest_framework import generics
from .serializers import RegisterSerializer, UserSerializer
from .models import User
from .permissions import IsSuperAdmin

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

#superadmin
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSuperAdmin]


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSuperAdmin]

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def MeView(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "role": user.role,
        "tenant": user.tenant.name if user.tenant else None
    })
   
# #super admin  
# from rest_framework import viewsets
# from .models import User, Tenant
# from .serializers import UserSerializer, TenantSerializer
# from .permissions import IsSuperAdmin

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [IsSuperAdmin]
    
