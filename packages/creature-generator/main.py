import os
import requests
import json
import base64
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from io import BytesIO
from PIL import Image
from generator import generate_creature_route

load_dotenv()

app = Flask(__name__)

@app.route('/generate-creature', methods=['POST'])
def generate_creature_route_handler():
    data = request.get_json()
    creature_type = data.get('creature_type', '')
    element_type = data.get('element_type', '')
    description = data.get('description', '')
    creature_img = generate_creature_route(creature_type, element_type, description, cached=False)
    return jsonify({'img': creature_img})

if __name__ == "__main__":
    app.run()
