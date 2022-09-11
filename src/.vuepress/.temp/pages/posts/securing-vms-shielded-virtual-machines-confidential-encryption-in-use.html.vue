<template><div><nav class="table-of-contents"><ul><li><router-link to="#shielded-vms">Shielded VMs</router-link><ul><li><router-link to="#monitoring">Monitoring</router-link></li></ul></li><li><router-link to="#confidential-vms">Confidential VMs</router-link></li><li><router-link to="#vpc-service-controls">VPC Service Controls</router-link><ul><li><router-link to="#vpc-service-control-netflow">VPC Service Control Netflow</router-link></li></ul></li><li><router-link to="#official-resources">Official Resources</router-link></li></ul></nav>
<h1 id="features-in-google-cloud-for-securing-virtual-machines-vms" tabindex="-1"><a class="header-anchor" href="#features-in-google-cloud-for-securing-virtual-machines-vms" aria-hidden="true">#</a> Features in Google Cloud for Securing Virtual Machines(VMs)</h1>
<h2 id="shielded-vms" tabindex="-1"><a class="header-anchor" href="#shielded-vms" aria-hidden="true">#</a> Shielded VMs</h2>
<p>Shielded VMs use verification on hardware IDs and chips to defend against Linux bootkits and rootkits and provides self-healing security features such as integrity monitoring and healing.</p>
<p>It uses <a href="https://cloud.google.com/compute/shielded-vm/docs/shielded-vm#secure-boot" target="_blank" rel="noopener noreferrer">Secure Boot<ExternalLinkIcon/></a>, <a href="https://cloud.google.com/compute/shielded-vm/docs/shielded-vm#vtpm" target="_blank" rel="noopener noreferrer">Virtual trusted platform module(vTPM)<ExternalLinkIcon/></a>-enabled <a href="https://cloud.google.com/compute/shielded-vm/docs/shielded-vm#measured-boot" target="_blank" rel="noopener noreferrer">Measured Boot<ExternalLinkIcon/></a>, and <a href="https://cloud.google.com/compute/shielded-vm/docs/shielded-vm#integrity-monitoring" target="_blank" rel="noopener noreferrer">Integrity monitoring<ExternalLinkIcon/></a>.</p>
<h3 id="monitoring" tabindex="-1"><a class="header-anchor" href="#monitoring" aria-hidden="true">#</a> Monitoring</h3>
<p>You can monitor your VMs in a few ways in Shielded VMs:</p>
<ul>
<li>You can monitor the boot integrity of shielded VMs with cloud monitoring.</li>
<li>You can automatically take action on integrity failures with cloud functions.</li>
</ul>
<h2 id="confidential-vms" tabindex="-1"><a class="header-anchor" href="#confidential-vms" aria-hidden="true">#</a> Confidential VMs</h2>
<p>These Virtual Machines use <em>encryption-in-use</em> and encrypt the data in memory. You provision a VM with the type <a href="https://cloud.google.com/compute/docs/general-purpose-machines#n2d_machines" target="_blank" rel="noopener noreferrer">N2D<ExternalLinkIcon/></a>:</p>
<ul>
<li><code v-pre>n2d-standard-2</code></li>
<li><code v-pre>n2d-standard-4</code></li>
<li><code v-pre>n2d-standard-8</code></li>
<li><code v-pre>n2d-standard-16</code></li>
<li><code v-pre>n2d-standard-32</code></li>
<li><code v-pre>n2d-standard-48</code></li>
<li><code v-pre>n2d-standard-64</code></li>
<li><code v-pre>n2d-standard-80</code></li>
<li><code v-pre>n2d-standard-96</code></li>
<li><code v-pre>n2d-standard-128</code></li>
<li><code v-pre>n2d-standard-224</code></li>
</ul>
<h2 id="vpc-service-controls" tabindex="-1"><a class="header-anchor" href="#vpc-service-controls" aria-hidden="true">#</a> VPC Service Controls</h2>
<p>VPC Service Controls can define perimeters around sets of services within a VPC and can have their access limited. Traffic that crosses perimeters have Ingress and Egress rules. This affords us the following benefits:</p>
<ul>
<li>Unauthorized networks with stolen credentials are blocked</li>
<li>Data exfiltration blocked.</li>
<li>Safety net for misconfigured over-permissive IAM policies.</li>
<li>Honeypot perimetering and additional monitoring.</li>
<li>Extend perimeters to on-premiss networks</li>
<li>Context-aware access to resources</li>
</ul>
<h3 id="vpc-service-control-netflow" tabindex="-1"><a class="header-anchor" href="#vpc-service-control-netflow" aria-hidden="true">#</a> VPC Service Control Netflow</h3>
<p><img src="https://cloud.google.com/static/vpc-service-controls/images/service_perimeter.png" alt="image" loading="lazy"></p>
<h2 id="official-resources" tabindex="-1"><a class="header-anchor" href="#official-resources" aria-hidden="true">#</a> Official Resources</h2>
<ul>
<li><a href="https://cloud.google.com/compute/docs/about-shielded-vm" target="_blank" rel="noopener noreferrer">Shielded VMs<ExternalLinkIcon/></a></li>
<li><a href="https://cloud.google.com/compute/docs/about-confidential-vm" target="_blank" rel="noopener noreferrer">Confidential VMs<ExternalLinkIcon/></a></li>
<li><a href="https://cloud.google.com/compute/shielded-vm/docs/integrity-monitoring" target="_blank" rel="noopener noreferrer">Integrity Monitoring<ExternalLinkIcon/></a></li>
<li><a href="https://cloud.google.com/vpc-service-controls/docs/overview" target="_blank" rel="noopener noreferrer">VPC Service Controls<ExternalLinkIcon/></a></li>
<li><a href="http://cloud.google.com/docs" target="_blank" rel="noopener noreferrer">GCP Documentation<ExternalLinkIcon/></a></li>
</ul>
</div></template>


