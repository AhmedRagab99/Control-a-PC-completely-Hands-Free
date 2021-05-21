import numpy as np
import librosa
import IPython.display as ipd
import sounddevice as sd
import soundfile as sf
import websocket
import threading
from keras.models import load_model
from sklearn.preprocessing import LabelEncoder

labels = ["yes", "no", "up", "down", "left",
          "right", "on", "off", "stop", "go"]
le = LabelEncoder()
y = le.fit_transform(labels)
classes = list(le.classes_)
model = load_model('best_model.hdf5')


def main():
    ws = initalizeSocket()
    while True:
        record()
        audio = read()
        word = predict(audio)
        ws.send(word)


def record():
    sampleRate = 16000
    duration = 1  # seconds
    filename = 'command.wav'
    print("Start Recording")
    myData = sd.rec(int(sampleRate * duration), samplerate=sampleRate,
                    channels=1, blocking=True)
    print("End Recording")
    sd.wait()
    sf.write(filename, myData, sampleRate)


def read():
    samples, sample_rate = librosa.load('command.wav', sr=16000)
    samples = librosa.resample(samples, sample_rate, 8000)
    ipd.Audio(samples, rate=8000)
    return samples


def predict(audio):
    prob = model.predict(audio.reshape(1, 8000, 1))
    index = np.argmax(prob[0])
    return classes[index]


def initalizeSocket():
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:8080",
                                on_open=onOpen,
                                on_message=onMessage,
                                on_error=onError,
                                on_close=onClose)
    wst = threading.Thread(target=ws.run_forever)
    wst.daemon = True
    wst.start()
    return ws


def onOpen(ws):
    print("### Web Socket Connected! ###")


def onMessage(ws, message):
    print(message)


def onError(ws, error):
    print(error)


def onClose(ws):
    print("### Web Socket Disconnected! ###")


if __name__ == '__main__':
    main()
