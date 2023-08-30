---
icon: cloud
date: 2022-09-14
category:
  - Google Cloud
tag:
  - 'study guide'
  - 'Google cloud'
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

### EHR HealthCare

#### Business Requirements



::: tip Minimal Effort Predictions
Cloud AutoML is a cloud-based tool that allows developers to train machine learning models with minimal effort. It is designed to make the process of training machine learning models easier and faster. Cloud AutoML is based on the Google Cloud Platform and offers a variety of features that make it a powerful tool for machine learning.
:::

#### Technical Requirements


### Mountkirk Games

#### Business Requirements




::: tip Business to Technical Requirements
When designing a new project, while collecting and studying business requirements, you'll have to translate those into technical requirements. You'll find that there's not a one to one relationship. One technical solution may meet two business requirements. While one business requirement might encapsulate several solutions.
:::

### TerramEarth

#### Business Requirements

This company makes web based and app based phone games that must interact with a High Scoring system, collect minimal user data. They are global and so the user data they collect is regulated in some parts of the globe. Because it is a phone app they want latency to be as low as possible. They are interested in Managed services which can automatically scale. We can begin to anticipate where we want the high score data to end up but we cannot yet flush out all the requirements that can be known.

::: tip Extract, Transform, Load
It is what it says. It takes large volumes of data from different sources. Transforms it to useable data, and makes available the results somewhere for retrieval by others.

Cloud Datafusion handles these tasks for data scientists and makes it easy to transfer data between various data sources. It offers a simple drag-and-drop interface that makes it easy to connect to different data sources, transform and clean data, and load it into a centralized data warehouse. Cloud Datafusion is a cost-effective solution for businesses that need to quickly and easily integrate data from multiple sources.
:::



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

To see an exhaustive list, please see [My List of All GCP Managed Services](list-all-Google-cloud-platform-gcp-managed-services.md)

::: tip Reducing Latency on Image Heavy Applications
Google Cloud CDN is a content delivery network that uses Google's global network of edge locations to deliver content to users with low latency. It is a cost-effective way to improve the performance of your website or web application by caching static and dynamic content at the edge of Google's network. Cloud CDN can also be used to deliver content from your own servers, or from a content provider such as a CDN or a cloud storage service. 

Using Google's Cloud CDN in combination with multi-regional storage will reduce load time.
:::
### Reduced-level Services

Many times when computing needs are considered, certain services with availability requirements lower than others can benefit from reduced-level services. If a job that must be processed can have those processes paused during peak times but can otherwise run normally, it can be preempted.

Reduced level services:

* Preemptible Virtual Machines
* Spot VMs
* Standard Networking
* Pub/Sub Lite
* Durable Reduced Availability Storage

#### Preemptive VMs
Preemptible VMs are shutdown after 24 hours and Google can pause them at any time. Running process on those vms do not stop but they slow to a crawl and speed back up when services become available. You can write a robust application by setting it up to detect the preemptions. These VMs cost 60-90% or so less than their standard counterparts.

Preemptible VMs also get discounts on volumes and GPUs. Managed resource groups will replace a preempted VM when it is suspended after 24 hours. Preemptible VMs can use other services to reduce the overall cost of using those services with VMs.

::: warning Live Migration
Preemptible and Spot VMs are not eligible for live migration.
:::
#### Spot VMs

Spot VMs are the next generation Preemptible virtual machine. Though spot VMs are not automatically restarted, they can run for longer than 23 hours. Spot VMs can be set to a stopped state or be deleted on preemption. With a managed resource group of spot VMs, one can set the VMs to be deleted and replaced when resources are available.


#### Standard & Premium Networking
Premium Networking is the default, but Standard Tier Networking is a lower performing option. With Standard Tier Networking, Cloud Load Balancing is only regional load balancing and not global balancing. Standard Networking is not compliant with the global SLA

#### Pub/Sub Lite vs Pub/Sub
Pub/Sub is an extremely scalable but Pub/Sub Lite can be scaled providing lower levels of cost-effective service.

Pub/Sub come with features such as parallelism, automatic scaling, global routing, regional and global endpoints.

Pub/Sub Lite is less durable and less available than Pub/Sub. Messages can only be replicated to a single zone, while Pub/Sub has multizonal replication within a region. Pub/Sub Lite users also have to manage resource capacity themselves.

But if it meets your needs, Pub/Sub Lite is 80% cheaper.

#### App Engine Standard vs Flexible
App Engine Standard allows scaling down to zero, though the trade offs are that you can only use a set of languages, can only write to /tmp with java, can't write with python. Standard apps cannot access GCP services, cannot modify the runtime, or have background processes, though they can have background threads.

#### Durable Reduced Availability Storage(DRA)
These are buckets which have an SLA of 99% availability instead of equal to and greater than 99.99% availability. Storage operations are divided into class A and class B operations:

|API|Class A(\$0.10\*/10,000 ops)|Class B(\$0.01\*/10,000 ops)|
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

\* DRA Pricing

### Data Lifecycle Management

Sort your data along a spectrum of most frequent to infrequent use. Spread your data along the following:

* Memory Caching
* Live Database
* Time-series Database
* Object Storage
  * Standard
  * Nearline
  * Coldline
  * Archive
* Onprem, Offline storage

Objects have a storage class of either `standard`, `nearline`, `coldline`, or `archive`. Storage classes can be changed on single objects along this direction. You cannot move a storage class to a more frequent use class, only the opposite. You can move frequency lower on an object.

`standard` -> `nearline` -> `coldline` -> `archive`

storage class|`standard`|`nearline`|`coldline`|`archive`
---|---|---|---|---
accessing at least once per|week|month|quarter|year

::: tip Time series data
Time series data is a type of data that is collected over time. This data can be used to track trends and patterns over time. Time series data can be collected manually or automatically. Automatic time series data collection is often done using sensors or other devices that collect data at regular intervals. This data can be used to track the performance of a system over time, or to predict future trends. These are examples of time-series data:

* MRTG graph data
* SNMP polled data
* Everything a fitbit records
* An EKG output

Time series data is best stored in BigTable which handles this workload better than BigQuery or CloudSQL.
:::

## Systems Integ and Data Management
Once we have these requirements, our minds already start placing the need in the right product, though we may be provisionally thinking about it. The same thing should be happening when you think of dependencies.
### Systems Integration Business Requirements
Let's review the business needs of our use cases.

## Business requirements dictate technical requirements implicitly. From statements like:

### EHR Healthcare
#### Business Requirements
- EHR Healthcare provides B2B services to various entities, vendors, insurance providers, network directories, etc.
- Different entities have different access rights to read and edit records and information.
- Different entities possess varying levels of expertise.
- The services must always be up and running.
- Some information accessed by entities is regulated.
- Confidentiality is of utmost importance.
- The company wishes to track the number and type of data accessed to gain insights into trends.
#### Technical Requirements
- They will need to publicly expose an API or set of them.
- Access restrictions must be applied at the API level.
- There will be legacy systems involved because of insurance entities.
- Infrastructure redundancy is necessary.
- Data Lifecycles must consider regulation, insights, and access controls.
- Cloud Machine Learning can be leveraged to build insight models faster than they can be planned and built.
### Helicopter Racing League
#### Business Requirements
- The Helicopter Racing League (HRL) organizes and manages helicopter races worldwide.
- HRL wants to enhance the spectator experience by providing real-time telemetry and video feed for each race.
- HRL wants to archive all races for future viewing on demand.
- A robust data analytics solution is needed to gain insights into viewer behavior and preferences.
- The solution must be highly available and scalable to handle spikes during race events.
#### Technical Requirements
- Real-time data processing capability is needed to handle race telemetry data.
- A scalable video streaming solution is needed to broadcast races worldwide.
- Archival storage is needed for storing race videos for on-demand viewing.
- An analytics solution is needed for analyzing viewer behavior and preferences.
- The solution must be highly available and scalable to handle traffic spikes during races.
### Mountkirk Games
#### Business Requirements
- Mountkirk Games develops and operates online video games.
- They need a solution to handle high scores and player achievements.
- They need to collect minimal user data for personalizing the gaming experience.
- The solution must be globally available and provide low latency.
- They are interested in Managed services which can automatically scale.
#### Technical Requirements
- A globally available high score and achievement system is needed.
- User data needs to be collected and processed in a privacy-compliant manner.
- The system must provide low latency for a smooth gaming experience.
- Managed services can be used to handle automatic scaling.
### TerramEarth
#### Business Requirements
- TerramEarth manufactures heavy equipment for the construction and mining industries.
- They want to leverage their vast trove of IoT sensor data to improve their products and provide better service to their customers.
- They want to move their existing on-premises data infrastructure to the cloud.
#### Technical Requirements
- IoT data needs to be ingested and processed in real-time.
- A robust data analytics solution is needed to derive insights from the sensor data.
- A migration plan is needed to move existing data and systems to the cloud.

### Data Management Business Requirements

Business requirements help us know what platforms to connect and how they will work. Those same requirements will tell us what data is stored, how often, for how long, and who and what workloads have access to it.

#### How Processed?
What is the distance between where the data is stored and where it is processed? What volume of data will be moved between storage and processing during an operation or set of operations? Are we using stream or batch processing?

The first question's answer influences both the read and write times and the network costs associated with transferring the data. Creating replicas in regions nearer to the point of processing will increase read times, but will only decrease network costs in a 'replicate one time, read many times' situation. Using storage solutions with a single write host will not improve replication times.

The second questions's answer influences time and cost as well. On a long enough timeline, all processes fail. Build shorter running processes and design reconnecting robust processes.

The third question's answer and future-plans answer will influence how you perform batch processing. Are you going to migrate from batch to stream?

|Style|Pros|Cons|
|---|---|---|
|Batch|tolerates latency, on time data|interval updates, queue buildup|
|Stream|realtime|late/missing data|

::: tip
If using VMs for batch processing, use [preemptible](#reduced-level-services) VMs to save money.
:::
#### How Long?

At what point does data lose business value? With email, the answer is never, people want their past emails, they want all their backed up emails delivered. But with other kinds of data, like last year's deployment errors, lose certain levels of value as it becomes less actionable now.

You'll have to design processes for removing less valuable data from persistent storage locations and stored in archival locations or deleted. How long data is stored for each set of data will have a great affect on an architectural design.

#### How Much?
The volumes of data and how it will scale up when business goals are met or exceeded need to be planned for or else there will be a dreaded redesign and unnecessary iterations.

Storage related managers will need to know the volume and frequency of data storage and retrieval so they can plan for their duties and procedures which touch your design.

::: tip Factors of Volume and Load
The main factors that affect volume are the number of data generators or sensors. If you consider each process that can log as a sensor, the more you log the higher your volume in Cloud Logging, the higher the processing costs in BigQuery and so forth.

* Number of hosts
* Number of logging processes
* Network Connectivity
* Verbosity Configuration

:::

## Compliance and Regulations
Many businesses are under regulatory constraints. For example, "Mountkirk" receives payment via credit cards. So they must be PCI compliant and financial services laws apply their receiving payment.

* Health Insurance Portability and Accountability Act (HIPAA) is United States legislation that provides data privacy and security regulations for safeguarding medical information.
* General Data Protection Regulation (GDPR) a set of regulations that member states of the European Union must implement in order to protect the privacy of digital data.
* The Sarbanes-Oxley (SOX) Act a number of provisions designed to improve corporate governance and address corporate fraud.
* Children's Online Privacy Protection Act (COPPA) is a U.S. law that requires website operators to get parental consent before collecting children's personal information online.
* Payment Card Industry Data Security Standard (PCI DSS) is a set of security standards designed to protect cardholders' information.
* Gram-Leach Bliley Act (GLBA) designed to protect consumers' personal financial information held by financial institutions.

::: tip Compliance TLDR
**In the United States**
* **SOX** regulates financial records of corporate institutions.
* **HIPPA** regulates US companies protecting consumer access and the privacy of medical data.
* **PCI DSS** is a standard for taking credit cards which processing underwriters may require an e-commerce vendor to abide by.

**In Europe**
* **GDPR** regulates information stored by companies operating in Europe for its protection and privacy.

:::

When we know what regulations apply to our workload it is easier to plan our design accordingly. Regulations can apply to jurisdictions like HealthCare or like the State of California. Operating within a jurisdiction means you'll have to research your industry's governance and what it may be subject to.

### Privacy Regulations
Regulations on data slant toward protecting the consumer and giving them greater rights over their information and who it is shared with. You can review privacy policies per Country at [Privacy Law By County](http://www.privacypolicies.com/blog/privacy-law-by-country)

Architects not only need to comply with these laws, but kindle the the spirit of the law within themselves, that of protecting the consumer. Architects need to analyze each part of their design and ask themselves how is the consumer protected when something goes wrong?

Access controls need to cascade in such a way that permissions are restrictive and then opened, and not the other way around. Data needs to be encrypted at rest and in transit and potentially in memory. Networks need firewall and systems need verification of breaches through logging. One can use the Identity Aware Proxy and practice *Defense in Depth*.

### Data Integrity Regulations
The Sarbanes-Oxley (SOX) Act aims to put controls on data that make tampering more difficult. I worked for a SOX compliant business, IGT PLC and we had to take escrow of code, making versions of code we deployed immutable so it could be audited. In this case, tampering with the data was made more difficult by using an escrow step in the data processing flows. Other business might need to store data for certain number of years while also being immutable or having some other condition applied to it.

## Security
IS, information security, infosec or cybersecurity is the practice or discipline of keeping information secure. Secured information as a business need comes from the need for confidentiality, the need for lack of tampering, and availability. Unavailable systems are generally secure. No can remotely compromise a computer, for instance, that has no network interface.

### Confidentiality
Businesses need to limit access to data so that only the legal, ethical and appropriate parties can read, write, or audit the data. In addition to compliance with data regulations, competing businesses have a need to keep their information private so that competitors cannot know their trade secrets, plans, strategies, and designs.

Google cloud offers several options for meeting these needs. Encryption at rest and in transit is a good start. Memory encryption using N2D compute instances and shielded VMs make the system the least compromisable.

Other offerings include Google Secret Manager, Cloud KMS for keeping Google from reading the data except for the least-access cases you let it. When using customer supplied keys, they are stored outside of Google's own key management infrastructure.

Protected networks keep data confidential. Services also can be configured for maximum protection. For instance, consider these apache configuration directives:

```
ServerTokens Prod
ServerSignature Off
<Directory /opt/app/htdocs>
  Options -Indexes
</Directory>
FileETag None
```

Similar directives in other service configuration make confidential your software versions and system software. In fact, turning ServerTokens and ServerSignature off and prod is a PCI DSS requirement.

Determine the methods of authentication how methods of authorization can compromise confidentiality.


::: tip Dealing with Inconsistent Message Delivery
Cloud Pubsub is a messaging service that allows applications to exchange messages in a reliable and scalable way. It is a fully managed service that can be used to build applications that require high throughput and low latency.

If Applications are working synchronously, decouple them and have the reporters interact with a third services that is always available and that autoscales.
:::

### Integrity
Data Integrity is required by regulations which focus on making data tamper-proof, but normally is simply a business requirement. You need your records to be consistent and reflect reality. Data Integrity is also about keeping it in that state.

Ways in Google cloud that you can promote and increase data integrity are to use ways to promote data integrity in Google cloud are to use tools like Data Loss Prevention (DLP) and Data Encryption. You should also enforce least privilege, use strong data encryption methods, and use access control lists.

Colocate report data instead of drawing on active data. That way, if data is tampered with discrepancies exist directly within the app. The search for these discrepancies can be automated into their own report.

### Availability
DDos attacks, ransomware, and disgruntled administrators and bad faith actors threaten the availability of data. 

You can combat ransomware with a well hardened IaC(Infrastructure as Code) pattern culling resources which have their availability degraded, restoring their data and stateful information from trusted disaster recovery provisions.

When designing a project, design around these scenarios to ensure a business can survive malicious activity. Design a project which can not only survive a malicious attack but one that can also continue to be available during one.

::: tip Keeping Data Entirely Secret
Cloud KMS is a cloud-based key management system that allows you to manage your cryptographic keys in a secure, centralized location. With Cloud KMS, you can create, use, rotate, and destroy cryptographic keys, as well as control their permissions. Cloud KMS is integrated with other Google Cloud Platform (GCP) services, making it easy to use your keys with other GCP products.

When you manage the encryption keys Google uses to encrypt your data, the data is kept secret from anyone who doesn't have access to decrypt it, which requires access to uses those keys.
:::

## Success Measures
As businesses move to agile continuous deployment and integration, they want to see reports of the deployments going well, development costs decreasing, the speed of development therefore increasing. Amid all of this the want to measure the overall success of an endeavor so they can correctly support the resources which will increase the bottom line.

::: tip Continuous Integration & Delivery
The benefits of CICD to business requirements is that it enables smaller incremental trunk-based development. This shortens the feedback loop, reduces risks to services during deployment, increases the speed of debuging, isolates featuresets to known risks.
:::

### Key Performance Indicators
The first to two important measurements is Key Performance Indicators(KPIs). The other is Return on Investment(ROI). KPIs measures of value of some portion of business activity which can be used as a sign things are well and an effort is achieving its objectives. A KPI for an automation team of reliability engineers might be a certain percentage as a threshold of failed deployments to successful ones.

#### Project KPIs
Cloud migration projects have KPIs which the project manager can use to gauge the progress of the overall migration. Another KPI might be having a set of databases migrated to cloud and no longer being used on premiss. KPIs are particular to a projects own needs.

::: tip Improving SQL Latency
Export unaccessed data older than 90 days from the database and prune those records. Store these exports in Google Cloud Storage in Coldline or Archive class buckets.
:::
#### Operations KPIs
Operations departments will use KPIs to determine if they are handling the situations they set out to address. Product support teams can use KPIs to determine if they are helping their customers use their product to the degrees which mean the business objectives. Cloud Architects will need to know which KPIs will the used to measure the success of the project being designed. The help the architect understand what takes priority and what motivates decision-makers to invest in a project or business effort.

::: tip Total Cost of Ownership
When Managers and Directors Only Compare Infrastructure Costs
Calculate the TCO of legacy projects against planned cloud projects. Calculate the potential ROI with regard to the TCO of the investment. Use this wider scope to compare the true cost of running legacy projects or forgoing cloud migrations.
:::


### Return on Investment
Return on investment is the measure of how much of a financial investment pays off. ROI is a percentage that measures the difference between the business before and after the investment. The profit or loss after an investment divided by the total value of the investment. So:

$ROI=\left(\frac {investment\ value-cost\ of\ investment} {cost\ of\ investment} \right) \times 100$

Lets work this out for a 1 year period. Host U Online bought \$3000 in network equipment and spent \$6000 to migrate to fiber. The total cost of investing in fiber was \$9000. They began reselling their fiber internet to sublets in the building. In one year the acquire six customers totalling \$12,000 per month. A year's revenue from the investment is \$144,000.

$\left(\frac {135000} {9000} \right) \times 100 = 1500\%$

This is a real scenario I orchestrated for a real company. Our return on investment, the ROI, was a tremendous 1500%.

In a cloud migration project the investment costs includes costs Google cloud services and infrastructure, personnel costs, and vendor costs. You should include expenses saved in the value of the investment.

::: tip Reducing Costs When designing for cost reduction, there are three options you should strongly consider:
* [Managed Services](list-all-Google-cloud-platform-gcp-managed-services.md)
* [Preemptible and Spot VMs](./contrast-preemptible-spot-vms-virtual-machines.md)
* [Autoscaling](https://cloud.Google.com/compute/docs/load-balancing-and-autoscaling#autoscaling)
* [Standard Network Teir](differences-in-Google-cloud-platform-gcp-network-tiers.md)
:::

The goals and concepts that the organization places high value upon will be underlying the KPIs and ROI measures.

### Essentials

* Understanding the sample requirements word for word
* Knowing the meanings of business terms like TCO, KPI, ROI
* Learn about what Google services are for what use cases
* Understanding managing data
* Understanding how compliance with law can affect the architecture of a solution
* Understand the business impetus behind the aspects of security pertaining to business requirements
  * Confidentiality
  * Integrity
  * Availabiltiy
* Understand the motives behind KPIs


## Official Resources
* [The Official Google Certified Professional Cloud Architect Exam Guide](http://cloud.Google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.Google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.Google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.Google.com/docs)