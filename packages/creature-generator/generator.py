import os
import requests
import json

from io import BytesIO
from PIL import Image
from base64 import b64encode
from dotenv import dotenv_values

config = dotenv_values(".env")  # config = {"USER": "foo", "EMAIL": "foo@example.org"}

plants_dic = {
}
quality_dic = {
    'low':"dying, death, sad",
    'medium':"",
    'high':"lush, lively, excited, happy",
}
element_dic = {
    "fire":{
        "prompt":"flames fire red",
        "negativePrompt":'yellow'
    },
    "water":{
        "prompt":"water ocean aqua blue",
        "negativePrompt":'white'
    },
    "earth":{
        "prompt":"ground dirty earth brown",
        "negativePrompt":'red yellow'
    },
    "air":{
        "prompt":"sky clouds air",
        "negativePrompt":'blue'
    }
}
creatures_dic = {
    'butterfly':
    {
        'template':'butterfly.jpg',
        'id':0
    },
    # 'firefly':
    # {
    #     'template':'firefly.png',
    #     'id':1
    # },
    'dragonfly':
    {
        'template':'dragonfly.png',
        'id':2
    }, 
    # 'worm':
    # {
    #     'template':'worm.png',
    #     'id':3
    # },
    'ant':
    {
        'template':'ant.jpg',
        'id':4
    }
}

GENERATOR_GPU_URL = os.environ.get("GENERATOR_GPU_URL", "")
ENCODING = 'utf-8'

#stable diffusion
# this is subject to change so maybe use kwargs
async def generate_creature_route(creature_type, element_type, description, cached = True):

    this_creature = creatures_dic[creature_type]
    this_element = element_dic[element_type]

    if cached == False:

        url = GENERATOR_GPU_URL + '/sdapi/v1/txt2img' 
        with open(this_creature['template'] , "rb") as image_file:
            byte_content = image_file.read()
            
        base64_bytes = b64encode(byte_content)
        base64_string = base64_bytes.decode(ENCODING)

        # TODO: Update the prompt grae
        dics = {
            # 512 by 512 is cheaper but not sd2
            #This is probably the most editable line (needs some work)
            # Some of these prompts are going to cause copyright issues if not filtered
            'prompt': 'an anime (anthropomorphic) dragonfly (((cute))), (basil)' + description + ' ' + this_element['prompt'] + ' ',
            'negative_prompt': 'plant '+this_element['negativePrompt'],
            "seed": -1,
            "subseed": -1,
            "subseed_strength": 0,
            "batch_size": 1,
            "n_iter": 1,
            "steps": 20,
            "cfg_scale": 7,
            "width": 512,
            "height": 512,
            "restore_faces": True,
            "eta": 0,
            "sampler_index": "Euler a",
            "alwayson_scripts": {
            	"controlnet":{
            	    "args":[{
            	    "input_image": base64_string,
            	    "module": 'seg_ofcoco',
            	    "model": 'control_sd15_seg [fef5e48e]',
            	    "weight": 2,
            	    "guidance": 1,
      	    	    "mask": "",
      	    	    "resize_mode": "Crop and Resize",
      	    	    "lowvram": False,
      	    	    #"processor_res": 64,
      	    	    #"threshold_a": 64,
      	    	    #"threshold_b": 64,
      	    	    "guidance_start": 0,
      	    	    "guidance_end": 1,
      	    	    	#"guessmode": True,
      	    	    	#"pixel_perfect": False
      	    	    	}]
            	}
            }

        }
        #the json above should be captured somewhere
        x = requests.post(url, json = dics)
        img1 = json.loads(x.text)['images'][0]
        #saving image
        # im = Image.open(BytesIO(base64.b64decode(img1)))
        # im.save(args.outdir + file.stem + ".png", 'PNG')

        return img1
