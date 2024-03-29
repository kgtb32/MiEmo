import pandas as pd
import json
import subprocess

settings_file_path = "./settings.json"

def get_settings():
    df = pd.read_json(settings_file_path, typ='series')
    return dict(df)

def types_valid(data):
    if("selectedHologram" not in dict.keys(data) or "changeOnGameStart" not in dict.keys(data)):
        return False
    if(type(data["selectedHologram"]) is str and type(data["changeOnGameStart"]) is bool):
        return True
    return False

def sanitize_holo_settings(data):
    return {"selectedHologram": data["selectedHologram"],"changeOnGameStart": data["changeOnGameStart"]}

def save_json(data):
    with open(settings_file_path, "w") as outfile:
        outfile.write(json.dumps(data))
        
def save_settings(data):
    if(not types_valid(data)):
        return False
    save_json(sanitize_holo_settings(data))
    return True

def set_holo_mode(mode: str):
    with open("/tmp/holo_mode", "w") as outfile:
        outfile.write(mode)
        return True
    return False

def game_launch():
    settings = get_settings()
    if(settings["changeOnGameStart"]):
        set_holo_mode('video')

def game_close():
    settings = get_settings()
    if(settings["changeOnGameStart"]):
        set_holo_mode('base')
        
def holo_mode_get():
    f = open('/tmp/holo_mode', 'r')
    mode = f.read()
    f.close()
    return mode