from django.contrib import admin

# Register your models here.
from .models import Personal, Calificacion,Category,Document,Skill,Task, Location,Pago,Asignacion
# Register your models here.

admin.site.register(Personal)
admin.site.register(Calificacion)
admin.site.register(Category)
admin.site.register(Document)
admin.site.register(Skill)
admin.site.register(Task)
admin.site.register(Location)
admin.site.register(Pago)
admin.site.register(Asignacion)

