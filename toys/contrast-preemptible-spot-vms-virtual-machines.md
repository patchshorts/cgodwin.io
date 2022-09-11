---
icon: cloud
date: 2022-09-10
category:
  - 'Google Cloud'
  - Technology
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
  - 'Compute Engine'
  - 'Virtual Machine'
  - 'Cloud VM'
  - 'Cost Cutting'
  - 'Cloud computing'
---

# Contrasting Preemptible and Spot Virtual Machines(VMs)

[[toc]]

## Table of Preemptible vs Spot Distinguishing Features

|Product      |Unlimited Runtime|preemptive delete|preemptive pause|SLA Coverage|Cost Reduction|Migrate to Standard VM|Restart on Event|
|:------------|:--------:|:----------:|:----------:|:-------:|:---------:|:---------:|:---------:|
| Preemptible VMs|🔴|🔴|🟢|🔴|🟢|🔴|🔴|
| Spot VMs       |🟢|🟢|🟢|🔴|🟢|🔴|🔴|



| Symbol  |    Meaning   |
|:-------:|:------------:|
|   🟢    | Yes         |
|   🔴    | No          |

## Official Resources
* [Create and use preemptible VMs](https://cloud.google.com/compute/docs/instances/create-use-preemptible)
* [Create and use Spot VMs](https://cloud.google.com/compute/docs/instances/create-use-spot)
* [Preemptible VMs](https://cloud.google.com/compute/docs/instances/preemptible)
* [Spot VMs](https://cloud.google.com/compute/docs/instances/spot)
* [GCP Documentation](http://cloud.google.com/docs)