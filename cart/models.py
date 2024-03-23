from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Cart(models.Model):
    """Model definition for Cart."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    
    # TODO: Define fields here

    class Meta:
        """Meta definition for Cart."""

        verbose_name = 'Cart'
        verbose_name_plural = 'Carts'

    def __str__(self):
        """Unicode representation of Cart."""
        return f'{self.user}'

class CartUser(models.Model):
    """Model definition for CartUser."""
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, verbose_name='корзина')
    card = models.ForeignKey('flower.Card', on_delete=models.CASCADE, verbose_name = 'карта', related_name = 'card_users')
    # TODO: Define fields here

    class Meta:
        """Meta definition for CartUser."""

        verbose_name = 'CartUser'
        verbose_name_plural = 'CartUsers'

    def __str__(self):
        """Unicode representation of CartUser."""
        return f'{self.card}'