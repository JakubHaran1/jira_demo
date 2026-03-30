from django.contrib import admin

from .models import User, Project, Column, Task, ProjectMembership, Comment, ActivityLog


class ColumnAdmin(admin.ModelAdmin):
    list_display = ["status_type", "project"]


class TaskAdmin(admin.ModelAdmin):
    list_display = ["title", "column__project__name", "created_by"]


class ProjectMembershipAdmin(admin.ModelAdmin):
    list_display = ["user", "project", "role"]


class CommentAdmin(admin.ModelAdmin):
    list_display = ["task", "author"]


class ActivityAdmin(admin.ModelAdmin):
    list_display = ["user", "action", "task"]


admin.site.register(User)
admin.site.register(Project)
admin.site.register(Column, ColumnAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(ProjectMembership, ProjectMembershipAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(ActivityLog, ActivityAdmin)
