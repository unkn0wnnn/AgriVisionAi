import matplotlib.pyplot as plt
import numpy as np
import pickle

# Assuming 'your_file.pkl' is the name of your pickle file
file_path = 'f1.pkl'

# Open the file in binary mode
with open(file_path, 'rb') as file:
    # Load the data from the pickle file
    data = pickle.load(file)

# Now 'data' contains the content of your pickle file

refined_data = []

for i in data:
    if i > 30:
        continue
    else:
        refined_data.append(i)


# Create a color map based on the magnitude of numbers
color_map = plt.cm.get_cmap('viridis')

# Normalize the data to the range [0, 1] for mapping to colors
normalized_data = (refined_data - np.min(refined_data)) / (np.max(refined_data) - np.min(refined_data))

# Plot the data using a scatter plot with color mapping
plt.scatter(range(len(refined_data)), [1] * len(refined_data), c=normalized_data, cmap=color_map, s=150)

# Add a color bar for reference
cbar = plt.colorbar()
cbar.set_label('Magnitude')

# Show the plot
plt.show()
