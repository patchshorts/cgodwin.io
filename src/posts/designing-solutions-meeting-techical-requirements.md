---
icon: cloud
date: 2022-09-18
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
---

# Desiging Solutions for Technical Requirements

[[toc]]

## High Availability
High availability is a key characteristic of any reliable system, and is typically measured by what is known as the "99999" rule. This rule states that a system must be operational 99.9999% of the time in order to be considered highly available. This equates to a maximum downtime of just over 5 minutes per year. In order to achieve such a high level of availability, a system must be designed and implemented with care, and must be constantly monitored and maintained. Additionally, a high availability system must have a robust service-level agreement (SLA) in place in order to ensure that the system meets the required availability levels.

### Table of Availability SLAs and Downtime
|% Uptime|Downtime / Day|Downtime / Week|Downtime / Month|
|:---:|:---:|:---:|:---:|
|99|14 m 24 s|1h 40m 48s|7h 18m 17s|
|99.9|1m 26s|10m 4s|43m 49s|
|99.99|8s|1m|4m 22s|
|99.999|864 ms|6s 500ms|26s|
|99.9999|86 ms|604 ms|2s 630ms|

When it comes to SLAs and account for hardware failures, it is important to consider network equipment and disk drives. Hardware failures can often be caused by a variety of factors, including physical damage, overheating, and software issues. By having a plan in place for how to deal with these failures, you can help minimize the impact on your business.

One way to prepare for hardware failures is to have a redundancy and a backup plan for your equipment. This way, if one piece of equipment fails, you can quickly switch to another while still running. The work of a cloud business with a 5 9s SLA is to statistically predict disk drive failures overall and plan redundancy and recover procedures. This way, if a drive fails, you actually never know there's a problem.

::: danger Failure Stack

* Application Bugs
* Service problem
* DB Disk Full
* NIC Fails
* Network fails
* Misconfiguration of infrastructure or networks
:::

One way to mitigate the errors that can occur during deployment and configuration is to test thoroughly before making any changes. This can be done by creating staging or lower environments that are identical to the production environment and testing all changes in it before deploying them to production. Canary deployments are another way to mitigate errors. With canary deployments, changes are first deployed to a small subset of users before being rolled out to the entire user base. This allows for any errors to be detected and fixed before they impact the entire user base. Regression testing can also be used to mitigate errors. This is where changes are tested not only in the staging environment, but also in the production environment.

Continuous deployment and continuous verification are two key concepts in minimizing downtime for deployments. By continuously deploying code changes and verifying them before they go live, we can ensure that only working code is deployed and that any issues are caught early. This minimizes the amount of time that our systems are down and keeps our users happy.

### Compute Availability
Google Compute Engine is the underlying provider of the following services:

* GCE VMs
* GKE Masters and Worker Nodes
* App Engine Applications
* Cloud Functions

The process of meeting your availability needs using each of these services is slightly different for each one.

#### High Availability in Compute Engine
##### Hardware Redundancy and Live Migration
On the lowest level, much of the servers at google have levels of redundancy. If a server fails for hardware issues, others are there for failing over to while others are booted up to replace redundancy.

Google also live migrates VMs to other hypervisors like it does when power or networks systems fail or during maintenance activities which have a real impact on hypervisors.

::: warning Live Migration

Live migration isn't supported for the following VMs:
* Confidential VMs
* GPU Attached VMs
* Cloud TPUs
* Preemptible VMs
* Spot VMs

:::

##### Managed Instance Groups
Managed Instance Groups(MIGs) create groups or clusters of virtual machines which exist together as instances of the same VM template.

**Instance Templates**
A VM template looks like this:

```sh
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/instanceTemplates
```

Here is what you're posting before you make replacements:

```json
{
  "name": "INSTANCE_TEMPLATE_NAME"
  "properties": {
    "machineType": "zones/ZONE/machineTypes/MACHINE_TYPE",
    "networkInterfaces": [
      {
        "network": "global/networks/default",
        "accessConfigs":
        [
          {
            "name": "external-IP",
            "type": "ONE_TO_ONE_NAT"
          }
        ]
      }
    ],
    "disks":
    [
      {
        "type": "PERSISTENT",
        "boot": true,
        "mode": "READ_WRITE",
        "initializeParams":
        {
          "sourceImage": "projects/IMAGE_PROJECT/global/images/IMAGE"
        }
      }
    ]
  }
}
```

Or with **gcloud**

```sh
gcloud compute instance-templates create example-template-custom \
    --machine-type=e2-standard-4 \
    --image-family=debian-10 \
    --image-project=debian-cloud \
    --boot-disk-size=250GB
```

And then instantiate the instance template into a group.

```sh
gcloud compute instance-groups managed create INSTANCE_GROUP_NAME \
    --size SIZE \
    --template INSTANCE_TEMPLATE \
    --zone ZONE
```

***

What makes it work well is that when a VM fails in the group, it is deleted and a new one created. This ensures the availability of the group.

Managed Instance Groups(MIGs) can be zonal, regional and can be autoscaled. Their traffic is load balanced and if one of the instances are unavailable the traffic will be routed to the other instances.

##### Multiple Regions and Global Load Balancing
Instance group's top level is regional. You can however run many multizonal MIGs in different regions and balance them with a regional load balancer. Workload is distributed across all MIGs to each of the regional LBs. If one or more of the MIGs becomes unavailable, the global LB will exclude them from routing.

Users will be connected by the global load balancer(LB) to their closest region reducing latency.

#### High Availability in Kubernetes Engine

Kubernetes by default and if uses correctly provides high availability for containers and orchestrates their replication, scaling up, scaling down, container networking, service ingress. This enables canary, blue green and rollout deployments for further reliability testing.

GKE has an extra layer of availability on top of that which is provided by Kubernetes(k8s). Node pools are Managed Instance Groups of VMs running Kubernetes nodes.

Kubernetes monitors pods for readiness and liveness. Pods in k8s are replica sets of containers. Usually a pod has one container defined but often might have a sidecar or binary container pattern. Different containers in the same pod can communicate with IPC, network over localhost, or by volume. You cannot share the individual sockets but you can share the whole socket directory if you have permissions on the environment.

::: info For example
PHP-FPS might need to run with the webserver it is coupled with. The nginx webserver would be configure similar to this:

```json
        upstream webapp {
            server 127.0.0.1:9000;
        }
```

The would both share `127.0.0.1`.
:::

If one of the containers in a pod crashes, the restartPolicy directive tells k8s what to do.

Because Managed Instance groups are zonal or multizonal(regional), Kubernetes clusters are also zonal and multizonal(regional). Regional clusters have their control planes replicated across zones so if a control plane goes down, it hasn't lost availability.

#### High Availability in App Engine and Cloud Functions

These services experience automatic high availability. When running these services, the items in the failure stack to worry about involve deployment, integration concerns, application failures.

#### High Availability Computing Requirements in Case Studies
Recall out [case studies](https://cgodwin-io-xu5obpctlq-uc.a.run.app/posts/designing-planning-for-business-requirements.html#business-use-cases-and-product-strategy)

* Tristar Healthcare needs an always up API service to meet the business requirement "entities will need and currently have different access to read and change records and information". Since this isn't just intra-organization it is external facing for customers, vendors, and partners. You decide to run the the service on App Engine standard for now unless you discover you need to use the Flexible stack.
* While class is recording, the services need to be always available to consume the broadcasts, otherwise the videos for consumption need to be available for students to watch while class isn't recording. Students however will not be accessing these from outside the local region because the school is local. The small amount of traffic that comes from outside the region is from traveling students who can deal with the latency.
* LCSoft is using a multiregional Firebase Realtime Database with an always up SLA. Firebase supported by google cloud and supports Google Cloud. You can "pull" in GCP products into a Firebase hosted platform.
* Granger really only needs total availability of all services during business hours. They're all acting from the same region so they're really needing for multizonal solutions.

### Storage Availability
Storage is considered Highly available when it is available and functional at all times.

GCP Storage Types

* Object storage
* block storage
* Network attached storage
* Database services
* Caching

Availability refers to the quality belonging storage that its contents are retrievable right now. Durability, on the other hand, refers to the long term ability of the data to be in tact and to stay retrievable.
  
#### Availability of Different Storage Types
##### Object Storage
*Cloud Storage* is entirely managed service for storing objects, files, images, videos, backups, documents, and other unstructured data. It is always highly available as a managed service.

##### File storage
*Cloud Filestore* is a NAS that is fully managed and thus Google ensures it is highly available.

##### Block Storage
*Persistent disks* are disks that are attached to VMs but remain available after those VMs are shutoff. They can be used like any local hard drive on a server so they can store files and database backends. PDs are also highly available because they can be resized while in use. Google offers different types of persistent disks:

|        |Standard|Balanced|SSD|Extreme|
|--------|--------|--------|---|-------|
|Zonal   |reliable block storage| reliable blk storage with higher IOPS | better IOPS than Balanced | Highest IOPS |
|Regional|PDs replicated across 2 zones within a region|dual zone replicated higher IOPS| dual zone replicated better IOPS|N/A|

Better performance leads to higher costs as does going from a zonal PD to a regional PD.

Zonal Persistent Disks with a standard IOPS have a 4 9s durability(99.99%), while all the others have a 5 9s uptime(99.999%).
#### Availability of Databases
##### Self-Managed Databases
If you run your own database on a virtual machine topology, ensuring these systems are redundant is the key to managing your own database availability. The underlying db software will affect how you plan for availability in a architectural design.

For example, MySQL or MariaDB usually use master and replicas. You may want to set up a few regional sql proxy hosts and a global LB to them all to provide an endpoint for the app to all of these. Making your db cluster multiregional and therefore multizonal would involve considering the cost of network traffic, latency, consistency.

In each different sql server case you'll have to decide if it is best to try to share a disk between active and inactive servers, filesystem replication to a standby system, or to use multimaster replication. You could also use vitesse to create your own globally available MySQL server either with containers or with virtual servers.

Or you could use Cloud SQL selecting a highly available cluster during creation and not worry about it. You could use Cloud Spanner for guaranteed consistency.

##### Managed Databases
HA by Default:
* Firestore
* BigQuery
* Cloud Spanner

Have HA Options:
* Cloud SQL
* Bigtable

With services that have High Availability through setup or configuration, it is important to remember that seeking greater availability, say going from 3 9s to a 4 9s SLO, will cost more.

#### Availability of Caching
#### Hi Availability Storage Requirements in CAse Studies
### Network Availability
#### High Availability Network Requirements in Case Studies
### Application Availability
## Scalability
### Scaling Compute Resources
#### Scaling Compute in GCE
#### Scaling Compute in GKE
### Scaling Storage Resources
### Network Design for Scalability
## Reliability
### Measuring Reliability
### Reliability Engineering

## Official Resources
* Managed Instance Groups(MIGs)
  * [Create instance templates](https://cloud.google.com/compute/docs/instance-templates/create-instance-templates)
  * [Create a MIG with VMs in a single zone (zonal MIG)](https://cloud.google.com/compute/docs/instance-groups/create-zonal-mig)
  * [Create a MIG with VMs in multiple zones in a region (regional MIG)](https://cloud.google.com/compute/docs/instance-groups/distributing-instances-with-regional-instance-groups)
  * [Create a MIG with autoscaling](https://cloud.google.com/compute/docs/instance-groups/create-mig-with-basic-autoscaling)
  * [Create a MIG that uses preemptible VMs](https://cloud.google.com/compute/docs/instance-groups/create-mig-with-preemptible-vms)* [Create a MIG with stateful configuration] (https://cloud.google.com/compute/docs/instance-groups/create-mig-with-basic-stateful-disks)
* 



