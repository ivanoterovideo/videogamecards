import requests
import os

# Create a directory to save characters
output_dir = 'images/characters'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Define the Hugging Face API URL and headers
url = 'https://api.huggingface.co/models/your_model/here'
headers = {'Authorization': 'Bearer your_access_token'}

# Generate and save 538 pixel art characters
for i in range(1, 539):
    response = requests.post(url, headers=headers)
    if response.status_code == 200:
        character_data = response.json()
        image_url = character_data['image_url']
        image_response = requests.get(image_url)
        if image_response.status_code == 200:
            # Save image
            with open(os.path.join(output_dir, f'character_{i}.png'), 'wb') as f:
                f.write(image_response.content)
        else:
            print('Failed to download image')
    else:
        print('Failed to generate character')
