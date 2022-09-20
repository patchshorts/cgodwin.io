---
icon: cloud
date: 2022-09-17
category:
  - Google Cloud
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
---

# Recap Business Requirements

[[toc]]











## Global Up-to-Date Data
Cloud spanner is the best option for an SQL based global records storage with a High Consistency SLO.

## Virtual Private Clouds(VPCs)
VPCs isolates the network of your project so that customers running in the same cloud, people on the internet, and people without a need in your company are denied access unless you specify otherwise.

## Factors of Volume and Load
The main factors that affect volume are the number of data generators or sensors. If you consider each process that can log as a sensor, the more you log the higher your volume in Cloud Logging, the highter the processing costs in BigQuery and so forth.

* Number of hosts
* Number of logging processes
* Network Connectivity
* Verbosity Configuration

## Reducing Latency on Image Heavy Applications
Google Cloud CDN is a content delivery network that uses Google's global network of edge locations to deliver content to users with low latency. It is a cost-effective way to improve the performance of your website or web application by caching static and dynamic content at the edge of Google's network. Cloud CDN can also be used to deliver content from your own servers, or from a content provider such as a CDN or a cloud storage service. 

Using Google's Cloud CDN in combination with multi-regional storage will reduce load time.

## Time series data
Time series data is a type of data that is collected over time. This data can be used to track trends and patterns over time. Time series data can be collected manually or automatically. Automatic time series data collection is often done using sensors or other devices that collect data at regular intervals. This data can be used to track the performance of a system over time, or to predict future trends. These are examples of time-series data:

* MRTG graph data
* SNMP polled data
* Everything a fitbit records
* An EKG output

Time series data is best stored in BigTable which handles this workload better than BigQuery or CloudSQL.

## Cloud Dataflow
Cloud dataflow is a cloud-based data processing service for batch and streaming data. It is a fully managed service that is designed to handle large data sets with high throughput and low latency. Cloud dataflow is a serverless platform that can scale automatically to meet the needs of your application. It is a cost-effective solution that allows you to pay only for the resources you use.

## Cloud Dataproc
Cloud Dataproc is a cloud-based platform for processing large data sets. It is designed to be scalable and efficient, and to handle data processing workloads of all types. Cloud Dataproc is based on the open-source Apache Hadoop and Apache Spark platforms, and provides a simple, cost-effective way to process and analyze data in the cloud.

## Dealing with Inconsitent Message Delivery
Cloud Pubsub is a messaging service that allows applications to exchange messages in a reliable and scalable way. It is a fully managed service that can be used to build applications that require high throughput and low latency.

If Applications are working sychronously, decouple them and have the reporters interact with a third services that is always available and that autoscales.

## Keeping Data Entirely Secret
Cloud KMS is a cloud-based key management system that allows you to manage your cryptographic keys in a secure, centralized location. With Cloud KMS, you can create, use, rotate, and destroy cryptographic keys, as well as control their permissions. Cloud KMS is integrated with other Google Cloud Platform (GCP) services, making it easy to use your keys with other GCP products.

When you manage the encryption keys Google uses to encrypt your data, the data is kept secret from anyone who doesn't have access to decrypt it, which requires access to uses those keys.

## Improving SQL Latency
Export unaccessed data older than 90 days from the database and prune those records. Store these exports in Google Cloud Storage in Coldline or Archive class buckets.

## When Managers and Directors Only Compare Infrastructure Costs
Calculate the TCO of legacy projects against planned cloud projects. Calculate the potential ROI with regard to the TCO of the investment. Use this wider scope to compare the true cost of running legacy projects or forgoing cloud migrations.

## Minimal Effort Predictions
Cloud AutoML is a cloud-based tool that allows developers to train machine learning models with minimal effort. It is designed to make the process of training machine learning models easier and faster. Cloud AutoML is based on the Google Cloud Platform and offers a variety of features that make it a powerful tool for machine learning.

## Extract, Transform, Load
It is what it says. It takes large volumes of data from different sources. Transforms it to useable data, and makes available the results somewhere for retrieval by others.

Cloud Datafusion handles these tasks for data scientists and makes it easy to transfer data between various data sources. It offers a simple drag-and-drop interface that makes it easy to connect to different data sources, transform and clean data, and load it into a centralized data warehouse. Cloud Datafusion is a cost-effective solution for businesses that need to quickly and easily integrate data from multiple sources.

Simply AutoML can watch for events and predict when those events will occur.
## Official Resources
* [The Official Google Certified Professional Cloud Architect Exam Guide](http://cloud.google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.google.com/docs)