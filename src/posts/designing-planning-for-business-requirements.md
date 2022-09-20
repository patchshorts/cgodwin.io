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
* Different entities will need and currently have different access to read and change records and information.
* Different entities are of different expertise
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

They want to record and stream these presentations on a web portal and for live and post review by students with logins. They want to reduce latency. They want to monitor when the students interact with the videos and derive insights as to which videos people re-watch.

Because these requirements are limited, we can only begin to speculate about what the technical requirements will be.

::: tip Business to Technical Requirements
When designing a new project, while collecting and studying business requirements, you'll have to translate those into technical requirements. You'll find that there's not a one to one relationship. One technical solution may meet two business requirements. While one business requirement might encapsulate several solutions.
:::

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
Preemptible VMs are shutdown after 24 hours and google can pause them at any
time. Running process on those vms do not stop but they slow to a crawl and
speed back up when services become available. You can write a robust application by
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
performing option. With Standard Tier Networking, Cloud Load Balancing is only
regional load balancing and not global balancing. Standard Networking is not
compliant with the global SLA

#### Pub/Sub Lite vs Pub/Sub
Pub/Sub is an extremely scalable but Pub/Sub Lite can be scaled providing lower
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
greater than 99.99% availability. Storage operations are divided into class A and
class B operations:

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

Objects have a storage class of either `standard`, `nearline`, `coldline`, or
`archive`. Storage classes can be changed on single objects along this
direction. You cannot move a storage class to a more frequent use class, only
the opposite. You can move frequency lower on an object.

`standard` -> `nearline` -> `coldline` -> `archive`

storage class|`standard`|`nearline`|`coldline`|`archive`
---|---|---|---|---
accessing at least once per|week|month|quarter|year

## Systems Integ and Data Management
Once we have these requirements, our minds already start placing the need in the
right product, though we may be provisionally thinking about it. The same thing
should be happening when you think of dependencies.
### Systems Integration Business Requirements
Let's review the business needs of our use cases.

#### Tristar Health

Consider the technical requirement "There will be legacy systems involved
because of insurance entities." implied from the business requirement "Different
entities will need and currently have different access to read and change
records and information."

If they state as part of the requirements that they don't don't want to migrate legacy services to the cloud, you'll design and develop new systems in the cloud over the next few years. You'll have to plan for:

* the volume and kinds of information in the traffic
* how will authentication work
* how will data be encrypted at rest, in transit or in memory
* will encryption keys be provided or managed
* decoupling services to accommodate load
* monitoring and logging for performance measurements
* making your services highly available.

In addition to these, one will have to plan for retiring the legacy systems post-migration.

#### Lord Byron MBA

The school has very specifically stated requirements that fall into these categories:

* trend analysis
* monitoring
* latency reduction
* video archival

The company wants to pick better speakers by analyzing when the students no
longer receive value in a video. The trend analysis will enable them to cut
loose the least engaging speakers. By doing this they'll consolidate only the
best information and be able to sell or host the video in a revenue producing
stream.

Administrators want Video archival will allow them to keep all their speaker,
remix the presentations as theme blueray DVDs that students can buy from a
catalogue. Latency reduction is important because their most-near end result is
increasing engagement among the MBA students.

This data will likely be such a small amount that Cloud Logging and BigTable can
be used to pull SLIs out of http requests, and since your streaming server is an
RTMP relay via the nginx RTMP module, you can glean all of your statistics from
nginx logs.

::: tip Service Level Objectives
Business requirements typically demand these common type of SLOs.

* **High Availability SLO** Always accessible.
* **Durability SLO** Always kept.
* **Reliability SLO** Always meeting workloads.
* **Scalability SLO** Always fitting its workloads.

:::

[nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module/wiki/Directives)

You can use the nginx directive `record all` to store the streams to objects.
Once there it may be prudent to set up a Cloud Storage trigger to transcode the
MP4 videos to many formats you can serve later on the class portal.

#### Your Mother Is Now A Gamer, Inc

Data that will never be changed like high scores, previous progress, saved
games, game boosts earned by some players but not others. These could all live
in a document storage database like Firebase Realtime Database with the
multiregion uptime SLA to ensure consistency and global availability. The
time-series data can live in Bigtable.

You consider placing the pay-to-play purchases data and the billing database in
Cloud SQL but because of their need for global consistency, Cloud Spanner would
be more appropriate. Cloud Endpoints might be able to secure the APIs so that
only the phone apps with the right keys can access them, however you can
accomplish both running the public microservices and the authentication through
Google Cloud Run.

#### Granger Excavation

Granger Excavation uses GPS coordinates to excavate and pave properties so new
buildings can be built in areas that need topographical alterations.

They need to stream IoT GPS telemetry somewhere. They also need to query if a
device is within a work area so an application can turn red or green. Excavators
literally dig until they hit a red area.

After research you find out that BigQuery has geospacial analytics and can store
geometries, spatial features and spacial feature collections. The project
design you put together includes having the the engineers geocode their drawings
from CAD into Geo-database format and upload it to BigQuery.

The tablets will post their coordinates to an endpoint which will use BigQuery
to return a true of false within 'proximity'. That same API will log the
coordinates to BigTable for measuring excavator performance.

### Data Management Business Requirements

Business requirements help us know what platforms to connect and how they will
work. Those same requirements will tell us what data is stored, how often, for
how long, and who and what workloads have access to it.

#### How Processed?
What is the distance between where the data is stored and where it is processed?
What volume of data will be moved between storage and processing during an
operation or set of operations? Are we using stream or batch processing?

The first question's answer influences both the read and write times and the
network costs associated with transferring the data. Creating replicas in regions
nearer to the point of processing will increase read times, but will only
decrease network costs in a 'replicate one time, read many times' situation.
Using storage solutions with a single write host will not improve replication
times.

The second questions's answer influences time and cost as well. On a long enough
timeline, all processes fail. Build shorter running processes and design
reconnecting robust processes.

The third question's answer and future-plans answer will influence how you
perform batch processing. Are you going to migrate from batch to stream?

|Style|Pros|Cons|
|---|---|---|
|Batch|tolerates latency, on time data|interval updates, queue buildup|
|Stream|realtime|late/missing data|

::: tip
If using VMs for batch processing, use [preemptible](#reduced-level-services) VMs.
:::
#### How Long?

At what point does data lose business value? With email, the answer is never,
people want their past emails, they want all their backed up emails delivered.
But with other kinds of data, like last year's deployment errors, lose certain
levels of value as it becomes less actionable now.

You'll have to design processes for removing less valuable data from persistent
storage locations and stored in archival locations or deleted. How long data is
stored for each set of data will have a great affect on an architectural design.

#### How Much?
The volumes of data and how it will scale up when business goals are met or
exceeded need to be planned for or else there will be a dreaded redesign and
unnecessary iterations.

Storage related managers will need to know the volume and frequency of data
storage and retrieval so they can plan for their duties and procedures which
touch your design.

## Compliance and Regulations
Many businesses are under regulatory constraints. For example, "Your Mother Is Now A Gamer, Inc" receives payment via credit cards. So they must be PCI compliant and financial services laws apply their receiving payment.

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


### Integrity
Data Integrity is required by regulations which focus on making data tamper-proof, but normally is simply a business requirement. You need your records to be consistent and reflect reality. Data Integrity is also about keeping it in that state.

Ways in google cloud that you can promote and increase data integrity are to use ways to promote data integrity in google cloud are to use tools like Data Loss Prevention (DLP) and Data Encryption. You should also enforce least privilege, use strong data encryption methods, and use access control lists.

Colocate report data instead of drawing on active data. That way, if data is tampered with discrepancies exist directly within the app. The search for these discrepancies can be automated into their own report.

### Availability
DDos attacks, ransomware, and disgruntled administrators and bad faith actors
threaten the availability of data. 

You can combat ransomware with a well hardened IaC(Infrastructure as Code)
pattern culling resources which have their availability degraded, restoring
their data and stateful information from trusted disaster recovery provisions.

When designing a project, design around these scenarios to ensure a business can
survive malicious activity. Design a project which can not only survive a
malicious attack but one that can also continue to be available during one.

## Success Measures
As businesses move to agile continuous deployment and integration, they want to
see reports of the deployments going well, development costs decreasing, the
speed of development therefore increasing. Amid all of this the want to measure
the overall success of an endeavor so they can correctly support the resources
which will increase the bottom line.

::: tip Continuous Integration & Delivery
The benefits of CICD to business requirements is that it enables smaller incremental trunk-based development. This shortens the feedback loop, reduces risks to services during deployment, increases the speed of debuging, isolates featuresets to known risks.
:::

### Key Performance Indicators
The first to two important measurements is Key Performance Indicators(KPIs). The
other is Return on Investment(ROI). KPIs measures of value of some portion of
business activity which can be used as a sign things are well and an effort is
achieving its objectives. A KPI for an automation team of reliability engineers
might be a certain percentage as a threshold of failed deployments to
successful ones.

#### Project KPIs
Cloud migration projects have KPIs which the project manager can use to gauge
the progress of the overall migration. Another KPI might be having a set of
databases migrated to cloud and no longer being used on premiss. KPIs are
particular to a projects own needs.

#### Operations KPIs
Operations departments will use KPIs to determine if they are handling the
situations they set out to address. Product support teams can use KPIs to
determine if they are helping their customers use their product to the degrees
which mean the business objectives. Cloud Architects will need to know which
KPIs will the used to measure the success of the project being designed. The
help the architect understand what takes priority and what motivates
decision-makers to invest in a project or business effort.

### Return on Investment
Return on investment is the measure of how much of a financial investment pays
off. ROI is a percentage that measures the difference between the business
before and after the investment. The profit or loss after an investment divided
by the total value of the investment. So:

$ROI=\left(\frac {investment\ value-cost\ of\ investment} {cost\ of\ investment} \right) \times 100$

Lets work this out for a 1 year period. Host U Online bought \$3000 in network
equipment and spent \$6000 to migrate to fiber. The total cost of investing in
fiber was \$9000. They began reselling their fiber internet to sublets in the
building. In one year the acquire six customers totalling \$12,000 per month. A
year's revenue from the investment is \$144,000.

$\left(\frac {135000} {9000} \right) \times 100 = 1500\%$

This is a real scenario I orchestrated for a real company. Our return on
investment, the ROI, was a tremendous 1500%.

In a cloud migration project the investment costs includes costs google cloud
services and infrastructure, personnel costs, and vendor costs. You should
include expenses saved in the value of the investment.

::: tip Reducing Costs
When designing for cost reduction, there are three options you should strongly consider:
* [Managed Services](list-all-google-cloud-platform-gcp-managed-services.md)
* [Preemptible and Spot VMs](./contrast-preemptible-spot-vms-virtual-machines.md)
* [Autoscaling](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling#autoscaling)
* [Standard Network Teir](differences-in-google-cloud-platform-gcp-network-tiers.md)
  
:::

The goals and concepts that the organization places high value upon will be
underlying the KPIs and ROI measures.

### Essentials

* Understanding the sample requirements word for word
* Knowing the meanings of business terms like TCO, KPI, ROI
* Learn about what google services are for what use cases
* Understanding managing data
* Understanding how compliance with law can affect the architecture of a solution
* Understand the business impetus behind the aspects of security pertaining to
  business requirements
  * Confidentiality
  * Integrity
  * Availabiltiy
* Understand the motives behind KPIs


## Official Resources
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.google.com/docs)