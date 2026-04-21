from rest_framework.permissions import BasePermission

class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'superadmin'


class IsTenantAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'tenantadmin'


class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'teacher'


class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'student'
