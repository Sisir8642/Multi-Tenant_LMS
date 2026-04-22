# tenants/views.py

from rest_framework import viewsets
from .models import Tenant
from .serializers import TenantSerializer
from users.permissions import IsSuperAdmin

class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [IsSuperAdmin]
