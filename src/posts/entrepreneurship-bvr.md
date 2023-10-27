---
icon: cloud
date: 2023-10-27
category:
  - Generative AI
  - ChatGPT
tag:
  - 'business'
  - 'entrepreneur'
  - 'wantrepreneur'
  - 'startups'
  - '10x'
  - 'Undercover Billionaire'
---
# Designing the BVR Creation Process from Requirements 

- Part I [specification](./fun-with-gen-ai)
- Part II [Requirements](./enhancing-informed-entrepreneurship-through-generative-ai-powered-bvr.md)

[toc]

## Autogen

Microsoft's PyPI autogen module is a Python package that enables the development of next-gen large language model (LLM) applications using multiple agents that can converse with each other to solve tasks. The module is available on PyPI and can be installed using pip.

Here is an example of how you can use the autogen module to initiate a chat between an assistant and a user proxy:
```python
from autogen import AssistantAgent, UserProxyAgent

assistant = AssistantAgent("assistant")
user_proxy = UserProxyAgent("user_proxy")
user_proxy.initiate_chat(assistant, message="Show me the YTD gain of 10 largest technology companies as of today.")
```
This code creates an assistant agent and a user proxy agent, and then initiates a chat between them. The user proxy agent sends a message to the assistant agent, asking for the YTD gain of 10 largest technology companies as of today. The assistant agent processes the message using LLMs and returns the answer to the user proxy agent.

You can find more examples and documentation on the official autogen GitHub page.
## RAProxyAgent

::: info Requirements
We were going to use embed chain to meets the technical requirement **embeddings for relevant automatic contexts** and the Business requirement **Ensure the reports are comprehensive, incorporating various data representation formats.** But RAProxyAgent in Autogen will do this for us.
:::

## The Design

Here’s a simplified workflow using AutoGen in our proposed digital platform:

1. **User Input:**
   - The entrepreneur logs into the platform and inputs their business idea along with any relevant data.

2. **Initiation of GenAI Agents:**
   - The system initiates various GenAI agents, each tailored for different analysis dimensions like market analysis, financial projection, competition analysis, etc.

3. **Multi-Agent Conversation Framework:**
   - The agents communicate and collaborate using AutoGen’s multi-agent conversation framework. For instance:
       - The Market Analysis Agent might need data from the Competition Analysis Agent to complete its analysis.
       - The Financial Projection Agent might need inputs from both Market and Competition Analysis Agents to generate accurate financial forecasts.

4. **Individual Analysis:**
   - Each agent performs its designated analysis and generates a portion of the Business Viability Report (BVR).

5. **Aggregation and Finalization:**
   - AutoGen helps in aggregating the individual analyses into a comprehensive BVR, ensuring that the insights from one agent are correctly integrated with the others.

6. **Report Generation:**
   - The final BVR, containing a multi-faceted evaluation of the business idea, is generated and presented to the entrepreneur in the specified multimodal format (charts, texts, images, etc.).

7. **Chat with Report:**
   - Use of embed_chain to consume the report and chat with it.


This workflow showcases how AutoGen can facilitate a structured, collaborative, and efficient analysis process by conducting the interactions and collaborations among multiple role-based agents. By doing so, it significantly enhances the platform’s ability to provide thorough and actionable business analyses for entrepreneurs.

## Fuzzy Designs

These are the items we can see that we'll need, however we don't fully see how they'll connect to the whole or one another:

### Input collection
- We know we want a multi-stage input collection system. Input a field, click next, be presented with another.
- After field input, value is sent to openai for improvement, user see a choice between the original and improved.
- User will be able to pick one and edit the value before proceeding.
- The final value will go into a context and a summary will be regenerated when that context changes.
 - Summary will be displayed on the side and persist through advancement, it is a re-echoing of the user provided meaning, if the user agrees with it, the user and AI will be in thought-parity.
- Input asked for but not collected will be generated.

### Mutual Dependency
- We envision a variable populator. Some variables will be arrived at through a request to the ai and the supplying of new variables to it as specific context.
  - This function will be called once all the user input is collected or generated and the user agrees with the summary.
  - It will take requests in any order, if a variable it supplies as context is empty, it will try to resolve that request, detecting and avoiding infinite loops and breaking out of them.
  - This way, variables which depend on other variables will be processed in the correct order without tracking state.

### Autogen
- If possible and toward useful purposes, autogen will potentially be able to have some function calls specified or overridden so that autogen can be extensible toward our goals.
- query suffix for granularity "explain your thinking step by step"
  - 

### Templating
- We'll define a template that the report variables will be placed into once they're all generated in.

### Graphs
- I'm pulling a Steve Jobs on LISA Fonts here: The MVP Must have graphs for the top 7 most important bits of data. More later.