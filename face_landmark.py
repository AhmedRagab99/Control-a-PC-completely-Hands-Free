import cv2
import mediapipe as mp
import time



class FaceMeshDetector():
    def __init__(self, staticMode=False,
                 maxFaces=2,
                 minDetectionConfidence=0.5,
                 minTrackingConfidence=0.5,
                 thickness=1,
                 circleRadius=1
                 ):
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
        self.drawSpec = self.mpDraw.DrawingSpec(thickness=self.thickness, circle_radius=self.circleRadius)

    def findMesh(self, img, draw=True):
        self.imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        self.results = self.faceMesh.process(self.imgRGB)

        self.multiFacesLandmarks = self.results.multi_face_landmarks
        faces = []
        faceLandmark = []
        faceBox = []
        if self.multiFacesLandmarks:

            for faceLms in self.multiFacesLandmarks:

                self.mpDraw.draw_landmarks(img, faceLms, self.mpFaceMesh.FACE_CONNECTIONS,
                                           landmark_drawing_spec=self.drawSpec)
            
                h, w, c = img.shape
                cx_min=  w
                cy_min = h
                cx_max= cy_max= 0
                for id, lm in enumerate(faceLms.landmark):
                    # print(lm)
                    cx, cy, z, id = int(lm.x * w), int(lm.y * h), int(lm.z * c), int(id)
                    if cx<cx_min:
                        cx_min=cx
                    if cy<cy_min:
                        cy_min=cy
                    if cx>cx_max:
                        cx_max=cx
                    if cy>cy_max:
                        cy_max=cy
                    # print(lm)
                    # print(f"X = {cx}", f"Y = {cy}", f"Z = {z}", f"ID = {id}")
                    # cv2.putText(img, str(id), (x, y), cv2.FONT_HERSHEY_PLAIN,
                    #             0.7,
                    #             (0, 255, 0),
                    #             1)
                    faceLandmark.append([cx, cy, z, id])
                cv2.rectangle(img, (cx_min, cy_min), (cx_max, cy_max), (255, 255, 0), 2)
                print("cx_Min = ",cx_min,"cx_Max = ",cx_max,"cy_Min = ",cy_min,"cy_Max = ",cy_max)
                faceBox.append([cx_min,cx_max,cy_min,cy_max])


        return img, faceLandmark,faceBox

k_params = dict(winSize=(15, 15),
                 maxLevel=4,
                 criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 0.03))

def main():
    capture = cv2.VideoCapture(0)

    pTime = 0
    detector = FaceMeshDetector()
    while True:
        _, img = capture.read()

        #faceLandmark contains the x , y , z and id for face landmark and  this used for know the face landmark movement
        # faceBox has the minX , maxX , minY , maxY for the face itself and  this used for know the face movement
        img, faceLandmark,faceBox = detector.findMesh(img)

        
        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime
        cv2.putText(img, f'FPS: {int(fps)}', (20, 70), cv2.FONT_HERSHEY_PLAIN,
                    3, (0, 255, 0), 3)
        cv2.imshow("Image", img)
        if cv2.waitKey(1) & 0xFF == ord('q'):

            break
    capture.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    main()
#
# mpDraw = mp.solutions.drawing_utils
# mpFaceMesh = mp.solutions.face_mesh
# faceMesh = mpFaceMesh.FaceMesh(max_num_faces=2)
# drawSpec = mpDraw.DrawingSpec(thickness=1, circle_radius=2)
#
#     imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#
#
#     results = faceMesh.process(imgRGB)
#     if results.multi_face_landmarks:
#         for faceLms in results.multi_face_landmarks:
#             mpDraw.draw_landmarks(img, faceLms,mpFaceMesh.FACE_CONNECTIONS,
#                                   landmark_drawing_spec=drawSpec)
#
#             for id, lm in enumerate(faceLms.landmark):
#                 # print(lm)
#                 ih,iw,ic = img.shape
#                 x,y,z,id = int(lm.x*iw),int(lm.y*ih),int(lm.z*ic),int(id)
#                 print(f"X = {x}", f"Y = {y}", f"Z = {z}", f"ID = {id}")
#