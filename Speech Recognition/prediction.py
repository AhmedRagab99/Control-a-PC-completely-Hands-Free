import numpy as np
import librosa
import IPython.display as ipd
import sounddevice as sd
import soundfile as sf
import websocket
import threading
from keras.models import load_model
from sklearn.preprocessing import LabelEncoder
from time import sleep

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
        do = action(word)
        if do is not None:
            ws.send(do)
        sleep(1)


def record():
    sampleRate = 16000
    duration = 1  # seconds
    filename = 'command.wav'
    print("Start Recording")
    sleep(0.5)
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
    probabilities = model.predict(audio.reshape(1, 8000, 1))
    index = np.argmax(probabilities[0])
    return validate(probabilities, index)


def validate(probabilities, index):
    print('Prob:')
    print(classes[index])
    print(probabilities[0][index])
    if probabilities[0][index] > 0.8:
        return classes[index]
    return 'Voice Command Not Recognized!'

def action(word):
    print(word)
    if word == "left" or word == "on":
        return "Left"
    if word == "up":
        return "Up"
    if word == "right":
        return "Right"
    if word == "down":
        return "Down"
    if word == "yes":
        return "Yes"
    if word == "no":
        return "No"


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
