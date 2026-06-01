import base64
from anthropic import Anthropic
import filetype

#Toy identification prompt
DEFAULT_SYSTEM_PROMPT = """You are a toy identification expert. When given an image, identify the toy and return ONLY a JSON object with these fields:
- name: the toys full name (brand + product name if possible)
- brand: the manufacturer
- year: estimated release year or range
- condition: mint / good / fair / poor based on visible wear
- estimated_value: price range in USD based on current resale market
- description: 1-2 sentence description

Return only valid JSON, no extra text."""

def imagescanner(image: str, user_prompt: str, system_prompt: str = DEFAULT_SYSTEM_PROMPT):
    client = Anthropic()

    with open(image, "rb") as f:
        image_data = base64.standard_b64encode(f.read()).decode("utf-8")

    image_type = filetype.guess(image)
    media_type = image_type.mime if image_type else "image/png"

    response = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1000,
        system=system_prompt,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
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