from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import DestroyAPIView
from rest_framework.response import Response
import requests
from .constants import BASE_URL

from .models import Ideas,Admin
from .serializers import PostSerializer,AdminSerializer
from .TFIDF import MLModel
from .BERT import BERT

from .Doc2Vec import Doc2Vec

class PostView(APIView):

    def get(self, request):
        # r = requests.get(BASE_URL+'/feeds/getallfeed', params=request.GET)
        # response = r.json()
        serializer = AdminSerializer(Admin.objects.all(), many=True)
        response = {"posts": serializer.data}
        # MLModel.train(self,serializer.data)
        #BERT.train(self, serializer.data)
        #Doc2Vec.train(self,serializer.data)
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request):
        # print("Train Data")
        data = request.data

        serializer = PostSerializer(data=data)
        adminserializer = AdminSerializer(data=data)

        idea_headline_similar_sentence = MLModel.predict_similarity(self,data)
        # if serializer.is_valid() and idea_headline_similar_sentence is None:
        #     post = Ideas(**data)
        #     post.save()
        #     response = serializer.data
        #     return Response(response, status=status.HTTP_200_OK)
        # elif idea_headline_similar_sentence is not None:
        #     response = "This sentence is similar to the idea headline : "+idea_headline_similar_sentence
        #     return Response(response,status=status.HTTP_403_FORBIDDEN)
        # print("In Post ")
        similar_description, score = BERT.predict(self, data["idea_description"],1)

        if serializer.is_valid() and score <= 0.5 and idea_headline_similar_sentence is None:
            post = Ideas(**data)
            post.save()
            response = serializer.data
            return Response(response,status=status.HTTP_200_OK)
        elif score > 0.5:
            similarpost = Admin(**data)
            similarpost.similardescription =  similar_description
            similarpost.save()
            print(score)
            response = "This sentence is similar to the idea description: "+similar_description
            print(idea_headline_similar_sentence)
            return Response(response,status=status.HTTP_403_FORBIDDEN)
        elif idea_headline_similar_sentence is not None:
            similarpost = Admin(**data)
            similarpost.similarheadline = idea_headline_similar_sentence
            similarpost.save()
            response = "This sentence is similar to the idea headline : " + idea_headline_similar_sentence
            return Response(response, status=status.HTTP_403_FORBIDDEN)


        # similar_sentence, score = Doc2Vec.predict(self,data["idea_description"])
        # if serializer.is_valid() and score != 0:
        #     post = Post(**data)
        #     post.save()
        #     response = serializer.data
        #     return Response(response,status=status.HTTP_200_OK)
        # else:
        #     response = "This sentence is similar to the idea : " + similar_sentence
        #     return Response(response, status=status.HTTP_403_FORBIDDEN)

    def delete(self,request,*args,**kwargs):
        post = Admin.objects(id=request.GET.get('id'))
        post.delete()
        serializer = AdminSerializer(Admin.objects.all(), many=True)
        response = serializer.data
        return Response(response, status=status.HTTP_200_OK)



