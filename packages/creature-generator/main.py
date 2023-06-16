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

config = dotenv_values(".env")

app = Flask(__name__)


@app.route("/status")
def status():
    return jsonify({"status": "ok"})


@app.route("/generate-creature", methods=["POST"])
async def generate_creature_route_handler():
    data = request.get_json()
    element_type = data.get("element_type", "")
    plant_name = data.get("plant_name", "")

    creature_img = await generate_creature_route(element_type, plant_name, cached=False)

    return jsonify({"img": creature_img})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
