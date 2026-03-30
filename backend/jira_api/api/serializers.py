from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
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


class ColumnSerializer(ModelSerializer):
    class Meta:
        model = Column
        fields = ["status_type", "name", "order"]


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ["__all__"]


class ProjectMembershipSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = ProjectMembership
        fields = ["user", "role"]


class ProjectSerializer(ModelSerializer):
    project_memberships = ProjectMembershipSerializer(many=True)
    columns = ColumnSerializer(read_only=True, many=True)

    class Meta:
        model = Project
        fields = ["name", "description", "created_at",
                  "columns", "project_memberships"]

    def create(self, validated_data):

        project_memberships_data = validated_data.pop("project_memberships")
        project_instance = Project.objects.create(**validated_data)
        print("tr", project_memberships_data)
        for data in project_memberships_data:
            ProjectMembership.objects.create(project=project_instance, **data)

        return project_instance


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ["__all__"]


class ActivityLogSerializer(ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = ["__all__"]
