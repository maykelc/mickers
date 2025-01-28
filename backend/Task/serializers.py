from rest_framework import serializers
from .models import Personal, Document, Category, Skill, Task, Asignacion, Pago, Calificacion, Location


# Serializer para el modelo Location
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


# Serializer para el modelo Document
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


# Serializer para el modelo Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# Serializer para el modelo Skill
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


# Serializer para el modelo Personal
class PersonalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Personal
        fields = '__all__'

    def validate_correo(self, value):
        """
        Valida que el correo sea único.
        """
        if self.instance:
            if Personal.objects.filter(correo=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("Este correo ya está registrado.")
        else:
            if Personal.objects.filter(correo=value).exists():
                raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def create(self, validated_data):
        """
        Crea un nuevo usuario sin hashear la contraseña.
        """
        password = validated_data.pop('password', None)
        user = Personal(**validated_data)
        user.password = password  # Asignar la contraseña tal como está
        user.save()
        return user

    def update(self, instance, validated_data):
        """
        Actualiza un usuario existente sin hashear la contraseña.
        """
        password = validated_data.pop('password', None)
        if password:
            instance.password = password  # Asignar la nueva contraseña sin hashear
        return super().update(instance, validated_data)


# Serializer para el modelo Task
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


# Serializer para el modelo Asignacion
class AsignacionSerializer(serializers.ModelSerializer):


    class Meta:
        model = Asignacion
        fields = '__all__'


# Serializer para el modelo Pago
class PagoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pago
        fields = '__all__'


# Serializer para el modelo Calificacion
class CalificacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Calificacion
        fields = '__all__'