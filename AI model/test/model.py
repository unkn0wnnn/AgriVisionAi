import torch
import cv2
import os
import supervision as sv
from GroundingDINO.groundingdino.util.inference import Model
from segment_anything import sam_model_registry, SamPredictor

HOME = os.getcwd()

GROUNDING_DINO_CONFIG_PATH = os.path.join(HOME, "GroundingDINO/groundingdino/config/GroundingDINO_SwinT_OGC.py")
GROUNDING_DINO_CHECKPOINT_PATH = os.path.join(HOME, "weights", "groundingdino_swint_ogc.pth")

DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

grounding_dino_model = Model(model_config_path=GROUNDING_DINO_CONFIG_PATH, model_checkpoint_path=GROUNDING_DINO_CHECKPOINT_PATH)

SAM_ENCODER_VERSION = "vit_h"

sam = sam_model_registry[SAM_ENCODER_VERSION](checkpoint=SAM_CHECKPOINT_PATH).to(device=DEVICE)
sam_predictor = SamPredictor(sam)

SOURCE_IMAGE_PATH = "farm.png"
CLASSES = ['all plants']
BOX_TRESHOLD = 0.35
TEXT_TRESHOLD = 0.25

# load image
image = cv2.imread(SOURCE_IMAGE_PATH)

# detect objects
detections = grounding_dino_model.predict_with_classes(
    image=image,
    classes=CLASSES,
    box_threshold=BOX_TRESHOLD,
    text_threshold=TEXT_TRESHOLD
)

# annotate image with detections
box_annotator = sv.BoxAnnotator()

labels = [
    f"{CLASSES[class_id]} {confidence:0.2f}" 
    for _, _, confidence, class_id, _ 
    in detections]

annotated_frame = box_annotator.annotate(scene=image.copy(), detections=detections, labels=labels)
sv.plot_image(annotated_frame, (16, 16))
print("done")


