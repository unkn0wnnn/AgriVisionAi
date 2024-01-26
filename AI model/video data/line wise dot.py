import matplotlib.pyplot as plt
import numpy as np
import pickle

# List of file paths
file_paths = ['f1.pkl', 'f2.pkl', 'f3.pkl', 'f4.pkl']

# Initialize an empty list to store data from all files
all_data = []

# Loop through each file
for file_path in file_paths:
    # Open the file in binary mode
    with open(file_path, 'rb') as file:
        # Load the data from the pickle file
        data = pickle.load(file)
        
        #removing zeros
        refined = []
        
        for i in data:
            if i == 0:
                continue
            elif i > 30:
                refined.append(100-i)
            refined.append(i)
            
        all_data.append(data)





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

plt.savefig('output_plot.png')
# Show the plot
plt.show()
