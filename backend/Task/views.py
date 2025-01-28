from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Personal, Document, Category, Skill, Task, Asignacion, Pago, Calificacion, Location
from .serializers import (
    PersonalSerializer, DocumentSerializer,
    CategorySerializer, SkillSerializer,
    TaskSerializer, AsignacionSerializer,
    PagoSerializer, CalificacionSerializer,
    LocationSerializer
)


# ViewSets para cada modelo
class PersonalViewSet(viewsets.ModelViewSet):
    serializer_class = PersonalSerializer
    queryset = Personal.objects.all()


class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class SkillViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    queryset = Skill.objects.all()


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class AsignacionViewSet(viewsets.ModelViewSet):
    serializer_class = AsignacionSerializer
    queryset = Asignacion.objects.all()


class PagoViewSet(viewsets.ModelViewSet):
    serializer_class = PagoSerializer
    queryset = Pago.objects.all()


class CalificacionViewSet(viewsets.ModelViewSet):
    serializer_class = CalificacionSerializer
    queryset = Calificacion.objects.all()


class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()


# Vista personalizada para el inicio de sesión

class LoginView(APIView):
    def post(self, request):
        correo = request.data.get('correo')
        password = request.data.get('password')

        print("correo y contraseña")
        print(correo)
        print(password)

        if not correo or not password:
            return Response(
                {"error": "Correo y contraseña son obligatorios."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Buscar usuario por correo
            user = Personal.objects.get(correo=correo)

            # Verificar si la contraseña coincide
            if password == user.password:
                # Si la contraseña es correcta, solo devolver los datos del usuario
                return Response({
                    "message": "Inicio de sesión exitoso.",
                    "user": {
                        "id": user.id,
                        "nombre": user.nombre,
                        "apellidos": user.apellidos,
                        "correo": user.correo,
                        "tipo_usuario": user.tipo_usuario,
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "Contraseña incorrecta."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        except Personal.DoesNotExist:
            return Response(
                {"error": "Usuario no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )

# Vista para cerrar sesión (opcional)
class LogoutView(APIView):
    def post(self, request):
        # El cliente debe manejar el cierre de sesión (borrar tokens/cookies localmente)
        return Response(
            {"message": "Cierre de sesión exitoso."},
            status=status.HTTP_200_OK
        )
