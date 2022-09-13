---
icon: cloud
date: 2022-09-14
category:
  - Google Cloud
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
---

# Designing and Planning GCP Solutions for Business Requirements

[[toc]]

## Key Considerations
* Business Use Case & Product Strategy
* Cost Optimization
* Dovetail with Application Design
* Integration with External Systems
* Movement of Data
* Security
* Measuring Success
* Compliance and Observability

## Business Use Cases and Product Strategy

Business requirements dictate technical requirements implicitly. From statements like:

### Tristar Healthcare

#### Business Requirements

* B2B services to various entities, vendors, insurance providers, network directories, etc.
* Different entities will need different access to read and change records and information.
* Different entities are of different expertiese
* The services will always need to be up.
* Some of the information entities will access is regulated.
* Confidentiality
* The data will track the number of times and the type of data accessed and gain insight into trends.

#### Technical Requirements

* They will need to publicly expose an API or set of them.
* Access will need to be restricted in the API
* There will be legacy systems involved because of insurance entities.
* Redundant infrastructure
* Data Lifecycles will have to take into account regulation, insights, and access controls.
* Cloud Machine Learning can build their insight models faster than they can be planned and built.

### Lord Byron MBA

#### Business Requirements

Acton MBA is a school which invites speakers to give presentations to students. These speakers are expensive so the school want's to maximize their investment.

They want to record and stream these presentations on a web portal and for live and post review by students with logins. They want to reduce latency. They want to monitor when the students interact with the videos and derive insights as to which videos people rewatch.

Because these requirements are limited, we can only begin to speculate about what the technical requirements will be.

### Your Mother Is Now A Gamer, Inc

#### Business Requirements

This company makes web based and app based phone games that must interact with a High Scoring system, collect minimal user data. They are global and so the user data they collect is regulated in some parts of the globe. Because it is a phone app they want latency to be as low as possible. They are interested in Managed services which can automatically scale. We can begin to anticipate where we want the high score data to end up but we cannot yet flush out all the requirements that can be known.

### Granger Excavation, Inc

#### Business Requirements

Granger Excavation uses GPS coordinates to excavate and pave properties so new buildings can be built in areas that need topographical alterations.

They constantly stream location data of their digging vehicles to an on-premises database for later analysis. Once streamed this data doesn't change. Each vehicle has a tablet running their custom application which allows them to excavate by GPS instead of staked out areas with construction ribbon which constantly has to be maintained.

People combine the CAD Drawings with location coordinates and the tablet displays its own location within the perimeter. They want to migrate all of this to cloud.


## Application Design

Business requirements will affect application design when applications are brought into the cloud. In every set of requirements, stated or unstated will be the desire to reduce cost.

* Licensing Costs
* Cloud computing costs
* Storage
* Network Ingress and Egress Costs
* Operational Personnel Costs
* 3rd Party Services Costs
* Sanctions on missed SLA costs
* Inter-connectivity charges

These contribute to the Total Cost Ownership(TCO) of a cloud project.

### Managed Services

Google has a set of managed services like Cloud SQL which remove the low level work from running these services yourself.

Some of these include:

* Compute Engine
  * Virtual machines running in Google’s data center.
* Cloud Storage
  * Object storage that’s secure, durable, and scalable.
* Cloud SDK
  * Command-line tools and libraries for Google Cloud.
* Cloud SQL
  * Relational database services for MySQL, PostgreSQL, and SQL Server.
* Google Kubernetes Engine
  * Managed environment for running containerized apps.
* BigQuery
  * Data warehouse for business agility and insights.
* Cloud CDN
  * Content delivery network for delivering web and video.
* Dataflow
  * Streaming analytics for stream and batch processing.
* Operations
  * Monitoring, logging, and application performance suite.
* Cloud Run
  * Fully managed environment for running containerized apps.
* Anthos
  * Platform for modernizing existing apps and building new ones.
* Cloud Functions
  * Event-driven compute platform for cloud services and apps.
* And dozens more.

To see an exhaustive list, please see [My List of All GCP Managed Services](list-all-google-cloud-platform-gcp-managed-services.md)


### Reduced-level Services

Many times when computing needs are considered, certain services with
availability requirements lower than others can benefit from reduced-level
services. If a job that must be processed can have those processes paused during
peak times but can otherwise run normally, it can be preempted.

Reduced level services:

* Preemptible Virtual Machines
* Spot VMs
* Standard Networking
* Pub/Sub Lite
* Durable Reduced Availability Storage

#### Preemptive VMs
Preemptable VMs are shutdown after 24 hours and google can pause them at any
time. Running process on those vms do not stop but they slow to a crawl and
speed back up when services become available. You can write a rubust application by
setting it up to detect the preemptions. These VMs cost 60-90% or so less than
their standard counterparts.

Preemptible VMs also get discounts on volumes and GPUs. Managed resource groups
will replace a preempted VM when it is suspended after 24 hours. Preemptible VMs
can use other services to reduce the overall cost of using those services with VMs.

#### Spot VMs

Spot VMs are the next generation Preemptible virtual machine. Though spot VMs
are not automatically restarted, they can run for longer than 23 hours. Spot VMs
can be set to a stopped state or be deleted on preemption. With a managed
resource group of spot VMs, one can set the VMs to be deleted and replaced when
resources are available.


#### Standard & Premium Networking
Premium Networking is the default, but Standard Tier Networking is a lower
performaing option. With Standard Tier Networking, Cloud Load Balancing is only
regional load balancing and not global balancing. Standard Networking is not
compliant with the global SLA

#### Pub/Sub Lite vs Pub/Sub
Pub/Sub is an extermely scalable but Pub/Sub Lite can be scaled providing lower
levels of cost-effective service.

Pub/Sub come with features such as parallelism, automatic scaling, global
routing, regional and global endpoints.

Pub/Sub Lite is less durable and less available than Pub/Sub. Messages can only
be replicated to a single zone, while Pub/Sub has multizonal replication within
a region. Pub/Sub Lite users also have to manage resource capacity themselves.

But if it meets your needs, Pub/Sub Lite is 80% cheaper.

#### App Engine Standard vs Flexible
App Engine Standard allows scaling down to zero, though the trade offs are that
you can only use a set of languages, can only write to /tmp with java, can't
write with python. Standard apps cannot access GCP services, cannot modify the
runtime, or have background processes, though they can have background threads.

#### Durable Reduced Availability Storage(DRA)
These are buckets which have an SLA of 99% availability instead of equal to and
greater than 99.99% availability. Storage operatios are divided into class A and
class B operations

|API|Class A(\$0.05-\$0.10\*/10,000 ops)|Class B(\$0.004-\$0.01\*/10,000 ops)|
|----|----|----|
|JSON|storage.\*.insert1|storage.\*.get|
|JSON|storage.\*.patch|storage.\*.getIamPolicy|
|JSON|storage.\*.update|storage.\*.testIamPermissions|
|JSON|storage.\*.setIamPolicy|storage.\*AccessControls.list|
|JSON|storage.buckets.list|storage.notifications.list|
|JSON|storage.buckets.lockRetentionPolicy|Each object change notification|
|JSON|storage.notifications.delete||
|JSON|storage.objects.compose||
|JSON|storage.objects.copy||
|JSON|storage.objects.list||
|JSON|storage.objects.rewrite||
|JSON|storage.objects.watchAll||
|JSON|storage.projects.hmacKeys.create||
|JSON|storage.projects.hmacKeys.list||
|JSON|storage.\*AccessControls.delete||
|XML|GET Service|GET Bucket (when retrieving bucket configuration or when listing ongoing multipart uploads)|
|XML|GET Bucket (when listing objects in a bucket)|GET Object|
|XML|POST|HEAD|

\* DRA Pricing, otherwise Standard Pricing

### Data Lifecycle Management

Sort your data along a spectrom immediate use to persistent use to infrequent
use.

* Memorystore

## Systems Integ and Data Management
### Systems Integration Business Requirements
### Data Management Business Requirements
#### How Long?
#### How Much?
#### How Processed?
## Compliance and Regulations
### Privacy Regulations
### Data Integrity Regulations
## Security
### Confidentiality
### Integrity
### Availability
## Success Measures
### Key Performance Indicators
#### Project KPIs
#### Operations KPIs
### Return on Investment(ROI)
### Essentials

Acton MBA will host an application in the cloud. The application

## Official Resources
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.google.com/certification/guides/professional-cloud-architect)
* [Preemptible VMs](https://cloud.google.com/compute/docs/instances/preemptible)
* [Exam FAQ](http://cloud.google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.google.com/docs)