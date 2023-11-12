---
icon: edit
date: 2023-11-12
category:
  - generative ai
tag:
  - autogen
  - embedchain
  - business
  - gpt-4
  - GPTs
---

# BVR Project Architectual Revisions

[[toc]]

## The Work

Here we've defined the core work below. We've found we cannot implement this with `autogen` RAG chat alone, as our data doesn't contextualize well in its current design. Additionally the latest module doesn't support the latest enpoints.

So we're abandoning `autogen` for most things. Instead we'll use `embedchain` to do the same work and write structing code to take the place of what `autogen` was doing.

```mermaid
flowchart TD
    A[Start: List of Questions in YAML] --> B[Processing Loop]
    B --> C[Generate Relevant Report Questions]
    C --> D[Ask GPT-4 the Answer to Those Questions]
    D --> E[Quality Check the Answer]
    B --> F[GPT Generates Search Queries]
    F --> G[Run Script to Retrieve Data from Search Results]
    G --> H[Store the Answers in Text Files with Standardized Names]
    H --> I[Add Retrieved Data to Embedded Context]
    I --> J[Weave Together the Text Files, and images into a Report]
    J --> K[End: Completed Report]
    B --> L[Ask GPT-4 to write a script to draw a diagram of the data]
    L --> M[Run the Script saving to a standard file name]
    M --> I
    E --> I
```
## The process
And so now this is how it'll work:

```mermaid
sequenceDiagram
    User->>FrontEnd: Request create page
    FrontEnd-->>User: Business idea form
    User->>FrontEnd: Inputs Business Idea
    FrontEnd->>Backend: Submits collected data!
    Backend->>FrontEnd: Summarization of idea
    FrontEnd->>User: Sumarization of idea
    User->>FrontEnd: Approval or more input
    FrontEnd->>Backend: Approval or more input
    Backend->>MessageQueue: Insert job request
    MessageQueue->>Backend: Job insert success/fail
    Backend->>MessageQueue: On fail, retry x 3
    MessageQueue->>CloudFunction: Initiate exectuion
    CloudFunction->>JobCompletionWebHook: Job completion
    Backend->>FrontEnd: Job insert success
    FrontEnd->>User: Wait Message
    JobCompletionWebHook->>Backend: Job Completion and private url
    Backend->>FrontEnd: Report Available
    FrontEnd->>User: Report Download
```

And so now we code.