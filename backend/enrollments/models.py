from django.db import models
from users.models import User
from courses.models import Course
from tenants.models import Tenant

class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)

    enrolled_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} -> {self.course}"
