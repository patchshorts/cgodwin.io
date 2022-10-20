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

`Deployments` are controllers of pods running the same version of a container artifact.

`PersistentVolumes` are volumes requested from storage controllers, either CSI requests volumes from the cloud which attacheds to a specific Kubernetes Node. Other types of volumes exist as different storage class attributes on the persistent volume.

`PersistentVolumeClaims` are the ways pods refer to a `persistentvolume`.

`StatefulSets` are like `deployments` in that they create pods, but the pods are always named the same consistent name with the replica number appended starting with zero.

`Ingress` objects define rules that allow requests into the cluster targeting a service. Some ingress gateways are capable of updating cloud dns entries directly while there's always a docker image out there which will watch your public ips on your ingress load balancers and update Cloud DNS.

`Node Pools` are commony labeled and generally of the same hardware class and size with the same disk geometry across nodes. One can run an NFS Ganesha storage controler from helm chart on a certain set of node pools using a shared volume on the instances. You can run one or two nodes in that pool and consider it a storage pool and then create another node pool that is your workload node pool, whose pods utilize the storage controler's storage class. Kubernetes does the automatic job of connecting the NFS controller pods to the service pods. The controler pods can use `PersistentVolumes` of a more durable gcp default storage class which uses persistent disks.

`Node pools` and their labels allow pods to be configured with nodeAffinities and nodeSelectors among other ways of matching workloads to pools designed to handle their resource consumption.

#### Types of Clusters

Kubernetes Clusters come in two forms:

* Standard
* Autopilot

Standard is the most flexible but Autopilot is the easiest and requires the least management.

|Feature|GKE Standard|GKE Autopilot|
|--|--|--|
|Zonal|🟢|🔴|
|Regional|🟢|🟢|
|Add Zones|🟢|⚪|
|Custom Networking|🟢|🔴 VPC native|
|Custom Version|🟢  |🔴 GKE Managed|
|Private Clusters|🟢|🟢|

#### Kubernetes Networking

Inside the cluster, networking is generally automatic. Outside the cluster, huge workloads, however, will often have to build node pools on top up subnets which are large enough for the `NodePool` to scale into.

Within the cluster service networking is handled by:

* Ingresses: which stand up external load balancers that direct traffic at one of the services in the cluster.
* Services
  * ClusterIP, a private ip assigned to the vpc subnet that the cluster is using
  * NodeIP, the ip of the node a pod is running within
  * Pod IP, local private networks

Like the subnets of the nodepools, you'll have to give pod subnets enough room to run your pods.

##### Service Types

Services can either be LoadBalancer for an external loadbalancer, ClusterIP for an ip that is only accessible within the cluster.

NodePort type services use an assigned port from the range 30000-32768 on the Node IP of the node that the pods which the service points to runs in.

LoadBalancers automatically create NodePort and ClusterIP resources and externally route traffic to them from a Cloud Provided LoadBalancer.

Load balancing across pods and containers is automatic, while service loadbalancing is external.

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

Google Cloud Anthos is an advanced cloud computing service that provides the flexibility to run your containerized applications on-premise or in the cloud.

At its core, Google Cloud Anthos offers access to the benefits of the cloud without having to move all of your applications there. So you'll be able to use the same tools, processes, and infrastructure you're used to today—and still access the benefits of having a global platform.

Google Cloud Anthos offers security and privacy by design; it's built with multi-factor authentication and encryption at all levels of data storage, from internal compute instances to external storage systems. It also has built-in threat detection capabilities that alert you when something seems fishy.

Google Cloud Anthos gives you access to powerful analytics features through its real-time reporting dashboard and machine learning algorithms that help you make better decisions based on data. And because everything runs in a virtual environment on Google's worldwide network of datacenters, there are no limits on how many applications can run at once—so long as they're all within one region or continent!

Anthos:
* Centrally managed
* Can use Version Control Based rollbacks
* Centralizes infrastructure in a single view
* Centralizes deployments and rollouts
* Enables Code instrumentation(performance measurements) using ASM
* Uses Anthos Service Mesh(ASM) for auth and cert based routing

::: tip
Anthos is just Kubernetes designed to run in GCP, other cloud providers, and on-premises. 
:::
### Anthos Service Mesh
Service meshes are patterns which provide common frameworks for intra-service communication. They're used for monitoring, authentication, networking. Imagine wrapping every service in an identity aware proxy, that's a service mesh. Difficult to set up initially, service meshes save time by defining systematic policy-compliant ways of communicating across infrastructure. Facilitating hybrid and multi-cloud communications is what Anthos Service Mesh does.

ASM is built on istio which is an open source service mesh. In a service mesh there is a control plane which configures sidecar proxies running as auxiliary services attached to each pod.

Anthos Service Mesh:
* Can control the traffic between pods on the application and lower layers.
* Collects metrics and logs
* Has preconfigured Cloud Monitoring Dashboards
* Service authentication with mutual TLS certificates
* Encryption of communication with the Kubernetes Control Plane

ASM can be deployed in-cluster, across Compute VMs or via Managed Anthos Service Mesh. In-cluster options include running the control plane in kubernetes to manage discovery, authentication, security and traffic. With managed ASM google managed the control plane, maintains it, scales it and updates it. When running istiod on Compute Engine, you can have instances in groups take advantage of using the service mesh. Anthos Service mesh only works on certain configurations for in-cluster VMWare, AWS EKS, GCP GKE and bare metal, while you must use an attached cluster if using Microsoft AKS.

### Multi-cluster Ingress

The Anthos Multi-Cluster Ingress controller is hosted on Google Cloud and enables load balancing across multi-regional clusters. A single virtual ip address is provided for the ingress object regardless of where it is deployed in your hybrid or multi cloud infrastructure setup. This makes your services more highly available, enables seamless migration from on-premises to the cloud.

The Ingress controller in this case is a globally replicated service that runs outside of your cluster.

### Anthos Deployment Permutations

You can deploy anthos a number of ways depending on your needs and the features you would like to utilize. ASM and Anthos Config Management(ACM) are included in all Anthos deployments.

* Traffic rules for TCP, HTTP(S), & gRPC
* All HTTP(S) traffic in and out of the cluster is metered, logged and traced
* Authentication and authorization at the service level
* Rollout testing and canary rollouts

Anthos Config Management uses Kustomize to generate k8s yaml that configures the cluster. Yaml can be grouped into deployed services and supporting infrastructure. An NFS helm chart might be deployed to a cluster using ACM at cluster creation time to support a `persistentvolume` class of NFS *within* the deployment yaml.

ACM can be used to create initial kubernetes serviceaccounts(KSAs), namespaces, resource policy enforcers, labels, annotations, RBAC roles and role bindings. GKE Anthos deployments support a number of features:

* Node auto provisioning
* Vertical pod autoscaling
* Shielded GKE Nodes
* Workload Identity Bindings
* GKE Sandboxes

ACM, ASM, Multi-Cluster ingress, and binary authorization also come with the GKE implementation of Anthos.

On-Prem Anthos GKE On-prem includes these features:

* The network plugin
* Anthos UI & Dash
* ACM
* CSI storage and hybrid storage
* Authentication Plugin for Anthos
* When running VMWare
 * Prometheus and Grafana
 * Layer 4 Load Balancers

Anthos on AWS includes:

* ACM
* Anthos UI & Dashboards
* The network plugin
* CSI storage and hybrid storage
* Anthos Authentication Plugin
* AWS Load Balancers

Attached Clusters which run on any cloud or On-prem have these features:

* ACM
* Anthos UI & Dash
* Anthos Service Mesh

## AI and Machine Learning

GCP offers several AI options and machine learning options. Vertex AI is an AI platform that offers one place to do machine learning. It handles development, deployment and scaling the ML models. Cloud TPUs are training accelerators for training deep networks.

Google also provides:
* Speech-to-Text
* Text-to-Speech
* Virtual Agents
* Dialogflow CX
* Translation
* Vision OCR
* Document AI

### Vertex AI
Vertex AI is basically a merger of two products: AutoML and the AI Platform. The merged Vertex AI provides one api and one interface for the two platforms. With Vertex you can train your models or you can let AutoML train them.

Vertex AI:
* Supports AutoML training or custom training
* Support for model deployment
* Data labeling, which includes human assisted labeling training examples for supervised tasks
* Feature store repo for sharing Machine Learning features
* Workbench, a Jupyter notebook development environment

Vertex AI provides preconfigured deep learning VM images and containers.

### Cloud TPU

Cloud TPU are Cloud Tensor Processing Units(TPUs) that are Google designed application specific integrated circuits(ASICs). They can train deep learning models faster than GPUs or CPUs. A Cloud TPU v2 can offer 180 teraflops, and a v3 420 teraflops. Groups of TPUs are called pods and a v2 pod can offer 11.5 petaflops while a v3 pod provides over 100 petaflops.

You can use Cloud TPUs in an integrated fashion by connecting from other Google services, for example, the Compute VM running a deep learning operating system image. TPUs come in preemptible form at a discount.

## Dataflows and Pipelines

The model of the monolithic application is dead. It may be tempting to put your whole business on one web application but when an enterprise runs an application at scale, there are dozens of supporting applications that ensure reliability, applications which meter the availability, application code which deploys highly customized pipeline steps and standards, especially in the financial industry. At Enterprise scales, the pipeline or workflow steps have a Check to Action Ratio(CtAR) of probably 1 to 20. This means we'll have about 20 checks, tests, tracking, metering, or logging steps to one step which actually makes a change like `kubectl` or `cf push`. And that's just deployment.

To illustrate this dimension further there's disaster recovery, durability, maintenance, ops and reporting all done as part of Continuous Deployment Standards. Therefore, each application is an ecosystem of standards and reporting.

Add to that that a company is often now an entire ecosystem of applications which work together, this is especially true for Internet of Things companies, for example. Some of these operations may have even been made auxiliary by leveraging some serverless functions, triggers, or webhooks.

Consider, for a moment, a vehicle insurance claim made on behalf of a driver by their spouse, the processing workflow of the claim might look like this:

* Verifying that the spouse is on the policy and has access to file a claim.
* Analyzing the damage and repair procedures and assigning a value to the damage
* Reviewing the totals to make sure the repairs don't exceed the value of the vehicle
* Any fraud compliance reviews
* Sending these interactions to a data warehouse for analysis
* Sending the options and communications of circumstance to the claimant

Different applications monolithic or not will process this data in different ways.

If you buy a product online the inventory application may be a monolithic system or microservices, it may be separate or built into something else, but likely it is independent is some wise. A grocery story self checkout application would have to interact with this inventory application much like a cashier's station. Each station is a set of services from the receipt printer to the laser scanner to the payment system. A simple grocery story transaction is not so simple and is fairly complex.

It is of key importance to consider the entire flow of data when designing for GCP.

### Pub/Sub Pipelines
Cloud Pub/Sub is a giant buffer. It comes in regular and lite flavors. It supports pushing messages to subscribers or having subscribers pull messages from the queue. A message is a record or entry in the queue.

With push subscriptions, Pub/Sub makes and HTTP POST to a push endpoint. This method benefits when there is a single place to push in order to process the workload. This means its a perfect way to post to a Cloud Function, App Engine App, or Container.

Regarding pull subscriptions, services read the messages from the Pub/Sub topic. This is the most efficient method for processing large sets of messages within a topic. Pub/Sub works best when it is used as a buffer between communicating services which cannot have synchronous operations due to load, differences in availability, differences in resource pools serving the sending and receiving services. Consider a service that can quickly collect and send messages. It certainly uses less resources than the consuming services which has to do additional processing work on the messages. It is highly likely that at some point in time the sending service will be able to exceed the speed of the consuming service. Pub/Sub can bridge that gap by buffering the messages to the processing service. In a synchronous design, messages would be lost if there was no place for the sending service to put them. In this case Pub/Sub bridges the gap.

::: tip
Pub/Sub is good for buffering, transmitting or flow controlling data. If you need to transform the data, Cloud Dataflow is the way to go.
:::

### Cloud Dataflow Pipelines
Cloud Dataflow is Apache Beam stream processing implemented as a fully managed Google Cloud Platform service. Normally you'd have to provision instances of this service on virtual machines, but google managed the entire infrastructure for this service and maintains its availability and reliability.

The service works via processing code written in Python, Java or SQL. Code can be batch or stream processed. You can combine services and send the output from Dataflow into Dataproc or BigQuery or BigTable and so forth. Dataflow is organized into pipelines that are designed to tackle the work of the part of the app that comes after ingests data, but otherwise can be used anywhere Apache Beam is used in applications.

### Cloud Dataproc
Dataproc is managed Spark + Hadoop. This is for stream / batch processing and machine learning at the largest magnitudes. Dataproc clusters are stood up and taken down quickly so they're often treated as ephemeral after they produce batch results. Obviously a stream processing effort may run all the time, but if the stream is some sort of live data from an occasional event, like Olympics score data or Sports, can create the need for ephemeral clusters in either case.

Dataproc is already integrated with BigQuery, BigTable, Cloud Storage, Cloud Logging, Cloud Monitoring. This services replaces on-premises clusters in a migration.

### Cloud Workflows
Workflows are HTTP api services and workflows. In conjunction with Cloud Run, Cloud Functions, GitOps webhooks, Cloud Build Triggers and so forth, you can accommodate any business and technical requirements. You set them up as `yaml` or `json` steps.

You can trigger a workflow to make several api calls in sequence to do a workload. Workflows do not perform well processing data, rather they do smaller actions in a series well. You wouldn't use workflows to make large http `POST` calls.

### Cloud Data Fusion
Another managed service, Cloud Data Fusion is based on something called **Cask Data Application Platform (CDAP)**, which Atlassian defines as "a developer-centric middleware for developing and running Big Data applications. Before you learn how to develop and operate applications, this chapter will explain the concepts and architecture of CDAP."

This platform allows the ELT pattern of extraction, load, and transform as well as the ETL pattern of extraction, transformation, load. It allows this without any coding. CDAP allows drag and drop interfaces as a no-code development tool that has around 200 connectors and transformations.

Cloud Data Fusion instances are deployed as one in three versions: developer, basic, and enterprise.

|Developer|Basic|Enterprise|
|-|-|-|
|low cost but limited|visual editor, preloaded transformations, and an SDK|streaming, integration, high availability, triggers and schedules|

### Cloud Composer
Composer is basically a managed instance of Airflow which is a workflow coordination system that fires off workflows of a specific type: directed acyclic graphs (DAGs), which are python definitions of nodes and their connections. Here is an example:

```python
import networkx as nx
graph = nx.DiGraph()
graph.add_edges_from([("root", "a"), ("a", "b"), ("a", "e"), ("b", "c"), ("b", "d"), ("d", "e")])
```

![DAG example](https://mungingdata.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-25-at-9.48.21-AM.png)
* example from [Munging Data](https://mungingdata.com/python/dag-directed-acyclic-graph-networkx/)

These DAGs are stored in Cloud Storage and loaded in to Composer. Google gives this example on the Cloud Composer Concepts Page:

![overview dag and tasks](https://cloud.google.com/static/composer/docs/images/overview-dag-and-tasks.svg)

**Figure 1.** Relationship between DAGs and tasks

Airflow includes plugins, hooks. operators, and tasks. Plugins are combinations of hooks and operators. Hooks are third party interfaces and operators define how tasks are run and can combine actions, transfers, and sensor operations. Tasks are work done symbolized as one of these nodes in the DAG.

Upon execution of a DAG, logs are stored in a Cloud Storage bucket. Each task has its own log and streaming logs are available.

## Compute Systems and Provisioning
You can provision compute services via the console or via terraform. You can run terraform in Cloud Build or in Deployment Manager. Using Terraform allows you to perform GitOps on the processes surrounding version control, integration, pull requests and merging code. Branching strategies allow segmentation of environments. Multiple repositories can be combined into project creation code, infrastructure creation code, access granting code and its best to run all this as a privileged but guarded service account. Enterprises will use a series of layers of access, projects, folders and organizations in complex networks of infrastructure as code. It can all be pulled together using terraform modules, cloud build triggers and repository and project layering.
## Compute Design problems
The key concerns when designing services that rely on compute systems are configuration, deployment, communication between services, data flows and monitoring and logging.

### State
Inside the application you'll have to work out how state will be stored either in a shared volume or in a distributed manor among your instances. This kind of design decision can leverage Cloud Storage or Persistent Volumes. Another problem is how to distribute state among instances. There are several means of doing this mathematically using modulo division on some unique attribute. You could also use aggregate level IDs.

You get around this by using things like Redis for session data, shared storage options and you make your app itself stateless in its core but know how to connect to where state information is stored. Running two replicas of Nextcloud containers requires state data be shared somehow or when you login to one, your round robin connection to the other will present you with another login screen. The browser will not be able to maintain the session data of two sessions when there's one and therefore the disparity between the replicas will prevent the application from functioning.

So in memory caches bridge the gap between different instances. Wordpress for instance, is completely stateless(when you use Storage Bucket Media Backends) as it keeps all session and any other state data in the database so a memory cache is not needed.

### Async vs Synchronous
Synchronous strategies are used when data can't be lost. NFS mounts can be mounted async or sync, for instance. Synchronous setups require lightening fast networks that are fast than the disks involved with low to no latency and probably nothing else on the network. Otherwise if that's not the case your system will try to save a file and will wait for the network to respond before it lets the process move on to other tasks. When a VM or bare-metal system has processes which have to wait on a slow network, the processes stack on top of each other increasing load. Load exponentially reduces a systems ability to respond to requests. Synchronous NFS systems on slow networks crash and so people can't and therefore don't use them.

These problems are universal across all independent systems that need to communicate over means that involve variable speeds. With google's premium network, however, the problem will always be rather load than network speed. Scaling ingestion, for instance, will resolve synchronous problems.

However, services like Pub/Sub can make this process asynchronous, relaxing some of the stress and impact on on such a system's costs and reliability.

Credit card transactions are synchronous as well as maybe a bitcoin mining operation.

## Overview

The most popular options provided by Google Compute Engine that cover a wide variety of use-cases include:

* [Compute Engine VMs](https://cloud.google.com/compute/docs/instances)
* [App Engine Serverless PaaS, Flexable & Standard](https://cloud.google.com/appengine/docs)
* [Cloud Run Stateless Containers](https://cloud.google.com/run/docs/concepts)
* [Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview)
* [Anthos fleets](https://cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview)
* [Cloud Functions Events as a Service](https://cloud.google.com/functions/docs/concepts/overview)

Dataprocessing and Workflow options include:

* [Dataproc Apache Spark + Hadoop](https://cloud.google.com/dataproc/docs/concepts)
* [Dataflow Apache Beam](https://cloud.google.com/dataflow/docs/concepts)
* [Datafusion Visual CDAP ETL and ELT pipelines](https://cloud.google.com/data-fusion/docs/concepts)
* [Cloud Composer Apache Airflow with DAG based workflows](https://cloud.google.com/composer/docs/concepts)
* [Cloud Workflows, API calls in a series](https://cloud.google.com/workflows/docs/overview)
* [Cloud Pub/Sub and Pub/Sub Lite](https://cloud.google.com/pubsub/docs/concepts)

## Exam Essentials

* Know when to use particular compute services
* Know all the optional features of these services
* Know the differences between App Engine Standard and Flexible
* Know when to use Machine Learning and Data workflows and pipelines
* Understand the features of different Anthos clusters: EKS, AKS, GKE, Attached
* Know Kubernetes features

## Official Resources
* [Load Balancing and Autoscaling Compute Engine](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling#:~:text=documentation%20for%20descriptions.-,Autoscaling,need%20for%20resources%20is%20lower.)
* [Cluster Autoscaling Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler)
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.google.com/docs)




