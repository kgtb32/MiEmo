# Miemo - Emotion

MiEmo Mood analysis microservice

This microservice is based on atulapra/Emotion-detection project (MIT licence)

# How to start ?

First of all you need to create a python virtual env

**You need Python 3+ (all versions > 3, tested on python 3.8.10 on linux)**

⚠ Windows commands can be different !

1. create you virtualenv (needs to be named venv because of gitignore)
   > python3 -m venv venv
2. Activate your virtual environment
   > source venv/bin/activate
3. Install all the nescessary dependencies
   > pip install -r requirements.txt

# Run the project

First of all you need in order to work properly :

1. model.h5 file placed into the src/ directory
2. data folder present

to run the project, you need to start your virtualenv and install required dependencies
see [# How to start]()

when all the required steps are performed you can simply run the following command in the **src folder**:

> python3 emotions --mode display
