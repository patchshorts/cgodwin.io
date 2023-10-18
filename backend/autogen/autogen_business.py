#!/usr/bin/env python3 

from autogen import UserProxyAgent
from autogen import AssistantAgent
from autogen import GroupChat
from autogen import GroupChatManager
from autogen import config_list_from_json

config_list_gpt4 = config_list_from_json(
    "OAI_CONFIG_LIST",
    filter_dict={
        # "model": ["gpt-4-32k", "gpt-4-32k-0314", "gpt-4-32k-v0314"],
        "model": ["gpt-4"],
    },
    "model": ["gpt-4"],
)

gpt4_config = {
    "seed": 42,  # change the seed for different trials
    "temperature": 0,
    "config_list": config_list_gpt4,
    "request_timeout": 120,
}

user_proxy = UserProxyAgent(
   name="Admin",
   system_message="A human admin. Interact with the marketing specialist and strategic planner to discuss the data compilation plan. Plan execution needs to be approved by this admin.",
   code_execution_config=False,
)

engineer = AssistantAgent(
    name="Engineer",
    llm_config=gpt4_config,
    system_message='''Engineer. You follow an approved plan. You write python/shell code to solve tasks. Wrap the code in a code block that specifies the script type. The user can't modify your code. So do not suggest incomplete code which requires others to modify. Don't use a code block if it's not intended to be executed by the executor.
Don't include multiple code blocks in one response. Do not ask others to copy and paste the result. Check the execution result returned by the executor.
If the result indicates there is an error, fix the error and output the code again. Suggest the full code instead of partial code or code changes. If the error can't be fixed or if the task is not solved even after the code is executed successfully, analyze the problem, revisit your assumption, collect additional info you need, and think of a different approach to try.
''',
)
executor = UserProxyAgent(
    name="Executor",
    system_message="Executor. Execute the code written by the engineer and report the result.",
    human_input_mode="NEVER",
    code_execution_config={"last_n_messages": 3, "work_dir": "paper"},
)
critic = AssistantAgent(
    name="Critic",
    system_message="Critic. Double check plan, claims, code from other agents and provide feedback. Check whether the plan includes adding verifiable info such as source URL.",
    llm_config=gpt4_config,
)
# Marketing Specialist Agent
marketing_agent = UserProxyAgent(
    name="Marketing_Specialist",
    human_input_mode="TERMINATE",
    system_message="You are a marketing specialist who generates marketing data and ideas and double-checks marketing related information from other agents."
)

# Sales Expert Agent
sales_agent = AssistantAgent(
    name="Sales_Expert",
    llm_config=gpt4_config,
    system_message="You are a sales expert."
)

# Financial Analyst Agent
financial_agent = AssistantAgent(
    name="Financial_Analyst",
    llm_config=gpt4_config,
    system_message="You are a financial analyst."
)

# Operations Manager Agent
operations_agent = AssistantAgent(
    name="Operations_Manager",
    llm_config=gpt4_config,
    system_message="You are an operations manager you doublecheck all the operational costs and data from the other agents."
)

# Human Resources (HR) Consultant Agent
hr_agent = AssistantAgent(
    name="HR_Consultant",
    llm_config=gpt4_config,
    system_message="You are an HR consultant, you consider all the HR related compliance, legal, and policy related information."
)

# Legal Advisor Agent
legal_agent = AssistantAgent(
    name="Legal_Advisor",
    llm_config=gpt4_config,
    system_message="You are a legal advisor, you double check for the violation of compliance and the general rule of law in the data from other agents."
)

# Customer Service Agent
service_agent = AssistantAgent(
    name="Customer_Service",
    llm_config=gpt4_config,
    system_message="You are a customer service representative. You consider all of the customer facing ads, copy, and other media and information from various customers' perspectives."
)

# IT Specialist Agent
it_agent = AssistantAgent(
    name="IT_Specialist",
    llm_config=gpt4_config,
    system_message="You are an IT specialist. You correct all of the Technologically related data and information from other agents."
)

# Data Analyst Agent
data_agent = AssistantAgent(
    name="Data_Analyst",
    llm_config=gpt4_config,
    system_message="You are a data analyst. You run data query code written by the engineer."
)

# Strategic Planner Agent
planner_agent = AssistantAgent(
    name="Strategic_Planner",
    llm_config=gpt4_config,
    system_message="You are a strategic planner."
)
groupchat = GroupChat(agents=[user_proxy, engineer, marketing_agent, sales_agent, financial_agent, operations_agent, hr_agent, legal_agent, service_agent, it_agent, data_agent, planner_agent], messages=[], max_round=50)
manager = GroupChatManager(groupchat=groupchat, llm_config=gpt4_config)

user_proxy.initiate_chat(
    manager,
    message="""
Is the business model viable? Provide 3 to 5 sets of data from adjacent industries that support this opinion.


Business Idea:
Green Sprouts Childcare
Business Overview
Description:
Green Sprouts Childcare is an innovative childcare service focusing on sustainable and eco-friendly practices. We aim to nurture the next generation by embedding values of environmental stewardship, health, and creativity through daily activities and a unique curriculum.

Mission:
To provide a nurturing, safe, and stimulating environment where children can grow, learn, and thrive with a strong foundation in sustainability and environmental awareness.

Vision:
To be a leader in sustainable childcare services, inspiring a generation of environmentally conscious citizens and promoting a lifelong love for learning and nature.

Problem Solving:
Addressing the need for childcare services that go beyond traditional care and education by incorporating sustainability, nature-based learning, and holistic child development.

Target Audience
Demographics:

Parents with children aged 1-6
Environmentally conscious families
Families residing in urban and suburban areas
Pain Points:

Lack of childcare options that focus on sustainability and nature-based learning
Concerns about the impact of early childhood education on a child’s values and future behaviors
Desire for a holistic approach to childcare that includes health, well-being, and environmental education
How the Business Will Address Their Needs:

Sustainable Practices: Implementing eco-friendly practices in all aspects of childcare, such as using sustainable materials, reducing waste, and promoting healthy eating through organic and plant-based options.
Nature-Based Curriculum: A curriculum that emphasizes outdoor learning, interaction with nature, and education on environmental conservation.
Holistic Development: Focusing on the overall well-being of the child, including physical health, emotional intelligence, creativity, and ethical values.
Community and Parental Involvement: Encouraging a strong community of parents and local businesses to participate in the children’s learning journey, fostering a sense of shared responsibility and involvement in sustainable practices.
""",
)