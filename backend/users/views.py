from rest_framework import generics
from .serializers import RegisterSerializer
from .models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer



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