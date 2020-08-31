from django.db import models

# Create your models here.

from mongoengine import *
import datetime


class Ideas(Document):
    Idea_Choices = {
        'LOCKED_IDEA': 'LOCKED IDEA',
        'OPEN_IDEA': 'OPEN IDEA'
    }
    status = BooleanField(required=True)
    idea_owner = EmailField(required=True)
    idea_owner_name = StringField(required=True)
    idea_genre = StringField(required=True)
    idea_headline = StringField(required=True)
    idea_description = StringField(required=True)
    posted_date = DateTimeField(default=datetime.datetime.utcnow)
    idea_field = StringField(required=True)
    idea_type = StringField(choices=Idea_Choices.keys(), required=True)
    comment = StringField()
    price = IntField(default=0)
    comments = ListField(StringField())
    likes = IntField(default=0)
    dislikes = IntField(default=0)
    votecount = IntField(default=0)
    reportAbuseUser = ListField(StringField())
    reportAbuseCount = IntField(default=0)
    price = IntField(default=0)
    __v = IntField(default=0)

class Admin(Document):
    Idea_Choices = {
        'LOCKED_IDEA': 'LOCKED IDEA',
        'OPEN_IDEA': 'OPEN IDEA'
    }
    status = BooleanField(required=True)
    idea_owner = EmailField(required=True)
    idea_owner_name = StringField(required=True)
    idea_genre = StringField(required=True)
    idea_headline = StringField(required=True)
    idea_description = StringField(required=True)
    posted_date = DateTimeField(default=datetime.datetime.utcnow)
    idea_field = StringField(required=True)
    idea_type = StringField(choices=Idea_Choices.keys(), required=True)
    comment = StringField()
    price = IntField(default=0)
    comments = ListField(StringField())
    likes = IntField(default=0)
    dislikes = IntField(default=0)
    votecount = IntField(default=0)
    reportAbuseUser = ListField(StringField())
    reportAbuseCount = IntField(default=0)
    price = IntField(default=0)
    __v = IntField(default=0)
    similardescription = StringField()
    similarheadline = StringField()
