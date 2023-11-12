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
stateDiagram-v2
    [*] --> Initialization
    Initialization: Start with a list of questions in YAML
    Initialization --> Processing: Begin Processing Loop
    
    Processing --> GeneratingQuestions: Generate Report Questions
    GeneratingQuestions --> QueryingGPT4: Ask GPT-4 for Answers
    QueryingGPT4 --> QualityCheck: Perform Quality Check on Answers
    
    Processing --> GeneratingSearchQueries: GPT Generates Search Queries
    GeneratingSearchQueries --> DataRetrieval: Run Script to Retrieve Data
    DataRetrieval --> StoringData: Store Answers in Text Files
    
    QualityCheck --> DataIntegration: Quality Check Passed
    StoringData --> DataIntegration: Data Ready for Integration
    DataIntegration: Add Retrieved Data to Embedded Context
    DataIntegration --> ReportCompilation: Weave Together Text and Images
    
    Processing --> Scripting: Ask GPT-4 to Write Script for Diagram
    Scripting --> ScriptExecution: Run the Diagram Script
    ScriptExecution --> DataIntegration: Script Output Ready
    
    ReportCompilation --> Finalization: Compile the Final Report
    Finalization --> [*]: End Process
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