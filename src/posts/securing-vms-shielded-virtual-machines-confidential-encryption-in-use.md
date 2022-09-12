---
icon: cloud
date: 2022-09-11
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
  - 'Compute Engine'
  - 'Virtual Machine'
  - 'Cloud VM'
  - 'VM Security'
  - 'Cloud Security'
  - 'Cloud computing'
---

[[toc]]

# Features in Google Cloud for Securing Virtual Machines(VMs)

## Shielded VMs
Shielded VMs use verification on hardware IDs and chips to defend against Linux bootkits and rootkits and provides self-healing security features such as integrity monitoring and healing.

It uses [Secure Boot](https://cloud.google.com/compute/shielded-vm/docs/shielded-vm#secure-boot), [Virtual trusted platform module(vTPM)](https://cloud.google.com/compute/shielded-vm/docs/shielded-vm#vtpm)-enabled [Measured Boot](https://cloud.google.com/compute/shielded-vm/docs/shielded-vm#measured-boot), and [Integrity monitoring](https://cloud.google.com/compute/shielded-vm/docs/shielded-vm#integrity-monitoring).

### Monitoring
You can monitor your VMs in a few ways with Shielded VMs:

* You can monitor the boot integrity of shielded VMs with cloud monitoring.
* You can automatically take action on integrity failures with cloud functions.

## Confidential VMs
These Virtual Machines use *encryption-in-use* and encrypt the data in memory. You provision this type of VM with the type [N2D](https://cloud.google.com/compute/docs/general-purpose-machines#n2d_machines):

* `n2d-standard-2`
* `n2d-standard-4`
* `n2d-standard-8`
* `n2d-standard-16`
* `n2d-standard-32`
* `n2d-standard-48`
* `n2d-standard-64`
* `n2d-standard-80`
* `n2d-standard-96`
* `n2d-standard-128`
* `n2d-standard-224`

## VPC Service Controls
VPC Service Controls can define perimeters around sets of services within a VPC and can have their access limited. Traffic that crosses perimeters have Ingress and Egress rules. This affords us the following benefits:

* Unauthorized networks with stolen credentials are blocked
* Data exfiltration blocked.
* Safety net for misconfigured over-permissive IAM policies.
* Honeypot perimetering and additional monitoring.
* Extend perimeters to on-premiss networks
* Context-aware access to resources

### VPC Service Control Netflow

![image](https://cloud.google.com/static/vpc-service-controls/images/service_perimeter.png)

## Official Resources
* [Shielded VMs](https://cloud.google.com/compute/docs/about-shielded-vm)
* [Confidential VMs](https://cloud.google.com/compute/docs/about-confidential-vm)
* [Integrity Monitoring](https://cloud.google.com/compute/shielded-vm/docs/integrity-monitoring)
* [VPC Service Controls](https://cloud.google.com/vpc-service-controls/docs/overview)
* [GCP Documentation](http://cloud.google.com/docs)