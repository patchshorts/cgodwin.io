import autogen

llm_config={
    "request_timeout": 600,
    "seed": 44,  # change the seed for different trials
    "config_list": autogen.config_list_from_json(
        "OAI_CONFIG_LIST",
        filter_dict={"model": ["gpt-4"]},
    ),
    "temperature": 0,
    "model": "gpt-4",
}

# create an AssistantAgent instance named "assistant"
assistant = autogen.AssistantAgent(
    name="assistant",
    llm_config=llm_config,
    is_termination_msg=lambda x: True if "TERMINATE" in x.get("content") else False,
)
# create a UserProxyAgent instance named "user_proxy"
user_proxy = autogen.UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",
    is_termination_msg=lambda x: True if "TERMINATE" in x.get("content") else False,
    max_consecutive_auto_reply=10,
    code_execution_config={
        "work_dir": "work_dir",
        "use_docker": False,
    },
)

task1 = """
Find scholarly papers which discuss multimodal dialogue systems designed to bolster learner success.
"""

user_proxy.initiate_chat(assistant, message=task1)

task2 = "analyze the above the results to list the domains studied by these papers"
user_proxy.initiate_chat(assistant, message=task2, clear_history=False)

task3 = """Use this data to generate a bar chart of domains and number of papers in that domain and save to a file 
"""
user_proxy.initiate_chat(assistant, message=task3, clear_history=False)

task4 = """Read these papers and identify the most effective multimodal dialogue workflow which bolsters learner success and write an essay presenting you conclusions.
"""
user_proxy.initiate_chat(assistant, message=task4, clear_history=False)

task4 = """Take the above essay and design a dialog workflow suited for most people. Design it in UML and write a program to generate the workflow from the UML.

"""
user_proxy.initiate_chat(assistant, message=task4, clear_history=False)

task5 = """Improve this workflow by reconsidering all the steps, add what is missing. Change the UML per the considerations.

"""
user_proxy.initiate_chat(assistant, message=task5, clear_history=False)
