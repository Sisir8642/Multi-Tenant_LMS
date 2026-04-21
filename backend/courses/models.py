from django.db import models
from tenants.models import Tenant
from users.models import User

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
