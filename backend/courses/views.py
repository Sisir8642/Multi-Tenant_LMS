from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer
from .permission import IsTeacher
from rest_framework.permissions import IsAuthenticated


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsTeacher()]
        return super().get_permissions() #fallback

    def get_queryset(self):
        user = self.request.user

        if user.role == 'teacher':
            return Course.objects.filter(teacher=user)

        if user.role == 'student':
            # return Course.objects.filter(enrollment__student=user)

            return Course.objects.filter(tenant=user.tenant)


    def perform_create(self, serializer):
        print("USER:", self.request.user)
        print("TENANT:", self.request.user.tenant)
        serializer.save(
            tenant=self.request.user.tenant,
            teacher=self.request.user
        )
