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

Google accounts are members that represent users who access resources in GCP. Active directory users often are synced as google accounts. Service accounts are accounts systems and programs use. Your terraform instances in an Enterprise environment might be created by a service account with the appropriate IAM roles to do so.
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




