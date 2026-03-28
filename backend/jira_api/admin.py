from django.contrib import admin

from .models import User, Project, Column, Task, ProjectMembership, Comment, ActivityLog
admin.site.register(User)
admin.site.register(Project)
admin.site.register(Column)
admin.site.register(Task)
admin.site.register(ProjectMembership)
admin.site.register(Comment)
admin.site.register(ActivityLog)
# Register your models here.
