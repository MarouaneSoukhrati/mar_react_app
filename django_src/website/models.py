from django.db import models

class Bloc(models.Model):
    title = models.CharField(max_length="60")
    content = models.TextField()
    
    def __str__(self):
        return self.title
    
class Page(models.Model):
    title = models.CharField(max_length="50")
    content = models.TextField()
    main_bloc = models.ForeignKey(Bloc, on_delete=models.CASCADE) 