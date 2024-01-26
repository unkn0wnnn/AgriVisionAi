# Agri-Vison-Ai
hackfest delhi hackathon

https://github.com/unkn0wnnn/AgriVisionAi/assets/100390992/ab93d1f9-975d-486b-a183-deaa0258da47

https://github.com/unkn0wnnn/AgriVisionAi/assets/100390992/ac14a06e-bb2b-45d6-9216-bbdedd3ea57d

## Introduction
AgriVisionAi is Precision Farming Web Application designed to empower farmers with real-time insights and data-driven decision-making.
The core functionality revolves around computer vision and machine learning to analyze aerial videos captured by farmers in their fields.
For testing purposes I have captured aerial videos of my own farm in my village (mandleshwar , madhya pradesh).

Upon launching the web application, farmers are prompted to input the number of rows in their fields. Subsequently, the application guides them through the process of capturing aerial videos, one for each row. These videos are then seamlessly uploaded to a cloud server for processing and in-depth analysis.

One of the primary features of the Web Application is the utilization of computer vision algorithms to assess plant density within each row. The application uses machine learning models such as SAM (segment anything by Meta) and GroundingDino to analyze the videos, identifying and quantifying the distribution and density of crops across the entire field. This information is then translated into a visual representation, allowing farmers to easily interpret and comprehend the health and vitality of their crops.

The Project have 2 main components -
1) WebApp
2) Ai Vision Model

### WebApp
The Webapp is written in React.js with tailwind.css. Upon accessing the web application, farmers are greeted with a straightforward interface that guides them through the essential steps to capture aerial videos of their fields.
The journey begins with a prompt to input the number of rows in the farmer's fiel. Subsequently, the application effortlessly directs farmers through the process of recording aerial videos—one for each row—from a top-down perspective. Once recorded, these videos are swiftly uploaded to a cloud server.

### Ai Vision Model
The Model uses 2 models working together to produce desired result Grounding Dino and SAM (Segment Anything Model). This dynamic duo is the driving force behind the model's ability to decipher the complex visual language of agricultural landscapes. Following are the step-by-step guide to how the model works-

1. Frame Extraction:
The process commences with the extraction of individual frames from the aerial video captured by the farmer. Each frame encapsulates a snapshot of the field, serving as a canvas for the subsequent analysis.
```python
def process_video(video_path):
    # Open video capture
    cap = cv2.VideoCapture(video_path)

    # Check if the video opened successfully
    if not cap.isOpened():
        print("Error opening video file")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            break
```

2. Grounding Dino Model:
The Grounding Dino model is then used to detect plant/crop with bounding boxes. This model excels at delineating the contours of objects by just giving it a prompt, creating precise bounding boxes that encapsulate the spatial footprint of each individual entity within the frame.
```python
detections = grounding_dino_model.predict_with_classes(
                    image=frame,
                    classes=CLASSES,
                    box_threshold=BOX_TRESHOLD,
                    text_threshold=TEXT_TRESHOLD
                )
```

3. Bounding Box :
The bounding boxes act as virtual markers, defining the boundaries of plants with accuracy. This step is crucial for isolating and identifying individual crops, laying the foundation for a granular understanding of the field's composition and creating a direction for the SAM model.

4. SAM Model Unleashed:
With the bounding boxes in hand, the Segment Anything Model (SAM) steps onto the scene. SAM is a very powerful model from Meta, utilizing its capabilities to generate intricate masks that encapsulate the specific regions of interest within each bounding box. These masks serve as dynamic overlays, capturing the nuanced details of plant distribution.
```python
detections.mask = segment(
                    sam_predictor=sam_predictor,
                    image=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB),
                    xyxy=detections.xyxy
                )
```

6. Density Calculation:
The masks are analyzed to quantify the density of crops within each frame. This quantitative data is then translated into a visual density map, offering farmers a comprehensive and intuitive representation of their field's health and vitality.
```python
objct = 0

for obj in detections.mask:
    for rows in obj:
        objct += np.sum(rows)

density = (objct/(1920*1090))*100
density_list.append(density)
print(f"frame:{n} ,density:{density}")
```

### Data Visualization with Matplotlib
At the heart of the visualization lies the density map—an eloquent depiction of crop distribution across each row. Matplotlib's prowess is harnessed to translate numerical density data into color gradients, creating a visual tapestry where shades represent the concentration of crops. Darker hues signify higher density, while lighter tones indicate areas that demand attention. All the data from video is extracted and saved to python pkl files which are later used for visualisation.
```python
# Create a color map based on the magnitude of numbers
color_map = plt.cm.get_cmap('viridis')

# Plot the data using a scatter plot with color mapping
for i, row in enumerate(all_data):
    normalized_data = (np.array(row) - np.nanmin(row)) / (np.nanmax(row) - np.nanmin(row))
    plt.scatter(range(len(row)), [i] * len(row), c=normalized_data, cmap=color_map, s=150)

plt.yticks(range(len(all_data)), [f'Row {i+1}' for i in range(len(all_data))])

# Add a color bar for reference
cbar = plt.colorbar()
cbar.set_label('Magnitude')

# Show the plot
plt.show()
```
![output_plot](https://github.com/unkn0wnnn/AgriVisionAi/assets/100390992/c611636b-b428-49f3-a138-4b9e3baf7d8b)
