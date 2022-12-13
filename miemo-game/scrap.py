import pandas
import os
import sys
import django
import uuid
import random
import dateutil.parser
from shutil import copyfile
os.environ.setdefault('DJANGO_SETTINGS_MODULE','miemogame.settings')

django.setup()
from gameservice.models import Game, Platform, Genre, Core

DL_IMG_CONST = "./downloaded_images"

game_cfs = {
    "a2600":{
        "platform_uuid": "6e99d88e-f890-4f68-bbee-49f278b944c5",
        "core_uuid": "8bca35fc-a8e3-4b27-aa25-fd4627746537",
        "json_path": "./scrap/test/atari2600/games.json",
        "base_path": "scrap/test/atari2600",
        "base_img_path": "2d",
        "replace_str_regex": "./",
        "replace_img_regex": DL_IMG_CONST,
        "replace_img_with": "./",
        "keep_names": False,
    },
    "a5200":{
        "platform_uuid": "0f22f70d-e014-438a-93d7-06c169fb86a7",
        "core_uuid": "94021a17-7227-470d-9a34-2876477fd3ed",
        "json_path": "./scrap/test/atari5200/games.json",
        "base_path": "scrap/test/atari5200",
        "base_img_path": "2d",
        "replace_str_regex": "./",
        "replace_img_regex": "./media/images/",
        "replace_img_with": "./",
        "keep_names": False,
    },
    "a7800":{
        "platform_uuid": "280dc25a-d8e2-4830-8ce5-147deae32dbf",
        "core_uuid": "3577e803-e2d1-4ef7-a727-e6108dec7fbd",
        "json_path": "./scrap/test/atari7800/games.json",
        "base_path": "scrap/test/atari7800",
        "base_img_path": "2d",
        "replace_str_regex": "./",
        "replace_img_regex": DL_IMG_CONST,
        "replace_img_with": "./",
        "keep_names": False,
    },
    "lynx":{
        "platform_uuid": "1dd70832-4f41-452b-bc75-1b6fee8c88be",
        "core_uuid": "2b4ad681-7e40-4d81-9325-c72d0f49b81c",
        "json_path": "./scrap/test/lynx/games.json",
        "base_path": "scrap/test/lynx",
        "base_img_path": "2d",
        "replace_str_regex": "./",
        "replace_img_regex": DL_IMG_CONST,
        "replace_img_with": "./",
        "keep_names": False,
    },
    "mame":{
        "platform_uuid":"85db9966-7c5d-4552-9a87-fae31e9b3e2b",
        "core_uuid":"9f0b3c09-20e1-445d-9e30-9999733c85e1",
        "json_path":"./scrap/test/mame/games.json",
        "base_path":"scrap/test/mame",
        "base_img_path":"2d",
        "replace_str_regex":"./",
        "replace_img_regex": DL_IMG_CONST,
        "replace_img_with":"./",
        "keep_names":True,
    },
    "nes": {
        "platform_uuid":"f35ede0c-5076-42c3-aa58-efa2dae3cb54",
        "core_uuid":"eb36fe38-7379-4e84-9f33-c44cb7e63eba",
        "json_path":"./scrap/test/nes/games.json",
        "base_path":"scrap/test/nes",
        "base_img_path":"2d",
        "replace_str_regex":"./",
        "replace_img_regex":DL_IMG_CONST,
        "replace_img_with":"./",
        "keep_names":False,
    },
    "snes": {
        "platform_uuid":"01f766b2-6534-4972-836d-a0f27b7bdaba",
        "core_uuid":"7d912337-f10e-495d-acf3-88a30c1336e4",
        "json_path":"./scrap/test/snes/games.json",
        "base_path":"scrap/test/snes",
        "base_img_path":"2d",
        "replace_str_regex":"./",
        "replace_img_regex":DL_IMG_CONST,
        "replace_img_with":"./",
        "keep_names":False,
    },
    "n64": {
        "platform_uuid":"b838497a-e908-4e7d-8799-752e70eab0f5",
        "core_uuid":"22db272f-2586-4d77-9989-e8d47b8fb683",
        "json_path":"./scrap/test/n64/games.json",
        "base_path":"scrap/test/n64",
        "base_img_path":"2d",
        "replace_str_regex":"./",
        "replace_img_regex":DL_IMG_CONST,
        "replace_img_with":"./",
        "keep_names":False,
    },
    "gameboy": {
        "platform_uuid":"6dc09893-c6c5-4469-b286-8baafcfc2ad5",
        "core_uuid":"576d83e5-893e-45a9-84fa-78c68e9555ed",
        "json_path":"./scrap/test/gb/games.json",
        "base_path":"scrap/test/gb",
        "base_img_path":"2d",
        "replace_str_regex":"./",
        "replace_img_regex":DL_IMG_CONST,
        "replace_img_with":"./",
        "keep_names":False,
    },
    "gbc":{
        "platform_uuid":"a0d3cbe3-677e-4347-a18c-de5bf5c74aa0",
        "core_uuid":"576d83e5-893e-45a9-84fa-78c68e9555ed",
        "json_path":"./scrap/test/gbc/games.json",
        "base_path":"scrap/test/gbc",
        "base_img_path":"2d",
        "replace_str_regex":"./",
        "replace_img_regex":DL_IMG_CONST,
        "replace_img_with":"./",
        "keep_names":False,
    },
    "gba": {
        "platform_uuid":"1fa2a53e-4d4c-461d-957e-27e9c2a9e3bc",
        "core_uuid":"27367d6d-3aac-4d0a-b6bb-95b9e123b6d0",
        "json_path":"./scrap/test/gba/games.json",
        "base_path":"scrap/test/gba",
        "base_img_path":"2d",
        "replace_str_regex":"./",
        "replace_img_regex":DL_IMG_CONST,
        "replace_img_with":"./",
        "keep_names":False,
    }
}

random_colors = [
    {
        "color": "#FFFFFF",
        "background":"#2ecc71",
    },
    {
        "color": "#FFFFFF",
        "background":"#e74c3c",
    },
    {
        "color": "#FFFFFF",
        "background":"#3498db",
    },
    {
        "color": "#000000",
        "background":"#f1c40f",
    },
    {
        "color": "#000000",
        "background":"#e67e22",
    },
]

def load_json(filename):
    return pandas.read_json(filename).gameList.game

def add_or_get_genre(genre_name: str):
    found_genre = Genre.objects.all().filter(genre_name = genre_name).first()
    if not found_genre:
        rand = random_colors[random.randint(0,len(random_colors)-1)]
        obj = Genre.objects.create(
            genre_name = genre_name,
            background = rand["background"],
            color= rand["color"]
        )
        obj.save()
        return obj
    else:
        return found_genre
        
def get_platform(platform_uuid: str):
    return Platform.objects.all().filter(platform_id = platform_uuid).first()

def get_core(core_id: str):
    return Core.objects.all().filter(core_uuid = core_id).first()

def get_game_file_name(base_path: str, replace_str_regex: str):
    return base_path.replace(replace_str_regex, "")

def get_cover_file_name(base_path: str, replace_img_regex: str):
    return str(base_path).replace(replace_img_regex, "")

def get_new_file_name(file_uuid:str, file_extension:str):
    return file_uuid+"."+file_extension

def get_new_cover_file_name(file_uuid:str):
    return file_uuid+".png"

def get_game_file_path(file_name: str, base_path:str):
    return os.getcwd()+"/"+base_path+"/"+file_name

def get_game_cover_file_path(file_name: str, base_path:str,base_img_path:str):
    return os.getcwd()+"/"+base_path+"/"+base_img_path+"/"+file_name

def copy_file(old_path: str, new_path: str):
    try:
        copyfile(old_path,new_path)
    except Exception as e:
        print(e)
        
def parse_players(nb_players:str):
    if(nb_players == "" or len(str(nb_players)) > 5):
        return "1"
    return max(str(nb_players).split("-"))
        
def create_game(name:str, cover_path:str, game_path:str, year_created: int, genre: list[Genre], platform:Platform, core:Core, nb_player:str):
    gm = Game.objects.create(name=name,year_created=year_created,nb_played=0,cover=cover_path,platform=platform,core=core,nb_player=nb_player,game=game_path)
    for g in genre:
        gm.genres.add(g)
    gm.save()
    
def get_good_date(date: str):
    try:
        return dateutil.parser.isoparse(date).strftime("%Y")
    except Exception:
        return 0


def load_games(json_path, core_uuid, platform_uuid, keep_names, base_path,replace_str_regex,replace_img_regex,base_img_path):
    json_games = load_json(json_path)

    for game in json_games:
        if "hidden" in game.keys() and game["hidden"] == "true":
            continue
        try:
            game["image"]
        except Exception:
            continue
        core = get_core(core_uuid)
        platform = get_platform(platform_uuid) 

        print(game)
        game_file_name = get_game_file_name(game["path"],replace_str_regex)
        cover_file_name = get_cover_file_name(game["image"],replace_img_regex)

        new_game_cover_path = "./static/static/game/cover/"
        new_game_path = "./static/static/game/games/"

        game_add_cover_path = "static/game/cover/"
        game_add_path = "static/game/games/"

        imid = uuid.uuid4()

        if(not os.path.exists(get_game_file_path(game_file_name, base_path))):
            print("game skipped", get_game_file_path(game_file_name,base_path))
            continue
        
        if "genre" in game.keys():
            genre = list(map(lambda x : add_or_get_genre(x),game["genre"].split(",")))
        else:
            genre = []

        if(keep_names):
            final_name = game_file_name
            copy_file(get_game_file_path(game_file_name, base_path),new_game_path+game_file_name)
        else:
            final_name = get_new_file_name(str(imid),game_file_name.split(".")[-1])
            copy_file(get_game_file_path(game_file_name,base_path),new_game_path+final_name)
        copy_file(get_game_cover_file_path(cover_file_name,base_path,base_img_path),new_game_cover_path+get_new_cover_file_name(str(imid)))

        try:
            release_date = game["releasedate"] 
        except Exception:
            release_date = ""

        try:
            players = game["players"]
        except Exception:
            players = "1"
    
        create_game(
            game["name"],
            game_add_cover_path+get_new_cover_file_name(str(imid)),
            game_add_path+final_name,
            get_good_date(release_date),
            genre,
            platform,
            core,
            parse_players(players)
        )
    
    print("------")
    
if len(sys.argv) != 2:
    print("argument.platform.missing")
    sys.exit(1)
if sys.argv[1] not in game_cfs.keys():
    print("argument.platform.invalid valid are :",game_cfs.keys())
    sys.exit(1)
selected_games = game_cfs[sys.argv[1]]
load_games(selected_games["json_path"],selected_games["core_uuid"],selected_games["platform_uuid"],selected_games["keep_names"],selected_games["base_path"],selected_games["replace_str_regex"],selected_games["replace_img_regex"],selected_games["base_img_path"])
