#!/usr/bin/env python
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from embedchain import App
from embedchain.config import LlmConfig
from string import Template
import json

cgodwin_chat_template = Template(
            """
                You are Christopher Shaun Godwin, and this is a job interview, a Texas-born Manager of Software Development and Engineering at Charles Schwab, Austin, TX.
                You are a senior IT and systems manager with experience in database administration, systems analysis/systems engineering, data applications services, and network administration.
                You are a high-energy and results-driven senior IT and systems manager with capabilities in data migration, installations, integrations, end-user support, and project management.
                You contribute to the efficiency and stability of an organization.

                You crack a lot of appropriate tech jokes and puns and that is part of your company culture. You are highly empathetic and you employ Satya Nadella's "empathy trumps technology" philosophy.
                
                Use the following information about Christopher Godwin to respond to the human's query acting as Christopher Godwin.
                Context: $context

                Keep the response brief. If you don't know the answer, just say that you don't know, don't try to make up an answer.

                Human: $query
                Christopher Shaun Godwin:
            """
    )

questions_chat_template = Template(
            """
                You are an interviewing and hiring manager for a large high trust institution that is a Fortune 500 Enterprise sized global company, interviewing Christopher Godwin a Texas-born Manager of Software Development and Engineering at Charles Schwab, Austin, TX.
                You are a Director of a Devops and Automation Department hiring for the position of Lead or Manager.
                
                Use the following conversation with Christopher Godwin to anticipate the next 5 questions the interviewer will have.

                Respond with a list of five questions a hiring manager would pose to a candidate based on where the current conversation is at so far, and the candidate's resume.


                Use this format for the response:

                {
                    "questions": [
                        {
                        "question": "<question1>"
                        },
                        {
                        "question": "<question2>"
                        },
                        {
                        "question": "<question3>"
                        },
                        {
                        "question": "<question4>"
                        },
                        {
                        "question": "<question5>"
                        }
                    ]
                }

                Context: $context
                Query: $query
            """
    )

resume_text = """
Christopher Shaun Godwin
# Summary
A high-energy and results-driven senior DevSecOps Manager/Architect with demonstrated experience in database administration, systems analysis/systems engineering, data applications services, and network administration.

Established capabilities in data migration, installations, integrations, end-user support, and project management. Utilizes outstanding technical knowledge to collaborate on solutions and process implementations. An analytical and industrious top performer who contributes to the efficiency and stability of an organization.

#Experience
My Certification Image

# Certifications
Google Certified Cloud Professional Cloud Architect(GCCPCA) - https://www.credential.net/077683a1-2cd5-41bc-be5c-e33499ac7b13
Red Hat Certified Engineer (RHCE)
# Charles Schwab, Austin, TX
# Manager of Software Development and Engineering, January 2020-Present
Driving End-to-End Architecture: Steered the comprehensive architecture of customer login applications on the GCP platform. Coordinated various stages of development, ensuring cohesive and enterprise-scalable solutions that meet organizational objectives.

Crafting Architectural Principles: Collaboratively developed and refined architectural principles, frameworks, and standards, ensuring robust and maintainable enterprise solutions, fostering strategic technological initiatives and alignment across teams.

Strategic Technology Leadership: Actively engaged in driving strategic technology initiatives, liaising with product managers, architects, engineers, and broader organizational teams, ensuring aligned and synergized efforts towards organizational goals.

Promoting Communication and Teamwork: Advocated and implemented enhanced communication strategies, fostering improved teamwork, alignment, and collaboration across various organizational levels, both internally and externally.

Enhancing Product and Operational Excellence: Contributed valuable feedback and insights on security, development, and strategic directions. Influenced long-range product requirements, methodologies, and operational guidelines, prioritizing continuous improvement and reliability.

Innovation and Knowledge Sharing: Engaged in innovative engineering research, creating case studies and prototypes, particularly on Google Cloud Platform, while promoting a culture of knowledge sharing through code authorship and maintenance.

Mentoring and Career Advancement: Took a proactive role in mentoring engineers, providing guidance in technical skills enhancement and career development, ensuring continuous individual and team growth and improvement.

Operational Responsibility: Participated actively in on-call rotations, tackling complex, real-time challenges to maintain operational integrity and service availability, ensuring sustained organizational performance.

Software Development Leadership: Produced refined web software solutions, emphasizing usability and scalability through advanced development technologies, enhancing enterprise scalability and business problem-solving capabilities.

Fostering Skill Development and Improvement: Led initiatives focusing on continuous improvement, skill acquisition, and knowledge enhancement, ensuring teams stay updated with emerging technologies and industry best practices.

Enhancing Security and Standards: Advocated for a security-first approach in planning, setting robust standards, and defining clear acceptance criteria, ensuring a strong foundation for organizational projects and initiatives.

Facilitating Onboarding: Managed and streamlined the onboarding process for new engineers, ensuring a smooth transition and effective integration into organizational processes and projects.

# Professional Development
Actively participated in PuppetLabs™ training to enhance technical proficiency and stay updated with industry best practices.
Engaged in business networking groups, fostering professional relationships and staying abreast of industry trends and insights.
Consistently freelanced for professionals, honing practical skills, and gaining diverse industry experience.
Committed to continuous learning, staying updated with the latest in technology, tools, and best practices in the IT industry.
Participated in various workshops and conferences, enhancing knowledge and sharing professional expertise.
# Interpersonal Skills
Proven leadership skills, effectively managing and mentoring teams towards achieving organizational objectives.
Exceptional problem-solving abilities, adept at navigating challenges and driving projects to completion.
Excellent communicator, facilitating clear and open discussions, ensuring alignment and understanding within teams.
Strong adaptability, thriving in dynamic environments, and effectively managing change.
Demonstrated conflict resolution skills, ensuring harmonious team environments and fostering collaboration and innovation.
Displays strong work ethic and integrity, committed to delivering quality and upholding organizational values.
# Technical Skills
Gen AI Implementation, Embeddings, Kubernetes, Docker, RHCE, Linux, DevOps, Continuous Integration, Continuous Deployment, GitOps, Git, Terraform, Docker, Helm, K8s, Kubernetes, Apache Maven, Python, Bash, Harness.io, Argo CD, Bamboo, Node.js, Automation, GCP, AWS, GCP, Red Hat, Shell Scripting, Mongo, JavaScript, Less, Sass/SCSS, Bootstrap, HTML5/CSS/JS, Drupal, Wordpress, Salt Stack, Puppet, Vue.js, CentOS/Red Hat, SCO UNIX, FreeBSD, OpenBSD, Puppet, Ansible, MV*/MVC
"""

app = Flask(__name__)
host = os.environ["HOST"]
print(f"Cors Host:{host}")
CORS(app, resources={r"/*": {"origins": f"{host}"}})  # Only allow requests from cgodwin.io

def embed_chain():
    import os

    # christopher_godwin_bot = App()
    christopher_godwin_bot = App()

    # Embed Online Resources
    # christopher_godwin_bot.add("https://www.linkedin.com/in/chrissgodwin/")
    christopher_godwin_bot.add(("Who is Christopher Shaun Godwin?", "Christopher Shaun Godwin is a senior IT and systems manager with experience in database administration, systems analysis/systems engineering, data applications services, and network administration."))
    christopher_godwin_bot.add(("What is Christopher's summary?", "Christopher is a high-energy and results-driven senior IT and systems manager with capabilities in data migration, installations, integrations, end-user support, and project management. He contributes to the efficiency and stability of an organization."))
    christopher_godwin_bot.add(("What certifications does Christopher have?", "Christopher is a Google Certified Cloud Professional Cloud Architect (GCCPCA) and a Red Hat Certified Engineer (RHCE)."))
    christopher_godwin_bot.add(("Where did Christopher work as a Manager of Software Development and Engineering?", "Christopher worked as a Manager of Software Development and Engineering at Charles Schwab, Austin, TX from January 2020 to the present."))
    christopher_godwin_bot.add(("What was Christopher's role at International Game Technologies PLC?", "Christopher was a Sr. Site Reliability Engineer at International Game Technologies PLC (THE LOTTERY) in Austin, Texas from 2015-2020."))
    christopher_godwin_bot.add(("What was Christopher's position at Fire, Well & Tree?", "Christopher was a Senior Developer, DevOps, and System Engineer at Fire, Well & Tree in Austin, Texas from 2013-2015."))
    christopher_godwin_bot.add(("Where was Christopher a Development Guru?", "Christopher was a Development Guru at Sundaram, LLC in Austin, Texas from 2011-2013."))
    christopher_godwin_bot.add(("What are Christopher's technical skills?", "Christopher's technical skills include Kubernetes, Docker, RHCE, Linux, DevOps, Continuous Integration, Continuous Deployment, GitOps, Git, Terraform, Docker, Helm, K8s, Kubernetes, Apache Maven, Python, Bash, Harness.io, Argo CD, Bamboo, Node.js, Automation, GCP, AWS, GCP, Red Hat, Shell Scripting, Mongo, JavaScript, Less, Sass/SCSS, Bootstrap, HTML5/CSS/JS, Drupal, Wordpress, Salt Stack, Puppet, Vue.js, CentOS/Red Hat, SCO UNIX, FreeBSD, OpenBSD, Puppet, Ansible, MV*/MVC."))
    christopher_godwin_bot.add(("What are Christopher's interpersonal skills?", "Christopher's interpersonal skills include Wooer, Connectedness, Achiever, Analytical, Relator, Leadership, Teamwork, Command, Problem-solving, Effective communication skills, Self-direction, Drive, Adaptability, Flexibility, Dependability, Conflict resolution, Flexibility, Leadership, Research, Creativity, Work ethic, and Integrity."))

    christopher_godwin_bot.add("https://cgodwin.io/posts/examining-technical-processes.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/analyzing-technical-processes-for-gcp.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/architecting-reliability-in-gcp.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/architecting-security-compliance-solutions-in-gcp.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/architecting-network-solutions-in-gcp.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/architecting-storage-solutions.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/architecting-compute-engine-gcp-solutions.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/list-of-site-reliability-engineering-practices.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/designing-solutions-meeting-techical-requirements.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/designing-planning-for-business-requirements.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/list-all-google-cloud-platform-gcp-managed-services.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/designing-planning-cloud-architecture.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/securing-vms-shielded-virtual-machines-confidential-encryption-in-use.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/comparison-of-flexible-and-standard-app-engine-environments.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/comparison-of-google-cloud-database-options.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/contrast-preemptible-spot-vms-virtual-machines.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/differences-in-google-cloud-platform-gcp-network-tiers.html")
    christopher_godwin_bot.add("https://cgodwin.io/posts/complete-list-google-cloud-professional-cloud-architect-certification-skills.html#systems-integration")

    christopher_godwin_bot.add("https://cgodwin.io/resume.html")

    return christopher_godwin_bot

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    question = data['question']
    previous_conversation = data.get('previous_conversation', "")

    # christopher_godwin_bot = embed_chain()
    llm_config = LlmConfig(template=cgodwin_chat_template, system_prompt="You are Christopher Shaun Godwin.", model="gpt-4-1106-preview")

    response = christopher_godwin_bot.query(
        "question:\n%s\nthe previous conversation:\n\n%s" % (question, previous_conversation),
        config=llm_config
    )
    previous_conversation += f"Christopher Godwin's response:{response}\nuser's response:{question}\n"
    
    return jsonify({
        'response': response,
        'previous_conversation': previous_conversation
    })

@app.route('/healthcheck', methods=['GET'])
def health_check():
    return jsonify({'message': 'Hi, I am Christopher Shaun Godwin, and I am ready to answer interview questions!'})


@app.route('/suggestions', methods=['POST'])
def ask_suggestions():
    data = request.json
    # question = data['question']
    previous_conversation = data.get('previous_conversation', "")

    # christopher_godwin_bot = embed_chain()
    llm_config = LlmConfig(template=questions_chat_template, system_prompt="You are list generating computer program which outputs only json.")

    response = christopher_godwin_bot.query(
        "resume: %s\n\nprevious_conversation: %s" % (resume_text, previous_conversation),
        config=llm_config
    )    
    try:
        return jsonify(json.loads(response))
    except json.decoder.JSONDecodeError:
        print(response)
        return jsonify("{}")

if __name__ == "__main__":
    christopher_godwin_bot = embed_chain()
    port = int(os.environ.get("PORT", 8080))  # Default to port 5000 if PORT is not set
    debug = bool(str(os.environ.get("DEBUG", False)))  # Default to false
    app.run(host='0.0.0.0', debug=debug, port=port)
