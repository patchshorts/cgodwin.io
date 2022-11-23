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

# Analyzing Technical Processes for GCP

[[toc]]

Architects are involved in many different types of technical processes:

* Continuos Deployment
* Continuous Delivery
* Post-mortem Analysis
* Development Lifecycle Planning
* Testing
* Validation
* Business continuity
* Disaster Recovery(DR)

Here we will discuss these processes in relation to business needs and goals. We will learn to focus on and define these processes rather than simply follow them.

## Software Development Lifecycle(SDLC)

The Software development lifecycle are the steps that software, and those who engineer it, goes through from beginning to end to create and host a service. This includes 12 phases. In some cases these are collapsed or combined to fewer, or some are regarded as pre-SDLC steps.



* Proposal
* Scope Analysis
* Planning
* Requirements Analysis
* Design
* Development
* Integration & Testing
* Implementing
* Documentation
* Operations
* Maintenance
* Disposition

| ![SDLC.gif](https://upload.wikimedia.org/wikipedia/commons/6/66/Systems_Development_Life_Cycle.gif) |
|:--:|
| <b>Software Development Lifecycle - [Wikipedia](https://en.wikipedia.org/wiki/Systems_development_life_cycle)</b>|

Every phase does work that is required to produce quality software. It is a cycle because you reiterate over these steps until the software is no longer used. The process could start over after the Maintenance step and begin at any one of these beginning steps. After a software is deployed, the next iteration of that software could be as complex as having another Proposal created by the captains of those duties. Or 2nd time the process iterates, it loops back to the Development phase depending if the next iteration requirements are already known. Proposal, scope analysis, planning and requirements analysis can even be done by non-developers or teams of analysts.

For this reason we're going to jump right into Planning.

### Planning
Planning is a step performed by the Project Manager, they'll create all the spaces which track work, all the spaces where the documentation, solution architect design document, specifications and roadmaps will live. They'll create the roadmap for the different project phases. They'll create the templates for spring planning, sprint retros, creation of overarching tasks often called 'epics'.

### Requirements Analysis
This may be done by developers and architects together. The goal is to fully understand the needs and wants of the proposal and find potential ways to meet them. The problem is discussed and ideas are put together to meet those problems. Here the solutions are not designed but considered. Any spikes that are needed to sus out requirements are performed by developers or other engineers. A spike is a short development period where a developer tries a feature to come to some knowledge required for planning a full fledged effort to achieve those requirements in the context of existing systems. Spikes are often isolated to proof of concepts. Proof of concept projects might exist here and iterate back to requirements for an actual project.

In this phase you're trying to:

* Grasp the scope of the needs and wants of the proposal
* Track and assess of all possible solutions
* Evaluate the cost benefits of the different paths toward a solution

Understanding the scope is a matter of both knowledge of the domain in question: if a mail problem, familiarity with mail operations and development; it is also a matter of systems and software knowledge of the existing infrastructure. Domain knowledge, for example, is knowing that kubernetes secrets are not very secure. Systems and software knowledge, is knowing where you'll inject and use the google libraries to fetch secrets from GSM. This is precisely why developers, architects, and reliability engineers all engage together in this phase.

When finding solutions for your problem, you need to be able to filter them out without trying them. The solutions you're filtering in your search are those that aren't feasible, do not fit your use case, or don't fit within your limitations. Once you know the limits of the project, you can search for  possible solutions. If your Google Secret Manager project has a limit placed on it that it must work for in-house apps and third party apps, the direction you'll go into will be wildly different than if you weren't filtering based on this rubric. You'll also consider if commercial software meets your needs at a better cost than you can.

Purchased or Free and Open Source Software(FOSS) can meets a wide range of use cases faster than developing something new. They also have the benefit of the ability to focus on other easier to solve problems. Purchased software or purchased FOSS support can help offset the costs of provisioning new services. This disadvantages are potential licensing models and costs and being locked into a feature set that doesn't evolve with your needs.

You can decide to build from scratch, from a framework, or from an opensource project. There are different considerations with each of these. How much modification does ready made software require, what languages and formats does it exist in, do you have to acquire talent to work with it. Consider the lifecycles of the software you use. For instance, if you build docker images from other images, knowing the release cycles of those will help you be able to create new releases at the time new operating systems are released. Paying attention to the popularity and maintainers of the application can help you know if a project has become deprecated. You can avoid deprecated software if you do not want to deal with becoming the new maintainer or updater to the software within your use of it. Or you could choose actively maintained software to fork and modify so that you can roll in security backports from the upstream project into your project.

Scratch allows for full control but involves the most work, most maintenance, most planning, having the team with the talent and skillsets needed, most resolution of issues.

Once you have several viable solutions to consider, spike the one first with the greatest cost benefit. You'll know this because you can do a Cost Benefit Analysis on all these options we've discussed.

### Cost Benefit Analysis
Part of Analysis is the cost benefit analysis of meeting the requirements with your various solution options. When asked to justify the decisions in your project you'll be asked for this and be able to contrast the different values of each solution. As part of this you'll calculate the ROI for the different options to arrive at the solutions value. At the end of this phase you'll decide which solutions you'll pursue in the Design.

As part of the design phase, you'll plan out how the software will work, the structure of the schemas and endpoints, and the functionality that these will achieve. This phase starts with a high level design and ends in a detailed one.

The High Level design is an inventory of all the top levels of parts of the application. Here you'll identify how components will interact as well their overarching functions. You might work up UML or mermaid diagrams describing parts and interactions.

The Detailed design is a plan of implementation of each of these parts. These parts will be modularized in though and broken down into the most sensible and efficient anatomies in which for them to exist. Some of the things planned include, error codes or pages, data structures, algorithms, security controls, logging, exit codes and wire-frames for user interfaces. 
## Continuous Integration / Continuous Delivery(CICD)

## Fixing Incident Culture

## Enterprise IT Processes

## Business Continuity & Disaster Recovery

## Summary

blah
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