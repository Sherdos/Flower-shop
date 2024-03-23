from django.contrib import admin

from cart.models import Cart, CartUser
class CartUserInline(admin.TabularInline):
    model = CartUser
    extra = 1
# Register your models here.

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    '''Admin View for CartUser'''
    inlines = [
        CartUserInline,
    ]