from django.urls import path
from rest_framework.routers import DefaultRouter

from jira_api.api.views import UserViewSet, ProjectViewSet, ColumnViewSet, TaskViewSet, ProjectMembershipViewSet, CommentViewSet, ActivityLogViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'columns', ColumnViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'memberships', ProjectMembershipViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'logs', ActivityLogViewSet)


urlpatterns = router.urls
