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

# Differences in Google Cloud Platform(GCP) Priemium Network Tiers

This is just a test page.

[[toc]]

## Premium Tier
This tier uses more resources to think out the best route. This tier has more
than 100 Points-of-Presence(PoP) which lets the packets leave Google's network
nearest to the customer. Packets use a more direct route a "cold potato"
algorythm. This Tier support global load balancers.

## Standard Tier
Using the "Hot Potato" method, the Standard Tier network tries rid itself of the
packet by sending it to the earliest responding route. This is a less direct
path and may not egrees through a PoP as near to the destination. This Teir can
only support Load Balancers which are regional.

|Product      |Global LB |PoP Closest Hop|Next Hop Algorythm|High Performance|Inter-Regional Traffic|Cloud CDN|Cloud VPN/Router|
|:------------|:--------:|:-------------:|:----------------:|:--------------:|:------------------------:|:--------:|:--------:|
| Premium     |     🟢   |🟢            |Cold Potato       |    🟢          |Google Network            |    🟢   |     🟢   |
| Standard    |     🔴   |🔴            |Hot Potato        |Standard ISP    |Encrypted over Public ISPs|    🔴   |      🔴  |

| Symbol  |    Meaning   |
|:-------:|:------------:|
|   🟢    | Yes          |
|   🔴    | No           |

![GCP Network Tier Decision Tree](https://cloud.Google.com/static/images/network-tiers/decision-tree.svg)

## Official Resources
* [GCP Network Tiers](https://cloud.Google.com/network-tiers)
* [The Official Google Certified Professional Cloud Architect Exam
  Guide](http://cloud.Google.com/certification/guides/professional-cloud-architect)
* [Exam FAQ](http://cloud.Google.com/certification/faqs/#0)
* [Sample Questions](http://cloud.Google.com/certiications/cloud-architect)
* [GCP Documentation](http://cloud.Google.com/docs)