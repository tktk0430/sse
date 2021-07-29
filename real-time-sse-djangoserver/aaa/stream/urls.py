from django.urls import path

from . import views

urlpatterns = [
    path('', views.stream_response, name='index'),
]
