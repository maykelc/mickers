from django.db import models
from django.core.validators import MinLengthValidator, RegexValidator

# Modelo Personal: Información personal del usuario
class Personal(models.Model):
    TIPO_CHOICES = [
        ('empleado', 'Empleado'),
        ('empleador', 'Empleador'),
    ]
    GENERO_CHOICES = [
        ('Masculino', 'Masculino'),
        ('Femenino', 'Femenino'),
        ('Otro', 'Otro'),
    ]

    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    correo = models.CharField(
        max_length=50,
        validators=[RegexValidator(regex=r'^\S+@\S+\.\S+$', message="Correo inválido")],
        db_index=True,
        unique=True
    )
    telefono = models.CharField(max_length=20, null=True, blank=True)  # Usar CharField para teléfonos
    direccion = models.CharField(max_length=150)
    genero = models.CharField(max_length=15, choices=GENERO_CHOICES)
    password = models.CharField(max_length=128, validators=[MinLengthValidator(8)])
    fecha_registro = models.DateTimeField(auto_now_add=True,  null=True)
    tipo_usuario = models.CharField(max_length=10, choices=TIPO_CHOICES, null=True)

    def __str__(self):
        return f"{self.nombre} {self.apellidos}"


# Modelo Document: Para almacenar documentos del usuario
class Document(models.Model):
    DOCUMENTO_CHOICES = [
        ('antecedentes', 'Certificado de Antecedentes'),
        ('selfie', 'Selfie'),
        ('carnet', 'Foto de Carnet Del'),
        ('carnet1', 'Foto de Carnet back'),
        ('hoja_vida', 'Hoja de Vida'),
        ('otros', 'Otros'),
    ]

    usuario = models.ForeignKey(Personal, on_delete=models.CASCADE, related_name='documentos',null=True, blank=True)
    tipo = models.CharField(max_length=20, choices=DOCUMENTO_CHOICES, null=True, blank=True)
    archivo = models.FileField(upload_to='documents/', null=True, blank=True)

    def __str__(self):
        return f"Documento {self.tipo} de {self.usuario.nombre}"


# Modelo Category: Para categorías de habilidades
class Category(models.Model):
    nombre = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.nombre


# Modelo Skill: Para almacenar habilidades
class Skill(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nombre


# Modelo Location: Para almacenar ubicaciones
class Location(models.Model):
    region = models.CharField(max_length=50)
    ciudad = models.CharField(max_length=50)
    comuna = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.direccion}, {self.comuna}, {self.ciudad}"


# Modelo Task: Para almacenar tareas creadas por los empleadores
class Task(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('en_progreso', 'En Progreso'),
        ('completada', 'Completada'),
        ('cancelada', 'Cancelada'),
    ]

    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    valor = models.IntegerField(null=True)
    ubicacion = models.CharField(max_length=100)
    empleador = models.ForeignKey(Personal, related_name='tareas_publicadas', on_delete=models.CASCADE, null=True)
    empleado_asignado = models.ForeignKey(Personal, related_name='tareas_asignadas', null=True, blank=True, on_delete=models.SET_NULL)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    habilidades = models.ManyToManyField(Skill, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True, null=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.titulo


# Modelo Asignacion: Para manejar la relación entre tareas y empleados
class Asignacion(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('completada', 'Completada'),
        ('fallida', 'Fallida'),
    ]

    tarea = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='asignaciones')
    empleado = models.ForeignKey(Personal, on_delete=models.CASCADE, related_name='asignaciones')
    fecha_asignacion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')

    def __str__(self):
        return f"Asignación de {self.tarea.titulo} a {self.empleado.nombre}"


# Modelo Pago: Para registrar transacciones y comisiones
class Pago(models.Model):
    tarea = models.OneToOneField(Task, on_delete=models.CASCADE, related_name='pago')
    monto_total = models.DecimalField(max_digits=10, decimal_places=2)
    comision = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_pago = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pago de {self.tarea.titulo}"


# Modelo Calificacion: Para feedback entre empleadores y empleados
class Calificacion(models.Model):
    tarea = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='calificaciones')
    calificador = models.ForeignKey(Personal, related_name='calificaciones_hechas', on_delete=models.CASCADE)
    calificado = models.ForeignKey(Personal, related_name='calificaciones_recibidas', on_delete=models.CASCADE)
    puntuacion = models.IntegerField()
    comentario = models.TextField(null=True, blank=True)
    fecha_calificacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Calificación de {self.calificador.nombre} a {self.calificado.nombre}: {self.puntuacion}"