---
icon: cloud
date: 2022-09-18
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'Google cloud'
  - gcp
  - GCCPCA
---

# Desiging Solutions for Technical Requirements

[[toc]]

## High Availability
High availability is a key characteristic of any reliable system, and is typically measured by what is known as the "99999" rule. This rule states that a system must be operational 99.9999% of the time in order to be considered highly available. This equates to a maximum downtime of just over 5 minutes per year. In order to achieve such a high level of availability, a system must be designed and implemented with care, and must be constantly monitored and maintained. Additionally, a high availability system must have a robust service-level agreement (SLA) in place in order to ensure that the system meets the required availability levels.

::: tip
The best general strategy for increasing availability is redundancy.
:::

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
On the lowest level, much of the servers at Google have levels of redundancy. If a server fails for hardware issues, others are there for failing over to while others are booted up to replace redundancy.

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
POST https://compute.Googleapis.com/compute/v1/projects/PROJECT_ID/global/instanceTemplates
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
Recall our [case studies](https://cgodwin-io-xu5obpctlq-uc.a.run.app/posts/designing-planning-for-business-requirements.html#business-use-cases-and-product-strategy)


- EHR Healthcare needs a highly available API service to meet the business requirement of "entities will need and currently have different access to read and change records and information". This is essential as it is an external-facing service for customers, vendors, and partners.
- HRL requires high availability for its real-time telemetry and video feed during races to enhance the spectator experience. This is crucial to ensure uninterrupted live streaming of races.
- A high availability analytics solution is needed to gain insights into viewer behavior and preferences. This will ensure uninterrupted access to critical viewer data for business decision-making.
- The archival storage for past races also needs to be highly available for on-demand viewing by fans and analysts.
- High availability is vital for the online video games developed by Mountkirk Games. This is necessary to ensure a seamless gaming experience for players across the globe.
- The high scores and player achievements system also require high availability to record and display player scores and achievements in real time.
- The user data collection system for personalizing the gaming experience needs to be highly available to collect and process user data efficiently.

TerramEarth:

For TerramEarth, high availability is essential for their IoT sensor data system, which provides crucial data for improving their products and services.

The migration of their existing on-premises data infrastructure to the cloud needs to ensure high availability to prevent any disruption to their operations.

The data analytics solution for deriving insights from sensor data also requires high availability to ensure continuous access to valuable business insights.

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
Caching is storing the most important immediate use data in low latency services to improve retrieval and storage speed. For example, using a high performance SSD on a raid array as the cache, or a redis server. Google's managed caching service is made highly available.

::: tip
Memcached and redis are supported by Google's Cloud Memory Store.
:::
#### High Availability Storage Requirements in Case Studies

* Tristar Healthcare's active data available through the API will need to be highly durable and highly available at all times. Thier databases should take advantage of a managed database sorage solutions.
* Lord Byron needs highly durable storage for retaining permenant videos of speakers using `archive` class object storage. They also need always available storage for serving the most recent videos to students on their website. If transcoding is intense you might consider an extreme IOPS or SSD but a Regional SSD will have better availability. You might transcode locally and copy to an available drive.
* LCSoft will need durable and highly available Big Table as well as Firestore or Firebase Realtime Database. They can achive this as these services are fully managed. If they required some durable volume space to share among gaming servers, highly durable Regional Balanced PDDS with backups. Their billing will be supported by *Cloud Spanner*.
* Granger Excavation will have highly available storage in BigQuery.
### Network Availability
Using premium tier networing and redunant networks, you can increase network availability. If one interconnect is down, often a second will provide protection against connectivity loss. Interconnects have a minimum of 10Gbps and traffic does not cross the public internet. When crossing the internet is not a problem, Google offers and HA VPN which has redundant connections and offers a 4 9s(99.99%) uptime SLA.

Communication within Google usually uses their low latency *Premium Network* teir which doesn't cross the internet and is global. Standard networking tiers will not be able to use this global network and so cannot take advantage of global load balancing. Communications within the cloud on the Standard Networking tier do cross the internet.
#### High Availability Network Requirements in Case Studies
Since networking requirements are not often specified, the Architect should analyze the requirements, ask questions and suggest the most cost effective solution which meets the needs of the requirements both business and technical.
### Application Availability
Application Availablility is 3 parts infrastructure availability(network, storage, and compute), but its 1 part reliability engineering in the application design, integration and deployment. Logging and Monitoring is the most appropriate way to handle availability unknowns in the application. Technical and Development processes iterate over the logs and alerts in order to acieve their reliability SLOs within the application.

::: tip
Add *Cloud Monitoring* with alerts as part of your availability standards to increase application and infrastructure reliability.
:::

## Scalability
This is the ability to add or remove resources based on load and demand. Different parts of the cloud scale differently and efficienly.
* *Managed Instance Groups*, for instance, increase and decrease the amount of instances in the group.
* *Cloud Run* when no one is requesting a resource, scales replicas of containers down to 0.
* Unstructured Databases scale horizontally making consistency the main concern.

Stateless apllications can scale horizontally without additional configuration or without each unit needing to be aware of the other. Stateful applications, however, generally scale vertically but can scale horizontally with certain solutions:
* Putting session data into a Redis cache in Cloud Memorystore
* Shared volumes
* Shared Database such as Cloud SQL

Resources of different flavors scale at different rates based on needs. Storage might need to scale up once a year while compute engine resources might scale up and down every day. Subnets do not auto scale so when creating a GKE cluster you'll have to configure its network to handle the scaling of the node pool.

::: tip
Scale database servers by allocating higher cpu and memory limits. This way, non-managed relational database servers often can handle pead load without scaling.
:::

If you decouple your services which need to scale, they can scale separatley. For example, if your mail server system is a series of services on a VM like postfix, dovcot and mysql, to scale it you'd have to scale the whole VM. Alternatively, decoupling the database from your VM allows you to have more hosts that use the same information with a shared volume. Containerizing each process in the mail server, however, will allow you to scale each customer facing service to the exact appropriate level at all times.

::: warning
Scaling often depends on active user count, request duration, and total memory/latency per process/thread.
:::

The only network scaling you might do with GCP is increasing your on-premasis bandwidth to GCP by increasing the number of interconnects or try an additional VPN over an additional internet connection.
### Scaling Compute Resources
Google Compute Engine, Google Kubernetes Engine supports autoscaling while App Engine and Cloud Functions autoscale out of the box.

#### Scaling Compute in GCE
MIGs will scale the number of instances running your application. Statefully configured VMs cannot autoscale. Unmanaged instance groups also cannot autoscale. Compute instances can scale by CPU utilization, HTTP Load Balancing utilization, and metrics monitored with monitoring and logging.

Autoscaling policies define targets for average CPU use, this is compared to the data collected in the present and if the target is met, the autoscaling policy will grow or shring the group.

Autoscalers can make decisions and recommend a number of instances based on the metrics it is selected to use. You can autoscale based on time schedules and specify the capacity in the schedule. The Scaling schedule will operate at a start time, for a duration, with configuration about requency to reoccur. This enables to you skip slow days in the schedule. Use this option for predictable workloads which may have a long startup time. When using autoscaling with processes that have a long start, often the request times out before the scaling is completed. It is important that you use the appropriate scaling strategy to match what you're dealing with.

When MIGs are scaled in or down, they can be set to run a script upon shutdown with a best-effort with no gaurentees. If this script is doing quick artifact collection, it will probably run. If it is doing a heavy shutdown workload, it may stall or be killed.

::: danger Cannot Autoscale
* Stateful instance workloads
* Unmanaged instance groups
:::
#### Scaling Compute in GKE

Containers with sidecars or containers that run in the same pod will be scaled up and down together. Deployments specify replicasets which are sets of identically configured pods with a integer for a replica count. You can scale a deployment up from 1 to any number your worker nodes support.

Kubernetes autoscaling is split horizon, scaling the cluster and scaling what is in the cluster. Node pools are groups of nodes which have the same configuration. If a pod is deployed into a node pool that has no more resources, it will add another node to the pool.

Specifying the minimum and maximum number of replicas per depoyment with resource targets like CPU use and a threashold, in cluster scaling operates effortlessly.

### Scaling Storage Resources

GCP uses virtualized storage, so a volume may not be a physical disk.

Locally attached SSD on VMs which aren't persistent are the least scalable storage option in GCP. Preemptible VMs volumes are cleaned when VMs are preempted.

Zonal and regional persistent idsks and persistent SSDs are scalable up to 64TB while increasing performance is a matter of provisioning and migrating to a new disk with a higher IO operations per second(IOPS). Once you add a disk to a system, you have to use that systems commands to mount it and make it available for use. You may also have to sync data to it and remount it in the place of a lower performing disk. This isn't scaling and it isn't automatic but is often required planning to grow a design beyond its limits.

All managed services either automatically scale or must be configured to do so. BigQuery, Cloud Storage, Cloud Spanner, to name a few, provide scalable storage without effort. Big Query charges by data scanned. So if you logically partition the data by time, you can avoid scaling costs up when you scale your workload. Scanning only the last weeks of data will enable BigQuery to improve query time.

### Network Design for Scalability

When designing connections from GCP with VPNs or interconnects, you need to plan for peak, or peak-plus-twenty(peak + 20%). Check with your provider as you may only be charged for traffic or bandwidth actually used.
## Reliability
*Reliability* is repeatable consistency. Try/Catch statements are an example of reliabiity in code. If your app does the same thing all the time, but only under the circumstance it was developed in but not all the circumstances it was designed for it sn't reliable. Another example of reliability is when an applications uses methods of quietly reconnecting to a database in the case of bandwidth issues.

Reliability is a specific part of availability which hovers around human error. Reliability Engineering is the practice of engineering to have your workload run consistently under all the circumstances which it will face within the scope of its support and design, or within the scope of what's normal and reasonable.

To measure reliability, one measures the probability of failure and then tries to minimize it to see if they can have an affect on that measurement. This involves defining standards, best practices, identifying risk, gracefully deploying changes.

It is important to be throughly versed in your workload's dependencies, their dependencies and the teams or organizations which provide those and the documentation produced by those entities. Knowing these trees will make the difference in the successful reliabiliy of a design.

### Measuring Reliability

Uptime is one way to measure reliability, percentage of failed deployments to production to successful deployments is another. All of that shit should be wored out in lower environments. Other metrics may need to be logged or cataloged and placed in a report or dashboard for regular collection. Number of failed requests that didn' return 200 versus number of successful requests. Each workload will have different reliability measurements. A set of microservices that together create a mail server will want to measure delierability and mail loss from the queue. You'll have to design around these metrics.

### Reliability Engineering

The design supports reliability in the long run by:
* Identifying the best way to monitor services
* Deciding on the best way to alert team and systems of failure.
* Consider incedence response procedues those teams or systems will trigger
* Implement tracking for outages, process introspection, to understand disruptions

Emphasize issues pertaining to management and operations, decide whose responsibilities are whose.

## Exam Essentials

* Be able to contrast availablility scalability, reliability, and availablility
* Know how redundancy improves availability
* Rely on managed services to increase availability and scalability
* Understand the availability of GCE Migs and GKE globally loadbalanced Regionally replicate clusters
* Be able to link reliability to risk mitigation

## Official Resources
* [Load Balancing and Autoscaling Compute Engine](https://cloud.Google.com/compute/docs/load-balancing-and-autoscaling#:~:text=documentation%20for%20descriptions.-,Autoscaling,need%20for%20resources%20is%20lower.)
* [Cluster Autoscaling Kubernetes Engine](https://cloud.Google.com/kubernetes-engine/docs/concepts/cluster-autoscaler)
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.Google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.Google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.Google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.Google.com/docs)




