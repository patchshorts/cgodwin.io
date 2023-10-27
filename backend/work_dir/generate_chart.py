# filename: generate_chart.py

import matplotlib.pyplot as plt

def generate_chart():
    workflow_types = ['Process Design', 'E-learning', 'Emergency Response', 'Machine Learning', 'Human-Machine Dialog', 'UI Design', 'Medical AI', 'Learning Analytics', 'Human-AI Teaming']
    num_papers = [1, 1, 1, 1, 1, 1, 1, 1, 1]

    plt.bar(workflow_types, num_papers)
    plt.xlabel('Workflow Types')
    plt.ylabel('Number of Papers')
    plt.title('Number of Papers by Workflow Type')
    plt.xticks(rotation=90)
    plt.tight_layout()
    plt.savefig('chart.png')

generate_chart()