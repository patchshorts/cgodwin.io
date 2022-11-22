---
icon: cloud
date: 2022-09-10
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'Google cloud'
  - GCCPCA
  - Bigtable
  - Database
  - 'Information retrieval'
  - Data
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
Running a database cluster on Compute VM, you take all the management upon yourself. If you select the wrong compute sizes, either too big or too small, you run risks of rising costs or falling performance.

|Product      |Relational|Structured|Unstructured|Heavy R/W|Low Latency|Global Consistency|
|:------------|:--------:|:----------:|:----------:|:-------:|:---------:|:----:|
| Bigtable    |     🔴  |🟢|    🟢      |     🟢  |     🟢    |🔴  |
| BigQuery    |     🟢  |🟢|    🟢✝     |     🔴✝✝|     🔴    |🔴  |
| Cloud Firestore|  🔴  |🔴|    🟢     |     🔴|     🔴    |🔴  |
| Firebase Realtime Database|     🟢  |🟢|    🟢✝     |     🔴✝✝|     🔴    |🟢  |
|Cloud SQL    |     🟢  |🟢|    🟢      |     🔴  |     🔴    |🔴  |
|Cloud Spanner|     🟢  |🟢|    🔴      |     🔴  |     🔴    |🟢  |
|Compute VM   |     🟢  |🟢|    🟢      |     🔴  |     🔴    |🔴  |

| Symbol  |    Meaning   |
|:-------:|:-------------:|
|   🟢    | Yes          |
|   🔴    | No           |
|✝|  Semi Unstructured Data with the Json type|
|✝✝| Read / Append Only|
## Official Resources
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.Google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.Google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.Google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.Google.com/docs)