# filename: arxiv_search.py

import requests
import feedparser

# Define the base url and the query parameters
base_url = 'http://export.arxiv.org/api/query?'
search_query = 'all:learning workflows'
start = 0
max_results = 10

query = 'search_query={}&start={}&max_results={}'.format(search_query, start, max_results)

# Send a GET request to the ArXiv API and parse the response
response = requests.get(base_url + query)
feed = feedparser.parse(response.content)

# Print the title, summary, and link of each paper
for entry in feed.entries:
    print('Title: ', entry.title)
    print('Summary: ', entry.summary)
    print('Link: ', entry.link)
    print('Published: ', entry.published)
    print('--------------------------------------------------')