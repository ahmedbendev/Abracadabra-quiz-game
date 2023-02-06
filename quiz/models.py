from django.db import models
from django.utils import timezone
# Create your models here.



class Team(models.Model):
    name = models.CharField(max_length=256)
    number_of_player = models.CharField(max_length=256)
    create_time = models.DateTimeField(default=timezone.now)
    score = models.IntegerField(default=0)
    def __str__(self):
        return self.name

class Player(models.Model):
    name = models.CharField(max_length=256,null=True, blank=True)
    family_name = models.CharField(max_length=256,null=True, blank=True)
    phone = models.CharField(max_length=256,null=True, blank=True)
    email = models.CharField(max_length=256,null=True, blank=True)
    city = models.CharField(max_length=256,null=True, blank=True)
    team = models.ForeignKey(Team ,on_delete=models.SET_NULL,null=True, blank=True)
    def __str__(self):
        return self.name

ROLE_CHOICES = (
    ('Text','Text'),
    ('Image','Image')
)

class Question(models.Model):
    question_number = models.IntegerField(default=0)
    question_type = models.CharField(choices=ROLE_CHOICES,max_length = 100,null=True, blank=True)
    question_text = models.CharField(max_length=256,null=True, blank=True)
    suggestion_one = models.CharField(max_length=256,null=True, blank=True)
    suggestion_two = models.CharField(max_length=256,null=True, blank=True)
    suggestion_three = models.CharField(max_length=256,null=True, blank=True)
    suggestion_four = models.CharField(max_length=256,null=True, blank=True)
    image_one = models.ImageField(upload_to='questions-pic',null=True, blank=True)
    image_two = models.ImageField(upload_to='questions-pic',null=True, blank=True)
    right_answer = models.IntegerField(default=0)
    question_conff = models.IntegerField(default=0)
    def __str__(self):
        return "Question " + str(self.question_number)
