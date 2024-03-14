from django.contrib import admin

from flower.models import Card, Reviews, Order, Category
# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Категории"""
    list_display = ('id', 'title', 'slug')
    list_display_links = ('title',)
    prepopulated_fields = {'slug': ['title']}
    
admin.site.register(Card)
admin.site.register(Reviews)
admin.site.register(Order)

