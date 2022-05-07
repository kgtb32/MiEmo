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

@app.route('/audio/sinks', methods=['POST'])
def audio_sinks():
    return json.dumps(list(pactl_command_manager.sinks_list()))

@app.route('/audio/sinks/setVolume', methods=['POST'])
def audio_sinks_set_volume():
    sink = request.get_json().get('sink')
    volume = request.get_json().get('volume')
    if(not volume or not sink or type(volume) is not int or sink == ''):
        return Response("bad request", status=400)
    result = pactl_command_manager.set_sink_volume(sink, volume)
    return Response(json.dumps({"completed": bool(result)}), status=(200,412)[not result])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0.', port=8002)