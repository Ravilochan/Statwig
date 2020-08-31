from rest_framework_mongoengine import serializers

from .models import Ideas,Admin


class PostSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Ideas
        fields = '__all__'


class AdminSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Admin
        fields = '__all__'
