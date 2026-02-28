import cv2
import random
from ultralytics import YOLO
from PIL import Image
from IPython.display import display, clear_output


yolo = YOLO("yolov8s.pt")

def getColours(cls_num):
    """Generate unique colors for each class ID"""
    random.seed(cls_num)
    return tuple(random.randint(0, 255) for _ in range(3))

def main():
    video_path = "./datasets/videos/car-detection.mp4"
    videoCap = cv2.VideoCapture(video_path)
    width  = int(videoCap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(videoCap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps    = int(videoCap.get(cv2.CAP_PROP_FPS))
    print(f"Width: {width}\nHeight: {height}\nFPS: {fps}")

    frame_count = 0


    out = cv2.VideoWriter(
        "./datasets/videos/output.mp4", cv2.VideoWriter_fourcc(*'MPEG'), fps, (width, height)
    )

    while True:
        ret, frame = videoCap.read()
        if not ret:
            break

        results = yolo.track(frame, stream=True)

        for result in results:
            class_names = result.names
            for box in result.boxes:
                if box.conf[0] > 0.4:
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    cls = int(box.cls[0])
                    class_name = class_names[cls]
                    conf = float(box.conf[0])
                    colour = getColours(cls)
                    cv2.rectangle(frame, (x1, y1), (x2, y2), colour, 2)
                    cv2.putText(frame, f"{class_name} {conf:.2f}",
                                (x1, max(y1 - 10, 20)), cv2.FONT_HERSHEY_SIMPLEX,
                                0.6, colour, 2)

        # if frame_count < 20:
        #     clear_output(wait=True)
        #     display(Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)))
        # else:
        #     break
        out.write(frame)

        frame_count += 1

    cv2.destroyAllWindows()
    out.release()
    videoCap.release()

if __name__ == "__main__":
    main()