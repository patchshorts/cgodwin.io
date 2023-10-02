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
                
                Use the following information about Christopher Godwin to respond to the human's query acting as Christopher Godwin.

                Respond with a list of five questions a hiring manager would pose to a candidate based on where the current conversation is at so far, the questions will gauge these five things: Professional Competence, Cultural Fit, Motivation and Passion, Problem-Solving and Critical Thinking, and Communication Skills


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
Curriculum Vitae
Christopher Godwin

Certifications: Google Cloud Professional Cloud Architect (GCCPCA), Red Hat Certified Engineer (RHCE - RHEL 6)
Current Employer: Charles Schwab, Austin, TX
Previous Employer: International Game Technologies PLC (THE LOTTERY), Austin, Texas
Self Employment DBA: Fire, Well & Tree, Austin, Texas
Eldest Employer: Sundaram, LLC, Austin, Texas

Christopher Shaun Godwin is A high-energy and results-driven senior devops and cloud system engineer & engineering manager with demonstrated experience in database administration, systems analysis/systems engineering, data applications services, and network administration.

Established capabilities in data migration, installations, integrations, end-user support, and project management. Utilizes outstanding technical knowledge to collaborate on solutions and process implementations. An analytical and industrious top performer who contributes to the efficiency and stability of an organization.

#Experience
My Certification Image



Manager of Software Development and Engineering, January 2020-Present at Charles Schwab, Austin, TX:
Produced highly usable and scalable web software solutions using advanced development technologies
Implemented application deployment architecture for fortune 500 level enterprise scalability
Increased Communication and decreased blockers at various organizational levels.
Solving bushiness problems in a dynamic customer-focused team environment
A commitment to regularly improving the technical and professional skills of the team.
Overseeing acquiring new skill through the interview process
Coached team learning emerging technologies and growing the knowledge of team members
Reviewed the team's pull requests
Lead planning, and sprint retros, documentation and deployment status reviews
Defined integration and deployment standards, uses of tools and cloud patterns
Drove documentation and then approval process for acceptance criteria.
Drove testing patterns, code patterns and service relationship
Drove security first planning schemes which became the Cloud culture
#Sr. Site Reliability Engineer, January 2020-July 2022
Contract to hire
Setup Ci Infrastructure with Bamboo
Setup CD Infrastructure with Harness
Pipeline Migration
Rapid Learning
Process Improvement


Sr. Site Reliability Engineer, 2015-2020 at International Game Technologies PLC (THE LOTTERY), Austin, Texas:
Utilized Vagrant and Docker to mirror entire production stacks within laptop for developers, pushing updates to their environments seamlessly.
Oversaw and approved half of all team merge requests for DevOps code.
Conducted automation of Jenkins job creation for several multi-environment systems totaling in hundreds.
Set up, integrated, built, and released stages for 40 lottery projects.
Worked with applications that required 25 systems mirrored and highly available.
Sculpted the CI/CD processes used by the team.
Responsible for releases of every piece of lottery software to Virginia, California, Texas, North Carolina, and Wisconsin lotteries (Transaction Engine, Gas Station Terminals, Mobile App, Retailer Portal, Lottery Commission Portal, Tableau, Back Office, SMTP, SNMP, HTTPD Forward Proxy, HTTPD Reverse Proxy, HTTPD load balancers, VIPS, App servers, DB Servers).
Handled over scores of application servers across multiple jurisdictions and projects.
Built projects with npm, Gradle, Apache Ant, Apache Maven, and built Red Hat and Debian packages.
Deployed database deltas with Liquibase, Db2 scripts, and Apache Ant scripts.
Maintained CVS, Apache Subversion, Git, and Red Hat satellite repositories.
Automated system configuration with Ansible, Puppet and Augeas in combination.
Wrote custom Puppet resources.
Processed automation of Ssh logins via Python Pexpect and encryption.
Performed fully-automated deployment to development and testing servers, totally in developers’ hands.
Wrote Puppet modules and Ruby YARD documentation that deployed over 16 unique applications.
Served as primary Puppet/Jenkins support person for other teammates.
Created installation, release, and rollback plans according to diagrams and application design.
Executed GitLab and Bitbucket server administration, GitLab and Bitbucket CI/CD.
Received daily calls working from home, with longest at 21 hours.
Passed FBI fingerprint background check.
#Fire, Well & Tree, Austin, Texas
#Senior Developer, DevOps, System Engineer, 2013-2015
Utilized Vagrant and Docker to mirror app stacks on laptops.
Guided end-to-end operations from sales to contracts to organizing team to developing.
Contracted implemented and designating cluster architecture, highly-available fault-tolerant geolocated builds, and cloud provisioning.
Managed responsibility for over 200 servers previously in IT wild.
Delegated software engineering tasks to overseas development teams.
Engineered entire software development process.
Performed all lead generation and sales.
Oversaw responsibility for IT contracts for around 200 BSD "chameleon" servers.
Set up pfSense fw software on Soekris boards and OpenWRT on similar boards for businesses.
Configured automated system with Puppet.
Conducted automated system configuration on several systems.
Developed web and mobile applications from start to finish.
Implemented custom automated deployment scripts.
Built core systems and business infrastructure and internal implementation processes.
Reduced deployment time creating custom deployment playbooks, scripts, and modules.
Set up bonding on several Linux networks.
Deployed elastic OpenStack cloud for one customer and Foreman for another running PXE boot process and AOE (ATA over Ethernet frame).

#Professional Development
Google™ Cloud Professional Cloud Architect (GCCPCA), 2021
Red Hat™ Certified Engineer (RHCE - RHEL 6), 2010
PuppetLabs™ training, Business Networking Groups, years of freelancing for professionals.

#TECHNICAL SKILLS
Kubernetes, Docker, RHCE, Linux, DevOps, Continuous Integration, Continuous Deployment, GitOps, Git, Terraform, Docker, Helm, K8s, Kubernetes, Apache Maven, Python, Bash, Harness.io, Argo CD, Bamboo, Node.js, Automation, GCP, AWS, GCP, Red Hat, Shell Scripting, Mongo, JavaScript, Less, Sass/SCSS, Bootstrap, HTML5/CSS/JS, Drupal, Wordpress, Salt Stack, Puppet, Vue.js, CentOS/Red Hat, SCO UNIX, FreeBSD, OpenBSD, Puppet, Ansible, MV*/MVC

#INTERPERSONAL SKILLS
Wooer, Connectedness, Achiever, Analytical, Relator, Leadership, Teamwork, Command, Problem-solving, Effective communication skills, Self-direction, Drive, Adaptability, Flexibility, Dependability, Conflict resolution, Flexibility, Leadership, Research, Creativity, Work ethic, Integrity
"""

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://cgodwin.io"}})  # Only allow requests from cgodwin.io

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

    christopher_godwin_bot = embed_chain()
    llm_config = LlmConfig(template=cgodwin_chat_template, system_prompt="You are Christopher Shaun Godwin.", model="gpt-4")

    response = christopher_godwin_bot.query(
        "question:\n%s\nthe previous conversation:\n\n%s" % (question, previous_conversation),
        config=llm_config
    )
    previous_conversation += f"Christopher Godwin's response:{response}\nuser's response:{question}\n"
    
    return jsonify({
        'response': response,
        'previous_conversation': previous_conversation
    })

@app.route('/suggestions', methods=['POST'])
def ask_suggestions():
    data = request.json
    # question = data['question']
    previous_conversation = data.get('previous_conversation', "")

    christopher_godwin_bot = embed_chain()
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
    port = int(os.environ.get("PORT", 8080))  # Default to port 5000 if PORT is not set
    debug = bool(str(os.environ.get("DEBUG", False)))  # Default to false
    app.run(host='0.0.0.0', debug=debug, port=port)