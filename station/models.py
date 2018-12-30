from django.db import models

# Create your models here.
class Reading(models.Model):
        temp = models.IntegerField()
        wspeed = models.CharField(max_length=20)
        visible = models.CharField(max_length=20)
        icon_url = models.URLField()
        humid = models.CharField(max_length=50)