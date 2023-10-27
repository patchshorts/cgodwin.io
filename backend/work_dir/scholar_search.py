# filename: scholar_search.py

import requests
from bs4 import BeautifulSoup

def search_papers(query):
    url = "https://scholar.google.com/scholar?q=" + query.replace(' ', '+')
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    for entry in soup.find_all("div", class_="gs_ri"):
        title = entry.find("h3", class_="gs_rt").text
        author_info = entry.find("div", class_="gs_a").text
        print("Title: ", title)
        print("Author Info: ", author_info)
        print("\n")

search_papers("dialog flow control mechanisms in human-learning workflows")