# filename: bar_chart.py

import matplotlib.pyplot as plt

# Define the domains and the number of papers in each domain
domains = ['Data Augmentation', 'Language Learning', 'Dialogue System Challenge', 'User Satisfaction', 'Learning Facilitation', 'Crowdsourcing', 'End-to-End Dialogue Systems', 'Proactive Meta-Dialogue', 'Natural Language Generation']
num_papers = [1, 1, 2, 1, 1, 1, 1, 1, 1]

# Create a bar chart
plt.bar(domains, num_papers)
plt.xlabel('Domains')
plt.ylabel('Number of Papers')
plt.title('Number of Papers per Domain')
plt.xticks(rotation=90)

# Save the chart to a file
plt.savefig('bar_chart.png', bbox_inches='tight')