---
icon: cloud
date: 2022-10-08
category:
  - Google Cloud
  - Technology
tag:
  - 'study guide'
  - 'google cloud'
  - gcp
  - GCCPCA
---

# GCP Networking

[[toc]]

## OSI Model Layers

1. Physical, the actual metal, wires, electrons and plastic ethernet plugs. You'll find wifi's radio frequency here because radio is physical phenomenon. In Quantum networking this layer are the entangled particles and the equipment uses to read and write to them plus the equipment used to connect to that. Voltage is sometimes the physical layer in Ethernet Over Power. With tin cans on a string, this layer is the cans, string and the vocal vibrations traveling through them.
1. Data Link, ARP, Mac Addresses, Collision avoidance. This is broken into two mini-layers, the first is media access control(MAC) and the second is Logical Link Control(LLC). The second acts as a negotiator between the MAC layer and the third 'Network' layer.
1. Network, this is where IP Addresses live. Keep in mind these network layers are the layers of a packet sent over the network. This is the base layer for packets. A packet is data encapsulated in a route with source and destination addresses.
1. Transport. The protocol that makes this process work known by all networking devices speak is Transmission Control Protocol(TCP) or User Datagram Protocol(UDP). The Protocol identifier stored in a packet lives in this layer.
1. Session, this layer manages handshakes. An SMTP connection timeout would exist on this layer. TLS handshakes happen here. An https packet is fully encrypted, so a request to a server asking for a url cannot be understood unless it is decrypted, then it can be seen. Inside layer 4 lives an encrypted layer 5 envelope in the case oF HTTPS connections. Layer 5 is the encrypted data, while layer 6 is the decrypted data.
1. Presentation, A GET / request is in this layer. Mappings of network resources to application resources in the OS kernel happen at layer 6.
1. Application, This is the later applications connect to in order to do networking. A webbrowser fetches web pages from this layer. This layer one might consider a data format. A TXT file vs a Json file. Mime types exist at this Layer. Layer 7 in the packet is the raw data unenveloped by network dressing that tells the network about it.

### OSI Model as an Out of Town Drive

1. Gravel, Concrete, Rebar, Paint, Reflectors, Lights, Engine, Fuel, Speed Limit Sign
1. The Lane
1. Connected Roads
1. Vehicle Tags, Driving Skills, Driving Laws
1. The Trip Session
1. The Itinerary of the Trip
1. The People on the Trip

Architects really only need to worry about layers 3, 4, and 7 with regard to load balancers, gateways, proxies, firewall rules, subnets, and traffic flow.

## IP Addresses, FW Rules, and Routing

CIDR means classless inter-domain routing notation. It's a way of simplifying the subnet mask by only specifying the bits. Understanding CIDR notation and IPV4 should be sufficient for the exam.

Networking in the cloud and in general works with IP Networking. IP networks are groups of devices. Subnets are spaces that identifiers live. A subnet is a street in a neighborhood. If all the addresses are single digits, then only 10 houses on that street are addressable. This is how IP networking works. You have to add more digits, or break the street into east street and west street to fit more addresses on that street.

In this way, networks are partitioned by their octets and subnet masks. Additionally they are partitioned with firewalls, NATing and public vs private IP spaces. Computers on the same physical network have an ARP table which maps IPs to MAC addresses as well as routing tables which map certain networks to specific network interfaces. IPV4 uses a four octet notation. Each octet represents numbers from 0-255. 0.0.0.0 is the internet. 255.255.255.255 is a subnet mask. Routers usually sit on the first or last ip in a network: 1 or 254. In binary to count to 255 you need 8 bits: 11111111, while 255 can be represented in hexadecimal as FF. but both have the same number of bits. So the highest number in an IPv6 block(FFFF) is 65535. That means that the IPv6 block has an entire IPv4 class B network within just one of its 8 groups: F0d8:0000:0000:0000:0000:0000:0000:0000. No IPv6 knowledge is required.

You'll use CIDR ranges to specify subnets in GCP. You can learn subnetting in IPv4 or use tools online or in the shell like ipcalc to find the right amount of addresses for your private networks. Remember to consider growth. No overlapping subnets can be created in a VPC and each subnet must be uniquely defined.

In IP Networks, there are public and private networks. Certain online committees like the Internet Engineering Tas Force(IETF) process documents lie those called RFCs which define internet open standards. RFC 1918 designates these subnets for internal private use:

* 10.0.0.0/8
```
$ ipcalc 10.0.0.0/8
Address:   10.0.0.0                 00001010. 00000000.00000000.00000000
Netmask:   255.0.0.0 = 8            11111111. 00000000.00000000.00000000
Wildcard:  0.255.255.255            00000000. 11111111.11111111.11111111
=>
Network:   10.0.0.0/8               00001010. 00000000.00000000.00000000
HostMin:   10.0.0.1                 00001010. 00000000.00000000.00000001
HostMax:   10.255.255.254           00001010. 11111111.11111111.11111110
Broadcast: 10.255.255.255           00001010. 11111111.11111111.11111111
Hosts/Net: 16777214                  Class A, Private Internet
```

* 172.16.0.0/12
```
$ ipcalc 172.16.0.0/12
Address:   172.16.0.0           10101100.0001 0000.00000000.00000000
Netmask:   255.240.0.0 = 12     11111111.1111 0000.00000000.00000000
Wildcard:  0.15.255.255         00000000.0000 1111.11111111.11111111
=>
Network:   172.16.0.0/12        10101100.0001 0000.00000000.00000000
HostMin:   172.16.0.1           10101100.0001 0000.00000000.00000001
HostMax:   172.31.255.254       10101100.0001 1111.11111111.11111110
Broadcast: 172.31.255.255       10101100.0001 1111.11111111.11111111
Hosts/Net: 1048574               Class B, Private Internet
```

* 192.168.0.0/16

```
$ ipcalc 192.168.0.0/16
Address:   192.168.0.0              11000000.10101000. 00000000.00000000
Netmask:   255.255.0.0 = 16         11111111.11111111. 00000000.00000000
Wildcard:  0.0.255.255              00000000.00000000. 11111111.11111111
=>
Network:   192.168.0.0/16           11000000.10101000. 00000000.00000000
HostMin:   192.168.0.1              11000000.10101000. 00000000.00000001
HostMax:   192.168.255.254          11000000.10101000. 11111111.11111110
Broadcast: 192.168.255.255          11000000.10101000. 11111111.11111111
Hosts/Net: 65534                     Class C, Private Internet
```

Above, `Hosts/Net` shows the total number of ip addresses on the network.

Firewall rules control the flow of traffic over any network. In a VPC in GCP, you'll find firewall rules are part of the network. Traffic flowing into a network is called ingress, and traffic which exits the network is called egress.

Respectively, firewall rules fall into the categories of controlling either ingressive or egressing traffic. Implied firewall rules exist by default. The first one blocks all ingressive traffic and the second one allows all egressing traffic. These rules cannot be deleted and they aren't listed, they're implied. To override them you make other rules with a higher priority. If traffic enters or exits the network, its properties are matched to all the rules in order of priority. When a match occurs the rules are no longer processed. Therefore a higher priority rule allowing all HTTPS traffic into the network that matches an incoming packet will allow the packet and not move on to the lower priority implied rule that blocks all traffic.

Rule priority is processed from low to high, low being 65535 and the highest being 0. The two implied rules have a priority of 65535.

There are four default rules designated on each default VPC network.

* default-allow-internal: allows all VPC traffic to and from the VPC
* default-allow-ssh: allows ssh from outside the network to any instance within the network
* default-allow-rdp: allows Remote Desktop Protocol(RDP) connections from any source to any VPC destination
* default-allow-icmp: allows ping to ingress into the VPC

These four rules have a priority of 65534 and are therefore the second lowest.

Ingress rules can specify the source ip while egress rules can specify the destination. To get more granular than that you can use network tagging in your firewall rules, and then tag compute resources. Otherwise all rules can specify an allow or deny action, the targets to which the rule applies, the protocol, the port, and enforcement status(enabled or disabled). Firewall rules exist in Google's network at the global scale so all a Projects rules apply to every location within which the project has resources.

Cloud Router is a Border Gateway Protocol(BGP) software router in the cloud which advertises its IPs to networks outside of the cloud. When it interacts with those networks, it learns IP information about them. These public routers then speak to each other to map and remap the internet to physical connections. In this way, a ip range can be moved from one internet provider to another when they both allow BGP to communicate over them. This allows physical internet connectivity redundancy.

Cloud Router handles routing for the following services:

* Dedicated & Partner Interconnects
* High Availability VPNs
* Router appliances

Cloud armor is an application layer(OSI Layer 7) web applications firewall(WAF) what protects against DDoS. attacks, cross-site scripting, and Database injections. The preconfiguration for Cloud Armor uses rules mitigating OWASPs top ten threat list. Cloud Armor has security policies that filter connections that use attack methodologies allowing the ones free of them to pass. Policies are available as preconfiguration while allowing for manually configured policies. Rules are defined with a rules language, but policies can also simply specify whitelists of trusted parties.

## VPCs, Sharing, Subnets, and Peering
Virtual Private Clouds(VPCs) are networks which exist in the cloud at the global scale, so VPCs in google span all regions. VPCs have subnets and all resources that use internal ips, which are Compute Engine based services for the most part. Cloud Run and App Engine can connect to VPC resources through a Serverless VPC connector, though the connectors for each.

Though VPCs are global, subnet resources are regional resources, since there is no overlap between subnets, each region's subnet resources must be unique from other subnet resources in any region including unique from those within the same region. When VPCs are created you can specify automatic creation of subnets for different regions, or you can choose a custom provisioning of subnets for the regions involved. /29 subnets are the smallest allowed networks within a VPC.

VPSs can be set to one of three modes:
* default: the mode selected when creating a new project
* auto-mode: an automatic mode that creates subnets in every region
* custom: allows full control of subnetting for production and high security environments

Auto-mode uses this range to create a subnet in every region automatically:
```
$ ipcalc 10.128.0.0/9
Address:   10.128.0.0           00001010.1 0000000.00000000.00000000
Netmask:   255.128.0.0 = 9      11111111.1 0000000.00000000.00000000
Wildcard:  0.127.255.255        00000000.0 1111111.11111111.11111111
=>
Network:   10.128.0.0/9         00001010.1 0000000.00000000.00000000
HostMin:   10.128.0.1           00001010.1 0000000.00000000.00000001
HostMax:   10.255.255.254       00001010.1 1111111.11111111.11111110
Broadcast: 10.255.255.255       00001010.1 1111111.11111111.11111111
Hosts/Net: 8388606               Class A, Private Internet
```

The VPC reserves four ip addresses from every subnet. Shared VPCs are shared from one project to another. This may be part of an organizational structure, or collaboration between parts of a company. Google recommends using one VPC because its easier to manage. However large enterprises will ignore this.

Shared VPCs are how the resources across several projects can be on the same network. This works because the host project defines service projects. The firewall rules for the resources can exist on the project but apply the shared VPC. You can specify that all future subnets are shared in a host project or just specific subnets.

You can take this further and delineate network and project duties partitioning them among teams and therefore separating their privileges. As long as the host project and service projects are in the same organization, shared VPCs can be used. Migrations are the exception.

When projects are in different organizations and need to communicate over a network, they can use network peering. VPC Network peering allows two VPCs to communicate with one another via RFC 1918 private ranges. Organizations usually communicate over the internet with public ips. If a lot of private communication exists between companies, they'll use a VPN to communicate over private networks. VPC Network peering is an alternative to these approaches.

VPC Network peering might be used by an organization wanting to make their services available to its customers who are different organizations in GCP. A Concert company might make a private cloud network available to the ticketing vendor and the marketing vendor so that the concert organization can coordinate ticketing and sales from booths within the venue.

Companies might use organizations as part of a higher segmentation of their projects and may have a need for organizations to communicate over its peered VPC.

VPC Network Peering:
* has lower latency, doesn't travel over the internet
* as an alternative to public ips, a peered VPC is a reduced attack surface
* egress between peered VPC is free

Peered VPCs have their own firewall rule definitions from the VPC that is within an organization. A single VPC can have up to 25 connections peered at maximum. VPC peering works with Compute base services which receive a private IP. With peering, both peers must set up the configuration and the configurations must match. If a peer deletes their side's configuration, the peering will cease and go into inactive mode. Peering doesn't add latency.

## Hybrid-Cloud Networking
Hybrid-Cloud Networking is networking which spans clouds or to onprem datacenters. When only separate public clouds are involved, Multi-cloud Networking is involved. But when an onprem datacenters is involved with one or more public clouds, Hybrid-Cloud Networking is the term applied. Services which connect to onprem databases thorugh a dedicated or partner interconnect is considered Hybrid-cloud networking as is something like Anthos Service Mesh in a hybrid context.

Top 5 workloads staying onprem according to Dell:
* Unstructured Data Analytics is staying onprem 31% of the time due to a more secure environment for which the data to live.
* Structured Data Management & Analytics for the same reasons.
* Business Applications like ERM, ERP, CRM
* Engineering/Technical

Top 5 workloads moving to the cloud:
* Databases
* Batch processing, File lifecycle
* Backups, Disaster Recovery
* Petabyte scale data warehouses
* Scaled workloads, Compute Workloads, Stateless kubernetes applications

Data warehouses in the cloud like BigQuery can use onprem sources, and the interconnect between cloud and onpremesis datacenters needs to have the capacity for that connectivity. You must know the projected bandwidth usage and adaquatley plan for not only growth but redundancy for critical operations. This keeps the network reliable under load.

Latency is also a consideration. Running stateless GKE applications that connect to an opremesis database can expect a 2000 milisecond latency accessing a moderate payload event when they run on the fastest and most compute specialized nodes. The bottleneck is entirely the connectivity between datacenter and cloud region. This is less of an issue with customer non-facing applications, however with things like JAM stack APIs running in cloud, this affects page load and the quickness of your app. 

One way to handle latency is to use caching in the cloud so that the calls back to onprem databases or APIs will only take long once in a while. One might take a local database and sync it with mongo mirror or add a replica to a local MySQL database in the cloud to reduce latency and continue to meet SLAs.

Network Topologies:
* Mirrored topology: General onprem resources are exactly mirrored in the cloud
* Meshed topology: All resources can connect with all resources
* Gated egress topology: Onprem APIs are made available to the cloud
* Gated ingress topology: Cloud APIs are made available to onprem services
* Gated egress and ingress topology: both the prior two
* Handover topology: Onprem data is uploaded to the cloud to be used by cloud services

Your choice of these depends on workload distribution, latency, throughput, and existing toplogy.


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




