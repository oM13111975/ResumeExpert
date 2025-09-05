from django.contrib import admin

# Register your models here.
from .models import Profile,JobPost,ResumeUpload# Import your models

admin.site.register(Profile)
admin.site.register(JobPost)
admin.site.register(ResumeUpload)