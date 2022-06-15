from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json

from model.wifi_model import wifi_model

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

wifi_mod = wifi_model()

@app.route('/wifi/list', methods=['POST'])
def wifi_list():
    return json.dumps(wifi_mod.list_all_wifi_networks())


@app.route("/wifi/connect", methods=['POST'])
def wifi_connect():
    ssid = request.get_json().get('ssid')
    password = request.get_json().get('password')
    if((ssid==None or ssid=='') or (password==None)):
        return Response("bad request", status=400)
    else:
        cmd_res = wifi_mod.connect(ssid, password)
        res = {"success": "successfully" in str(cmd_res)}
        res_code = 200 if res['success'] else 412
        return Response(json.dumps(res), status=res_code)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0.', port=8001)