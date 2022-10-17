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

## OSI Model Layers

1. Physical, the actual metal, wires, electrons and plastic ethernet plugs. You'll find wifi's radio frequency here because radio is physical phenomenon. In Quantum networking this layer are the entangled particles and the equipment uses to read and write to them plus the equipment used to connect to that. Volatge is sometimes the physical layer in Ethernet Over Power. With tin cans on a string, this layer is the cans, string and the vocal vibrations traveling through them.
1. Data Link, ARP, Mac Addresses, Collision avoidance. This is broken into two mini-layers, the first is media access control(MAC) and the second is Logica Link Control(LLC). The second acts as a negogiator between the MAC layer and the third 'Network' layer.
1. Network, this is where IP Addresses live. Keep in mind these network layers are the layers of a packet send over the network. This is the base layer for packets. A packet is data encapsulated and destined for an IP address.
1. Transport. Inside the Layer three envelope is contained another envelop that marks the packet part of a connection. A new conection will send a packet to an ip and in that packet's layer 3 exists a layer 4 envelop with a syn label marked onto it so that the recieving end will know that a new connection is being established. The protocol that makes this process work known by all networking devices speak is Transmission Control Protocol(TCP) or User Datagram Protocol(UDP).
1. Session, this layer manages handshakes. An SMTP connection timeout would exist on this layer. TLS hanshakes happen here. An https packet is fully encrypted, so a request to a server asking for a url cannot be understood unless it is decrypted, then it can be seen. Inside layer 4 lives an encrypted layer 5 envelop in the case oF HTTPS connections. Layer 5 is the encrypted data, while layer 6 is the descrpted data.
1. Presentation, A GET / request is this layer. If encrytped this is where it is decrypted.
1. Application, This is the later applications connect to in order to do networking. A webbrowser fetches web pages from this layer. This layer one might consider a data format. A TXT file vs a Json file. Mime types exist at this Layer. Layer 7 in the packet is the raw data unenveloped by network dressing that tells the network about it.

### OSI Model as an Out of Town Drive

1. Gravel, Concrete, Rebar, Paint, Reflectors, Lights, Engine, Fuel, Speel Limit Sign
1. The Lane
1. Connected Roads
1. Vehicle, Driving Skills, Driving Laws
1. The Trip Properties
1. The Itinerary of the Trip
1. The People on the Trip

Architects really only need to worry about layers 3, 4, and 7 with regard to load balancers, gateways, proxies, firewall rules, subnets, and traffic flow.

## IP Addresses, FW Rules, and Routing

CIDR means classless inter-domain routing notation. It's a way of simplying the subnet mask by only specifying the bits. Understanding CIDR notation and IPV4 should be sufficient for the exam.

Networking in the cloud and in general works with IP Networking. IP networks are groups of devices. Subnets are spaces that identifiers live. A subnet is a street in a neighborhood. If all the addresses are single digits, then only 10 houses on that street are addressible. This is how IP networking works. You have to add more digits, or break the street into east street and west street to fit more addresses on that street.

In this way, networks are partitioned by their octets and subnet masks. Additionally they are partitioned with firewalls, NATing and public vs private IP spaces. Computers on the same physical network have an ARP table which maps IPs to MAC addresses as well as routing tables which map certain networks to specific network interfaces. IPV4 uses a four octet notation. Each octect represents numbers from 0-255. 0.0.0.0 is the internet. 255.255.255.255 is a subnet mask. Routers usually sit on the first or last ip in a network: 1 or 254. In binary to count to 255 you need 8 bits: 11111111, while 255 can be represented in hexadecimal as FF. but both have the same number of bits. So the higest number in an IPv6 block(FFFF) is 65535. That means that the IPv6 block has an entire IPv4 class B network within just one of its 8 groups: F0d8:0000:0000:0000:0000:0000:0000:0000. No IPv6 knowledge is requried 

[[toc]]

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




