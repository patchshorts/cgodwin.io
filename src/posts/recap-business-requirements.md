---
icon: cloud
date: 2022-09-17
category:
  - Google Cloud
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
---

# Recap Business Requirements

[[toc]]

## Business to Technical Requirements
When designing a new project, while collecting and studying business
requirements, you'll have to translate those into technical requirements. You'll
find that there's not a one to one relationship. One technical solution may
meet two business requirements. While one business requirement might encapsulate
several solutions.

## Reducing Costs
When designing for cost reduction, there are three options you should strongly
consider:
* [Managed Services](list-all-google-cloud-platform-gcp-managed-services.md)
* [Preemptible and Spot VMs](designing-planning-for-business-requirements.html#reduced-level-services)
* [Autoscaling](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling#autoscaling)

## Continuous Integration & Delivery
The benefits of CICD to business requirements is that it enables smaller
incremental trunk-based development. This shortens the feedback loop, reduces
risks to services during deployment, increases the speed of debuging, isolates
featuresets to known risks.

## Service Level Objectives
Business requirements typically demand these common type of SLOs.

* **High Availability SLO** Always accessible.
* **Durability SLO** Always kept.
* **Reliability SLO** Always meeting workloads.
* **Scalability SLO** Always fitting its workloads.

## Incident
An incident is a period of time where SLOs are not met. Incidents are
disruptions in a service's availability therefore becoming degraded.

## Compliance
### In the United States
* **Sarbanes-Oxley(SOX)** regulates financial records of corporate institutions.
* **Health Insurance Portability and Accountability Act (HIPPA)** regulates US
  companies protecting consumer access and the privacy of medical data.
* **Payment Card Induasty Data Security Standard(PCI DSS)** is a standard for
  taking credit cards which processing underwriters may require an e-commerce
  vendor to abide by.
### In Europe
* **General Data Protection Regulations(GDPR)** regulates information stored by
  companys operating in Europe for its protection and privacy.

## Global Up-to-Date Data
Cloud spanner is the best option for an SQL based global records storage with a
High Consistency SLO.

## Virtual Private Clouds(VPCs)
VPCs isolates the network of your project so that customers running in the same
cloud, people on the internet, and people without a need in your company are
denied access unless you specify otherwise.

## Official Resources
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.google.com/docs)