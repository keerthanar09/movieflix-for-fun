from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'userid', 'email', 'phone_number', 'created_at']
    search_fields = ['username', 'userid', 'email']
    list_filter = ['created_at']
