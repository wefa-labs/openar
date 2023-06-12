from starlette.requests import Request
from fastapi.responses import JSONResponse
import uvicorn
from fastapi import FastAPI
from starlette.requests import Request
from generator import generate_creature_route
import json
from dotenv import dotenv_values
import os

config = dotenv_values(".env")  # config = {"USER": "foo", "EMAIL": "foo@example.org"}

app = FastAPI()

async def generate_creature_route_handler(request: Request):
    body = json.loads(await request.body())
    creature_img = await generate_creature_route( body['creature_type'], body['element_type'], body['description'], cached = False)
    response = JSONResponse(content = {'img': creature_img}, headers={"Content-Language": "en-US"})
    return response

app.add_route("/generate-creature", generate_creature_route_handler, [ "POST"])

if __name__ == '__main__':
    uvicorn.run(
        'main:app', port=int(os.environ.get("PORT", 8080)), host="0.0.0.0",
        reload=True, reload_dirs=['./'])