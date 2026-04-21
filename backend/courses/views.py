from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer
from .permission import IsTeacher

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsTeacher]

    def get_queryset(self):
        return Course.objects.filter(tenant=self.request.user.tenant)

    def perform_create(self, serializer):
        print("USER:", self.request.user)
        print("TENANT:", self.request.user.tenant)
        serializer.save(
            tenant=self.request.user.tenant,
            teacher=self.request.user
        )
