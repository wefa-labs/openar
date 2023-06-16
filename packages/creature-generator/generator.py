import os
import requests
import json

from io import BytesIO
from PIL import Image
from base64 import b64encode
from dotenv import dotenv_values

config = dotenv_values(".env")  # config = {"USER": "foo", "EMAIL": "foo@example.org"}

health_dic = {
    dead: "dying, dead, deathly, passed",
    sick: "drained, tired, sad, hungry, starving",
    healthy: "lush, lively, healthy, excited, energetic",
}
element_dic = {
    water:{
        prompt: "water ocean aqua clear blue",
        negativePrompt: "white"
    },
    earth:{
        prompt: "ground soil earth dirt brown green",
        negativePrompt: "red yellow"
    },
    fire:{
        prompt: "flames inferno blaze fire red",
        negativePrompt: "yellow"
    },
    air:{
        prompt: "sky breeze cloud wind air orange sun",
        negativePrompt: "blue"
    }
}
creatures_dic = {
    water: {
        dragonfly:{
            template: "assets/creatures/dragonfly.png",
            id: 1
        }, 
        water_strider: {
            template: "assets/creatures/water_strider.png",
            id: 2
        },
        water_scorpion: {
            template: "assets/creatures/water_scorpion.png",
            id: 3
        },
        boatman: {
            template: "assets/creatures/boatman.png",
            id: 4
        },
    },
    earth: {
        earthworm: {
            template: "assets/creatures/earthworm.png",
            id: 5
        },
        millipede: {
            template: "assets/creatures/millipede.png",
            id: 6
        },
        rolypoly: {
            template: "assets/creatures/rolypoly.png",
            id: 7
        },
        ant: {
            template: "assets/creatures/ant.png",
            id: 8
        },
        cricket: {
            template: "assets/creatures/cricket.png",
            id: 9
        }
    },
    fire: {
        fire_ant: {
            template: "assets/creatures/fire_ant.png",
            id: 10
        },
        black_widow: {
            template: "assets/creatures/black_widow.png",
            id: 11
        },
        firefly: {
            template: "assets/creatures/firefly.png",
            id: 12
        },
        pincher_bug: {
            template: "assets/creatures/pincher_bug.png",
            id: 13
        },
    },
    air: {
        bee: {
            template: "assets/creatures/bee.png",
            id: 14
        },
        dune_beetle: {
            template: "assets/creatures/beetle.png",
            id: 15
        },        
        butterfly: {
            template: "assets/creatures/butterfly.png",
            id: 16
        },
        ladybug: {
            template: "assets/creatures/ladybug.png",
            id: 17
        },
    },
    dragonfly: {
        template: "assets/creatures/dragonfly.png",
        id: 1
    }, 
    ant: {
        template: "assets/creatures/ant.png",
        id: 8
    },
    butterfly: {
        template: "assets/creatures/butterfly.png",
        id: 18
    },
}

GENERATOR_GPU_URL = os.environ.get("GENERATOR_GPU_URL", "")
ENCODING = 'utf-8'

#stable diffusion
# this is subject to change so maybe use kwargs
async def generate_creature_route(element_type, plant_name, cached = True):

    #creature randomizer
    creature_type = ['butterfly', 'ant', 'dragonfly'][math.floor(random.random()*3)]

    this_element = element_dic[element_type]
    this_creature = creatures_dic[creature_type]

    if cached == False:

        url = GENERATOR_GPU_URL + '/sdapi/v1/txt2img' 
        with open(this_creature[template] , "rb") as image_file:
            byte_content = image_file.read()
            
        base64_bytes = b64encode(byte_content)
        base64_string = base64_bytes.decode(ENCODING)

        # TODO: Update the prompt grae
        dics = {
            # 512 by 512 is cheaper but not sd2
            #This is probably the most editable line (needs some work)
            # Some of these prompts are going to cause copyright issues if not filtered
            'prompt': 'an anime (anthropomorphic) (((cute))) ' + plant_name + ' ' + this_element['prompt'] + ' ',
            'negative_prompt': '((girl)) ((person)) '+this_element['negativePrompt'],
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
            	    "module": 'depth_midas',
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
