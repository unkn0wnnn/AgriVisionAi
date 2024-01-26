# Agri-Vison-Ai
hackfest delhi hackathon

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
