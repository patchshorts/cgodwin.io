---
icon: cloud
date: 2022-10-25
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
Iam roles only grant you management access but file access is managed with unix permissions in an octet format 0777, chown and chgrp.

## Databases
Google cloud has several different database options. Relational, NoSQL, Analytical.

## Data retention & Lifecycle Management
## Network and Latency

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




