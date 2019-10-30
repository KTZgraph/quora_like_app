from django.db import models
from django.conf import settings

class Question(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) # good practise to save data after change
    content = models.CharField(max_length=240) #question itself
    slug = models.SlugField(max_length=255, unique=True)
    # using custom user model
    author = models.ForeignKey(settings.AUTH_USER_MODEL, 
                                on_delete=models.CASCADE,
                                related_name="questions")

    def __str__(self):
        return self.content


class Answer(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    body = models.TextField()
    question = models.ForeignKey(Question,
                                    on_delete=models.CASCADE,
                                    related_name="answers") # in question/api/serializers instance.answers.count()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, 
                                on_delete=models.CASCADE)
    voters = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                    related_name="votes")

    def __str__(self):
        return self.author.username