from django.contrib import admin
from django.utils.safestring import mark_safe
from flower.models import Card, Reviews, Order, Category, FlowerOrder
# Register your models here.
class FlowerInline(admin.TabularInline):
    model = FlowerOrder
    extra = 1
    readonly_fields = ('get_image',)

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.card.image.url} width="100" height="110"')
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Категории"""
    list_display = ('id', 'title', 'slug')
    list_display_links = ('title',)
    prepopulated_fields = {'slug': ['title']}
    
@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    """Категории"""
    list_display = ('id', 'title')
    list_display_links = ('title',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    '''Admin View for Order'''

    # list_display = ('id')
    list_filter = ('user',)
    inlines = [
        FlowerInline,
    ]
    # raw_id_fields = ('',)
    # readonly_fields = ('',)
    # search_fields = ('title',)
    # date_hierarchy = ''
    # ordering = ('',)
    
admin.site.register(Reviews)

