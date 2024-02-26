from django.db import models

class Bloc(models.Model):
    number = models.IntegerField()
    name = models.TextField()
    
    def __str__(self):
        return self.name