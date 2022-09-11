<template><div><h1 id="comparison-of-google-cloud-database-options" tabindex="-1"><a class="header-anchor" href="#comparison-of-google-cloud-database-options" aria-hidden="true">#</a> Comparison of Google Cloud Database Options</h1>
<p>This is just a test page.</p>
<nav class="table-of-contents"><ul><li><router-link to="#bigtable">Bigtable</router-link></li><li><router-link to="#bigquery">BigQuery</router-link></li><li><router-link to="#cloud-sql">Cloud SQL</router-link></li><li><router-link to="#cloud-spanner">Cloud Spanner</router-link></li><li><router-link to="#compute-vm">Compute VM</router-link></li><li><router-link to="#official-resources">Official Resources</router-link></li></ul></nav>
<h2 id="bigtable" tabindex="-1"><a class="header-anchor" href="#bigtable" aria-hidden="true">#</a> Bigtable</h2>
<p>There are many pros to using bigtable, including the ability to handle large amounts of data, the flexibility to scale up or down as needed, and the ability to support a variety of data types. Additionally, bigtable is designed to be highly available and can provide near-real-time access to data. resizing without downtime, simple administration, highly scalable.</p>
<h2 id="bigquery" tabindex="-1"><a class="header-anchor" href="#bigquery" aria-hidden="true">#</a> BigQuery</h2>
<p>BigQuery is a very powerful tool that can handle large amounts of data very efficiently. It is also easy to use and has a lot of features that make it a great choice for data analysis. On the downside, BigQuery can be expensive to use, and it can be challenging to get started if you are not familiar with it.</p>
<h2 id="cloud-sql" tabindex="-1"><a class="header-anchor" href="#cloud-sql" aria-hidden="true">#</a> Cloud SQL</h2>
<p>Google Cloud SQL is fully managed, flexible, automatically replicated across multiple zones, encrypted at rest and in transit, automatic updates.</p>
<h2 id="cloud-spanner" tabindex="-1"><a class="header-anchor" href="#cloud-spanner" aria-hidden="true">#</a> Cloud Spanner</h2>
<p>Cloud Spanner uses TrueTime to execute the same query on multiple regions to ensure consistency. If your data needs to be consistent and cannot wait for replication, cloud spanner is the clear choice.</p>
<h2 id="compute-vm" tabindex="-1"><a class="header-anchor" href="#compute-vm" aria-hidden="true">#</a> Compute VM</h2>
<p>Running a database cluster on Compute VM, you take all the management upon yourself. If you select the wrong compute sizes, either too big or too small, you run risks of rising costs or falling performance.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Product</th>
<th style="text-align:center">Relational</th>
<th style="text-align:center">Structured</th>
<th style="text-align:center">Unstructured</th>
<th style="text-align:center">Heavy R/W</th>
<th style="text-align:center">Low Latency</th>
<th style="text-align:center">Global Consistency</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Bigtable</td>
<td style="text-align:center">🔴</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🔴</td>
</tr>
<tr>
<td style="text-align:left">BigQuery</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🟢✝</td>
<td style="text-align:center">🔴✝✝</td>
<td style="text-align:center">🔴</td>
<td style="text-align:center">🔴</td>
</tr>
<tr>
<td style="text-align:left">Cloud SQL</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🔴</td>
<td style="text-align:center">🔴</td>
<td style="text-align:center">🔴</td>
</tr>
<tr>
<td style="text-align:left">Cloud Spanner</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🔴</td>
<td style="text-align:center">🔴</td>
<td style="text-align:center">🔴</td>
<td style="text-align:center">🟢</td>
</tr>
<tr>
<td style="text-align:left">Compute VM</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🟢</td>
<td style="text-align:center">🔴</td>
<td style="text-align:center">🔴</td>
<td style="text-align:center">🔴</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th style="text-align:center">Symbol</th>
<th style="text-align:center">Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">🟢</td>
<td style="text-align:center">Yes</td>
</tr>
<tr>
<td style="text-align:center">🔴</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center">✝</td>
<td style="text-align:center">Semi Unstructured Data with the Json type</td>
</tr>
<tr>
<td style="text-align:center">✝✝</td>
<td style="text-align:center">Read / Append Only</td>
</tr>
</tbody>
</table>
<h2 id="official-resources" tabindex="-1"><a class="header-anchor" href="#official-resources" aria-hidden="true">#</a> Official Resources</h2>
<ul>
<li><a href="http://cloud.google.com/certification/guides/professional-cloud-architect" target="_blank" rel="noopener noreferrer">The Official Google Certified Professional Cloud Architect Exam
Guide<ExternalLinkIcon/></a></li>
<li><a href="http://cloud.google.com/certification/faqs/#0" target="_blank" rel="noopener noreferrer">Exam FAQ<ExternalLinkIcon/></a></li>
<li><a href="http://cloud.google.com/certiications/cloud-architect" target="_blank" rel="noopener noreferrer">Sample Questions<ExternalLinkIcon/></a></li>
<li><a href="http://cloud.google.com/docs" target="_blank" rel="noopener noreferrer">GCP Documentation<ExternalLinkIcon/></a></li>
</ul>
</div></template>


