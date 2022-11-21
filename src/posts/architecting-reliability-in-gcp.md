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
Some out of the box dashboards are created when you create certain resources such as a Cloud Run instance or a firewall rule, or a Cloud SQL instance. Otherwise you can create the dashboards that you need for your project's golden signals and other operational metrics that are important to your workload. Users can fully customize them to their needs and to their specific data. Like development, creating dashboards in GCP can often be a cyclical process because you have to create displays which help you quickly diagnose problems at scale. You may start out with planned Key Performance Indicators(KPIs) but then you might drop some and tune into others.

### Cloud Monitoring Alerts
When you monitor for problems and use your metrics data in dashboards, you may move on to automatic alerts so you don't have to monitor the dashboards. This allows you to notify the correct parties when incidents occur. Normally your cloud infrastructure is structured in a way that auto-healing remediates problems, but in the case where auto healing can't fix an issue. Crashed pods for instance, are restarted when their liveness probes meet the failure criteria and the RestartPolicy allows for it.

Alerts trigger when time series data goes above or below a certain threshold and can be integrated with third party notifications systems such as MS Teams and Slack. Policies specify these conditions, who to notify, and also specify a way to specify the data you're selecting the resources to alert on. Conditions are used to determine unhealthy states so they can be fixed. It is up to the architect of the policy to figure out how to define what is unhealthy. It could be a port not responding, an http code, or how long ago a file was written, as long as it can be exposed as a metric.

It is easy to create false or flapping alerts and therefore you'll have to adjust the timing and thresholds for your conditions. You can also increase reliability by setting automatic remediation responses. When a CPU utilization alert is set, for instance you can add new VMs to a group, you can run a job that runs `kubectl patch` a kubernetes deployment's Horizontal Pod Autoscaler(HPA) to raise the replicaCount ceiling and then lower it after load is decreased.

All of Google's managed products like BigTable and Cloud Spanner do not need to be monitored because Google manages the incident response. Switching to these services can help you reduce the amount of monitoring, notifying and alerting you have overall. Of course the recommended approach on migrating to managed services with regard to alerting is to monitor throughput and latency on managed services though resource monitoring like cpu and memory are not needed on them. This is especially true if you are connecting to in-cloud managed DBs from on-prem workloads through VPN or interconnects. Hybrid and Multi-cloud latencies are metric points of monitoring that should be shown on a dashboard and included in notifications.

### Cloud Logging

Cloud Logging is a log collection service that either has log collection agents or collects logs from managed services like GKE naturally. Log entries are not time series and occur when system events happen. The `/var/log/syslog` or `/var/log/messages` in a Linux VM collects messages about several services together, but there are other logs like `/var/log/auth.log` or `/var/log/lastlog`. These logs record data about who is currently logged in and the most recent shell sessions respectively. So these logs are only filled when users trigger login events, either on the consol or remotely. Processes may run garbage collection or some kind of file de-fragmentation and print log messages.

Cloud Logging can store logs from any GCP resource or on-premises resource. In Cloud Logging logs can be searched and queried, exported to BigQuery. When you use Cloud Log Analytics log data is automatically exported to BigQuery. You may also choose to send logs to Pub/Sub and have them consumable by third party log software such as Splunk.

### FOSS Monitoring
The popular free and open source(FOSS) tools such as Prometheus and Grafana can be used with Cloud Monitoring. Prometheus is controlled by the CNFN who controlls Kubernetes. Prometheus scrapes HTTP(S) endpoints and collects data and stores it in a multi-dimensional way based on attributes. This is great for Querying with PromQL the query language used with the project.

Google Managed Prometheus provides a monitoring agent which uses Google's in-memory time-series database called Monarch. Grafana used in conjunction with Prometheus can display metrics in graphs from several data sources. Grafana has the ability to directly query data sources and monitoring services.

### Continuous Delivery

Managing releases are an important part of the software lifecycle development process. Some releases are more involved and more complex than others. Releases are often interdependent and therefore need high levels of planning and coordination on behalf of development teams and release engineering teams. The better release management and deployment strategies you have the more reliable your services will become. In an agile and continuously deployed environment, there are pipelines that deploy new artifacts to dev, test, staging, and production often called intg, qa, uat, and prod. intg and qa are what are considered the lower environments and those experience lower load but a higher and more frequent rate of iterations, so intg and qa get the most deployments. These frequent deployments to development and testing environments allows developers to go back to the planning stage before a change gets to production in the case it doesn't pass 100% of the tests or function 100% of the time.

So problems are worked out early on and once they get to Unattended Automated Testing(UAT), the programmatic list of tests in a production similar environment under production similar load validates the release to go to production. Some pipelines have fully automated and unimpeded ascents to higher environments, however the more critical workloads in Fortune 500 enterprises all have barriers to production on services that will have customer impact in the case of a release failure.

Even with that, errors get into production and need to be fixed quickly, which is where this release management using DevOps principles of Continuous Deployment allows for a pull request to be merged and tagged, automatically built and polled by the CD triggers, and in minutes be sent out to all the environments ready for the approval barrier to succeed so that the hot fix makes it to production quickly.

This is the best way to rapid produce fixes while reducing risk in releases. In this model, all the access to make release imacting changes are given to the developer who runs these pipelines when needed or when triggered automatically, while some release and integration engineers approve and perform the production runs and service swaps.

Testing in continuous deployment pipelines involves acceptance and regression tests, while unit and integration tests are usually part of Continuous Integration. The exception is that a lot of deployment code might have validations and unit testing as part of their runs. This is the case in terraform Infrastructure as Code(IaC) and with configuration management pipelines like salt and puppet. Tests usually define expected states and the resource being tested say an endpoint such as `/health` which prints the artifact version. The endpoint is what is checked and the state is the key and value expected. The test for that state passes when the endpoint is fetched and the real value and key are compared to the expected state. If the value was lower than expected the service has regressed and the regression testing will fail. In the case of a unit test, a yaml file might contain input, and the unit test in puppet processes the function and contrasts the output to the expected output that
the developer defined in the test. Several of these definitions when related constitute a test that would run before the deployment code executives the active part of the workflow.

Integration tests can exist at all different layers that code exists: in a repository, running as a service, testing dependent APIs. Integration tests can tests for things such as a name longer than the amount of allow characters that the backend will receive per the database schema. Integration tests are different than Unit tests as they span all the units of code together in a running artifact.

Acceptance testing are generally testing if the release being deployed meets the business needs the software was designed to meet such as a customer being able to open a new account, change their account data, review it and delete their account. This is an example of an acceptance test for a root business goal of onboarding new customers.

Some times an automation department will order a whole environment tier just for performance testing and load testing. With this you can understand how your application wil fail or perform under load. You can use load testing to simulate so many transactions per minute. While load testing you can do chaos engineering and make things go wrong to see how customers will be impacted. This teases out bugs, latency tuning problems, memory tuning problems, database connection ceilings and subsequent timeouts. 

### Deployment Methodologies

Service swaps are done typically in a blue green or canary deployment style. There are a few different popular deployment strategies:

* Big Bang
* Rolling
* Canary
* Blue Green
* Swap Only

||Big Bang|Rolling|Canary|Blue Green|
|--|--|--|--|--|
|Expense|$|$|$|$$|
|Risk|very high|high|low|very low|
|Complexity|low|low|mid|high|

Big Bang deployments, often called "complete" deployments simply update all instances of the software wherever they occur according to the recommended approach in the release notes. On a linux server that uses rpm packages as the method of deployment delivery, a service is stopped, the RPMs are installed with yum, dnf, or rpm directly, database deltas are applied if they are included in the release, and the service is started again. This may happen in series or parallel on all the systems to which it will be applied. This process can be run by script, package configuration and package manager, or a configuration management tool like Ansible, Salt or Puppet. Before continuous deployment was popular, this was the most used deployment style and it was performed manually at first, then with automation.

This is the cheapest as it only ever involves one copy of your infrastructure to be alive at one time.

Rolling deployments are the second cheapest because in some contexts you only need two copies of your infrastructure running while the latest one boots and becomes available. Once its healthy the previous versions are terminated. This is the case with Cloud Run and Kubernetes Pods with regard to rolling deployments. Otherwise with VMs, rolling deployments upgrades one server, tests or problems and then after a time moves onto another until the deployment is rolled out.

This kind of deployment is database delta risky because changes to the database which are not additions might cause 9 out of 10 servers fail running the older version. In this example scenario, 90% of your customers are impacted until the rollout progresses to 2 servers, then 80% suffer until the 3rd server has its deployment updated. If you don't have db deltas or only ever append to you schemas, the risk is considerably less and only impacting a subset of customers at a time becomes an advantage.

Canary deployments are a type which releases new artifacts to infrastructure that receives a test amount of live traffic. When no errors are detected in the deployment, the rest of the traffic is routed to the new infrastructure. In the case of VMs this can be in the form of creating a new Managed Instance Group(MIG) with a new image that has been built with the new code. It can use its existing disk image but run some configuration management code to perform the upgrade, or it can have a new version label applied to it to be selected for an ssh script which does the deployment. In the case of containers, this comes in the form of a new docker tag, a new docker deployment and some routing magic which is automatically built into services like GKE and Cloud Run. There are several ways to choose users whose traffic is routed to the canary deployment.

Blue Green strategies are those which use two environments, one active while the other is inactive. When deployment pipelines run, they keep track of which service, either blue or green is active. When the deployment workflow performs the release, it releases to the inactive set of infrastructure which is receiving not traffic. Verifications, regressions and production tests validate the inactive deployment and then the workflow switches all the traffic to the new deployment at once.

While the most expensive route because it requires constantly maintaining two copies of identical infrastructure, it mitigates the most risk. Firstly, failed deployments result in a failed iteration and no change in routing therefore customers continue using the older version of the service. Then, if a live active deployment fails, the traffic can be swapped to the inactive service to reinstate an older version of the software without any new releases. The iteration can fail and the developer can take the feedback and begin again fixing the issues and cutting a new release version for a new deployment. In a blue green strategy you have to decide if both versions will connect to the same database. If you ony append to your schema this is fine, otherwise database deltas which edit, rename, remove or change tabes and felids you may consider running a blue and green database, configuring each service with either of these and when swapping the traffic, you change an environment variable
selecting the database and restart the service. In kubernetes this is as simple as running `kubectl set env` on the deployment. You can run this command in swap deployment workflows for `pod`, `replicationcontroller`, `deployment`, `daemonset` `statefulset`, `cronjob`, `replicaset`.

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