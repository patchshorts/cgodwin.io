#!/usr/bin/env python
import os
from flask import Flask, request, jsonify
from embedchain import App
from embedchain.config import LlmConfig

app = Flask(__name__)

def embed_chain():
    import os

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

    christopher_godwin_bot.add("https://cgodwin.io/resume.html")
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


    return christopher_godwin_bot

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    question = data['question']
    previous_conversation = data.get('previous_conversation', "")

    christopher_godwin_bot = embed_chain()
    response = christopher_godwin_bot.query(
        "Responding as if you are Christopher Shaun Godwin, but without referring to yourself, answer this question: %s in the context of this previous conversation: %s" % (question, previous_conversation),
        config=LlmConfig(model="gpt-4")
    )
    previous_conversation += f"Christopher Godwin's answer:{response}\nuser's question:{question}\n"
    
    return jsonify({
        'response': response,
        'previous_conversation': previous_conversation
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Default to port 5000 if PORT is not set
    app.run(debug=True, port=port)