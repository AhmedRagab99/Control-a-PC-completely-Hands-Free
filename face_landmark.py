import cv2
import numpy
import mediapipe as mp
import time


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
        if self.multiFacesLandmarks:

            for faceLms in self.multiFacesLandmarks:

                self.mpDraw.draw_landmarks(img, faceLms, self.mpFaceMesh.FACE_CONNECTIONS,
                                           landmark_drawing_spec=self.drawSpec)
                face = []
                for id, lm in enumerate(faceLms.landmark):
                    # print(lm)
                    ih, iw, ic = img.shape
                    x, y, z, id = int(lm.x * iw), int(lm.y * ih), int(lm.z * ic), int(id)
                    print(f"X = {x}", f"Y = {y}", f"Z = {z}", f"ID = {id}")
                    # cv2.putText(img, str(id), (x, y), cv2.FONT_HERSHEY_PLAIN,
                    #             0.7,
                    #             (0, 255, 0),
                    #             1)
                    face.append([x, y, z, id])
                    faces.append(face)
        return img, faces


def main():
    capture = cv2.VideoCapture(0)
    pTime = 0
    detector = FaceMeshDetector()
    while True:
        success, img = capture.read()
        img, faces = detector.findMesh(img)
        if len(faces) != 0:
            # print(len(faces))
            print(faces[0])
        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime
        cv2.putText(img, f'FPS: {int(fps)}', (20, 70), cv2.FONT_HERSHEY_PLAIN,
                    3, (0, 255, 0), 3)
        cv2.imshow("Image", img)
        cv2.waitKey(1)


if __name__ == '__main__':
    main()
