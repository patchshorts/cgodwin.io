# filename: scholarly_search.py

from scholarly import scholarly

# Define the query
query = "multimodal dialogue systems designed to bolster learner success"

# Search Google Scholar
search_query = scholarly.search_pubs(query)

# Print the titles and abstracts of the first 10 papers
for i, paper in enumerate(search_query):
    if i == 10:
        break
    print(f"Title: {paper['bib']['title']}")
    print(f"Abstract: {paper['bib']['abstract']}\n")