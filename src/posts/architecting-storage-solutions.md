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

## Object Storage

Object Storage is common to all cloud systems and has its roots way back in 2006 with Amazon S3 and Rackspace Files/OpenStack Swift and Google Cloud Storage in 2010. These systems are for storing files or documents as objects as opposed to a directory filesystem. Instead of hierarchical the particulate nature of object storage treats everything atomically. You can't seek and read parts of the file, you can't tail off of object storage. You can get, put, delete objects. Their organization depends on the system.

### Organization
Buckets in GCP are containers filled with these particular objects. Objects when updated create new versions, you cannot update an old version with a new file. Once a version is there they're immutable or unchangeable. The bucket is the logical definition with the IAM permissions that the objects inherit. Therefor you'll give write access to all the objects in the bucket to any accounts with write access. You can place individual IAM permissions upon individual objects. There is an illusion of a directory structure because the file "/pictures/2022-10-20/picture.jpg" on a file system would be named picture.jpg and live in the folder /2022-10-20/ which in turn lives in the folder /pictures/. However, with object storage, "/pictures/2022-10-20/picture.jpg" is the entire filename.

Buckets must be uniquely named from all other buckets in the cloud owned by all other users. Buckets cannot be renamed or automatically copied to a new bucket. Objects don't have to be uniquely named.

Bucket name best practices:

* Bucket names shouldn't have personal information.
* Use DNS naming standards.
* Use UUIDs or GUIDs if you have buckets in any real quantity.
* Don't upload objects with time series based filenames in parallel
* Don't name objects in sequence if uploading them in parallel
* It's best to use a subdomain

## Network Attached Storage
## Databases
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




