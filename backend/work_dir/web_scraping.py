# filename: web_scraping.py
import requests
from bs4 import BeautifulSoup

# Define the URL of the website to scrape
url = "https://scholar.google.com/scholar?q=human-learning+workflows+in+education"

# Send a GET request to the URL and retrieve the HTML content
response = requests.get(url)
html_content = response.text

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, "html.parser")

# Find all the paper titles and store them in a list
paper_titles = []
for title in soup.find_all("h3", class_="gs_rt"):
    paper_titles.append(title.text)

# Filter the papers based on relevance to software workflows and Duolingo
filtered_papers = []
keywords = ["software workflows", "Duolingo"]
for title in paper_titles:
    if any(keyword in title for keyword in keywords):
        filtered_papers.append(title)

# Print the filtered papers
for title in filtered_papers:
    print(title)