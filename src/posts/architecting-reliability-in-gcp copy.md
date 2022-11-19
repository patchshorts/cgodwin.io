---
icon: cloud
date: 2022-11-17
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'Google cloud'
  - gcp
  - GCCPCA
---

# Architecting for Reliability

[[toc]]

A reliable system is one people can get to now. Reliability is the probability a system can be reached and used without failure and Availability is a measure of how available a system is to be used within a given period of time.

## Cloud Operations Suite
In an environment of constant change, hyper scaling, frequent deployments, and business demand, you cannot maintain reliable systems without metics and insights.

There are some problems you'll come up against such as needing additional compute power, having to handle seasonal ups and downs, errors or crashing under load, storage filling up, a memory ceiling causes cache to cycle too often and therefore cause latency. The ways things can go wrong a several and in a distributed hyper-scaled environment you'll run into 1 in a million problems as well. That is why we need detailed information about the operation of the resources in our project.

Cloud Operations Suite which used to be known as Stackdriver has several operations products:

* Cloud Logging
  * Log Router
* Cloud Monitoring
  * Alerts
  * Managed Prometheus
* Service monitoring
* Latency management
* Performance and cost management
* Security management

**Cloud Logging** has the *Log Router* which is a built in part of Cloud Logging. The Cloud Logging API receives each log message and then send it to the Log Router which stores log based metrics, an then sends those messages to log sinks which store those entires in logs in a Cloud Storage bucket. Cloud Monitoring receives these log metrics and user defined sinks can send entries to BigQuery for longer storage retention. The default retention for Cloud Logging is 30 das.

**Cloud Monitoring** is Google's managed product in which you can setup alerting policies to alert you or your team when things go wrong. Things go wrong in the form of failed health or status checks, metrics over defined thresholds, and failed uptime checks. Policies can be defined so that uptime checks can meet certain requirements. Cloud Monitoring has several integrations for notifications which include Slack and custom webhooks. **Alerting Policies** are Google's way of user defined criteria for notifications about problems.

These are the three major services which when combined increase observability into your operations in GCP.

### Cloud Monitoring
Monitoring is collecting measurements about what hardware, infrastructure and performance. For example, CPU minimum and maximum, CPU averages, disk usage as well as capacity, network throughput and latency, application response times, memory utilization, 1/5/15 minute load averages. These metrics are generally time series. Metrics usually have a timestamp, a name and a value. Sometimes they can have other attributes like labels as is the case in GCP. GCP auto defines metrics but you can define your own metrics using BigQuery queries while having the Log Router send the custom logs to BigQuery. The timestamp is usually epoch time while the value is some value like percent of disk capacity used, web1_disk_usage might be the name of the metric.

Cloud Monitoring has an API which you can query for time series data based on name or resource, offers grouping resource groups based on attribute, list members of resource groups, list metrics and descriptors, listing descriptors of monitored resources and objects.

#### Dashboards
### Cloud Monitoring Alerts
### Cloud Logging
### FOSS Monitoring
### Continuous Delivery
### Deployment Methodologies
## Reliability Engineering
### Overload
### Cascading Failures
### Reliability Testing
z

## Exam Essentials

* blah

## Official Resources
* [Load Balancing and Autoscaling Compute Engine](https://cloud.Google.com/compute/docs/load-balancing-and-autoscaling#:~:text=documentation%20for%20descriptions.-,Autoscaling,need%20for%20resources%20is%20lower.)
* [Cluster Autoscaling Kubernetes Engine](https://cloud.Google.com/kubernetes-engine/docs/concepts/cluster-autoscaler)
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.Google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.Google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.Google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.Google.com/docs)