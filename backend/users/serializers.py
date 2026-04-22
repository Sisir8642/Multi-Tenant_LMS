from rest_framework import serializers
from .models import User
from tenants.models import Tenant

class RegisterSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'role', 'tenant_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        tenant_name = validated_data.pop('tenant_name')

        tenant, created = Tenant.objects.get_or_create(name=tenant_name)

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role'],
            tenant=tenant
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.name', read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'role',
            'tenant',
            'tenant_name'
        ]