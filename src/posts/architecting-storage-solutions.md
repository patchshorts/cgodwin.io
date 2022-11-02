---
icon: cloud
date: 2022-10-31
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
---

# Architecting Storage Solutions in Google Cloud Storage
[[toc]]
## Object Storage

Object Storage is common to all cloud systems and has its roots way back in 2006 with Amazon S3 and Rackspace Files/OpenStack Swift and Google Cloud Storage in 2010. These systems are for storing files or documents as objects as opposed to a directory filesystem. Instead of hierarchical the particulate nature of object storage treats everything atomically. You can't seek and read parts of the file, you can't tail off of object storage. You can get, put, delete objects. Their organization depends on the system.

### Organization
Buckets in GCP are containers filled with these particular objects. Objects when updated create new versions, you cannot update an old version with a new file. Once a version is there they're immutable or unchangeable. The bucket is the logical definition with the IAM permissions that the objects inherit. Therefor you'll give write access to all the objects in the bucket to any accounts with write access. You can place individual IAM permissions upon individual objects. There is an illusion of a directory structure because the file `/pictures/2022-10-20/picture.jpg` on a file system would be named picture.jpg and live in the folder /2022-10-20/ which in turn lives in the folder `/pictures/`. However, with object storage, `/pictures/2022-10-20/picture.jpg` is the entire filename.

Buckets must be uniquely named from all other buckets in the cloud owned by all other users. Buckets cannot be renamed or automatically copied to a new bucket. Objects don't have to be uniquely named.

Bucket name best practices:

* Bucket names shouldn't have personal information.
* Use DNS naming standards.
* Use UUIDs or GUIDs if you have buckets in any real quantity.
* Don't upload objects with time series based filenames in parallel
* Don't name objects in sequence if uploading them in parallel
* It's best to use the fully qualified subdomain

One way to access cloud storage is through a FUSE mount. FUSE (Filesystem in Userspace) is a software interface that allows users to create and access virtual filesystems. This can be useful for mounting cloud storage buckets so that they can be accessed like any other local filesystem. To do this, first install the FUSE package for your operating system. Then, create a directory that will serve as the mount point for the bucket. For example, if you want to mount a bucket named "mybucket" on your local machine, you would create a directory named "mybucket" in your home directory. Next, use the fuse-bucket tool to mount the bucket. To use FUSE with Cloud Storage, you first need to install the FUSE library and the gcsfuse tool. Once these are installed, you can use the gcsfuse command to mount a bucket. For example, the following command will mount a bucket named mybucket.

#### Storage classes

GCP has different classes of storage:

* Standard
* Nearline
* Coldline
* Archive

Different storage classes in Google Cloud Storage offer different benefits for different workloads. The most basic storage class, Standard, is great for storing data that is accessed frequently. The next class, Nearline, is ideal for data that is accessed less frequently, but still needs to be accessed quickly. The last class, Coldline, is perfect for data that is infrequently accessed and can tolerate higher retrieval costs. By understanding the different workloads and access patterns, users can select the most appropriate storage class for their needs and optimize their Google Cloud Storage experience.

The Standard storage class is designed for frequently accessed data. Data stored in the Standard storage class is charged based on how much you store.

Nearline storage is a type of cloud storage that is similar to online storage but with lower availability and higher latency. Nearline storage is typically used for data that is not accessed more often than once every 30 days but needs to be stored for long-term retention. Costs are calculated based on how often you access the data and how much you store.

Coldline is a class of storage that was announced by Google in October 2016. It is designed for data that doesn’t need to be frequently accessed, such as historical logs or data archival. The storage itself is designed for files accessed less than once per year. It has a higher retrieval cost than nearline.

Archive storage is the lowest cost storage option in Google Cloud with the highest retrieval costs. It is specifically for data that you don’t need to access more than once a year, such as historical data, backup files, or log files. This is great for compliance storage of files that never need to be accessed.

##### Feature Summary
|Feature|Standard|Nearline|Coldline|Archive|
|--|--|--|--|--|
|Multiregion SLA|99.95%|99.9%|99.9%|99.9%|
|Region SLA|99.9%|99.0%|99.0%|99.0%|
|Latency|millisecond access|millisecond access|millisecond access|millisecond access|
|Frequency|Often|1x30 days|1x90 days|1x1 year|
|Capabilities|Video, Multimedia, Business Continuity, Transcoding, Data analytics, General Compute|Backup, Long-tail content, Rarely accessed docs|Archive, Source File Escrow, Disaster Recovery Testing|Compliance Retention, Disaster Recovery|

##### Costs Summary
|Cost|Standard|Nearline|Coldline|Archive|
|--|--|--|--|--|
|Size|$0.020/GB|$0.010/GB|$0.004/GB|$0.0012/GB|
|Retrieval|$0.00/GB|$0.01/GB|$0.02/GB|$0.05/GB|

Example use-cases for Google Cloud Storage:
* Hosting website static assets (images, JS, CSS)
* Distributed backup and disaster recovery
* Storing data for analytics and Big Data processing
* Storing data for internet of things devices
* Storing data for mobile apps
* Storing data for gaming applications
* Storing data for video and audio streaming
* Collaboration and sharing of files non-persistent attached storage
* Security and compliance data
* Geospacial data storage
* In combination with Cloud Functions

These examples leverage both the storage classes and the atomic treatment of the objects themselves. Architects must understand the differences between these storage classes.

## Network Attached Storage
Network Attached Storage (NAS) is a type of storage that allows files to be accessed over a network. NAS devices typically connect to a network using Ethernet and can be used by any computer on the network.

Google Cloud Filestore is a NAS service that provides high performance, scalable file storage for applications running on Google Cloud Platform. Cloud Filestore is built on top of Google Cloud Storage and offers the same benefits as other Cloud Storage products, such as high availability, durability, and security.

Cloud Filestore is a good choice for applications that require low latency access to files, such as video editing, media streaming, and scientific computing. Cloud Filestore is also a good choice for applications that require high throughput.

Google Cloud Filestore is a high-performance, managed file storage service for applications that require a file system interface and a shared filesystem. It supports industry-standard file system protocols such as NFSv3 and SMB. Google Cloud Filestore is available in three storage tiers: Basic, High Scale, and Enterprise.

* Basic HDD, Good
* Basic SSD, Great
* High Scale SSD, Better
* Enterprise, Best

### Basic
The basic Filestore option strikes a good match for file sharing, software development, and use as a backend service with GKE workloads. You can opt for either hard disk drives (HDD) or solid state disks (SSD) when choosing storage, but SSDs provide higher performance at higher cost. For HDD, the I/O performance is reliant on the provisioned capacity, with peak performance increasing when the storage capacity exceeds 10 TiB. For SSD, the performance is fixed no matter the storage capacity.

### High Scale
High-scale SSD storage tiers instances are ideal for performing large-scale computing tasks such as DNA sequencing and data analysis for financial services. It gives fast throughput with the ability to scale up and down with demand.

### Enterprise
Enterprise tier is designed for enterprise-grade NFS workloads, critical applications (for example, SAP), and GKE workloads. It supports regional high availability and data replication over multiple zones for resilience within a region.


|Service Tier|Provisionable capacity|Scalability|Performance|Availability|Data recovery|Monthly Pricing|
|---|---|---|---|---|---|---|
|Basic HDD|1–63.9 TiB|Up only in 1 GiB units|Standard fixed|Zonal|Backups|$204.80($0.20/GiB)|
|Basic SSD|2.5–63.9 TiB|Up only in 1 GiB units|Premium fixed|Zonal|Backups|$768.00($0.30/GiB)|
|High Scale SSD|10–100 TiB|Up or down in 2.5 TiB units|Scales with capacity|Zonal|None|$3,072.00($0.30/GiB)|
|Enterprise|1–10 TiB|Up or down in 256 GiB units|Scales with capacity|Regional|Snapshots|$614.40(0.60/GiB)|

### Filestore Networking
Cloud file store can connect to a Virtual Private Cloud (VPC) network either by using VPC Network Peering or Private Services Access. When connecting to a VPC network with standalone VPC, when creating an Instance within a Host Project of a Shared VPC, or when accessing the Filesystem from an On-Premises network, you can use VPC Network Peering. When connecting from a Service Project to a Shared VPC, or when using Centralized IP Range Management for Multiple Google Services, you need to use the Private Services Access.
### Filestore Access Controls
Iam roles only grant you management access on the GCP resource but file access is managed with unix permissions in an octet format 0777, chown and chgrp.

## Databases
Google cloud has several different database options. Relational, NoSQL, Analytical.

### Relational Databases
Relational databases have tables with fields which can to refer to fields in other tables. An Example:

##### User Table:
|ID|Name|Age|
|--|--|--|
|0|Jeff|35|
|8|John|35|

##### Jobs Table:
|ID|Job Title|
|--|--|
|25|Software Engineer|
|8|CEO|
|0|Director of Engineering|

From the example above we can see that these two tables relate on the ID colum, they are relational. So Jeff is Director of Engineering.

Relational databases are built to support a query language and minimize problems with the data often called anomalies. In the above two tables, ID 25 doesn't exist in the user table so the first row in the Jobs table above is a data anomaly. When fields are properly related, deleting a record in one should cascade to the others. These constraints are part of table schemas. Relational databases conform to ACID(atomicity, consistency, isolation, and durability) transaction models.

#### ACID Transactions

* **Atomicity** means the whole transaction is done or none at all. A transaction is indivisible for relational databases to work.
* **Consistency** Means when a transaction is complete, the database is constrained to a consistent state so that all foreign key reference a primary key, all unique keys are unique and the database is in an integral state.
* **Isolation** Isolation means that parts of transactions cannot be mixed. Meaning strict grouping and ordering of transaction data in buffers.
* **Durability** Durability means that when a transaction is complete, its change will be immediately reflected in requests for the data that was changed even if the database crashes after the completed transaction.
#### Cloud SQL
Cloud SQL offers MySQL server, Microsoft SQL server, or PostgresSQL via managed VMs. Google will perform upgrades and backups and let you specify maintenance times. Failovers are automatically managed and healing is an automatic process. Regional Databases are perfect for Cloud SQL. Cloud SQL supports databases up to 30 Terabytes.

* All data is encrypted at rest and in transit
* Data is replicated across the region to other zones
* Failover to replicas is automatic
* Standard tools and libraries can connect to Cloud SQL as if they're connecting to MySQL, SQL Server, or Postgres
* Logging is integrated as well as monitoring

Cloud SQL Machine Type Examples
|Legacy Type|vCPUs|Memory(MB)|Machine Type|
|--|--|--|--|
|`db-f1-micro`|1|614|n/a|
|`db-g1-small`|1|1700|n/a|
|`db-n1-standard-1`|1|3840|`db-custom-1-3840`|
|`db-n1-standard-2`|2|7680|`db-custom-2-7680`|
|`db-n1-standard-4`|4|15360|`db-custom-4-15360`|
|`db-n1-standard-8`|8|30720|`db-custom-8-30720`|
|`db-n1-standard-16`|16|61440|`db-custom-16-61440`|
|`db-n1-standard-32`|32|122880|`db-custom-32-122880`|
|`db-n1-standard-64`|64|245760|`db-custom-64-245760`|
|`db-n1-standard-96`|96|368640|`db-custom-96-368640`|
|`db-n1-highmem-2`|2|13312|`db-custom-2-13312`|
|`db-n1-highmem-4`|4|26624|`db-custom-4-26624`|
|`db-n1-highmem-8`|8|53248|`db-custom-8-53248`|
|`db-n1-highmem-16`|16|106496|`db-custom-16-106496`|
|`db-n1-highmem-32`|32|212992|`db-custom-32-212992`|
|`db-n1-highmem-64`|64|425984|`db-custom-64-425984`|
|`db-n1-highmem-96`|96|638976|`db-custom-96-638976`|

Shared core types `db-f1-micro` and `db-g1-small` are not covered by Google's Cloud SQL SLA.

By default a Cloud SQL instance is a single machine in a single zone, but high availability options for provisioning additional failover and read replicas in additional zones exist. Additionally you can add read replicas in different regions. This is one way to migrate data between regions and to do disaster recovery testing. Failover replica's are automatically promoted from read replicas to master in the case of failure.

GCP's Database Migration Service is designed for MySQL and PostgresSQL workloads and will continuously replicate data from on-premises or other clouds. It performs and initial snapshot of the database and then leverages the native replication features of your database to continually migrate the data. You can also perform lift and shift migrations with this tool in addition to continuous. Cloud SQL scales well only vertically and not well horizontally. More memory and CPU power is needed for bigger workloads, they aren't sharded across several devices in a workload agnostic manner.

#### Cloud Spanner
Cloud Spanner is a globally consistent and distributed database that provides the highest level of horizontal scalability as any relational database on the biggest network of its kind. It is fully managed and scales to multiple regions. Spanner supports relational schemas and 2011 ANSI SQL as well as Postgres dialects. Supporting instance consistency rather than "eventual consistency" as is the case with Cloud SQL read replicas, so the risk of data anomalies that eventual models produce are reduced.

Example Use Cases:
* Stock trading systems that want to enable global purchasing of a security at a current price at a known time of day.
* Shipping companies who need a consistent view of their global distribution network, the status of packages and the sending of global notifications.
* Global inventory for a company like Sony Playstation.

Spanner provides a 5 9s availability which means less than 5 minutes of downtime per year. Its fully managed and like other managed database services in GCP its upgraded, backed up, and failover is managed. Data is also encrypted and at rest and in transit.

### Analytical Databases
Analytical databases are usually data warehouses. We've described some data lake and data warehouse options in Google Cloud's Hadoop and Spark offering. Though they're used or ETL, Hadoop data lakes can be used as the data from which analytical systems can draw their data.

#### BigQuery(BQ)
Hadoop cannot do analytics but BigQuery is able to provide insights and is an analytics solution. Its queries scan large amounts of data and can perform data aggregation. BigQuery uses SQL and is serverless, managed and scales automatically.

##### BQ Analytics
Big Query is built upon Dremel, Colossus, Borg and Jupiter. Dremel maps queries to extraction trees with leaves called slots. Slots read information from storage and do a bit of processing on the data. Branches on the tree aggregate the data. Colossus is distributed filesystem by Google that offers encryption and replication. Borg is a request router that can handle rerouting during node failure. Jupiter is a petabyte per second network built by Google with rack aware placement which improves fault tolerance and throughput and requires less replication.

While other databases group rows together, in BigQuery, the data in the same column are stored together in an [columnar structure]() called Capacitor. Capacitor supports nested fields and is used because the analytics and business intelligence filtering only happens on a small number of columns compared to a traditional application's filtering of a number of columns in a row.

BigQuery has batch and streaming jobs to load the data, jobs can export the data, run queries or copy data. Projects contain objects called a `dataset` that are regional or multi-regional. Regional is straight forward, is what it sounds like. But with multi-regional you either choose the United States or Europe and google copies the `dataset` into multiple regions within the continent you've chosen.

BigQuery bills on size stored as well as the query size and the data scanned when running the query. For this reason it is advisable to partition your query to specifically the time when the data occurred. Use less broad queries for smaller ones and less data scanned while running the query. You can read more about [BigQuery Pricing](https://cloud.google.com/bigquery/pricing#on_demand_pricing). For this reason, don't use queries to view the structure of the tables use `bq head` or use the Preview Option on the console. You can also use `--dry-run` to test command line queries which will tell you the number of bytes the query would have returned. You're not billed for errors or queries whose results are returned from cache.

##### BQ IAM Roles
Access permissions in all of GCP's products are granted by IAM, which generally has predefined roles for its products. The roles in IAM for BigQuery are:

* `roles/bigquery.dataViewer` can list projects, tables, and access table data.
* `roles/bigquery.dataEditor` has the permissions of dataViewer and can create and change tables and datasets.
* `roles/bigquery.dataOwner` has dataEditor and can delete tables and datasets.
* `roles/bigquery.metadataViewer` can list tables, datasets and projects.
* `roles/bigquery.user` can list projects, tables has metadataViewer, and can create jobs and datasets.
* `roles/bigquery.jobUser` Can list projects, create queries and jobs.
* `roles/bigquery.admin` Can do any BigQuery operation.

In addition to these overarching roles, granular access can be given to google service accounts, google groups, etc over organizations, projects, datasets, tables and table views.

##### Loading Data into BQ
You can batch load or stream load data into BigQuery.

###### Batch Loading
Through ETL and ELT processes, data is typically batch loaded into a data warehouse through combining some sort of extraction, loading and transformation. Jobs which load the data into BigQuery can use files as objects in Cloud Storage, files on your local filesystem. Files can be Avro, CSV, ORC, and Parquet formats.

The Data Transfer Service in BigQuery loads the data from other services such as Youtube, Google Ads and Google Ad Manager, Google's SaaS products and third-party sources. The Storage Write API is used to load data in a batch and process the records in one shot atomically, meaning the whole thing goes in or none of it does. Big Query can load data from Cloud Datastore and Cloud Firestore.

###### Stream Loading
To stream data into BigQuery you can use the Storage Write API or Cloud Dataflow which uses a runner in Apache Beam to write the data directly to BigQuery tables from a job in Cloud Dataflow. The Storage Write API will ingest the data with high throughput and ingest each record only once.

### NoSQL Databases
GCP has four NoSQL databases: BigTable, Datastore, Cloud Firestore and Redis via Cloud MemoryStore(especially with RDB snapshotting).

#### Cloud Bigtable
Bigtable is a wide column multidimensional database that supports petabyte size databases for analytics, operational use, and time series data for Internet of Things(IoT) sensors. It's ability to handle time series data well means it is good for marketing, advertisement, financial data and graphs.

Bigtable supports latencies lower than 10ms, Stores at the Petabyte scale, replicates into multiple regions, supports Hadoop HBase interfacing, data is stored in the Colossus filesystem, and metadata is stored in the cluster directly.

Data is stored in tables with key to value maps and each row stores information about the entry which is indexed by a row-key. Columns are grouped into column families like collections and a table can container multiple column families.

Tables are sectioned into blocks of contiguous rows called tablets. These tablets are stored in Colossus. Hotspots occur when you make the row key associated with a workload. For instance, if you make the row key the user ID, the heavier use users will all write to one tablet server. Design the workloads so that they're as distributed as possible, and if hotspots still do occur you can limit or throttle the keys that cause the problem. Find out more about [Bigtable hotspots](https://cloud.google.com/blog/products/databases/hotspots-and-performance-debugging-in-cloud-bigtable).

Bigtable has support for the HBase API, so one can migrate from Hadoop HBase to Bigtable. Bigtable is the best option for migrating Cassandra databases to Google Cloud. One can create Bigtable as a multi-cluster and multi-regional and Google will take care of replicating the data. Multi-cluster systems can have their workloads separated, one being the read cluster and the other being assigned a write workload. The cluster replication procedures will assure that both cluster reach "eventual consistency".

#### Cloud Datastore
Datastore is a fully managed, autoscaled, flexible structure NoSQL database for storing json objects called documents. It is superseded by Cloud Firestore. Datastore doesn't have tables, it has what is known as a 'kind'. Kinds contain entities. Datastore does have relational column called a property and it has a key instead of a primary key.


#### Cloud Firestore
This is the next product iteration of Cloud Datastore. Firestore is consistent, has two data models(collections and documents). Firestore operates under Datastore mode or Firestore mode, for supporting the latest document database features. Firestore is strongly consistent in either mode. Firestore in Datastore mode is strongly consistent where as Cloud Datastore is eventually consistent. Firestore offers millions of writes a second and the fully featured mode can handle millions of connections.

### Memorystore
Managed as other products are, Memory store comes in two forms, Redis and Memcached. You can use memory caches for message processing, database caching, session sharing, etc. Memory caches are generally nonpersistent, but Redis can be configured to snapshot to dir and start again with that same data.

#### Memorystore for Redis
Redis is a memory datastore designed to return information with sub-millisecond latency. You can store many data types in Redis. Instance memory ceilings top out at 300GB with 12 Gigabit networking. Caches can be replicated across zones for 3 nines availability. As a managed service, google handles updates, upgrades, syncing and failing over to other instances.

Memorystore for Redis comes in two tiers:
* Basic
* Standard

Basic is a single server with no replication, Standard is a multi-zonal replication and failover model.

#### Memorystore for Memcached
Memcached is an opensource cache which was first written for LiveJournal to perform query results caching, session caching, and data caching. Memcached nodes within a cluster called an 'instance' must all have the same cpu and memory geometry. So the same amount of resources on each node. Instances can have 20 nodes max, nodes can utilize a max of 32vCPUs and 256GB of memory, with a total cluster memory size of 5TB. This integrated service can be accessed from other services.

## Data retention & Lifecycle Management
Data has lifecycles, is fresh, becomes inactive over time, must be archived or pruned. Different types of data have different stages, not only that they can be differently required. As an architect, you must track and handle these data lifecycles for a project or migration.

Storage requirements often impact how policies can be implemented. That is why intimate knowledge of various storage attributes is required of Cloud Architects.

Considering these things is a matter of knowing all your data and the types of data. From there you can record how quickly data must available to be accessed. Then knowing the frequency of access for each type helps define your retention planning and your planning the management of its lifecycles.

|Frequency|Solution|
|--|--|
|Sub-millisecond|Cloud Memorystore, Bigtable, Firestore|
|frequently|Cloud Storage, Database, NoSQl, Document database|
|infrequently|Cloud Storage Coldline|
|not accessed archived|Cloud Storage Archive|
|not accessed|Prune|

In Cloud Storage, one can create triggers that run based on the age of an object or file, the versions of that file, the object's storage class, actions can include deleting, manipulating or changing the storage class of the object. So when objects are old and not accessed, they can be migrated to different classes. Retention policies can be created and when their specifications are not yet satisfied, they are locked into place guaranteeing their retention under the conditions specified in the policy.

## Network and Latency
Latency is a big consideration in overall cloud design. There are decisions you can make that impact latency without knowing their consequences if you are unfamiliar with the particulars of different storage cloud products. Reducing latency is as simple as:

* Replicating data into regions across customer locations
* Distributing data over a CDN
* Using the Premium Network Tier
* Using services like Firestore or Spanner which are already global

## Summary
GCP has Relational, Analytical, and Unstructured Databases. There are four kinds of cloud storage systems:

* Cloud Storage for objects
* NAS via Cloud Filestore
* Databases
* Memory Caches

GCP Relational Databases:
* Cloud SQL: Eventual Consistency
* Cloud Spanner: High Consistency

GCP Analytical Databases:
* BigQuery: Columnar

NoSQL Databases:
* Bigtable
* Datastore
* Firestore

## Exam Essentials
* Understand all the Storage Systems in GCP
* Understand: Standard, Nearline, Coldline, Archive classes in Cloud Storage
* Understand: Cloud Filestore NAS features, accessing from Compute
* Know how to deploy Cloud SQL as a single server or with replication
* Understand horizontal scalability in GCP Storage options
* Be familiar with BigQuery as a data warehouse
* Be familiar with BigTables Petabyte Scale Options and Operations
* Be familiar with migrating data to GCP
* Understand GCP's JSON Document stores
* Understand Caching services
* Understand data retention and lifecycle management
* Understand how to consider latency when designing storage for GCP

## Official Resources
* [Load Balancing and Autoscaling Compute Engine](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling#:~:text=documentation%20for%20descriptions.-,Autoscaling,need%20for%20resources%20is%20lower.)
* [Cluster Autoscaling Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler)
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.google.com/docs)




