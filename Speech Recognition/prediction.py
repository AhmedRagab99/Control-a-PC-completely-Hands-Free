from keras.models import load_model
import numpy as np
import librosa
import IPython.display as ipd
from sklearn.preprocessing import LabelEncoder
import sounddevice as sd
import soundfile as sf

labels = ["yes", "no", "up", "down", "left", "right", "on", "off", "stop", "go"]

le = LabelEncoder()
y = le.fit_transform(labels)
classes = list(le.classes_)

model = load_model('best_model.hdf5')

sampleRate = 16000
duration = 1  # seconds
filename = 'fares_command.wav'
print("Start Recording")
myData = sd.rec(int(sampleRate * duration), samplerate=sampleRate,
                channels=1, blocking=True)
print("End Recording")
sd.wait()
sf.write(filename, myData, sampleRate)


def predict(audio):
    prob = model.predict(audio.reshape(1, 8000, 1))
    index = np.argmax(prob[0])
    return classes[index]


# reading the voice commands
samples, sample_rate = librosa.load('fares_command.wav', sr=16000)
samples = librosa.resample(samples, sample_rate, 8000)
ipd.Audio(samples, rate=8000)

print('Result: ')
print(predict(samples))
