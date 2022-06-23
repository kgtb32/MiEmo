from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json

from model.bluetooth_model import bluetooth_model

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

bt_mod = bluetooth_model()

@app.route('/bluetooth/list', methods=['POST'])
def bluetooth_list():
    return json.dumps(bt_mod.list_all_networks())

@app.route("/bluetooth/connect", methods=['POST'])
def wifi_connect():
    mac = request.get_json().get('mac')
    if((mac==None or mac=='')):
        return Response("bad request", status=400)
    else:
        cmd_res = bt_mod.connect(mac)
        return Response("ok", status=200) if cmd_res else Response("not connected", status=412)
        
@app.route("/bluetooth/startDiscovery", methods=['POST'])
def start_discovery():
    return Response(bt_mod.start_discovery(), status=200)

@app.route("/bluetooth/endDiscovery", methods=['POST'])
def end_discovery():
    return Response(bt_mod.end_discovery(), status=200)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8003)