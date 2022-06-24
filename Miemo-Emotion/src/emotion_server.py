from flask import Flask, request, jsonify
from emotion_detector import emotion_detector
from flask_cors import CORS, cross_origin

app = Flask(__name__)

emotion_detector_object = emotion_detector()

@app.route('/emotion/detect', methods=['POST'])
@cross_origin()
def hello():
    data = request.get_json()
    if("base64_image" not in data.keys()):
        return {
            "resultCode": 1000,
            "error": "pre condition failed"
        }
    else:
        return {
            "resultCode": 0,
            "emotion": emotion_detector_object.detect_mood(data["base64_image"])
        }

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

