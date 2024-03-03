from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Card(models.Model):
    """Model definition for Card."""
    title = models.CharField(max_length=100, verbose_name = 'название')
    image = models.ImageField(verbose_name = 'фото', upload_to='flower_image/')
    price = models.CharField(max_length=100, verbose_name = 'название', default='Договорная')
    rating = models.IntegerField(verbose_name = 'рейтинг')
    category = models.CharField(max_length=100, verbose_name='категория')


    

    class Meta:
        """Meta definition for Card."""

        verbose_name = 'Цветы'
        verbose_name_plural = 'Цветы'

    def __str__(self):
        """Unicode representation of Card."""
        return f'{self.title}'


class Reviews(models.Model):
    """Model definition for Reviews."""
    
    user = models.ForeignKey(User, verbose_name = 'пользователь', on_delete=models.CASCADE)
    text = models.TextField(verbose_name='отзыв')
    # TODO: Define fields here

    class Meta:
        """Meta definition for Reviews."""

        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'

    def __str__(self):
        """Unicode representation of Card."""
        return f'{self.user.username}'
    
class Order(models.Model):
    """Model definition for Order."""

    user = models.ForeignKey(User, verbose_name = 'пользователь', on_delete=models.CASCADE)
    card = models.ForeignKey(Card, verbose_name = 'Цветы', on_delete=models.CASCADE)
    
    
    # TODO: Define fields here

    class Meta:
        """Meta definition for Order."""

        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    def __str__(self):
        """Unicode representation of Order."""
        return f'Заказ номер {self.id}, {self.user.username} на цветы {self.card.title}'
