from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.views.decorators.http import condition
from django.http import StreamingHttpResponse
from django.views.generic import UpdateView, DetailView, FormView, TemplateView, DeleteView
import time
import random

flights = ["A123", "D654", "U213", "A987", "I768", "G119"]
states = ["happy", "sad", "angry"]


@condition(etag_func=None)
def stream_response(request):
    resp = StreamingHttpResponse(
        stream_response_generator(), content_type='text/event-stream')
    return resp


def stream_response_generator():
    while(True):
        flight = random.choice(flights)
        state = random.choice(states)
        data = {"flight": flight, "state": state}
        yield f"data: {data}\n" \
              "retry:1000\n\n"
        time.sleep(1)


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
