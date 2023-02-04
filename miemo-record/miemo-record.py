import mss
import mss.tools
import time
from flask import Flask, render_template, Response

FPS = 16

def get_frame():
    with mss.mss() as sct:
        monitor = sct.monitors[0]
        sct_img = sct.grab(monitor)
        return mss.tools.to_png(sct_img.rgb, sct_img.size)


app = Flask(__name__)
@app.route('/')
def index():
    # rendering webpage
    return render_template('index.html')

def gen():
    while True:
        #get camera frame
        time.sleep(1/FPS)
        frame = get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
               
@app.route('/video_feed')
def video_feed():
    return Response(gen(),mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    # defining server ip address and port
    app.run(host='0.0.0.0',port='8007', debug=False)