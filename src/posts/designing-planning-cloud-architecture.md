---
icon: cloud
date: 2022-09-12
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
---

# Designing and Planning Solutions in Google Cloud with GCP Architecture

[[toc]]

## Key Considerations
* Business Use Case & Product Strategy
* Cost Optimization
* Dovetail with Application Design
* Integration with External Systems
* Movement of Data
* Planning decision trade-offs
* Build, buy, modify, deprecate
* Measuring Success
* Compliance and Observability

## Collecting & Reviewing Business Requirements

Architects begin by collecting business requirements and other required
information. Architects are always solving design patterns for the current
unique mix of particular business needs. **So every design is different**.
Because of this, you cannot reuse as a template a previous design *even if it
solved a similar use case*.

### Operational Topology
This unique mix of business requirements and needs is what we'll call the
Operational Topology. An Architect begins their work by making a survey of this
landscape.

The peaks and valleys, inlets and gorges of this topological map include things
like:
* Pressure to reduce costs.
* Speeding up the rate at which software is changed and released.
* Measuring Service Level Objectives(SLOs)
* Reducing incidents and recovery time.
* Improving legal compliance.

::: tip Incident
An incident is a period of time where SLOs are not met. Incidents are disruptions in a service's availability therefore becoming degraded.
:::

## Reducing Capital Expenditures
The use of Managed services places certain duties on specialized companies who
can reduce the cost of management by focusing on that discipline's efficiency.
This enables your business to consolidate its focus on its trade and products.

Managed services remove from an engineering team's focus those concerns such as
provisioning setup, initial configuration, traffic volume increases, upgrades,
and more. If planned properly, this will reduce costs but those projections need
to be verified. Workloads need to be separated in scope of their availability
requirements. Workloads that don't need highly available systems can use
preemptive workloads. Pub/Sub Lite trades availability for cost. Auto-scaling
and scaling down to zero, for instance, enable cost savings in tools like Cloud
Run and App Engine Standard. Compute Engine Managed Instance Groups will scale
up with load and back down to their set minimum when that load subsides.

## Accelerating Development

We want to accelerate all development to a speed of **constant innovation**, the
CI/CD *singularity*. This is what success means. Again, using **Managed
Services** enables this by letting developers and release engineers focus on
other things besides infrastructure management. The services Google hosts and
manages and offers allows developers *without domain expertise* in those fields
to use those services.

Continuous Integration and Deployment enable quick delivery of minor changes so
that reviews can be quick and tracked work can be completed like lightening.
Automated testing and reporting can be built into these delivery pipelines so
that developers can release their own software and get immediate feedback about
what it is doing in development and integration environments.

However, sometimes there are tacit business requirements that prevent you from
using one of these solutions on every asset a business needs to maintain. You
may be tasked to architect solutions around an ancient monolithic service which
cannot be delivered to production in an agile manner. Planning to get out of
this situation is your job and selling that plan to decision makers is also your
goal. You have to believe in your designs and be an optimist that these
specifications are all that is needed to meet the [Operational
Topology](#operational-topology).

You may break apart the giant macroservice into microservices, but even if you
do, that's the future, what to do now? Do you rip and replace, meaning rebuild
the app from scratch? Do you lift and shift, bring the macroservice into a
compute engine while moving to microservices later. Finally, you could convert
to microservices as you move it into cloud striking a hybrid between the two.
Business requirements will point the way to the correct solution every time
without fail.

## Reporting Service Level Objectives(SLOs)

An application's requirements which surround how available it needs to be to
those whom it serves is called Service Level Objectives. Accounting systems
might not need to be running except during business hours, while Bill pay
applications that customers use will need to always be available. These two
different systems used by two different audiences needs two different Service
Level Objectives.

SLOs specify things like uptime, page load time. These events are recorded
within Cloud Logging. When they are not met Alerts can be created with Cloud
Monitoring. The data points in these logs are called Service Level
Indicators(SLIs). An SLO is a formal definition of a threshold which SLIs need
to stay compliant with.

## Incident Recovery-time Reduction

When services become unavailable or degrades, an Incident has occurred. A
Business's response to an incident may vary from company to company, but for the
most part, every company has some sort of response system.

Collecting metrics and log entries along the way reduce the time it takes to
recover from incidents because it illuminates the states of parts of the system
when the error occurred. The first thing a reliability engineer does is look at
logs on a problematic system. If one can see all logs from all components in one
place at the same time one can better put together a complete story rather than
having to revise the story continually as the information about the problem is
discovered.

## Compliance and Regulations

The Big five most architects have to worry about are:

* Health Insurance Portability and Accountability Act(HIPPA), a healthcare
  regulation
* Children's Online Privacy Protection Act (COPPA), a privacy regulation
* Sarbanes-Oxley Act(SOX), a financial reporting regulation
* Payment Card Industry Data Standard(PCI), Compliance data regulation
  protection for credit card processing
* General Data Protection Regulation(GDPR), a European Union privacy regulation

Compliance with these means controlling who has access to read and change the
regulated data, how and where it is stored, how long it must be retained.
Architects track and write schemes of controls which meet these regulations.

## Terms Related to Business Requirements
### Capital Expenditure
Capital expenditures are funds used to purchase or improve fixed assets, such as
land, buildings, or equipment. This type of spending is typically used to
improve a company's long-term prospects, rather than for day-to-day operations.
Because of this, capital expenditures can be a significant financial decision
for a business, and one that should not be made lightly.

### Compliance
Implementation of controls on access, storage, and lifecycle of sensitive data.

### Digital Transformation
Digital transformation is the process of using digital technologies to create
new or improved business processes, products, and services. It can be used to
improve customer experience, operational efficiency, and competitive advantage.
In order to be successful, digital transformation must be driven by a clear
strategy and executed with careful planning and execution.

### Governance
Governance is the process by which organizations are directed and managed. It
includes the creation and implementation of policies, the setting of goals, and
the monitoring of progress. Good governance is essential for the success of any
organization, as it ensures that resources are used efficiently and effectively.
There are four main principles of good governance: accountability, transparency,
participation, and inclusiveness. Accountability means that those in positions
of authority are held accountable for their actions. Transparency means that
information is readily available and accessible to those who need it.
Participation means that all stakeholders have a say in decision-making.
Inclusiveness means that all voices are heard and considered. These principles
are essential for the success of any organization.

### Key Performance Indicators(KPI)
A key performance indicator (KPI) is a metric used to evaluate the success of an
organization or individual in achieving specific goals. KPIs are often used in
business to track progress and compare performance against objectives. While
there are many different KPIs that can be used, some common examples include
measures of sales, profitability, productivity, customer satisfaction, and
safety.

### Line of Business
A line of business (LOB) is a group of products or services that are related to
each other. Businesses often have multiple lines of business, each with its own
set of customers, products, and services. For example, a company that sells both
cars and trucks would have two lines of business: automotive and commercial
vehicles. Lines of business can be created for different reasons. Sometimes,
businesses create lines of business to take advantage of different market
opportunities. Other times, businesses create lines of business to better serve
their customers' needs. Lines of business can be a helpful way for businesses to
organize their products and services. By creating lines of business, businesses
can more easily target their marketing and sales efforts.

### Operational Expenditures
Operational expenditures are the costs associated with running a business on a
day-to-day basis. They can include everything from rent and utilities to payroll
and inventory costs. For many businesses, operational expenditures are the
largest category of expenses. Managing operational expenditures is a key part of
running a successful business. Careful planning and budgeting can help keep
costs under control and ensure that the business is able to generate enough
revenue to cover all of its expenses. Operational expenditures can have a major
impact on a business's bottom line. Therefore, it is important to carefully
track and manage these costs. Doing so can help ensure that the business is able
to remain profitable and continue to grow.

### Operating Budget
An operating budget is a financial plan that details how a company will generate
and spend revenue over a specific period of time. The operating budget is
important because it ensures that a company has the resources it needs to meet
its operational goals. The budget also provides a way to track actual results
against desired outcomes.

### Service-Level Agreement(SLA)
A service level agreement (SLA) is a contract between a service provider and a
customer that specifies the nature and quality of the service to be provided.
The SLA will typically include a description of the service to be provided, the
standards that the service must meet, the customer's responsibilities, and the
service provider's obligations. The SLA may also specify the remedies available
to the customer if the service provider fails to meet the agreed-upon standards.

### Service-Level Indicators(SLI)
Service-level indicators (SLIs) are performance metrics that help organizations
measure and track the quality of their services. SLIs can be used to track the
performance of individual service components, as well as the overall performance
of the service. Common service-level indicators include uptime, response time,
and error rates. By tracking SLIs, organizations can identify service problems
early and take steps to improve the quality of their services.

### Service-Level Objectives(SLO)
Service-level objectives (SLOs) are a key component of any effective
service-level management (SLM) program. SLOs help ensure that services are
delivered in a consistent and predictable manner, and help identify and track
the key performance indicators (KPIs) that are most important to the success of
the business.

SLOs should be designed to meet the specific needs of the business, and should
be based on a thorough understanding of the customer's requirements. They should
be realistic and achievable, and should be reviewed and updated on a regular
basis.

An effective SLM program will help to ensure that services are delivered in a
timely and efficient manner, and that customer expectations are met or exceeded.

## Analyzing Technical Requirements

Technical requirements specify the characteristics that a system or component
must have in order to be able to perform its required functions. These include
requirements such as atomicity, consistency, reliability, and durability.
Atomicity refers to the ability of a system to guarantee that a transaction is
either completed in its entirety or not at all. Consistency refers to the
ability of a system to maintain data integrity. Reliability refers to the
ability of a system to perform its required functions correctly and
consistently. Durability refers to the ability of a system to maintain data
integrity in the face of failures.

### Functional Requirements

Functional requirements are the specific capabilities that a system must have in
order to perform its intended functions. For example, a compute requirement
might be the ability to process a certain amount of data within a certain time
frame, while a storage requirement might be the need for a certain amount of
space to store data. Network requirements might include the need for certain
bandwidth or the ability to connect to certain types of devices. All of these
requirements must be taken into account when designing a system.

#### Cloud Compute Engine

Requirements can be grouped into being met by the cloud's offerings. Compute
Engine, App Engine, Kubernetes Engine, Cloud Run, and Cloud Functions all solve
unique use cases. It is forseeable that all of *your* requirements are going to
fall along these lines when it comes to processing data requests, responding to
requests, delivering content and interfaces. If not, another google product will
represent a Functional Needs subset.

#### Cloud Storage

Similarly, storage options are plethora. One or more of them meet our needs. Is
your data Structured, or Unstructured, Relational? What latency requirements do
you have? Group your requirements together and look at how the offerings meet
those needs. If you are only appending dumps of data somewhere, you can chose a
better option for that.

#### Cloud Networking Requirements

How many instances or nodes will you need? That number will affect how big your
subnets will need to be. Can Firewall rules be allowed by service accounts? Do
you have multiple workloads that you can sort into different groups to which the
rules correspond?

Do you need DNS peering to enable hybrid-cloud networking between your VPC and
your on-premesis networks? These are questions an architect asks. You have to take
the company's subnets into account so that you can avoid collisions. So is
automated or custom subnetting right for your project?

How is hybrid peering accomplished: VPN Peering which has high security but low
througput? Or will Dedicated Interconnect and Partner Interconnects be used at
higher cost for greater throughput?

### Nonfunctional Requirements

Nonfunctional requirements are those that specify system characteristics such as
availability, reliability, scalability, durability, and observability. They are
often expressed as quality attributes or service level agreements. Functional
requirements define what the system does, while nonfunctional requirements
define how the system behaves. Nonfunctional requirements are important because
they ensure that the system will meet the needs of its users.

* Availabiltiy
* Reliability
* Scalability
* Durability
* Observability

#### Availability Requirements
There are many factors to consider when determining the availability
requirements for a system. The first is the required uptime, which is the
percentage of time that the system must be operational. For example, a system
with a required uptime of 99% must be operational for at least 99% of the time.
Other factors include the reliability of the components, the redundancy of the
system, and the response time to failures. Availability requirements are often
specified in terms of uptime and downtime, which is the amount of time that the
system is operational and unavailable, respectively.

#### Reliability Requirements
Reliability requirements are those that specify how often a system or component
must perform its required functions correctly. They are typically expressed as a
percentage or a probability, and they may be specified for a single function or
for the system as a whole. Reliability requirements are important because they
help ensure that a system will be able to meet its operational objectives.
Related to Availability, Reliability is the same requirement under the pressure
of business load.

#### Scalability Requirements
Scalability requirements are those that dictate how well a system can cope with
increased loads. They are typically expressed in terms of throughput, response
time, or capacity. For example, a system that can handle twice the number of
users without any degradation in performance is said to be scalable.

Scalability is a key consideration in the design of any system, be it a website,
an application, or a network. It is especially important in the case of
web-based systems, which are often subject to sudden and unexpected spikes in
traffic. A system that is not scalable will quickly become overloaded and unable
to cope, leading to a poor user experience and potential loss of business.
Scalability requirements often are linked to Reliability factors.

#### Durability Requirements
In order for a product to be considered durable, it must be able to withstand
repeated use and exposure to the elements without showing signs of wear and
tear. This means that the materials used to construct the product must be of
high quality and able to withstand regular use. Additionally, the product must
be designed in a way that minimizes the likelihood of damage. For example, a
durable product might have reinforced seams or be made from waterproof
materials. Ultimately, the durability of a product is a key factor in
determining its overall quality and usefulness.

Durability in the cloud is the ability to retrieve data placed there in the
future. This means not losing volumes, files, objects and the immediate
replacability and reproducibility of any resources that are not functioning
correctly.

#### Observability Requirements
Observability requirements are those that enable a system to be monitored and
its performance to be assessed and internal states to be known. They are
typically concerned with aspects such as the availability of data, the ability
to detect and diagnose faults, and the ability to predict future behavior. In
many cases, these requirements will need to be trade-offs between conflicting
goals, such as the need for timely data versus the need for comprehensive data.

## Official Resources
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.google.com/docs)