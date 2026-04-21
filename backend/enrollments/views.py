from rest_framework import viewsets
from .models import Enrollment
from .serializers import EnrollmentSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        return Enrollment.objects.filter(tenant=self.request.user.tenant)

    def perform_create(self, serializer):
        serializer.save(
            tenant=self.request.user.tenant
        )
