from rest_framework import serializers
from enrollments.models import Enrollment
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source='teacher.username', read_only=True)
    enrolled_students = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id',
            'title',
            'description',
            'teacher_name',
            'created_at',
            'enrolled_students'
        ]

    def get_enrolled_students(self, obj):
        enrollments = Enrollment.objects.filter(course=obj)
        return [
            {
                "id": e.student.id,
                "username": e.student.username
            }
            for e in enrollments
        ]