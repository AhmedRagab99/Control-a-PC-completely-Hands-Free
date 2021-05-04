import cv2
import mediapipe as mp 
# For webcam input:
mp_drawing = mp.solutions.drawing_utils
mp_face_mesh = mp.solutions.face_mesh

# For static images:

drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)
cap = cv2.VideoCapture(0)
with mp_face_mesh.FaceMesh(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as face_mesh:
  while cap.isOpened():
    success, image = cap.read()
    if not success:
      print("Ignoring empty camera frame.")
      # If loading a video, use 'break' instead of 'continue'.
      continue

    # Flip the image horizontally for a later selfie-view display, and convert
    # the BGR image to RGB.
    image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
    # To improve performance, optionally mark the image as not writeable to
    # pass by reference.
    image.flags.writeable = False
    results = face_mesh.process(image)

    # Draw the face mesh annotations on the image.
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    if results.multi_face_landmarks:
      for face_landmarks in results.multi_face_landmarks:
        mp_drawing.draw_landmarks(
            image=image,
            landmark_list=face_landmarks,
            connections=mp_face_mesh.FACE_CONNECTIONS,
            landmark_drawing_spec=drawing_spec,
            connection_drawing_spec=drawing_spec)
        h, w, c = image.shape
        cx_min=  w
        cy_min = h
        cx_max= cy_max= 0
        for id, lm in enumerate(face_landmarks.landmark):
            cx, cy = int(lm.x * w), int(lm.y * h)
            if cx<cx_min:
                cx_min=cx
            if cy<cy_min:
                cy_min=cy
            if cx>cx_max:
                cx_max=cx
            if cy>cy_max:
                cy_max=cy
        cv2.rectangle(image, (cx_min, cy_min), (cx_max, cy_max), (255, 255, 0), 2)
        print("cx_Min = ",cx_min,"cx_Max = ",cx_max)
    cv2.imshow('MediaPipe FaceMesh', image)
    if cv2.waitKey(5) & 0xFF == 27:
      break
cap.release()

# img = cap.read()
# imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
# results = face_mesh.process(imgRGB)

# if results.multi_face_landmarks:
#     for faceLms in results.multi_face_landmarks:
#         mpDraw.draw_landmarks(img, faceLms, mp_face_mesh.FACE_CONNECTIONS)

       