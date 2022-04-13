from flask import Flask, request, jsonify
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0.', port=8001)