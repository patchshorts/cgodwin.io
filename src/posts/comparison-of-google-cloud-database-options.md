---
icon: cloud
date: 2022-09-09
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
---

# Comparison of Google Cloud Database Options

This is just a test page.

[[toc]]

## Bigtable
There are many pros to using bigtable, including the ability to handle large amounts of data, the flexibility to scale up or down as needed, and the ability to support a variety of data types. Additionally, bigtable is designed to be highly available and can provide near-real-time access to data. resizing without downtime, simple administration, highly scalable.
## BigQuery
BigQuery is a very powerful tool that can handle large amounts of data very efficiently. It is also easy to use and has a lot of features that make it a great choice for data analysis. On the downside, BigQuery can be expensive to use, and it can be challenging to get started if you are not familiar with it. 
## Cloud SQL
Google Cloud SQL is fully managed, flexible, automatically replicated across multiple zones, encrypted at rest and in transit, automatic updates.
## Cloud Spanner
Cloud Spanner uses TrueTime to execute the same query on multiple regions to ensure consistency. If your data needs to be consistent and cannot wait for replication, cloud spanner is the clear choice.
## Compute VM
Running a database cluster out of Compute VM, you take all the management upon yourself. If you select the wrong compute sizes, either too big or too small, you run risks of rising costs or falling performance.

|Product      |Relational|Unstructured|Heavy R/W|Low Latency|Global|
|:------------|:--------:|:----------:|:-------:|:---------:|:----:|
| Bigtable    |     🔴  |    🟢      |     🟢  |     🟢    |🔴  |
| BigQuery    |     🟢  |    🔵✝     |     🔴✝✝|     🔴    |🔴  |
|Cloud SQL    |     🟢  |    🟢      |     🔴  |     🔴    |🔴  |
|Cloud Spanner|     🟢  |    🔴      |     🔴  |     🔴    |🟢  |
|Compute VM   |     🟢  |    🟢      |     🔴  |     🔴    |🔴  |
✝  Semi Unstructured Data with the Json type
✝✝ Read / Append Only
| Symbol  |    Meaning   |
|:-------:|-------------:|
|   🟢    | Yes          |
|   🔴    | No           |
|   🔵    | With Caveats |

## Official Resources
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.google.com/docs)