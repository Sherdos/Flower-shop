from django.contrib import admin

from flower.models import Card, Reviews, Order
# Register your models here.
admin.site.register(Card)
admin.site.register(Reviews)
admin.site.register(Order)