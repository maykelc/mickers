from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PersonalViewSet, DocumentViewSet, 
    CategoryViewSet, SkillViewSet, TaskViewSet, 
    CalificacionViewSet, LoginView, AsignacionViewSet, PagoViewSet, 
)

# Crear el router
router = DefaultRouter()

# Registrar los ViewSets
router.register(r'personal', PersonalViewSet, basename='personal')
router.register(r'documents', DocumentViewSet, basename='documents')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'skills', SkillViewSet, basename='skills')
router.register(r'tasks', TaskViewSet, basename='tasks')
router.register(r'califications', CalificacionViewSet, basename='califications')
router.register(r'asignacion', AsignacionViewSet, basename='asignacion')
router.register(r'pago', PagoViewSet, basename='pago')

# Definir las rutas
urlpatterns = [
    path('api/v1/', include(router.urls)),  # Rutas del router
    path('api/v1/login/', LoginView.as_view(), name='login'),  # Ruta para iniciar sesión
]
