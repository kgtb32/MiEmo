from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json

from model.commands.pactl_command import pactl_command


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

pactl_command_manager = pactl_command()

@app.route('/audio/info', methods=['POST'])
def audio_info():
    return json.dumps(pactl_command_manager.info())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0.', port=8002)