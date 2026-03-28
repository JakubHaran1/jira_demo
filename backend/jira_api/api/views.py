from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from jira_api.models import User, Project, Column, Task, ProjectMembership, Comment, ActivityLog
from .serializers import UserSerializer, UserCreateSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return UserSerializer
        return UserCreateSerializer

