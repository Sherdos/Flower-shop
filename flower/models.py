from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Card(models.Model):
    """Model definition for Card."""
    title = models.CharField(max_length=100, verbose_name = 'название')
    image = models.ImageField(verbose_name = 'фото', upload_to='flower_image/')
    price = models.CharField(max_length=100, verbose_name = 'название', default='Договорная')
    rating = models.IntegerField(verbose_name = 'рейтинг')
    category = models.ForeignKey('flower.Category', on_delete=models.CASCADE, verbose_name='категория', related_name='card_category', null=True)


    

    class Meta:
        """Meta definition for Card."""

        verbose_name = 'Цветы'
        verbose_name_plural = 'Цветы'

    def __str__(self):
        """Unicode representation of Card."""
        return f'{self.title}'


class Category(models.Model):
    """Model definition for Category."""
    title = models.CharField(max_length=100, verbose_name = 'название')
    slug = models.SlugField(max_length=150, verbose_name = 'путь')
    # TODO: Define fields here

    class Meta:
        """Meta definition for Category."""

        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
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
    
    
    # TODO: Define fields here

    class Meta:
        """Meta definition for Order."""

        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    def __str__(self):
        """Unicode representation of Order."""
        return f'Заказ номер {self.id}, {self.user.username}'

class FlowerOrder(models.Model):
    """Model definition for FlowerOrder."""
    card = models.ForeignKey(Card, verbose_name = 'Цветы',on_delete=models.CASCADE, related_name='card_flower')
    order = models.ForeignKey(Order, verbose_name = 'Заказ',on_delete=models.CASCADE, related_name='card_order')

    # TODO: Define fields here


    def __str__(self):
        return f'Цветы {self.card.title}'


class Setting(models.Model):
    """Model definition for Setting."""
    logo = models.ImageField(verbose_name='логотип', upload_to='logo/')
    phone = models.CharField(verbose_name='номер телефона', max_length=20)
    address = models.CharField(verbose_name='адрес', max_length=100)
    email = models.EmailField(verbose_name='почта')

    # TODO: Define fields here

    class Meta:
        """Meta definition for Setting."""

        verbose_name = 'Настройки'
        verbose_name_plural = 'Настройки'

    def __str__(self):
        return f'Настройка {self.pk}'
