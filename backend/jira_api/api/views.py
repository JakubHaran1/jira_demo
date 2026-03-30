from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from jira_api.models import User, Project, Column, Task, ProjectMembership, Comment, ActivityLog
from .serializers import UserSerializer, UserCreateSerializer, ProjectSerializer, ColumnSerializer, TaskSerializer, ProjectMembershipSerializer, CommentSerializer, ActivityLogSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return UserSerializer
        return UserCreateSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ColumnViewSet(ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class ProjectMembershipViewSet(ModelViewSet):
    queryset = ProjectMembership.objects.all()
    serializer_class = ProjectMembershipSerializer


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class ActivityLogViewSet(ModelViewSet):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
