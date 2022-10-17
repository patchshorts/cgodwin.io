---
icon: cloud
date: 2022-09-27
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
---

# Architecting Compute Engine Solutions in GCP

[[toc]]

## Compute Engine Services
Each of these services have different use cases. You'll have to know how to select the right one for your requirements.

|Service|Use Case|Fancy Buzzword|
|---|---|---|
|Compute Engine|If you need root access and are running multiple processes in the same operating system instance.|Infrastructure as a Service (**IaaS**)|
|App Engine|You need to run a nodeJS, Java, Ruby, C#, Go, Python or PHP application quickly with no configuration or management.|Platform as a service (**PaaS**)|
|Cloud Functions|You need to run a serverless routine.|Executions as a Service (**EaaS**)|
|Cloud Run|Run individual containers.|**PaaS**|
|Kubernetes Engine|Run several docker containers in group.|Containers as a Service (**CaaS**)|
|Anthos|Run containers in a hybrid or multi-cloud environment.|Hybrid **CaaS**|
### GCE
Compute Engine is an Infrastructure as a Service solution that is the underlying platform for many services like Cloud Functions. Compute Engine provides virtual machines called instances.

New virtual machines require a type be specified along with boot image, availability status, and security options. Machine types are sorted into different CPU and Memory options. Machine types are grouped into families like general purpose, cpu optimized, memory optimized, and GPU-capable.

#### Compute Instance Options
* General Purpose
  * shared-core
  * standard
  * high memory
  * high cpu
* CPU Optimized
  * Standard
* Memory Optimized
  * Mega-memory
  * Ultra-memory
* GPU Capable
  * Type of GPU / GPU Platform
* Disk
  * Standard Persistent Disk (SPD)
  * Balanced Persistent Disk (BPD)
  * SSD Persistent Disk (SPD)
  * Extreme Persistent Disk (EPD)
  * Disk size

#### Compute Disk Options

|Type|Workload|
|---|---|
|Standard Persistent Disks|Block storage for large processing with sequential I/O|
|Balanced Persistent Disks|SSDs which balance cost for less performance with a higher IOPS than SPDs|
|SSD Persistent Disks|Low latency, high IOPS in the single digit milliseconds, databases|
|Extreme Persistent Disks|sequential and random access at highest IOPS that is user configurable|

Compute disks are encrypted automatically with google managed keys or customer managed keys with Google KMS which allows storage outside of GCP. Virtual machines run in your google project as the default GCE service account though you can specify which service account the VM runs as.

##### Sole-tenancy
Sole-tenant VMs in Google compute engine offer a high degree of isolation and security for your workloads. By running your VMs on dedicated hardware, you can be sure that your data and applications are protected from other users on the same system. Additionally, sole-tenant VMs can be configured with custom security settings to further protect your data.

Good for Bring Your Own License (BYOL) applications that are based on the number of CPUs, cores, or memory. Sole tenancy VMs can allow CPU overcommit so that unused cycles can be given to other instances to balance performance fluctuations.

##### Preemptible VMs
Preemptible VMs are a type of VM offered by Google Compute Engine at a discounted price. These VMs may be preempted by Google at any time in order to accommodate higher priority workloads. Preemptible VMs are typically used for batch processing jobs that can be interrupted without affecting the overall workflow.

Preemptible VMs can run for a maximum of 24 hours and are terminated but not deleted when preempted. You can use preemptible VMs in a Managed Instance Group. These types of virtual machines cannot live migrate and cannot be converted to a standard VM. The compute SLA doesn't cover preemptible or spot VMs.

##### Shielded VMs
Shielded VMs in Google Compute Engine provide an extra layer of security by enabling features like secure boot and vTPM. These features help to ensure the integrity of the VM and its contents. Additionally, integrity monitoring can be used to detect and respond to any changes that occur within the VM. By using shielded VMs, businesses can rest assured that their data and applications are safe and secure.

Secure boot is a UEFI feature that verifies the authenticity of bootloaders and other system files before they are executed. This verification is done using digital signatures and checksums, which are compared against a known good value. If the signature or checksum does not match, the file is considered malicious and is not executed. This helps to protect the system from bootkits and other forms of malware that could be used to gain access to the system.

A vTPM is a virtual Trusted Platform Module. It's a security device that stores keys, secrets, and other sensitive data. Measured boot is a security feature that verifies the integrity of a system's boot process. The vTPM can be used to measure the boot process and verify the integrity of the system. This helps ensure that the system is not compromised by malware or other malicious software.

Integrity monitoring is the process of verifying the accuracy and completeness of data. This is typically done by comparing a trusted baseline to current data, looking for changes or discrepancies. Logs can be used to track changes over time, and integrity checks can be used to verify the accuracy of data. Sequence integrity checks can be used to verify the order of events, and policy updates can be used to ensure that data is properly protected. In the context of a *Shielded VM* this is all built into the boot up process of the instances of this type.

##### Confidential VMs
Confidential VMs in Google Compute Engine encrypt data in use, providing an extra layer of security for sensitive information. By encrypting data at rest and in transit, confidential VMs help ensure that only authorized users can access it. Additionally, Confidential VMs can be used to comply with industry-specific regulations, such as HIPAA.

These VMs run on host systems which use AMD EPYC processors which provide Secure Encrypted Virtualization (SEV) that encrypts all memory.

##### Recommender
Google Compute Engine offers a recommender system that can help optimize your compute engine workloads. The recommender system uses Google's extensive data and machine learning expertise to recommend the best way to save on cloud expense, improve security, and make your cloud usage more efficient.

*Recommenders*
* Discount recommender
* Idle custom image recommender
* Idle IP address recommender
* Idle persistent disk recommender
* Idle VM recommender

#### Instance Groups
An instance group is a cluster of VMs that are managed together. Google Compute Engine offers both managed and unmanaged instance groups. Managed instance groups are ideal for instances that need to be closely monitored and controlled, such as web servers or database servers. Unmanaged instance groups are not identical and so they are not 'managed' by an instance template.

An instance template is a blueprint for creating virtual machines (VMs) in Google Compute Engine. You can use an instance template to create as many VMs as you want. To create a VM from an instance template, you must specify a machine type, disk image, and network settings. You can also specify other properties, such as the number of CPUs and the amount of memory.

##### Advantage of Managed Instance Groups (MIGS)
* Minimum availability, auto-replacement on failure
* Autohealing with healthchecks
* Distribution of instances
* Loadbalancing across the group
* Autoscaling based on workload
* Auto-updates, rolling and canary

#### Compute Engine Use Cases
GCP Compute Engine is a flexible, customizable platform that provides you with full control over a virtual machine (VM), including the operating system. This makes it an ideal choice for a wide range of workloads, from simple web applications to complex data processing and machine learning tasks.

GCP Compute Engine can be used to create a VM from a container image. The base image can be stored in GCS or GAR, and GCE uses COS to deploy the image. This allows for a more flexibility and full control over all aspects of a VM running docker.

Cloud Run is a GCP managed service for running stateless containers. It is a serverless platform that allows you to run your code without having to provision or manage any servers. All you need to do is supply your image and Cloud Run will take care of the rest. Cloud Run is highly scalable and can automatically scale your container up or down based on traffic demands.

Google Cloud Platform's Compute Engine can be used for a variety of workloads, from simple web apps to complex distributed systems. Cloud Run is a great option for running stateless web applications or microservices, while Kubernetes can be used for managing containerized workloads at scale. App Engine is also a popular choice for web applications, offering both standard and flexible environments. In addition, Compute Engine can be used for batch processing, analytics, and other compute-intensive workloads.

GCP Compute Engine root access is granted through the cloud console or SSH. Once logged in, you can install packages and run configuration management agents. This gives you full control over your server and its environment.

GCP Compute Engine is a powerful platform for running stateful applications such as databases, accounting systems, and file-based transaction engines. The platform provides high performance, scalability, and reliability specifically for these workloads making it an ideal choice for mission-critical applications. In addition, GCP Compute Engine offers a number of features that make it easy to manage and deploy stateful applications, such as automatic failover and snapshotting.

GCP Compute Engine is a high security environment that offers Shielded VMs and sole-tenancy. This makes it an ideal platform for BYOL. Shielded VMs offer increased security by protecting against malicious activities such as rootkits and bootkits. Sole-tenancy provides an additional layer of security by ensuring that only authorized users have access to the platform.

### Cloud Functions

Cloud functions are a type of serverless computing that allows you to execute code in response to events. This means that you can write code that will be triggered in response to certain events, such as a user request or a file being uploaded. This can be used to invoke additional processing, such as sending a notification or running a report. Cloud functions are a convenient way to add extra functionality to your application without having to provision and manage a server.

Event triggers are a great way to automate tasks in Google Cloud Functions. You can use event triggers to respond to events from HTTP requests, logging, storage, and Pub/Sub. Event triggers can make your life much easier by automate tasks that would otherwise be manual. For example, you can use an event trigger to automatically archive old logs when they're created, or to automatically delete files from storage when they're no longer needed.

#### Cloud Function Triggers
Broadly, triggers fall into two categories:

* HTTP triggers, which react to HTTP(S) requests, and correspond to HTTP functions.
* Event triggers, which react to events within your Google Cloud project, and correspond to event-driven functions.

###### HTTP Triggers
You can use these HTTP methods:
* GET
* POST
* PUT
* DELETE
* OPTIONS

Depending on configuration, HTTP triggers to Cloud Functions can be by both authenticated and unauthenticated means.

###### Event Triggers
* Pub/Sub triggers
* Cloud Storage triggers
* Generalized Eventarc triggers
  * Supports any event type supported by Eventarc, including 90+ event sources via Cloud Audit Logs

###### Execution runtimes
* dotnet core
* Ruby
* PHP
* Node.js
* Python 3
* Go
* Java 11

Requests are handled one at a time on a Cloud Function instance. If the instance doesn't exist it'll be created. You can specify the maximum number of concurrent instances for a function. HTTP triggered functions are executed at most once and other event triggers are ran at least once. Cloud Functions need to be idempotent, meaning that when ran multiple times does less and less work until the work is complete. When an idempotent script is ran after all work is completed, no work is performed.

::: tip Idempotent
A script that downloads all of the pages of a website may be interrupted. If it picks up where it left off on a rerun, or especially if it doesn't redownload the entire site on that rerun, it is idempotent.
:::

###### Cloud Function Use Cases
* Do something when something is uploaded to a Cloud Storage bucket
* Run functions such as sending messages when code is updated
* If a long app operation is issued, send a pub sub message to a queue and run a function around it
* When a queued process completes, write a pub/sub message
* When people login, write to an audit log

### GKE

Google Kubernetes Engine (GKE) is GCP's Kubernetes managed offering. This service offers more complex container orchestration than either App Engine or Cloud Run.

Kubernetes can be used for stateful deployments with certain storage objects configured into your deployment. Kubernetes has internal hooks that are auto configured by google to provide you with GCP provisioned architecture when you deploy it. Kubernetes has different storage classes and some can be marked as default. This way when you provision an object of kind `persistentvolumeclaim`, a Cloud persistent disk is spun up, attache to the node running the pod, then mounted into the pod per your specifications.

To put it simple: it will create a cloud volume and mount it where you say in your yaml. You can install your own storage controllers by creating the yaml for one, creating a template that generates one(helm chart), or by following third party storage controller instructions.

The NFS-Ganesha storage controller is the most robust durable way to share highly available disks across a whole region in a cluster or set of clusters. You can set persistent volume defaults so that they don't delete when you delete a k8s object, that way you can specify it in a create-once, reattach many deployment style. You can use logging and monitoring to initiate manual deletes when there are orphaned volumes in the process.

In k8s a combination of privoxy, istio and cert manager can secure connections between pods to institute a trust-no-one level of security. Here we assume your pods can be compromised so we configure them to only talk to the pods which we want and disallow the rest. We can disallow internet access and poke holes only to the services we need. We can ingress only to customer facing services and even put some armor on it by placing CloudFlare or Akamai in front of the services. In this model, we disallow all incoming connections to the ingress that aren't from on-premises or from the proxies we may put in front of your customer facing services.

GKE Orchestrates the following operations:
* Service discovery
* Error correction and healing
* Volume create, deletion, resizing
* Load Balancing
* Configuration
* Restarts, Rollouts, and Rollbacks
* Optimal resource allocation
* Resource Versioning
* Secrets management

As Free and Open Source Software(FOSS), Kubernetes can be self hosted, third-party hosted, or managed as it is hosted. Anthos is google's implementation of that designed to connect to the popular clouds and on-premises.

#### Kubernetes Cluster Architecture

Kubernetes is organized into nodes and masters. Masters usually only have one unless replicated or made highly available by whatever means. Nodes usually connect to masters but managed kubernetes options often group the nodes into node pools.

##### Default Node Pool
There is a default node pool with no toleration or taints specified, defaulted nodes will be added to this pool unless specified. In GKE node pools are specified when you provision the cluster. If using terraform your GKE module or resource ought to specify.

#### Kubernetes Workloads
* Pods
* Services
* ReplicaSets
* Deployments
* Persistent Volumes
* StatefulSets
* Ingress
* Node pool
* CronJob

`Pods` are units of containers. Pods are basically containers if they only have one, but if there are many containers in a `pod`, consider them a dual headed container that shares networking.

`Pods` are ephemeral, their file systems are removed and recreated upon start up. Any stored data needs to be placed in storage via a `volume` and `volumemount`. Pods are deployed by the scheduler on nodes per no rules or specified rules.

`ReplicaSets` are controllers which scale `pods` up and down per specifications in the `deployment`.

`Services` are in-custer dns abstractions as proxies which route to to `pods`.

`Deployments` are 

#### 
### Cloud Run

Google Cloud Run is a serverless and stateless computing platform for container images. This product is ideal for deploying microservices and handling large scale data processing jobs. Cloud Run is highly scalable and can be deployed on demand.

You aren't restricted to a set of runtime options, you build your runtime as a docker image and push to Google Artifact Registry or Google Container Registry. Google Cloud Run pulls the image and runs it.

::: tip Cloud Run Availability
Google Cloud Run has regional availability.
:::

If you app can only handle a single request or if that request uses most of the container's resources, set its replica count to 1. You can set the maximum amount of requests a container can handle before it is killed and restarted. You can also adjust for avoiding cold starts by setting the minimum available count.

Each Cloud Run deployment is considered a revision and rollbacks when the latest revision is unhealthy is automatic. In fact, the health of a new revision is verified before traffic is sent to the most recent deployment. Each deployment in Cloud Run is a set of yaml syntax configuration that can live in a repo or inside Cloud Run itself. You can run gcloud against this file to issue new deployments or you can use command line options.

### App Engine
App Engine is a serverless PaaS that runs on Google's compute engine. It is fully managed, meaning you only need to provide your code. App Engine handles the rest, including provisioning servers, load balancing, and scaling.

#### Standard

App Engine Standard is a serverless environment that runs on Google's compute engine. It is a fully managed PaaS that requires only code. There are no servers to manage. You simply upload your code and google detects how to build it and runs it on App Engine.

##### Standard Code Environments
* Python 2.7, Python 3.7, Python 3.8, Python 3.9, and Python 3.10.
* Java 8, Java 11, and Java 17.
* Node. js 10, Node. js 12, Node. js 14, Node. js 16.
* PHP 5.5, PHP 7.2, PHP 7.3, PHP 7.4, and PHP 8.1.
* Ruby 2.5, Ruby 2.6, Ruby 2.7, and Ruby 3.0.
* Go 1.11, Go 1.12, Go 1.13, Go 1.14, Go 1.15, and Go 1.16.

App Engine Standard provides two types of instance classes or runtime generations: first-generation and second-generation. First-generation instance classes are legacy, while second-generation instance classes are offered for Python 3, Java 11 & 17, Node.js, PHP 7, Ruby, and Go >= 1.12. The F1 class is the default instance class and provides 600Mhz CPU limit and 256MB of memory. The maximum instances can have is 2048MB or ram and 4.8Ghz Compute speed.

First generation is provided for Python 2.7, PHP 5.5, and Java 8.

##### App Engine Flexible
App Engine Flexible allows you to customize the runtime via `Dockerfile`. This gives you the ability to modify the supported App Engine Flexible runtime and environment. You can also deploy your own custom containers. This makes it easy to scale your app and keep it running in a consistent environment.

* Go
* Java 8
* dotnet
* Node.s
* PHP 5/7
* Python 2.7 and 3.6
* Ruby

###### Custom Runtimes
You can SSH into App Engine instances run custom docker containers and specify CPU and memory configuration. Other features include:

* Health Checks
* Automatically updated
* Automatic replication of VM instances
* Maintenance restarts
* Root access

#### Use Cases
App Engine can be used for a variety of applications, from simple websites to complex applications that handle millions of requests. Some common use cases include:

* Web applications: App Engine can host standard web applications written in languages like PHP, Java, Python, and Go.
* Mobile backends: App Engine can be used to power the backend of mobile applications written in any language.
* API services: App Engine can be used to build APIs that can be consumed by other applications.
* IoT applications: App Engine can be used to build applications that collect and process data from IoT devices.
* Data processing applications: App Engine can be used to build applications that process large amounts of data.

#### App Engine Flexible Key Differences from GCE
* Flexible containers are restarted once a week
* SSH can be enabled, but is defaulted to disabled
* Built using cloud build
* Settings controlled location and automatic collocation

App Engine includes a cron service, and deploys into many zones by default. App Engine is designed to run stateless workloads but you can write to disk on App Engine Flexible. App Engine provides task queues for a synchronous and background computing.

## Anthos
### Anthos Service Mesh
### Multi-cluster Ingress
## AI and Machine Learning
### Vertex AI
### Cloud TPU
## Dataflows and Pipelines
### Pub/Sub Pipelines
### Cloud Dataflow Pipelines
### Cloud Dataproc
### Cloud Workflows
### Cloud Data Fusion
### Cloud Composer
## Compute Systems and Provisioning
## Compute Design problems
### State
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




