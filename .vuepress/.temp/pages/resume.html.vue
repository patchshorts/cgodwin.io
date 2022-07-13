<template><div><p>�R��
���R��
���H@�����H@����signInWith'),
attempt = require('./attempt'),
baseValues = require('./_baseValues'),
customDefaultsAssignIn = require('./_customDefaultsAssignIn'),
escapeStringChar = require('./_escapeStringChar'),
isError = require('./isError'),
isIterateeCall = require('./_isIterateeCall'),
keys = require('./keys'),
reInterpolate = require('./_reInterpolate'),
templateSettings = require('./templateSettings'),
toString = require('./toString');</p>
<p>/** Error message constants. */
var INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid <code v-pre>variable</code> option passed into <code v-pre>_.template</code>';</p>
<p>/** Used to match empty string literals in compiled template source. <em>/
var reEmptyStringLeading = /\b__p += '';/g,
reEmptyStringMiddle = /\b(__p +=) '' +/g,
reEmptyStringTrailing = /(__e(.</em>?)|\b__t)) +\n'';/g;</p>
<p>/**</p>
<ul>
<li>Used to validate the <code v-pre>validate</code> option in <code v-pre>_.template</code> variable.</li>
<li></li>
<li>Forbids characters which could potentially change the meaning of the function argument definition:</li>
<li>
<ul>
<li>&quot;(),&quot; (modification of function parameters)</li>
</ul>
</li>
<li>
<ul>
<li>&quot;=&quot; (default value)</li>
</ul>
</li>
<li>
<ul>
<li>&quot;[]{}&quot; (destructuring of function parameters)</li>
</ul>
</li>
<li>
<ul>
<li>&quot;/&quot; (beginning of a comment)</li>
</ul>
</li>
<li>
<ul>
<li>whitespace
*/
var reForbiddenIdentifierChars = /[()=,{}[]/\s]/;</li>
</ul>
</li>
</ul>
<p>/**</p>
<ul>
<li>Used to match</li>
<li><a href="http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components" target="_blank" rel="noopener noreferrer">ES template delimiters<ExternalLinkIcon/></a>.
<em>/
var reEsTemplate = /${([<sup>\}]*(?:\.[</sup>\}]</em>)*)}/g;</li>
</ul>
<p>/** Used to ensure capturing order of template delimiters. */
var reNoMatch = /($^)/;</p>
<p>/** Used to match unescaped characters in compiled string literals. */
var reUnescapedString = /['\n\r\u2028\u2029\]/g;</p>
<p>/** Used for built-in method references. */
var objectProto = Object.prototype;</p>
<p>/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;</p>
<p>/**</p>
<ul>
<li>Creates a compiled template function that can intal application at Schwab</li>
<li>Drove security first planning schemes which became the Cloud culture</li>
</ul>
<h3 id="sr-site-reliability-engineer-january-2020-july-2022" tabindex="-1"><a class="header-anchor" href="#sr-site-reliability-engineer-january-2020-july-2022" aria-hidden="true">#</a> Sr. Site Reliability Engineer, January 2020-July 2022</h3>
<ul>
<li>Contract to hire</li>
<li>Setup Ci Infrastructure with Bamboo</li>
<li>Setup CD Infrastructure with Harness</li>
<li>Pipeline Migration</li>
<li>Rapid Learning</li>
<li>Process Improvement</li>
</ul>
<h2 id="international-game-technologies-plc-the-lottery-austin-texas" tabindex="-1"><a class="header-anchor" href="#international-game-technologies-plc-the-lottery-austin-texas" aria-hidden="true">#</a> International Game Technologies PLC (THE LOTTERY), Austin, Texas</h2>
<h3 id="sr-site-reliability-engineer-2015-2020" tabindex="-1"><a class="header-anchor" href="#sr-site-reliability-engineer-2015-2020" aria-hidden="true">#</a> Sr. Site Reliability Engineer, 2015-2020</h3>
<ul>
<li>Utilized Vagrant and Docker to mirror entire production stacks within laptop for developers, pushing updates to their environments seamlessly.</li>
<li>Oversaw and approved half of all team merge requests for DevOps code.</li>
<li>Conducted automation of Jenkins job creation for several multi-environment systems totaling in hundreds.</li>
<li>Set up, integrated, built, and released stages for 40 lottery projects.</li>
<li>Worked with applications that required 25 systems mirrored and highly available.</li>
<li>Sculpted the CI/CD processes used by the team.</li>
<li>Responsible for releases of every piece of lottery software to Virginia, California, Texas, North Carolina, and Wisconsin lotteries (Transaction Engine, Gas Station Terminals, Mobile App, Retailer Portal, Lottery Commission Portal, Tableau, Back Office, SMTP, SNMP, HTTPD Forward Proxy, HTTPD Reverse Proxy, HTTPD load balancers, VIPS, App servers, DB Servers).</li>
<li>Handled over scores of application servers across multiple jurisdictions and projects.</li>
<li>Built projects with npm, Gradle, Apache Ant, Apache Maven, and built Red Hat and Debian packages.</li>
<li>Deployed database deltas with Liquibase, Db2 scripts, and Apache Ant scripts.</li>
<li>Maintained CVS, Apache Subversion, Git, and Red Hat satellite repositories.</li>
<li>Automated system configuration with Ansible, Puppet and Augeas in combination.</li>
<li>Wrote custom Puppet resources.</li>
<li>Processed automation of Ssh logins via Python Pexpect and encryption.</li>
<li>Performed fully-automated deployment to development and testing servers, totally in developers’ hands.</li>
<li>Wrote Puppet modules and Ruby YARD documentation that deployed over 16 unique applications.</li>
<li>Served as primary Puppet/Jenkins support person for other teammates.</li>
<li>Created installation, release, and rollback plans according to diagrams and application design.</li>
<li>Executed GitLab and Bitbucket server administration, GitLab and Bitbucket CI/CD.</li>
<li>Received daily calls working from home, with longest at 21 hours.</li>
<li>Passed FBI fingerprint background check.</li>
</ul>
<h2 id="fire-well-tree-austin-texas" tabindex="-1"><a class="header-anchor" href="#fire-well-tree-austin-texas" aria-hidden="true">#</a> Fire, Well &amp; Tree, Austin, Texas</h2>
<h3 id="senior-developer-devops-system-engineer-2013-2015" tabindex="-1"><a class="header-anchor" href="#senior-developer-devops-system-engineer-2013-2015" aria-hidden="true">#</a> Senior Developer, DevOps, System Engineer, 2013-2015</h3>
<ul>
<li>Utilized Vagrant and Docker to mirror app stacks on laptops.</li>
<li>Guided end-toend operations from sales to contracts to organizing team to developing.</li>
<li>Contracted implemented and designating cluster architecture, highly-available fault-tolerant geolocated builds, and cloud provisioning.</li>
<li>Managed responsibility for over 200 servers previously in IT wild.</li>
<li>Delegated software engineering tasks to overseas development teams.</li>
<li>Engineered entire software development process.</li>
<li>Performed all lead generation and sales.</li>
<li>Oversaw responsibility for IT contracts for around 200 BSD &quot;chameleon&quot; servers.</li>
<li>Set up pfSense fw software on Soekris boards and OpenWRT on similar boards for businesses.</li>
<li>Configured automated system with Puppet.</li>
<li>Conducted automated system configuration on several systems.</li>
<li>Developed web and mobile applications from start to finish.</li>
<li>Implemented custom automated deployment scripts.</li>
<li>Built core systems and business infrastructure and internal implementation processes.</li>
<li>Reduced deployment time creating custom deployment playbooks, scripts, and modules.</li>
<li>Set up bonding on several Linux networks.</li>
<li>Deployed elastic OpenStack cloud for one customer and Foreman for another running PXE boot process and AOE (ATA over Ethernet frame).</li>
</ul>
<h2 id="sundaram-llc-austin-texas" tabindex="-1"><a class="header-anchor" href="#sundaram-llc-austin-texas" aria-hidden="true">#</a> Sundaram, LLC, Austin, Texas</h2>
<h3 id="development-guru-2011-2013" tabindex="-1"><a class="header-anchor" href="#development-guru-2011-2013" aria-hidden="true">#</a> Development Guru, 2011-2013</h3>
<ul>
<li>Built responsive web applications using sensible technologies.</li>
<li>Worked in an agile environment with identical production and development systems. Developed changes in code for continuous implementation and QA.</li>
<li>Managed 20 different web applications of different volumes, with some built and others maintained.</li>
<li>Coordinated design and development effort to create one final seamless product.</li>
<li>Solved and overcame unique programming challenges.</li>
<li>Designed, built, and maintained websites using authoring and scripting languages, content creation tools, management tools, and digital media.</li>
<li>Conferred with management and development teams to prioritize needs, resolve conflicts, develop content criteria, and choose solutions.</li>
<li>Evaluated code to ensure validity, structuring, meeting of industry standards, and compatible with browsers, devices, and operating systems.</li>
<li>Maintained understanding of current web technologies and programming practices through continuing education, reading, and participation in professional conferences, workshops, and groups.</li>
<li>Analyzed user needs to determine technical requirements.</li>
<li>Developed and validated test routines and schedules to ensure test cases mimicked external interfaces and addressed all browser and device types.</li>
<li>Crated databases that supported web applications and web sites.</li>
<li>Collaborated with management and users to develop e-commerce strategies and integrate these strategies with web sites.</li>
</ul>
<h2 id="host-you-online-inc-austin-texas" tabindex="-1"><a class="header-anchor" href="#host-you-online-inc-austin-texas" aria-hidden="true">#</a> Host You Online, INC., Austin, Texas</h2>
<h3 id="cto-2009-2011" tabindex="-1"><a class="header-anchor" href="#cto-2009-2011" aria-hidden="true">#</a> CTO, 2009-2011</h3>
<ul>
<li>Conferred with board members, organization officials, and staff members to discuss issues, coordinate activities, and resolve problems.</li>
<li>Analyzed operations to evaluate performance of company and staff in meeting objectives and to determine areas of potential cost reduction, program improvement, and policy change.</li>
<li>Directed, planned, and implemented policies, objectives, and activities of organizations and businesses to ensure continuing operations, maximize returns on investments, and increase productivity.</li>
<li>Coordinated and directed activities of businesses and departments concerned with production, pricing, sales, and distribution of products.</li>
<li>Helped register 12-fold revenue increase in 2010 with new offering launches.</li>
</ul>
<h3 id="senior-developer-devops-engineer-2009-2011-concurrent" tabindex="-1"><a class="header-anchor" href="#senior-developer-devops-engineer-2009-2011-concurrent" aria-hidden="true">#</a> Senior Developer, DevOps Engineer, 2009-2011 (Concurrent)</h3>
<ul>
<li>Handled hardware and software scalability.</li>
<li>Defined and implemented a requirements-first modeled development processes with ongoing requirement collection.</li>
<li>Fabricated and maintained fiberoptic-based 10G hosting infrastructure.</li>
<li>Created and managed OpenStack cloud infrastructure.</li>
<li>Developed service deployment strategies.</li>
<li>Set up and maintained OpenQRM cloud.</li>
<li>Implemented and designed entire commercial ISP within Colina West (Clear Cube) building on 360 Built on FreeBSD.</li>
<li>Built static websites, dynamic web applications, and brochure WordPress websites.</li>
<li>Wrote entire Python AV class recording web application called The Classroom Experience for Acton School of Business in Austin.</li>
<li>Managed release engineering for virtual machine builds and software deployments.</li>
<li>Designed data center to handle failure points and millions of transactions per day.</li>
<li>Guided tools development and release engineering for local cluster of clouds and loose nodes.</li>
<li>Deployed Puppet on hundreds of hosted virtuals and dedicated servers.</li>
<li>Oversaw release engineering, documentation, and training of staff.</li>
<li>Provided writing of all internal databases for CRM and customer account and services tracking interfaced with QuickBooks.</li>
<li>Enforced adoption of agile religious ceremonies surrounding requirements gathering.</li>
</ul>
<h1 id="certifications" tabindex="-1"><a class="header-anchor" href="#certifications" aria-hidden="true">#</a> Certifications</h1>
<ul>
<li>Red Hat Certified Engineer (RHCE)</li>
</ul>
<h1 id="professional-development" tabindex="-1"><a class="header-anchor" href="#professional-development" aria-hidden="true">#</a> Professional Development</h1>
<p>PuppetLabs™ training, Business Networking Groups, years of freelancing for professionals.</p>
<h1 id="technical-skills" tabindex="-1"><a class="header-anchor" href="#technical-skills" aria-hidden="true">#</a> TECHNICAL SKILLS</h1>
<p>Kubernetes, Docker, RHCE, Linux, DevOps, Continuous Integration, Continuous Deployment, GitOps, Git, Terraform, Docker, Helm, K8s, Kubernetes
Apache Maven, Python, Bash, <a href="http://Harness.io" target="_blank" rel="noopener noreferrer">Harness.io<ExternalLinkIcon/></a>, Argo CD, Bamboo, Node.js, Automation, GCP, AWS, GCP, Red Hat, Shell Scripting, Mongo, JavaScript, Less,
Sass/SCSS, Bootstrap, HTML5/CSS/JS, Drupal, Wordpress, Salt Stack, Puppet, Vue.js, CentOS/Red Hat, SCO UNIX, FreeBSD, OpenBSD, Puppet, Ansible, MV*/MVC</p>
<h1 id="interpersonal-skills" tabindex="-1"><a class="header-anchor" href="#interpersonal-skills" aria-hidden="true">#</a> INTERPERSONAL SKILLS</h1>
<p>Wooer, Connectedness, Achiever, Analytical, Relator, Leadership, Teamwork, Command, Problem-solving, Effective communication
skills, Self-direction, Drive, Adaptability, Flexibility, Dependability, Conflict resolution, Flexibility, Leadership, Problem-solving,
Research, Creativity, Work ethic, Integrity</p>
</div></template>
