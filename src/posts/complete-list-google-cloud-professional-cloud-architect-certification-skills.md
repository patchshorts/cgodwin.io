---
icon: cloud
date: 2022-09-03
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'Google cloud'
  - gcp
  - GCCPCA
  - 'Cloud computing'
  - 'business and finance'
  - 'computing and information technology'
  - 'software science and technology'
---

# Complete List of Google Cloud Certified Professional Cloud Architecture Skills

[[toc]]

## Ability to Design for Business

### Business Use-Cases
When it comes to designing a cloud for business use-cases, there are a few key considerations that need to be taken into account.
### Product Strategies
Product strategies have a big impact on cloud architecture design.
### Go-live Strategies
Cloud-based launches require careful planning to ensure a successful outcome.
### Application Design
Applications that are designed to run in the cloud must be able to take advantage of the functionality, scalability and flexibility that the cloud offers. 
### Cost Considerations
For every cost-effective option for running an application, there are at least two other cost-*ineffective* ways to accomplish the same thing in a cloud.
### Systems Integration
Key considerations for communicating between cloud and on-premises networks and applications.
### Data Handling and Management
Keeping your data safe and secret is the goal of proper data handling, especially production and sensitive data.
### Compliance, Regulations, Access Restrictions
Designing cloud architecture requires staying within industry compliance, legal regulation, and policy access restrictions. That involves careful consideration and arduous planning.
### Security
Trust no file, no connection, no application. Treat everything as untrusted as a potential layer of breach, act according to that and you'll be fine.
### Measures of Success
Does our proof of concept have any measures of success other than a successful healthcheck? It should. What else are we missing?
## Ability to Design Around Technical Needs
### Technical Debt Reconciliation
Technical debt is the amount of time and effort required to fix or improve software that is not up to date or is poorly designed. It can accumulate over time as a result of shortcuts taken during development, such as using quick and dirty solutions instead of taking the time to do things properly. 
### Availability
What is required to ensuring high-availability in the cloud. Is availability one of your business needs?
### Scaling Resources
Ensuring that the scaling process is efficient and cost effective and elastic.
### Reliability Engineering
Working to identify and mitigate potential sources of failure.
## Ability to Design Compute Architecture
### Compute Engine
Google Compute Engine is a cloud computing service that provides virtual machines that run on Google infrastructure.
### Google Kubernetes Engine(GKE)
Google Kubernetes Engine (GKE) is a managed, production-ready environment for deploying containerized applications. 
### Anthos
A platform that enables runs containerized applications in hybrid or multi-cloud environment, whether they are deployed on-premises or in the cloud.
### Cloud Functions
Google Cloud Functions is a serverless computing platform that allows you to run code in the cloud without having to manage a server or cluster.
### Configuration
Handling Application configuration.
### Management
Considering infrastructure management tasks such as log rotation.
### States
Stateful applications, application states, statelessness.
### Data flows
Message queuing, bottlenecks and performance.
### Data Integrity
Maintaining the accuracy and consistency of data over its entire lifecycle.
### Monitoring and Alerting
Set up alerts and view monitoring data for your projects via dashboards.
## Ability to Design Storage Architecture
### Object Storage
Object storage is a type of storage that is well-suited for storing large amounts of data that is unstructured or semi-structured.
### Network Storage
Google Cloud Platform (GCP) offers a managed network attached storage (NAS) service called Filestore and volumes attached to compute based services such as GKE.
### Databases
Knowledge of relational database creation, maintenance, backup, and related processes.
### Cloud SQL
Managed relational databases meet certain needs that compute database engines do not.
### Cloud Spanner
Google Cloud Spanner is a relational database service that offers global horizontal scaling, strong consistency, and high availability. Basically Managed Vitesse.
### Big Query
Google BigQuery is a cloud-based big data analytics web service for processing very large read-only data sets.
### Cloud Firestore
Cloud Firestore is an auto-scaling document database for storing, syncing, and querying data for mobile and web apps.
### Bigtable
Google Big Table is a distributed storage system for low-latency access to large amounts(petabytes) of structured data.
### Data Retention and Lifecycles
As data doesn't need to be access as frequently, it can be time partitioned for cost-effective solutions.
### Latency Issues
Latency is a key consideration for accessing data in any kind of storage. Regional, zone, and CDN considerations must be made.
## Ability to Design Network Architecture
### Virtual Private Cloud(VPC) Basics
IP Addressing, CIDR ranges, Firewall Rules and Routers. Cloud Router, Cloud Armor, VPC subnet and VPC sharing.
### Hybrid Cloud Networking
Knowledge of how hybrid cloud networking a mix of on-premises, private cloud, and public cloud services are setup and maintained.
### CDN, DNS Zones, Zone Peering, Service Registry
Additional services provided in GCP Networking.
### Load Balancing(LB)
Regional and Global Load Balancing have different use-cases. How GKE and provisions LBs.
## Legal and Security Centric Design Scrutiny
### Identity and Access Management(IAM)
All access is managed through IAM, it is relevant to every gcp service.
### Encryption
#### Storage Encryption
Understanding GCP's encryption at-rest schema.
#### Connection Encryption
Understanding encryption in transit in GCP.
### Key Management
Ability to ascertain the needs of projects which need to control their own key management for data encryption.
### Security Evaluation
Penetration Testing & Iam Policy Auditing
### Security Design Principles
Full understanding of concepts like separation of duties, least privilege and Defense in Depth.
### Major Regulations
### Information Technology Infrastructure Library Framework
The Information Technology Infrastructure Library (ITIL) is a framework that provides a set of best practices for managing IT services.
### HIPPA/HITECH
The Health Insurance Portability and Accountability Act, or HIPAA, is a federal law that was enacted in 199 HIPAA protects the privacy of patients' health information and establishes national standards for the security of electronic health information. The HITECH Act is a federal law that promotes the adoption and meaningful use of health information technology. 
### GDPR
GDPR applies to any company that processes the personal data of EU citizens, regardless of where the company is located. It strengthens EU data protection rules by giving individuals more control over their personal data, and establishing new rights for individuals. 
### SOX Compliance
The Sarbanes-Oxley Act was enacted in 2002 in response to the Enron scandal. The Act includes provisions to protect investors from fraudulent accounting practices and to improve the accuracy and transparency of corporate disclosures. The Act also created the Public Company Accounting Oversight Board to oversee the auditing of public companies.
### COPPA
The Children's Online Privacy Protection Act (COPPA) is a law that requires companies to get parental consent before collecting, using, or disclosing personal information from children under 1 COPPA also gives parents the right to review and delete their child's personal information, and to refuse to allow companies to collect or use it.
## Ability to Design for Reliability
### Stackdriver
Stackdriver is a cloud monitoring tool that provides comprehensive monitoring and logging for cloud-powered applications. It offers powerful features like monitoring dashboards, alerting, log management, and tracing. Stackdriver is a great tool for keeping track of the health and performance of your cloud-based applications.
### Continuous Deployment
Just use [Harness](harness.io). Cloud Deploy in GCP is $15 per pipeline per month.
### Continuous Integration
Cloud build basics.
### Reliability Engineering
Reliability engineering via Cloud Ops: Logging, Monitoring, Alerting, Etc.
### Overloads, Cascading Failure and Testing
Designs need to deal with capacity overloads, they need to fail in a cascading manor, and reliability testing.
### Incident Management, Analysis, and Reporting
Identify Incident cause, Plan for fix remediation, and log the actions taken.
## Technical Process Introspection
### Lifecycle Planning
Create and Understand Software Development Lifecycle plans.
### Troubleshooting
Fixing your technical processes by revisiting your Incident Response and Post-Mortem Culture
### Enterprise IT Processes
Fit your Technical Processes into the IT processes of your wider group. For example, creating AD groups and syncing them to GCP for IAM federation.
### Business Continuity Planning and Disaster Recovery
Architects wil be asked to help teams to be better prepared to run their app in a new environment from scratch.
## Business Process Introspection
### Stakeholder Management
The ability to deliver and set expectations with people who have an interest in the project you're designing.
### Change Management
Understanding of Plan, Do, Study, Act.
### Team Skill Management
Help develop internal skill-sets among the team.
### Customer Success Management
Helping customers to get the most value from your services.
### Cost Management
Resource planning, Cost estimation, budgeting, and cost control.
### Cost Optimization
Familiar with HR Costs, Infrastructure costs, Operational Costs, and Capital Costs. Can contribute to optimizing these costs.
## Development and Operations Design
### Create Development-and-Redevelopment-for-Cloud Strategies
Ability to guide app developers to plan for redeveloping applications for cloud specific services.
### API Best Practices
Understanding APIs, RESTful and RPC. API Security familiarization and comprehension of resource limiting.
### Testing Frameworks
Vulnerability Testing, Unit Testing, Regression Testing, WebDriver Testing, HTTP and Healthcheck verifications.
### Secrets Integration for Third Party Apps
Strategy for storing sensitivity data in the cloud.
### Google Cloud SDK
gcloud, gsutil, bq, cbt, kubectl, pubsub emulator...
### Cloud Emulators
Awareness in local emulators for development reduction. Bigtable, Datastore, Firestore, Pub/Sub, Spanner.
### Migration Strategies
Lift and Shift, Move and improve, or Rip and restore?
### Tools
Storage Transfer Service, gsutil, Google Cloud Database Migration, Google Transfer Appliances, and 3rd party options.
### Migration Cost/Time Optimization
Data Size, Redevelopment Time, Migration Time, Planning Time.
## Migration Planning
### Integrating Cloud Systems with Existing Services
### Migrating Applications and Data to Support a Solution
Planning Changing code and configuration to support shifts in platform differences.
#### Planning for Data Migration
Consider the size and type of data being migrated, the workload requirements, and the available budget. Other restrictions.
#### Governance of Data and Migrations
Ensuring that data is managed to stay in-compliance effectively and consistently across a migration.
#### Migrating Object Storage
Bucket structure, Roles and Access Controls. Time and Cost comprehension, transfer sequence, transfer methods.
#### Migration Relational Data
Volume considerations, downtime considerations, replicate in the cloud for no-downtime migrations.
### Software License Mapping
Understanding of BYOL models and pay-as-you-go models.
### Network Planning
Planning Shared Networks in Tiered Projects, Planning VPCs, Planning Network Access Standards, Scaling & Performance Testing, Connectivity
## Official Resources
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.Google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.Google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.Google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.Google.com/docs)