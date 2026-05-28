import os
import base64
import anthropic as Anthropic

def imagescanner(image: str, user_prompt: str, system_prompt: str = "You are a helpful assistant."):
    #initializes client, using API key
    client = Anthropic()


    return image