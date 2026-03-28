from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid4)


class Project(models.Model):
    name = models.CharField(max_length=70)
    description = models.CharField(max_length=150)
    owner = models.ForeignKey(
        User,  on_delete=models.CASCADE, related_name='owner_of_projects')
    members = models.ManyToManyField(User, related_name='member_in_projects')
    created_at = models.DateField()


class Column(models.Model):

    STATUS_CHOICES = {
        "ToDo": "To Do",
        "InProgress": "In Progress",
        "Done": "Done"
    }
    status_type = models.CharField(max_length=50, choices=STATUS_CHOICES)
    name = models.CharField(max_length=50)
    project = models.ForeignKey(
        Project, related_name='columns', on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)


class Task(models.Model):
    PRIORITY_CHOICES = {
        "low": "Low",
        "medium": "Medium",
        "high": "High"
    }

    title = models.CharField(max_length=150)
    description = models.CharField(max_length=250)
    column = models.ForeignKey(
        Column, related_name="tasks", on_delete=models.CASCADE)
    assigned_to = models.ManyToManyField(User, related_name="tasks")
    created_by = models.ForeignKey(
        User,  on_delete=models.CASCADE)
    priority = models.CharField(max_length=8, choices=PRIORITY_CHOICES)
    due_date = models.DateField(auto_now=False, auto_now_add=False)
    created_at = models.DateField(auto_now_add=True)


class ProjectMembership(models.Model):
    ROLE_CHOICES = [
        ('manager', 'Manager'),
        ('developer', 'Developer'),
        ('viewer', 'Viewer'),
    ]
    user = models.ForeignKey(User, related_name='project_memberships',
                             on_delete=models.CASCADE)
    project = models.ForeignKey(
        Project, related_name="project_memberships", on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)


class Comment(models.Model):
    task = models.ForeignKey(
        Task, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(
        User, related_name="comments", on_delete=models.CASCADE)
    content = models.CharField(max_length=250)
    created_at = models.DateField(auto_now_add=True)


class ActivityLog(models.Model):
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE, related_name='activity_logs')

    action = models.CharField(max_length=50)
    task = models.ForeignKey(
        Task, related_name='activity_logs', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
