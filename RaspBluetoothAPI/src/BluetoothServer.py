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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8003)