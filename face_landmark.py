from configration import FaceMeshConfigure, Point
import websocket
import threading
import cv2
import mediapipe as mp
import time
import math as m
# import imutils
import numpy as np

# 12 and 14 mouse
# 409 and 185 for smile
# 386 and 374 for left eye
# 195 and 145 for right eye
# 4 for nose 
# 168 for head
class FaceMeshDetector():
    def __init__(self, staticMode=False,
                 maxFaces=4,
                 minDetectionConfidence=0.5,
                 minTrackingConfidence=0.5,
                 thickness=1,
                 circleRadius=1
                 ):
        self.socket  = SocketConnection()
        
        self.frames = 0
        self.lastOpen = -1
        self.lastSmile = -1
        self.lastLine = -1

        self.configure = FaceMeshConfigure()
        self.newPos = Point(-1, -1)
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
    def UpdateMousePos(self, cx, cy):
        self.newPos.X = (cx - self.configure.mini.X) / (self.configure.maxi.X - self.configure.mini.X) * self.configure.screenWidth
        self.newPos.Y = (cy - self.configure.mini.Y) / (self.configure.maxi.Y - self.configure.mini.Y) * self.configure.screenHight
        self.socket.ws.send(str(self.newPos.X)+" "+str(self.newPos.Y))

    def CheckRightEyeClose(self, cyRightUp, cyRightDown):
        return abs(self.configure.rightEyeDown.Y - self.configure.rightEyeUp.Y)  - abs(cyRightDown - cyRightUp)

    def CheckLeftEyeClose(self, cyLeftUp, cyLeftDown):
        return abs(self.configure.leftEyeDown.Y - self.configure.leftEyeUp.Y) - abs(cyLeftDown - cyLeftUp)
    
    def CheckSmile(self, cxMouthLeft, cxMouthRight):
        return abs(cxMouthLeft - cxMouthRight) - abs(self.configure.mouseLeft.X - self.configure.mouseRight.X) > 20

    def CheckOpenMouth(self, cyMouthUp, cyMouthRDown):
        return abs(cyMouthUp - cyMouthRDown) - abs(self.configure.mouseDown.Y - self.configure.mouseUp.Y) > 20

    def CheckLineMove(self, cx, cy, Dist):
       return m.sqrt(m.pow((cx-self.configure.nose.X), 2) + m.pow((cy-self.configure.nose.Y), 2)) >(Dist + 20)


    def findMesh(self, img, draw=True):
        self.imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.frames += 1
        self.results = self.faceMesh.process(self.imgRGB)

        self.multiFacesLandmarks = self.results.multi_face_landmarks
        faces = []
        faceLandmark = []
        faceBox = []
        distance = 0
 
        if self.multiFacesLandmarks:
            mouseUp = Point(-1, -1)
            mouseDown = Point(-1, -1)
            rightEyeUp = Point(-1, -1)
            rightEyeDown = Point(-1, -1)

            leftEyeUp = Point(-1, -1)
            leftEyeDown = Point(-1, -1)

            mouseLeft = Point(-1, -1)
            mouseRight = Point(-1, -1)

            leftLine = Point(-1,-1)
            rightLine =Point(-1,-1)
            

            for faceLms in self.multiFacesLandmarks:

                self.mpDraw.draw_landmarks(img, faceLms, self.mpFaceMesh.FACE_CONNECTIONS,
                                           landmark_drawing_spec=self.drawSpec)

                h, w, c = img.shape
                cx_min = w
                cy_min = h

                cx_max = cy_max = 0
                for id, lm in enumerate(faceLms.landmark):
                    # print(lm)
                    cx, cy, z, id = int(
                        lm.x * w), int(lm.y * h), int(lm.z * c), int(id)
                    if cx < cx_min:
                        cx_min = cx
                    if cy < cy_min:
                        cy_min = cy
                    if cx > cx_max:
                        cx_max = cx
                    if cy > cy_max:
                        cy_max = cy
                    # print(lm)
                    # print(f"X = {cx}", f"Y = {cy}", f"Z = {z}", f"ID = {id}")
                    # cv2.putText(img, str(id), (cx, cy),
                    #             cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 0), 1)

                    if id == 4:
                        self.UpdateMousePos(cx=cx,cy=cy)

                    if id == 282:
                        leftLine = Point(cx, cy)
                        
                    if id == 52:
                        rightLine = Point(cx, cy)

                    if id == 12:
                        mouseUp = Point(cx, cy)
                    if id == 14:
                        mouseDown = Point(cx, cy)

                    if id == 409:
                        mouseLeft = Point(cx, cy)
                    if id == 185:
                        mouseRight = Point(cx, cy)

                    if id == 386:
                        leftEyeUp = Point(cx, cy)
                    if id == 374:
                        leftEyeDown = Point(cx, cy)
                    
                    if id == 159:
                        rightEyeUp = Point(cx, cy)
                    if id == 145:
                        rightEyeDown = Point(cx, cy)

                    
                        # print(newX, newY)
                        # print(self.newX)
                    

                    faceLandmark.append([cx, cy, z, id])
                    test1 = np.array([cx_min, cy_min])
                    test2 = np.array([cx_max, cy_max])

                    # distance = np.linalg.norm(test2 - test1)
                    # print(distance)
                    # print("the diffrence is =",cx_max-cx_min)
                leftEye = self.CheckLeftEyeClose(leftEyeDown.Y, leftEyeUp.Y)
                rightEye = self.CheckRightEyeClose(rightEyeDown.Y, rightEyeUp.Y)
                # print("LeftEye "+str(leftEye),"%%%%%"+ "RightEye "+str(rightEye))
                # if  rightEye > 5.5 or leftEye > 5.5:
                #     self.socket.ws.send(str(1))

                if self.CheckOpenMouth(mouseDown.Y, mouseUp.Y) and self.frames - self.lastOpen > 6: 
                    self.socket.ws.send(str(1))
                    self.lastOpen = self.frames

                if self.CheckSmile(mouseLeft.X, mouseRight.X) and self.frames - self.lastSmile > 6:
                    self.socket.ws.send(str(2))
                    self.lastSmile = self.frames
                
                if self.CheckLineMove(leftLine.X, leftLine.Y, self.configure.leftDist) or self.CheckLineMove(rightLine.X, rightLine.Y, self.configure.rightDist):
                    if self.frames - self.lastLine > 6: 
                        self.socket.ws.send(str(3))
                        self.lastLine = self.frames
                
                # cv2.rectangle(img, (cx_min, cy_min),
                #               (cx_max, cy_max), (255, 0, 0), 2)
                # print("cx_Min = ",cx_min,"cx_Max = ",cx_max,"cy_Min = ",cy_min,"cy_Max = ",cy_max)
                faceBox.append([cx_min, cx_max, cy_min, cy_max])
                # print(faceBox)

        return img, faceLandmark, faceBox


k_params = dict(winSize=(15, 15),
                maxLevel=4,
                criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 0.03))

class SocketConnection:
    def __init__(self):
        self.ws = self.initalizeSocket()     
    
    def initalizeSocket(self):
        websocket.enableTrace(True)
        
        ws = websocket.WebSocketApp("ws://localhost:8080",
                                on_open=self.onOpen,
                                on_message=self.onMessage,
                                on_error=self.onError,
                                on_close=self.onClose)
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
        print(ws)
        print("### Web Socket Disconnected! ###")
        
def main():
    
    capture = cv2.VideoCapture(0)
    title = ""
    pTime = 0
    detector = FaceMeshDetector()
    # detector = FaceMeshDetector()
    # configure =FaceMeshConfigure()
    # configure.calcBoundries()
    # cv2.namedWindow(title)
    
        
    
    while True:
        
        _, img = capture.read()
        
        

        # faceLandmark contains the x , y , z and id for face landmark and  this used for know the face landmark movement
        # faceBox has the minX , maxX , minY , maxY for the face itself and  this used for know the face movement
        # img, faceLandmark, faceBox = detector.findMesh(img)
        scale_percent = 50 # percent of original size
        width = int(img.shape[1] * scale_percent / 100)
        height = int(img.shape[0] * scale_percent / 100)
        dim = (width, height)
        img = cv2.resize(img,dim,interpolation = cv2.INTER_AREA)
        cv2.moveWindow('Image', 300, 0)
        
        
        # img = cv2.rectangle(img,start_point, end_point, color, thickness)
  
        detector.configure.calcBoundries(img)
        

        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime
        cv2.putText(img, f'FPS: {int(fps)}', (20, 70), cv2.FONT_HERSHEY_PLAIN,
                    3, (255,0 , 0), 3)
        cv2.imshow("Image", img)
        # s.stop()
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    capture.release()
    cv2.destroyAllWindows()
    capture = cv2.VideoCapture(0)
    print("left one ",detector.configure.leftDist)
    print("right one ",detector.configure.rightDist)
    while True:
        
        _, img = capture.read()
        scale_percent = 50 # percent of original size
        width = int(img.shape[1] * scale_percent / 100)
        height = int(img.shape[0] * scale_percent / 100)
        dim = (width, height)
        img = cv2.resize(img,dim,interpolation = cv2.INTER_AREA)
        cv2.moveWindow('Image', 300, 0)

        # faceLandmark contains the x , y , z and id for face landmark and  this used for know the face landmark movement
        # faceBox has the minX , maxX , minY , maxY for the face itself and  this used for know the face movement
        img, faceLandmark, faceBox = detector.findMesh(img)
        

        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime
        cv2.putText(img, f'FPS: {int(fps)}', (20, 70), cv2.FONT_HERSHEY_PLAIN,
                    3, (0, 255, 0), 3)
        cv2.imshow("Image", img)
        # s.stop()
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    capture.release()
    cv2.destroyAllWindows()
    # print("max X is = ",detector.maxi_X,"\nmin X is = ",detector.mini_X,"\nmax Y is = ",detector.maxi_Y,"\nmin Y is = ",detector.mini_Y)

if __name__ == '__main__':
    main()