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
            raise ValidationError({"confirm_password":
                                   "Password and confirm password isn't the same"})
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = User.objects.create(validated_data)
        user.set_password(validated_data["password"])
        user.save()


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ["task", "author", "content", "created_at"]


class TaskSerializer(ModelSerializer):
    created_by = UserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True, many=True)

    assigned_to_ids = PrimaryKeyRelatedField(
        queryset=User.objects.all(), many=True, write_only=True)

    column = PrimaryKeyRelatedField(queryset=Column.objects.all())
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ["id", "title", "description",
                  "priority", "due_date", "created_at", 'column', "assigned_to_ids", "created_by", "assigned_to", "comments"]

    def create(self, validated_data):
        ids_data = validated_data.pop("assigned_to_ids", [])
        task_instance = Task.objects.create(**validated_data)
        task_instance.assigned_to.set(ids_data)
        return task_instance
        # dodać aktualizacja - add,update


class ColumnSerializer(ModelSerializer):
    tasks = TaskSerializer(read_only=True, many=True)

    class Meta:
        model = Column
        fields = ["status_type", "project", "name", "order", "tasks"]


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
        request = self.context["request"]
        project_memberships_data = validated_data.pop("project_memberships")
        project_instance = Project.objects.create(**validated_data)
        ProjectMembership.objects.create(
            project=project_instance,
            user=request.user,
            role="manager"
        )

        return project_instance


class ActivityLogSerializer(ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = ["__all__"]
