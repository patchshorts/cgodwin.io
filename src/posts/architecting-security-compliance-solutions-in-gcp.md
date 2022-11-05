---
icon: cloud
date: 2022-11-03
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'google cloud'
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

Google accounts are members that represent users who access resources in GCP. Active directory users often are synced as google accounts. Service accounts are accounts systems and programs use. Your terraform instances in an Enterprise environment might be created by a service account with the appropriate IAM roles or permissions to do so. Service accounts are denoted by a service account id in `projects/{{project}}/serviceAccounts/{{email}}` notation, or email notation sa-name@iam.gserviceaccounts.com. GKE service accounts are the same as compute service accounts. All compute operations run as the default compute service account.

Cloud Identity is an Identity as a service managed product which creates identities that are not tied to google accounts. You can interface this with Active Directory OIDC and SAML.

![Federating Google Cloud with Active Directory](https://cloud.google.com/static/architecture/identity/images/active-directory-as-idp.svg)

Groups are collections of Identities belonging together. A group is the object that binds the members or the entity they're associated with. The kind of members of a Google Group in IAM are service accounts and google accounts. G Suite users and domains are group identities in GCP.

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

Custom roles are those which are created by you and 
## Exam Essentials

* blah

## Official Resources
* [Load Balancing and Autoscaling Compute Engine](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling#:~:text=documentation%20for%20descriptions.-,Autoscaling,need%20for%20resources%20is%20lower.)
* [Cluster Autoscaling Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler)
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.google.com/docs)




