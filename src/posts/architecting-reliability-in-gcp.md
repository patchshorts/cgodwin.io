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

With blue green deployments you'll have to also script workflows which swap any urls of the services from active to inactive so that all the active services point to active urls while all the inactive deployments point to inactive endpoints. You can accomplish this in manually in the application config prior to deployment, or you can script this as part of your deployment swap workflows. Inside a GKE namespace, the `nginx` service is actively routing services to the nginx-blue pod while the nginx-stage service routes to the nginx-green pod. The nginx pods all proxy content for application pods called `app`. So nginx_blue needs to point its configuration at app_blue, which then connect to database_blue. Both the `nginx` and the `app` pods will need their urls swapped via `kubectl set env` or `kubectl patch`.

### Continuous Integration

This is the practice of building code with triggers that listen to each commit to a repository or set of repositories. The CI jobs are configured to run syntax validation, vulnerability scanning, unit tests, code quality test uploads, and pushing artifacts to artifact repositories. CI jobs might be single stage, multistage, create java artifacts, create deb and rpm packages and then repackage them in docker files. There are several CI suites which drive integration from Jenkins to Bamboo. Google Cloud Build is googles managed and serverless Continuous Integration product. With it you can host source code in Cloud Source Repositories, or sync them there. Cloud Build Triggers can then listen to the repository and trigger the jobs configured in the `cloudbuild.yaml` file stored in the triggering repo.

You can also manually build Continuous Integration pipelines. Configuring build pipelines is a much more consistent way to ensure artifact quality than manual integrations and manually running the build steps by hand.

## Reliability Engineering
Reliability engineering is mostly about building resiliency in pipelines, in the software, in the performance of services under load. One such example is a vanilla linux postfix mail server which uses linux users and groups as the main source of mail accounts. If users send mail using SMTP auth and check it with Imap, the shadow and passwd files are being queried ever time mail sends and receives. Additionally, when users change their password at the same time, there's always a chance of collision in that the files in question become corrupted because it suffers form simultaneous writes from two different processes. Not collecting password changes an queuing them one at a time with a success confirmation between each change, that corruption will never happen. The acts of Setting up a message queue to collect password jobs, writing an agent which reads the queue, and does the work while tracking what work as been done successfully or with errors, and what work is undone are all efforts
of Reliability Engineering(RE).

RE takes place on any layer of the technology surrounding a service from the code that runs services to the code that deploys services. Ensuring quality on every distinct layer is an SREs job.

Load is something you cannot plan for exactly how much you'll have. Errors happen at rates because there are certain chances of an error occurring. When you increase load, you not only increase frequency of known errors, you pull out of the chaotic universe higher magnitude errors and lower frequencies. These are you one in a million errors, that say Ticket Master might face every day since they're doing 100k transactions per second in some cases.

### Overload

You can guarantee that at some point you'll experience increased load and need to scale. If you aren't using a service like Cloud Run's autoscale then you'll have to manually configure and reconfigure each service to handle the load per that service's resource usage. Even in that case if you're running a Cloud SQL instance you'll have to vertically or horizontally scale it at some point.

Its best to design for this possibility at the beginning. The more user-facing a service is, the more reliability engineering will surround that service. Internal services and things like batch services which can fail cyclically and then at some point reach eventual processing, we don't necessarily have to worry about unless we have inter-team SLAs which we have to honor.

You can simply shed load, meaning you can respond to requests greater than a system can handle with error codes instead of the application. This isn't a clean approach though it is an approach. Based on revenue, business needs, you can shed load from priority services last and tertiary services first.

You can handle overload by degrading the accuracy or quality of the services. Switch 'contains' filters to 'beginswith' filters to reduce load on the database. Reduce latency everywhere you can but Instead of delivering full images deliver thumbnails to reduce load and restore higher resolution delivery later.

Upstream throttling is another way to deal with overload, you limit the calls or requests that you make on crippled systems. You can cache requests and process them later, enter requests into a message queue and process them later. You can switch from instant operations to queued operations modes, reducing load you can later offload to batch processing like profile edits or other non critical parts of your application. Spotify used a combination of CDNs and peer to peer client network to handle overload. The first 10 seconds of a song are loaded from a server and the rest of the file is loaded from other spotify users who have recently listened to a track.

If you build in a trip switch into your app, and then use monitoring to flip the trip switch, you application can decide to cache requests and process them when batch processes are performed like a wordpress cron job, for instance. You can flip the trip switch back when load returns to normal and the logic in your app will return its mode of behavior to the default behavior. When applications have built-in internal responses to overload, they become more reliable and they can log these occurrences for increase observability.

### Cascading Failures

Cascading failures are those whose effect becomes the cause of another failure. If a database has a disk error, application instances fail, and then proxy instances fail. This is the simplest and easiest form but consider when the application is generally mostly functioning but particular operations are inefficiently written in code and so they create unnecessary cycles. Certain days when certain jobs run and there are intermittent failures, and everything retries three times before completing. This is like cars backing up on the highway because they have to try three times to change into the lane that goes their way. The traffic gets backed up and it affects not only the cars here, but also the cars in queue to arrive here and this can compound and compound and remain a problem long after the initial prime cause is removed from the situation.

In a cascading failure, you may have a resource consumption problem that is the root cause and have issues determining on which system the root cause is happening. You can Upstream throttle in this case, and really apply any overload strategy in this case. If you have increased observability, say a dashboard for every impact causing signal, you can quickly see all the failed services in the cascade. You can have them organized and ordered by dependency so that you eye can go right to the problem. You can order your tests the same way in reverse so that things at the bottom of the stack like database and db disk size are the first tests so that you and run a test to identify the last responding service in a stack to quickly locate the root. So deal with these as you would overload, including using degraded levels of service. Windows introduced safe mode as a way to reliably boot your computer amid problems enabling users to make changes, and fix the issues, rebooting into disabled mode.
Windows safe mode boots into a degraded level of service and sheds some load by not enabling it.

When mitigating overload with autoscaling, consider that you need to set the thresholds as low as they need to be so that the load does eat up the resource gap by the time the new resources become available. If you set your Horizontal Pod Austoscalers to add a new replica when one container reaches 90% of CPU resources, but it takes 156 seconds to start a new pod, but only 100 seconds to eat up the remaining 10% of the resources, there will be a period of 56 seconds of unavailability. You'll need to set your thresholds lower or work on a speedier boot time on our containers.

Scaling down too quickly is also a concern and if your scaling down thresholds are too low, you might create a flapping situation where pods or instances are created and then destroyed repeatedly.

### Reliability Testing
The reason why you want to test is certainly increased observability but also have you ever put a bed-sheet on alone? One change to one area tugs an unexpected change in another area. You have to iterate too many times to arrive at your goals. With testing, you peg values as non-moving targets and the more you add the more of the field you successes and errors you can orient your self against. It's like pinning the sheet into place on one side while you tighten it on the other side getting out every wrinkle. This ensures that all processes stop right when you make a change that disrupts expected states and values.

Unit tests do this for software, are written and performed by developers and then incudes into the continuous integration process. Integration tests ensure that the units of a feature perform as a whole represented as a function. System tests are those which tests all components under a simple set of conditions that represent sanity checks. System tests that are called performance tests do this same process while placing several repeated requests simulating load. Regression tests are system tests which check to make sure past issues continue to be resolved in future releases. Reliability stress tests are those which do not limit the load but increase it continually until something breaks. The configuration and memory management of a java application, or instance is adjusted and the tests are rerun. You approach this until you exceed at minimum 20% growth over your highest load.

Stress tests are often used to simulate and understand cascading failures. This will inform your monitoring goals and strategy. Chaos engineering puts load on a system an then just randomly causes probably problems to see how the system will respond in order to tease out mitigation responses before they occur.

## Incident Management and Post-mortem sessions
Incidents are major problems. Severe incidences are those that impact services which have Service Level Agreements. Severe incidents can be defined as those which impact multiple teams and multiple different type of customer experiences on the service-level. Incident management is the set of duties surrounding incidents and include remediation and fixing the incident, recording details about the state of the incident as it initially occurred and a history of all the decision surrounding the incident. Incident management duties often include making calls to involved parties in an escalation tree.

* Notify a captain who coordinates the incident response.
* Call a working session with available response teams from operations, automation, and development teams.
* Analyze the problem, make corrections
* Audit all actions taken into a log for the post-mortem analysis

Incident management focuses on correcting the service-level disruption as soon as possible. There should be less concern with why it failed but how it will be fixed.
Incident management focuses on correcting the service-level disruption as soon as possible. There should be less concern with why it failed but how it will be fixed.

The post mortem should focus on a blameless cause of the incident. Blameless postmortems create less of an environment of fear which reduces cognition. Cognition is key to production solutions which fix future versions of this problem. In the spectrum of problems one can have there are patterns, unique to your app, that will form in incidents. If you catch and fix each one, 20% of all fixes will negate 80% of the errors. This zipfy statistic is what allows startups to launch on a startup amount of effort. As an application matures, engineers take on the remaining 80% of fixes which are one offs which apply to fringe cases that only affect 20% of the customers.

|Incidents/Bugs|Fixes|Customer Affect|
|--|--|--|
|Wide field|20%|80%|
|Narrow field|80%|20%|

This zipfy pareto principle is basically a [law of nature and governs everything](https://www.youtube.com/watch?v=fCn8zs912OE).

## Summary

Reliability is a measure of how available the system is over a period of time. Creating reliable systems is a discipline involving application design and development, deployment methodologies, Incident management, Continuous Testing and more. Continuous Integration and Delivery managed code releases and bring sanity and mitigate risk in what was traditionally quickly changing process. Systems Reliability Engineering involves software development that includes operations goals, things like safe modes with degraded services or upstream throttling. Architects must understand that systems will fail, and that the best way to live with failures are to have defined service level objectives service level indicators, monitor services to detect incidences, and learn from failures by to risk assessment and mitigation techniques.

## Exam Essentials

* Understand monitoring, logging, and alerting in gcp and in relation to reliability
* Be able to design for continuous deployments and integration
* Be versed in kinds of tests use in reliability engineering
* Understand that Reliability Engineering(RE) is a collaboration of operations and development goals combined on all levels of the system to reduce the risk of conflicting interests between development and operations.
* Understand that RE includes planning for unplanned load, cascading failures, and responding to incidents
* Understand that testing is a cornerstone of reliability engineering

## Official Resources
* [Load Balancing and Autoscaling Compute Engine](https://cloud.Google.com/compute/docs/load-balancing-and-autoscaling#:~:text=documentation%20for%20descriptions.-,Autoscaling,need%20for%20resources%20is%20lower.)
* [Cluster Autoscaling Kubernetes Engine](https://cloud.Google.com/kubernetes-engine/docs/concepts/cluster-autoscaler)
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.Google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.Google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.Google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.Google.com/docs)