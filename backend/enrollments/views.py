from rest_framework import viewsets
from .models import Enrollment
from .serializers import EnrollmentSerializer
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsStudent
from rest_framework.exceptions import PermissionDenied

class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.action == 'create':
            return [IsStudent()]
        return super().get_permissions()

    def get_queryset(self):
        return Enrollment.objects.filter(tenant=self.request.user.tenant)

    def perform_create(self, serializer):
        course = serializer.validated_data['course']

        if course.tenant != self.request.user.tenant:
            raise PermissionDenied("Invalid course")

        serializer.save(
            tenant=self.request.user.tenant,
            student=self.request.user
        )

