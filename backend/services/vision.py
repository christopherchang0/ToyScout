import base64
from anthropic import Anthropic

def imagescanner(image: str, user_prompt: str, system_prompt: str = "You are a helpful assistant."):
    client = Anthropic()

    with open(image, "rb") as f:
        image_data = base64.standard_b64encode(f.read()).decode("utf-8")

    response = client.messages.create(
        model = "claude-3-5-sonnet-20241022",
        max_tokens = 1000,
        system = system_prompt,
        messages = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/png",
                            "data": image_data,
                        },
                    },
                    {
                        "type": "text",
                        "text": user_prompt,
                    }
                ],
            }
        ],
    )

    return response.content[0].text