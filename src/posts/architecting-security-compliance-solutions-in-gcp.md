---
icon: cloud
date: 2022-11-03
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'Google cloud'
  - gcp
  - GCCPCA
---

# Architecting GCP Solutions for Security and Legal Compliance

[[toc]]

## Identity and Access Management


Identity and Access Management or IAM is a service which lets you specify which users can perform which actions in the cloud. IAM includes the following objects:

* Identities and Groups
* Resources
* Permissions
* Roles
* Policies

Identities users and service accounts, groups are collections of those. The Identity entity itself is the thing which is granted access. When you perform any actions in GCP, you must first authenticate against an identity, either on the Console or with the `gcloud` command. Identities are also called 'members'. There are three kinds of core identities: Google account, Service Accounts, and Cloud Identity Domains.

Google accounts are members that represent users who access resources in GCP. Active directory users often are synced as Google accounts. Service accounts are accounts systems and programs use. Your terraform instances in an Enterprise environment might be created by a service account with the appropriate IAM roles or permissions to do so. Service accounts are denoted by a service account id in `projects/{{project}}/serviceAccounts/{{email}}` notation, or email notation sa-name@iam.gserviceaccounts.com. GKE service accounts are the same as compute service accounts. All compute operations run as the default compute service account.

Cloud Identity is an Identity as a service managed product which creates identities that are not tied to Google accounts. You can interface this with Active Directory OIDC and SAML.

![Federating Google Cloud with Active Directory](https://cloud.Google.com/static/architecture/identity/images/active-directory-as-idp.svg)

Groups are collections of Identities belonging together. A group is the object that binds the members or the entity they're associated with. The kind of members of a Google Group in IAM are service accounts and Google accounts. G Suite users and domains are group identities in GCP.

All of these: identities, groups and service accounts can be granted permissions or roles on Resources. A Resource is any GCP object.

Resources:
* Compute Instances
* Storage Buckets
* GSM Secrets
* Projects
* etc...

Every resource has both granular permissions that correspond to any action that can be done on that resource and predefined roles which represent workloads a person may be assigned with regard to the resource(i.e. developer, viewer, administrator).

Permissions correspond to specific actions like getting, listing, or deleting a resource.

Cloud Run IAM permissions examples:
|Permission|Description|
|--|--|
|run.services.get|View services, excluding IAM policies.|
|run.services.list|List services.|
|run.services.create|Create new services.|
|run.services.update|Update existing services.|
|run.services.delete|Delete services.|
|run.services.getIamPolicy|Get an IAM policy.|
|run.services.setIamPolicy|Set an IAM policy.|

In Enterprise level companies, these fine grained permissions are more often used. Small companies may use the roles or even basic roles. If you're going for a least privilege principal of access, then steering clear of the roles and only granting permissions will provide this. You'll collect job roles from the team, and consider the privileges needed to do that work. Secrets accessor can be granted on the project level or the secret level. Enterprise companies will want to place it on the secret level. They'll want to group the secrets to a service which accesses it and create a specific service account it will impersonate so that only that service can access it secrets and not the secrets of other services. The exam will not require you to know the permissions, however, knowing how granular they can be is what the exam creators will expect GCP Certified Architect's to know.

Roles are groups of these permissions bound together in a role which you assign to an identity or group in order to grant access. Identities can have multiple roles. Roles apply across the project. 

Cloud Run IAM predefined roles examples:
|Role|Permission|Description|
|--|--|--|
|(roles/run.developer)|...|...|
|(roles/run.developer)|run.jobs.create|Create Cloud Run jobs|
|(roles/run.developer)|run.jobs.delete|Delete Cloud Run jobs|
|(roles/run.developer)|run.jobs.get|Get Cloud Run jobs|
|(roles/run.developer)|run.jobs.list|List cloud Run jobs|
|(roles/run.developer)|run.jobs.run|Run a job in Cloud Run|
|(roles/run.developer)|run.jobs.update|Update a Cloud Run job|
|(roles/run.developer)|...|so on and so forth|

Applying these to an identity can be done at the Org, Folder or Project level and would apply to all sub resources in one of those three. Predefined roles are those like the above example. They pre-exist and are pre-defined collections of permissions. Other kinds of roles exist named basic roles which were the roles that existed before IAM. Basic roles apply to every resource and are Viewer, Editor, and Owner. The Viewer role gives read only access to resources, the editor grants change and delete access to resources which the Owner role inherits. Additionally the Owner role can assign roles and manage permissions to resources.

You can grant basic roles per resource so you can make on identity or group owner over certain Compute Managed Instance Groups while giving Owner to other MIGs. Owner role over resources allows users to set up a billing account for those resources. Its best to consider basic roles legacy and avoid them when possible.

Custom roles are those which are created by you where you group a permissions set into a custom role which you grant to identities or groups. This can help you adhere closer to the lease privilege access principle. Some developer roles allow you to set anything in a space where sometimes a thing should be restricted, like production. You would use a custom role to include all the things that a developer role has without the ability to write code and instead limit writes only to pull requests to the master branch.

Policies are Json definitions or directives called a _binding_ which specifies which identities are bound to which roles and permissions. The IAM API allows you to set or get policies and test permissions. Policies can be set on the Organization, individual projects or folders of projects and are inherited infinitely deep.

IAM also has Conditions that are written in a logic language called CEL that is a versatile way to define access granting logic so that things like resource tagging may trigger granting access to certain groups over that resource based simply upon its attributes. Conditions can apply to the following services:

* Cloud Storage
* Compute Engine
* Cloud KMS
* GSM
* Resource Manager
* Cloud SQL
* Bigtable
* IAP

Google recommends these [best practices](https://cloud.Google.com/iam/docs/using-iam-securely) for using IAM in a secure way.

### Lease Privilege Principles

* Do not ever use Basic roles in production
  * [Role recommendations](https://cloud.Google.com/iam/docs/recommender-overview) will recommend a role to replace basic roles.
  * [Policy Simulator](https://cloud.Google.com/iam/docs/understanding-simulator) will allow you to ensure this replacement will not change access
* Consider each layer of workload of your app is untrusted, give each one its own serviceaccount and grant only the permissions the app needs.
* Consider that all child Resources inherit the permissions of their parent Resources. Don't grant project level roles when Resource level roles will suffice.
* Grant permissions or roles on the smallest scope needed.
* Specify who can impersonate which service accounts
* Limit who can create and access service accounts.
* Take care who you grant [Project IAM Admin and Folder IAM Admin](https://cloud.Google.com/iam/docs/understanding-roles#resource-manager-roles)
* Conditional bindings can allow access to expire
* Consider granting privileged access only on a just-in-time basis.

#### Service Accounts

* Rotate your service account keys using the [IAM service account API](https://cloud.Google.com/iam/reference/rest/v1).
* Label the service account with a deploy name that tells you about what it is for and what it has access to.
* Don't leave the service account keys in email, check them into code, or leave them in the Downloads directory.

* Audit changes to your policies with Cloud Audit Logs
* Export logs to Cloud Storage for preservation  

* Audit who has the ability to change your allow policies on your projects.
* Limit access to logs per least privilege principles
* Use the Cloud Audit Logs to audit who has service account key access

#### Policy management
* If identities need to access all projects in an organization, grant access at the organization level.
* Use groups instead of users when possible.

Bad Actors will look for Service Account Keys in these locations:
* Source code repositories of open-source projects
* Public Cloud Storage buckets
* Public data dumps of breached services
* Compromised Email inboxes
* File shares
* Backup storage
* Temporary file system directories

### Identity Aware Proxies(IAP)
IAP are Layer 7 proxies which are capable of allowing or denying HTTP(S) requests based on IAM policy and identity membership. If a user making the request doesn't have an identity associated with it, the user will be redirected to a Google Oath page to sign into to a Google account or single signon account. Once an identity is associated with the request, and if the identity is allowed to access the resource, then the IAP forwards the connection to its destination.

Using IAP Proxies in front of app are ways you can limit access to parts or all of your application based on Google account. IAP for On-Premises Apps is Googles way of protecting Apps in Hybrid-Cloud Networking environments with IAM.

### Workload Identity
Workload Identity is a way to grant IAM roles and permissions to external identities. If you want a Kubernetes service account to have certain permissions in GCP, the `secretAccessor` role for instance, workload identity federation is the IAM feature which will allow you to do that. Workload Identity providers do the magic of connecting the external entity to the workload defined. These providers either use SAML or OAuth 2.0 token exchange.

Providers supported:
* AWS
* Azure Active Directory
* On-premises Active Directory
* Okta
* Kubernetes clusters

## Organization Policy Constraints

Organizations can have limits placed on them for any number of attributes of the org's resources. You can prevent certain actions from being taken by identities or service accounts. For instance, if you want all CloudFunctions to work through the VPC in a given project, you can create and then apply a constraint against `constraints/cloudfunctions.requireVPCConnector`. Depending on the constraint, it may apply to a set o Google services, or to specific services. You can find a [full list here](https://cloud.Google.com/resource-manager/docs/organization-policy/org-policy-constraints).

## Data Security and Encryption

Encryption is the process of masquerading data that is in one form into another form using encoding algorithms which produce results that are impractical to convert back without having the cypher keys. Encryption at rest is usually denoting filesystem encryption. Encryption in transit usually refers to things like SSL over TCP or HTTPS encryption.

Within the ecosystem of Google Cloud, Encryption at rest occurs at the hardware level, at the data infrastructure level, and using file encryption. On the infrastructure level the data is grouped into chunks and each one is encrypted. Using AES 256 and 128 encryption, Google can either use encryption keys Google creates and manages or customer managed keys in Cloud KMS.

Cloud SQL encrypts all data together with one key in the same instance. Cloud Spanner, Cloud Bigtable, and Cloud Firestore using an infrastructure encryption mechanism. In storage systems, the data is grouped into chunks which can be several gigabytes in size, and each chunk is encrypted with a data encryption key(DEK) which Google encrypts with key encryption keys(KEKs). DEKs are stored near the chunks they encrypt and sent to a centralized store where they are encrypted by the KEKs which are also stored in a centralized location. If data is changed or added to a chunk, a new key is created and the chunk re-encrypted. Keys are never reused with regard to chunks. Access control lists refer to some of the chunks' unique identifiers. All these chunks are stored on drives which have hardware encryption built into their chips.

Encryption in transit or encryption-in-motion protects against network interceptors and middle men. Data in transit in GCP on the Google network may not be encrypted but is authenticated at every transfer. Data in GCP that is outside the borders of the Google network is always encrypted. All incoming traffic to Google Cloud goes through the Google Frontend which runs on distributed global loadbalancers and protects against DDoS attacks. All communication to Google Cloud uses either TLS or QUIC. Within the Google network Application Layer Transport Security(ALTS) to authenticate and encrypt most intra-network connections.

Users do not have to create resources or set anything up to enable this encryption but they cannot control or manipulate the default Google Managed keys. Rather they can use their own keys with Cloud KMS. By default, DEKs and KEKs are rotated by Google. When a system tries to access a chunk, it requests the DEK from the key management system which authenticates the calling service, and then it sends the DEK to the storage system that decrypts the data.

Cloud KMS is a managed service for customer controlled encryption keys. It handles generating, importing and storing the keys within Google for application layer encryption on services such as Cloud Storage, BigQuery and Bigtable.

Cloud HSM is Google's support for FIPS 140-2 keys using them only in Level 3 hardware modules which are tamper-evident and respond to tamper attempts.

Customer Supplied Keys is the option for using your own key management entirely. Keys are generated and kept onpremises and passed along with API calls which only use them in memory never storing them to disk. This way, google can encrypt or decrypt the data with the customer supplied keys. This customer provided key is used to create a new customer derived key in combination with a per-persistent disk cryptographic nonce. In many cases, the customer supplied key is used to seed other keys that only stay in memory except for the nonce. Cloud External Key Manager(EKM) is the service which allows one to use third party management of keys and sets up Cloud KMS to consume them.

Cloud Storage supports ACLs in finegrained access mode to mirror support for them in Amazon S3 buckets to aid migrations, but this support is considered legacy. Otherwise buckets support IAM access at the bucket and project levels in uniform access mode. You can also use url signatures to grant temporary access to objects. Storage Buckets can also be made available publicly.

With Cloud Storage, signed policy documents can be created and set to restrict uploads based on sizes, type and file attribute based restrictions. It is a best practice to write checksums for all uploads and verify them. Google recommends creating and using CRC32C vs MD5 checksums due to its support of composite objects that are created with parallel uploads.

You can Secure your GKE or Anthos clusters with binary authorization, istio and mesh networking(ASM), cert manager, OPA policies and create all your elevated access service accounts with ACM.

## Security Observability

Evaluation of security practices starts with increased observability into the different layers and components of the application you're working with. This starts with understanding if your access controls and IAM policies work correctly. Otherwise you're unaware the security measures put in place to run the application are working.

Auditing your policies begins with reviewing them and what has happened in your projects audit logs. The Cloud Logging agent will collect most common logs needed and can be configured to collect specific logins and accesses. Cloud Audit Logs is a logging service which records administrative operations taken in your project. Audit Logs are saved for a limited amount of time so they need to be exported to Cloud Storage or BigQuery if regulations require retaining for a longer amount of time. Logging can export messages to Pub/Sub as JSON messages, to 'Logging' datasets in BigQuery, or as JSON files to Cloud Storage. When everything is sufficiently logged, you can create access monitoring and run audit queries which that scan for anomalies which can be reported. Turning on a Google Artifact Registry's automatic scan for vulnerabilities is an example of increasing security observability.

Penetration testing simulates an attack, particularly on a network interface of a host or a firewall. These tests connect with services and detect security vulnerabilities in running services. The solution is to often upgrade or patch an application so that it is no longer vulnerable.

The first phase of Penetration Testing is Reconnaissance where testers scope out the target much like a burglar looking for ways in. All information that can be gathered is gathered like Apache's `ServerToken` string. Recon phase testing might include social aspects where the tester learns everything they can about the operators who do have access to the target system. This might come in the form of phishing or leaving a USB key near someone's car in the parking lot. This phase can can be very short or very long.

The second step is Scanning. Once information is gathered, points of access on the network like IPs and ports are scanned, http endpoints have their root and header capabilities fetched and tested, commonly vulnerable urls are checked to see if they exist to determine if an access vector is present.

Gaining Access is a phase where the information gathered and a scanned access vector is exploited to obtain access to the breeched system. Maintaining access is what happens when parts of the exploit or other exploits are stored or hidden in the filesystem, obfuscated, set to sleep or listen for commands from some remote uri. They may even scrub logs hiding their tracks.

It is recommended for highly secure environments to create automatic pentesting tools that run automatically and log to Cloud Logging, from which you can draw monitoring alerts or reports.

## Security Principles
Three main principles apply when we discuss Cloud Security: Separation of Duties, Least Privilege, Defense in Depth.
## Separation of Duties
Separation of Duties, especially combined with these two other principles, creates a strong accountability and oversight in the work. Separation of Duties means code committers aren't the same as pull-request approvers. When multiple people have a scope of duties that are closely related, the impact and risk of internal bad actors is reduced.

Developers use pipelines created by reliability engineers through DevOps principles, but often they are not allowed to approve pipeline steps in the higher environments such as production. Small teams may have a harder time accomplishing this.

## Least Privilege
Least privilege is the principle of giving only the access that is needed. Working in least privilege focused companies is often a headache as nothing is easy to setup, it often takes coming up against an access denial to know what requests you need to make of the access teams. It may take you weeks to set up something it'd take you days to do if you had full access. This is because when access is denied, despite planning, and requests are made for grants, documentation has to be updated, the Solution Architecture Document may need to be updated, several security teams may need to reapprove your project after discovery of new facets of the work, you might need to wait on a Cloud Solutions team to produce a terraform module which provides your needed resources for a part of the project.

If you have microservices that use serviceaccounts to access resources, separate the serviceaccounts into ones that represent the workload, so that resources are grouped and only the services which need to access their resources will be able to do so.

IAM roles and permissions can be granted to satisfy whatever schema you can conceive. Once roles are granted, or custom roles created, you can use the Recommendation Engine to help prune unnecessary principle grants in IAM.

## Defense in Depth
This is the practice of controlling security at multiple levels of your application using the tools of those layers. For instance, If you treat a kubernetes pod as if it has a bad actor built into its image, we can distrust the filesystem as a safe place to store sensitive data. We can exclude secrets from env vars and use google's SDK to request the directly from the secret manager api upon startup of our application. This assures the secrets are only in memory and our bad actor now can be inside our pod and not be able to know the sensitive information.

So like a stairway of distrust we design while considering:

* The Network is compromised
* The Cluster or VM is compromised
* The disk is compromised
* Root is compromised
* The Application is compromised

We are trying to reduce the above list to just the last item:
* The Application is compromised

As an SRE, SRE Manager or an Architect, it is important to know that last item is the responsibility of the application development team to secure their code and app. The other items on the list, we can as SREs design around. We can introduce securityContexts on pods or containers which mount the root FS readonly. We can ask the app team to modify those applications so they only write to volumes. We can design around this stairway of distrust. If every connection is suspect, then when we secure them with istio and certificates then we can be fulfilling the principles of Defense in Depth.

## Regulations
Regulations are a big part of organizations and business. Every industry and company is regulated. Understanding where those regulations intersect with your design decisions is the same thing as knowing the impact they'll have on your project. Cloud Architects should know how these regulations apply to them and how to stay compliant with regulations like US medical industry's HIPPA/HITECH, Europe's GDPR, and COPPA.

The exam will cover these as well as Sarbanes-Oxley.

### HIPPA/HITECH
This is the law which applies to medical records in the United States. It is designed to protect personal information and privacy.

The Health Insurance Portability and Accountability Act (HIPAA) was enacted in 1996 to improve the portability and continuity of health insurance coverage. The HITECH Act, enacted as part of the American Recovery and Reinvestment Act of 2009, promotes the adoption and meaningful use of health information technology. Both HIPAA and HITECH place privacy, security, and breach notification requirements on covered entities and their business associates.

As a cloud architect, it is important to be aware of HIPAA and HITECH and how they impact the handling of health information in the cloud. HIPAA and HITECH impose requirements on covered entities and business associates with respect to the security, privacy, and confidentiality of health information. These requirements must be met when storing or transmitting

The HIPAA Security Rule is a federal law that establishes national standards for the security of electronic protected health information. The Rule requires covered entities to implement security measures to protect the confidentiality, integrity, and availability of PHI.

What are the Security Rule Safeguards?
The HIPAA Security Rule is a set of standards that must be met in order to ensure the confidentiality, integrity, and availability of electronic protected health information (PHI).

There are four main types of safeguards that must be in place in order to meet the requirements of the Security Rule: administrative, physical, technical, and organizational. Administrative safeguards are policies and procedures that must be put in place in order to protect PHI, while physical safeguards are measures taken to secure the physical environment in which PHI is stored. Technical safeguards are security measures used to protect electronic personal health information. Organizational safeguards are measures taken by an organization to protect the personal information of its clients, employees, and other individuals it deals with. Organizational safeguards are specified under Section 164.308 of the HIPAA Security Rule. Organizations must be able to design and implement appropriate administrative, technical, and physical safeguards to protect the privacy and security of individuals’ health information.

The most common technical safeguards are authentication, authorization, integrity, confidentiality, and availability.

The Privacy Rule requires entities covered by HIPAA to identify the personal health information (PHI) of individuals in certain transactions and maintain that information in an identifiable form only for legitimate business purposes.

## GDPR
The European Union's (EU) General Data Protection Regulation (GDPR) came into effect on 25 May 2018, replacing the previous EU data protection legislation from 1995.

Under the new rules, organizations handling personal data of EU citizens must comply with a variety of requirements covering privacy by design, consent for data use, and access to personal information.

The GDPR treats Controllers and Processors differently. A controller is any person, organization or company that controls the collection and use of personal data. 
 A person or company that collects data on people for their own use is called a processor. Any processor that uses personal data to create a valuable asset is required to identify the asset as a data subject's must be informed and give consent to.

In the event of a data breach (e.g. leaked passwords), data processors must notify the data controllers who have to notify the government and the people whose data was breached.

## SOX

The Sarbanes-Oxley (SOX) Act is a set of rules and regulations that help ensure the accuracy and transparency accounting information in publicly traded companies. 

The act was introduced by Senator Paul Sarbanes of Maryland in 2002. The primary purpose of the act is to ensure that public information served by companies is accurate and complete.

In addition, the act requires companies to disclose any material weaknesses in their internal control over financial reporting.

What rules do they put in place?
As far as IT Architects are concerned, the act requires the prevention of falsification and deletion of records, retention of certain records for defined periods.

This includes measures to increase transparency, and may include: periodic auditing compliance with SOX, developing a plan to disclose material information on a regular basis, ensuring that employees understand the company’s reporting process and comply with it, developing training programs to help employees recognize potential conflicts of interest, and creating a culture in which employees feel confident to raise issues without fear of being sued.


* requirement to implement tamper-prevention controls
* requirement for an annual audits
* requirement to keep data confidential

## Childrens' Online Privacy Protection Act(COPPA)
COPPA is a United States law passed in 1998 which requires websites and online service to restrict what they do reguarding the personal information of children under the age of 13. Websites which serve this audience must:

* Notify Parents before collecting data about their child
* Allow Parents to block such collection
* Give Parents access to the data collected
* Give Parents the choice of how such data is used
* Have clear and understandable privacy policies
* Retain the data only for the length of time for which it is needed
* Maintain confidentiality, integrity and availability of the collected data.

All the data covered by the law aren't limited to but specifically mention the identifying information in the data, such as name, dwelling, photographs.

## ITIL Framework

ITIL is a standard of IT management practices that dovetails business goals with common IT activities. ITIL has 34 practices that are grouped into General, Service, and Technical practices. General are strategy, risk management, disaster recovery, architecture, project and security management. Service management items are analytics and analysis, service design, capacity and performance, incident management, and asset management. Technical practices are those which include management of deployments, infrastructure, and software development practices. Businesses adopt something like the ITIL because its a magic box of best practices that fits many different scenarios. It creates a repeatable standard which can simplify a lot of trouble and guesswork in IT management.

## Summary
Designing secure systems that will live in GCP starts with access and ends with compliance and touches everywhere in between. IAM is used to give access to identities which are users, groups or serviceaccounts, Permissions, custom roles, predefined roles, and basic roles provide for just about any concievable combination of access and limits. Policies ensure that company wide standards are enforced.

Encryption is everywhere and its power can be placed within the customer's hands. Least privilege, defense-in depth, and proper auditing fill in the gaps.

## Exam Essentials

* Understand all the different parts of IAM and how they interact
* Understand that roles are simply groups of permissions which go together
* Basic roles are legacy and should be avoided when possible
* Understand that access can be granted at the resource, project and folder levels
* Understand that Policies use bindings to associate roles with resources
* Understand the hierarchy of Organizations, Folders, Projects and inheritance
* Understand Google's Encryption at Rest and in Transit, know the AES bit level for each
* Understand DEKs, KEKs, and how they're used and interact
* Understand all the types of managing keys
* Understand pentesting and auditing
* Understand the best practices for security
* Understand how to use access and storage classes to achieve compliance

## Official Resources
* [GCP HIPPA Compliance Information](cloud.google.com/security/compliance/hippa)
* [Load Balancing and Autoscaling Compute Engine](https://cloud.Google.com/compute/docs/load-balancing-and-autoscaling#:~:text=documentation%20for%20descriptions.-,Autoscaling,need%20for%20resources%20is%20lower.)
* [Cluster Autoscaling Kubernetes Engine](https://cloud.Google.com/kubernetes-engine/docs/concepts/cluster-autoscaler)
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.Google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.Google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.Google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.Google.com/docs)