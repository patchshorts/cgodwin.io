# filename: generate_bar_chart.py

import matplotlib.pyplot as plt

# Define the workflow types and the number of papers in each type
workflow_types = ['Scientific', 'Simulation', 'Data-intensive', 'Machine Learning', 'Multi-cloud', 'Computational', 'Data processing', 'Service Recommendation', 'Anomaly detection']
num_papers = [1, 1, 1, 1, 1, 1, 1, 1, 1]

# Create a bar chart
plt.bar(workflow_types, num_papers)
plt.xlabel('Workflow Type')
plt.ylabel('Number of Papers')
plt.title('Number of Papers by Workflow Type')
plt.xticks(rotation=90)

# Save the chart to a file
plt.savefig('bar_chart.png', bbox_inches='tight')