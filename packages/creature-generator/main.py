import os
import requests
import json
import base64

from flask import Flask, request, jsonify
from io import BytesIO
from PIL import Image
from dotenv import dotenv_values
from generator import generate_creature_route
import math
import random

config = dotenv_values(".env")  # config = {"USER": "foo", "EMAIL": "foo@example.org"}

app = Flask(__name__)

@app.route('/status')
def status():
    return jsonify({'status': 'ok'})
    
@app.route('/generate-creature', methods=['POST'])
async def generate_creature_route_handler():
    data = request.get_json()
    creature_type = data.get('creature_type', '')
    element_type = data.get('element_type', '')
    description = data.get('description', '')
    #creature randomizer
    creature_tye = ['butterfly', 'ant', 'dragonfly']*math.floor(random.random()*3)
    creature_img = await generate_creature_route(creature_type, element_type, description, cached=False)
    return jsonify({'img': creature_img})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
