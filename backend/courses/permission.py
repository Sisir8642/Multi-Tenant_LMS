from rest_framework.permissions import IsAuthenticated

class IsTeacher(IsAuthenticated):
    def has_permission(self, request, view):
        return request.user.role == 'teacher'
