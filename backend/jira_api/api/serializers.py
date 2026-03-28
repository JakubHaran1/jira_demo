from rest_framework.serializers import ModelSerializer
from rest_framework.exceptions import ValidationError

from rest_framework.fields import CharField
from django.contrib import admin


from jira_api.models import User, Project, Column, Task, ProjectMembership, Comment, ActivityLog


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class UserCreateSerializer(ModelSerializer):
    confirm_password = CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "confirm_password"]

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if attrs["password"] != attrs["confirm_password"]:
            raise ValidationError(
                "Password and confirm password isn't the same")
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = User.objects.create(validated_data)
        user.set_password(validated_data["password"])
        user.save()


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ["__all__"]


class ColumnSerializer(ModelSerializer):
    class Meta:
        model = Column
        fields = ["__all__"]


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ["__all__"]


class ProjectMembershipSerializer(ModelSerializer):
    class Meta:
        model = ProjectMembership
        fields = ["__all__"]


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ["__all__"]


class ActivityLogSerializer(ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = ["__all__"]
