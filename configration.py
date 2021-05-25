import websocket
import threading
import cv2
import mediapipe as mp
import math as m
import time
# import imutils
import numpy as np

# 12 and 14 mouse
# 409 and 185 for smile
# 386 and 374 for left eye
# 195 and 145 for right eye
# 4 for nose 
# 168 for head
class Point ():
   
    def __init__(self, x, y):
        self.X = x
        self.Y = y

class FaceMeshConfigure():
    def __init__(self, staticMode=False,
                 maxFaces=4,
                 minDetectionConfidence=0.5,
                 minTrackingConfidence=0.5,
                 thickness=1,
                 circleRadius=1
                 ):
        # self.socket  = SocketConnection()
        self.mouseUp = Point(-1, -1)
        self.mouseDown = Point(-1, -1)

        self.rightEyeUp = Point(-1, -1)
        self.rightEyeDown = Point(-1, -1)

        self.leftEyeUp = Point(-1, -1)
        self.leftEyeDown = Point(-1, -1)

        self.mouseLeft = Point(-1, -1)
        self.mouseRight = Point(-1, -1)

        self.leftLine = Point(-1, -1)
        self.rightLine = Point(-1, -1)

        self.nose = Point(-1, -1)

        self.rightDist = 0
        self.leftDist = 0

        self.maxi = Point(0, 0)
        self.mini = Point(1000000, 1000000)


        self.screenWidth = 1280
        self.screenHight = 800

        self.staticMode = staticMode
        self.maxFaces = maxFaces
        self.minDetectionConfidence = minDetectionConfidence
        self.minTrackingConfidence = minTrackingConfidence
        self.thickness = thickness
        self.circleRadius = circleRadius

        self.mpDraw = mp.solutions.drawing_utils
        self.mpFaceMesh = mp.solutions.face_mesh
        self.faceMesh = self.mpFaceMesh.FaceMesh(static_image_mode=self.staticMode,
                                                 max_num_faces=self.maxFaces,
                                                 min_detection_confidence=self.minDetectionConfidence,
                                                 min_tracking_confidence=self.minTrackingConfidence)
        self.drawSpec = self.mpDraw.DrawingSpec(
            thickness=self.thickness, circle_radius=self.circleRadius)

    def calcBoundries (self,img):

        self.imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        self.results = self.faceMesh.process(self.imgRGB)

        self.multiFacesLandmarks = self.results.multi_face_landmarks
        faces = []
        faceLandmark = []
        faceBox = []
        distance = 0
        if self.multiFacesLandmarks:

            for faceLms in self.multiFacesLandmarks:

                self.mpDraw.draw_landmarks(img, faceLms, self.mpFaceMesh.FACE_CONNECTIONS,
                                           landmark_drawing_spec=self.drawSpec)

                h, w, c = img.shape
                for id, lm in enumerate(faceLms.landmark):
                    
                    cx, cy, z, id = int(
                        lm.x * w), int(lm.y * h), int(lm.z * c), int(id)
                    
                    # cv2.putText(img, str(id), (cx, cy),
                    #             cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 0), 1)
                    # 12 and 14 mouth
                    # 409 and 185 for smile
                    # 386 and 374 for left eye
                    # 195 and 145 for right eye
                    # 4 for nose 
                    # 168 for head
                    # 282 and 52 for plink

                    # move mouse with  Nose
                    if id == 4:
                        self.maxi.X = max(cx, self.maxi.X)
                        self.mini.X = min(cx, self.mini.X)
                        self.maxi.Y = max(cy, self.maxi.Y)
                        self.mini.Y = min(cy, self.mini.Y)
                        self.nose = Point(cx, cy)
                    
                    if id == 334 and self.leftLine.X == -1:
                        self.leftLine = Point(cx, cy)
                        

                    if id == 105 and self.rightLine.X == -1:
                        self.rightLine = Point(cx, cy)

                    # Simle
                    if id == 287 and self.mouseLeft.X == -1 :
                        self.mouseLeft = Point(cx, cy)
                    if id == 57 and self.mouseRight.X == -1 :
                        self.mouseRight = Point(cx, cy)

                    # Open Mouse
                    if id == 12 and self.mouseUp.X == -1 :
                        self.mouseUp= Point(cx, cy)
                    if id == 14 and self.mouseDown.X == -1 :
                        self.mouseDown = Point(cx, cy)

                    # Close Left Eye
                    if id == 386 and self.leftEyeDown.X == -1 :
                        self.leftEyeDown = Point(cx, cy)
                    if id == 374 and self.leftEyeUp.X == -1 :
                        self.leftEyeUp = Point(cx, cy)

                    # Close Right Eye
                    if id == 159 and self.rightEyeDown.X == -1 :
                        self.rightEyeDown = Point(cx, cy)
                    if id == 145 and self.rightEyeUp.X == -1 :
                        self.rightEyeUp = Point(cx , cy)
                if self.leftDist == 0:
                    self.leftDist = m.sqrt(m.pow((self.leftEyeUp.X-self.leftLine.X), 2) + m.pow((self.leftEyeUp.Y-self.leftLine.Y), 2))
                    self.rightDist = m.sqrt(m.pow((self.rightEyeUp.X-self.rightLine.X), 2) + m.pow((self.rightEyeUp.Y-self.rightLine.Y), 2)) 

