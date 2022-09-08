import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{r as a,o as c,c as d,a as o,b as t,w as i,e as r,d as e}from"./app.e6600fbb.js";const p={},h={href:"https://gitter.im/copy/v86",target:"_blank",rel:"noopener noreferrer"},_=o("img",{src:"https://badges.gitter.im/Join Chat.svg",alt:"Join the chat at https://gitter.im/copy/v86",loading:"lazy"},null,-1),u=r('<p>v86 emulates an x86-compatible CPU and hardware. Machine code is translated to WebAssembly modules at runtime in order to achieve decent performance. Here&#39;s a list of emulated hardware:</p><ul><li>An x86-compatible CPU. The instruction set is around Pentium III level, including full SSE2 support. Some features are missing, in particular: <ul><li>Task gates, far calls in protected mode</li><li>Some 16 bit protected mode features</li><li>Single stepping (trap flag, debug registers)</li><li>Some exceptions, especially floating point and SSE</li><li>Multicore</li><li>64-bit extensions</li></ul></li><li>A floating point unit (FPU). Calculations are done using the Berkeley SoftFloat library and therefore should be precise (but slow). Trigonometric and log functions are emulated using 64-bit floats and may be less precise. Not all FPU exceptions are supported.</li><li>A floppy disk controller (8272A).</li><li>An 8042 Keyboard Controller, PS2. With mouse support.</li><li>An 8254 Programmable Interval Timer (PIT).</li><li>An 8259 Programmable Interrupt Controller (PIC).</li><li>Partial APIC support.</li><li>A CMOS Real Time Clock (RTC).</li><li>A generic VGA card with SVGA support and Bochs VBE Extensions.</li><li>A PCI bus. This one is partly incomplete and not used by every device.</li><li>An IDE disk controller.</li><li>An NE2000 (8390) PCI network card.</li><li>A virtio filesystem.</li><li>A SoundBlaster 16 sound card.</li></ul><h2 id="demos" tabindex="-1"><a class="header-anchor" href="#demos" aria-hidden="true">#</a> Demos</h2>',3),m={href:"https://copy.sh/v86/?profile=archlinux",target:"_blank",rel:"noopener noreferrer"},f=e("Arch Linux"),b=e(" \u2014 "),k={href:"https://copy.sh/v86/?profile=dsl",target:"_blank",rel:"noopener noreferrer"},g=e("Damn Small Linux"),v=e(" \u2014 "),y={href:"https://copy.sh/v86/?profile=buildroot",target:"_blank",rel:"noopener noreferrer"},w=e("Buildroot Linux"),x=e(" \u2014 "),S={href:"https://copy.sh/v86/?profile=reactos",target:"_blank",rel:"noopener noreferrer"},A=e("ReactOS"),C=e(" \u2014 "),P={href:"https://copy.sh/v86/?profile=windows2000",target:"_blank",rel:"noopener noreferrer"},D=e("Windows 2000"),I=e(" \u2014 "),q={href:"https://copy.sh/v86/?profile=windows98",target:"_blank",rel:"noopener noreferrer"},B=e("Windows 98"),E=e(" \u2014 "),O={href:"https://copy.sh/v86/?profile=windows95",target:"_blank",rel:"noopener noreferrer"},T=e("Windows 95"),L=e(" \u2014 "),j={href:"https://copy.sh/v86/?profile=windows1",target:"_blank",rel:"noopener noreferrer"},R=e("Windows 1.01"),M=e(" \u2014 "),N={href:"https://copy.sh/v86/?profile=msdos",target:"_blank",rel:"noopener noreferrer"},W=e("MS-DOS"),F=e(" \u2014 "),V={href:"https://copy.sh/v86/?profile=freedos",target:"_blank",rel:"noopener noreferrer"},z=e("FreeDOS"),U=e(" \u2014 "),H={href:"https://copy.sh/v86/?profile=freebsd",target:"_blank",rel:"noopener noreferrer"},K=e("FreeBSD"),Y=e(" \u2014 "),G={href:"https://copy.sh/v86/?profile=openbsd",target:"_blank",rel:"noopener noreferrer"},Q=e("OpenBSD"),X=e(" \u2014 "),J={href:"https://copy.sh/v86/?profile=9front",target:"_blank",rel:"noopener noreferrer"},Z=e("9front"),$=e(" \u2014 "),ee={href:"https://copy.sh/v86/?profile=haiku",target:"_blank",rel:"noopener noreferrer"},oe=e("Haiku"),te=e(" \u2014 "),se={href:"https://copy.sh/v86/?profile=oberon",target:"_blank",rel:"noopener noreferrer"},ne=e("Oberon"),ie=e(" \u2014 "),re={href:"https://copy.sh/v86/?profile=kolibrios",target:"_blank",rel:"noopener noreferrer"},ae=e("KolibriOS"),le=e(" \u2014 "),ce={href:"https://copy.sh/v86/?profile=qnx",target:"_blank",rel:"noopener noreferrer"},de=e("QNX"),pe=o("h2",{id:"compatibility",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#compatibility","aria-hidden":"true"},"#"),e(" Compatibility")],-1),he=o("p",null,"Here's an overview of the operating systems supported in v86:",-1),_e=e("Linux works pretty well. 64-bit kernels are not supported. "),ue=o("li",null,"Damn Small Linux (2.4 Kernel) works.",-1),me=o("li",null,"All tested versions of TinyCore work.",-1),fe={href:"https://buildroot.uclibc.org",target:"_blank",rel:"noopener noreferrer"},be=e("Buildroot"),ke=e(" can be used to build a minimal image. "),ge={href:"https://github.com/humphd/browser-vm",target:"_blank",rel:"noopener noreferrer"},ve=e("humphd/browser-vm"),ye=e(" and "),we={href:"https://github.com/Darin755/browser-buildroot",target:"_blank",rel:"noopener noreferrer"},xe=e("darin755/browser-buildroot"),Se=e(" have some useful scripts for building one."),Ae=e("Archlinux works. See "),Ce=e("archlinux.md"),Pe=e(" for building an image."),De=e("Debian works. An image can be built from a Dockerfile, see "),Ie=e("tools/docker/debian/"),qe=e("."),Be=o("li",null,"Ubuntu up to 16.04 works.",-1),Ee=o("li",null,"Alpine Linux works.",-1),Oe=o("li",null,"ReactOS works.",-1),Te=o("li",null,"FreeDOS, Windows 1.01 and MS-DOS run very well.",-1),Le=o("li",null,"KolibriOS works.",-1),je=o("li",null,"Haiku works.",-1),Re=e("Android x86 1.6-r2 works if one selects VESA mode at the boot prompt. Newer versions may work if compiled without SSE3. See "),Me={href:"https://github.com/copy/v86/issues/224",target:"_blank",rel:"noopener noreferrer"},Ne=e("#224"),We=e("."),Fe=e("Windows 1, 3.0, 95, 98, ME and 2000 work. Other versions currently don't (see "),Ve={href:"https://github.com/copy/v86/issues/86",target:"_blank",rel:"noopener noreferrer"},ze=e("#86"),Ue=e(", "),He={href:"https://github.com/copy/v86/issues/208",target:"_blank",rel:"noopener noreferrer"},Ke=e("#208"),Ye=e("). "),Ge=o("ul",null,[o("li",null,"In Windows 2000 and higher the PC type has to be changed from ACPI PC to Standard PC")],-1),Qe=r("<li>Many hobby operating systems work.</li><li>9front works.</li><li>Plan 9 doesn&#39;t work.</li><li>QNX works.</li><li>OS/2 doesn&#39;t work.</li><li>FreeBSD works.</li><li>OpenBSD works with a specific boot configuration. At the <code>boot&gt;</code> prompt type <code>boot -c</code>, then at the <code>UKC&gt;</code> prompt <code>disable mpbios</code> and <code>exit</code>.</li>",7),Xe=e("NetBSD works only with a custom kernel, see "),Je={href:"https://github.com/copy/v86/issues/350",target:"_blank",rel:"noopener noreferrer"},Ze=e("#350"),$e=e("."),eo=o("li",null,"Older versions of SerenityOS work (1.0.gc460f4a is a known working version).",-1),oo=e("You can get some infos on the disk images here: "),to={href:"https://github.com/copy/images",target:"_blank",rel:"noopener noreferrer"},so=e("https://github.com/copy/images"),no=e("."),io=r('<h2 id="how-to-build-run-and-embed" tabindex="-1"><a class="header-anchor" href="#how-to-build-run-and-embed" aria-hidden="true">#</a> How to build, run and embed?</h2><p>You need:</p><ul><li>make</li><li>Rust with the wasm32-unknown-unknown target</li><li>A version of clang compatible with Rust</li><li>java (for Closure Compiler, not necessary when using <code>debug.html</code>)</li><li>nodejs (a recent version is required, v16.11.1 is known to be working)</li><li>To run tests: nasm, gdb, qemu-system, gcc, libc-i386 and rustfmt</li></ul>',3),ro=e("See "),ao=o("a",{href:"tools/docker/test-image/Dockerfile"},"tools/docker/test-image/Dockerfile",-1),lo=e(" for a full setup on Debian or "),co={href:"https://docs.microsoft.com/en-us/windows/wsl/install",target:"_blank",rel:"noopener noreferrer"},po=e("WSL"),ho=e("."),_o=r("<li>Run <code>make</code> to build the debug build (at <code>debug.html</code>).</li><li>Run <code>make all</code> to build the optimized build (at <code>index.html</code>).</li><li>ROM and disk images are loaded via XHR, so if you want to try out <code>index.html</code> locally, make sure to serve it from a local webserver. You can use <code>make run</code> to serve the files using Python&#39;s http module.</li>",3),uo=e("If you only want to embed v86 in a webpage you can use libv86.js. For usage, check out the "),mo=e("examples"),fo=e(". You can download it from the release section."),bo=r('<h3 id="alternatively-to-build-using-docker" tabindex="-1"><a class="header-anchor" href="#alternatively-to-build-using-docker" aria-hidden="true">#</a> Alternatively, to build using docker</h3><ul><li>If you have docker installed, you can run the whole system inside a container.</li><li>See <code>tools/docker/exec</code> to find Dockerfile required for this.</li><li>You can run <code>docker build -f tools/docker/exec/Dockerfile -t v86:alpine-3.14 .</code> from the root directory to generate docker image.</li><li>Then you can simply run <code>docker run -it -p 8000:8000 v86:alpine-3.14</code> to start the server.</li><li>Check <code>localhost:8000</code> for hosted server.</li></ul><h2 id="testing" tabindex="-1"><a class="header-anchor" href="#testing" aria-hidden="true">#</a> Testing</h2><p>The disk images for testing are not included in this repository. You can download them directly from the website using:</p><p><code>wget -P images/ https://k.copy.sh/{linux.iso,linux4.iso,buildroot-bzimage.bin,openbsd-floppy.img,kolibri.img,windows101.img,os8.img,freedos722.img}</code></p><p>Run all tests: <code>make jshint rustfmt kvm-unit-test nasmtests nasmtests-force-jit expect-tests jitpagingtests qemutests rust-test tests</code></p>',6),ko=e("See "),go=e("tests/Readme.md"),vo=e(" for more infos."),yo=o("h2",{id:"api-examples",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#api-examples","aria-hidden":"true"},"#"),e(" API examples")],-1),wo=e("Basic"),xo=e("Programatically using the serial terminal"),So=e("A Lua interpreter"),Ao=e("Two instances in one window"),Co=e("Saving and restoring emulator state"),Po=r(`<p>Using v86 for your own purposes is as easy as:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> emulator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">V86Starter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">screen_container</span><span class="token operator">:</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;screen_container&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">bios</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&quot;../../bios/seabios.bin&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">vga_bios</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&quot;../../bios/vgabios.bin&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">cdrom</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&quot;../../images/linux.iso&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">autostart</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>See <a href="src/browser/starter.js">starter.js</a>.</p><h2 id="license" tabindex="-1"><a class="header-anchor" href="#license" aria-hidden="true">#</a> License</h2><p>v86 is distributed under the terms of the Simplified BSD License, see <a href="LICENSE">LICENSE</a>. The following third-party dependencies are included in the repository under their own licenses:</p><ul><li><a href="lib/softfloat/softfloat.c"><code>lib/softfloat/softfloat.c</code></a></li><li><a href="lib/zstd/zstddeclib.c"><code>lib/zstd/zstddeclib.c</code></a></li><li><a href="tests/kvm-unit-tests"><code>tests/kvm-unit-tests/</code></a></li><li><a href="tests/qemutests"><code>tests/qemutests/</code></a></li></ul><h2 id="credits" tabindex="-1"><a class="header-anchor" href="#credits" aria-hidden="true">#</a> Credits</h2>`,7),Do=e("CPU test cases via "),Io={href:"https://wiki.qemu.org/Main_Page",target:"_blank",rel:"noopener noreferrer"},qo=e("QEMU"),Bo=e("More tests via "),Eo={href:"https://www.linux-kvm.org/page/KVM-unit-tests",target:"_blank",rel:"noopener noreferrer"},Oo=e("kvm-unit-tests"),To={href:"https://github.com/facebook/zstd",target:"_blank",rel:"noopener noreferrer"},Lo=e("zstd"),jo=e(" support is included for better compression of state images"),Ro={href:"http://www.jhauser.us/arithmetic/SoftFloat.html",target:"_blank",rel:"noopener noreferrer"},Mo=e("Berkeley SoftFloat"),No=e(" is included to precisely emulate 80-bit floating point numbers"),Wo={href:"https://github.com/s-macke/jor1k",target:"_blank",rel:"noopener noreferrer"},Fo=e("The jor1k project"),Vo=e(" for 9p, filesystem and uart drivers"),zo={href:"https://winworldpc.com/",target:"_blank",rel:"noopener noreferrer"},Uo=e("WinWorld"),Ho=e(" sources of some old operating systems"),Ko=o("h2",{id:"more-questions",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#more-questions","aria-hidden":"true"},"#"),e(" More questions?")],-1),Yo=o("p",null,[e("Shoot me an email to "),o("code",null,"copy@copy.sh"),e(". Please report bugs on GitHub.")],-1),Go=o("h2",{id:"author",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#author","aria-hidden":"true"},"#"),e(" Author")],-1),Qo=e("Fabian Hemmer ("),Xo={href:"https://copy.sh/",target:"_blank",rel:"noopener noreferrer"},Jo=e("https://copy.sh/"),Zo=e(", "),$o=o("code",null,"copy@copy.sh",-1),et=e(")");function ot(tt,st){const s=a("ExternalLinkIcon"),n=a("RouterLink");return c(),d("div",null,[o("p",null,[o("a",h,[_,t(s)])]),u,o("p",null,[o("a",m,[f,t(s)]),b,o("a",k,[g,t(s)]),v,o("a",y,[w,t(s)]),x,o("a",S,[A,t(s)]),C,o("a",P,[D,t(s)]),I,o("a",q,[B,t(s)]),E,o("a",O,[T,t(s)]),L,o("a",j,[R,t(s)]),M,o("a",N,[W,t(s)]),F,o("a",V,[z,t(s)]),U,o("a",H,[K,t(s)]),Y,o("a",G,[Q,t(s)]),X,o("a",J,[Z,t(s)]),$,o("a",ee,[oe,t(s)]),te,o("a",se,[ne,t(s)]),ie,o("a",re,[ae,t(s)]),le,o("a",ce,[de,t(s)])]),pe,he,o("ul",null,[o("li",null,[_e,o("ul",null,[ue,me,o("li",null,[o("a",fe,[be,t(s)]),ke,o("a",ge,[ve,t(s)]),ye,o("a",we,[xe,t(s)]),Se]),o("li",null,[Ae,t(n,{to:"/toys/v86/docs/archlinux.html"},{default:i(()=>[Ce]),_:1}),Pe]),o("li",null,[De,t(n,{to:"/toys/v86/tools/docker/debian/"},{default:i(()=>[Ie]),_:1}),qe]),Be,Ee])]),Oe,Te,Le,je,o("li",null,[Re,o("a",Me,[Ne,t(s)]),We]),o("li",null,[Fe,o("a",Ve,[ze,t(s)]),Ue,o("a",He,[Ke,t(s)]),Ye,Ge]),Qe,o("li",null,[Xe,o("a",Je,[Ze,t(s)]),$e]),eo]),o("p",null,[oo,o("a",to,[so,t(s)]),no]),io,o("p",null,[ro,ao,lo,o("a",co,[po,t(s)]),ho]),o("ul",null,[_o,o("li",null,[uo,t(n,{to:"/toys/v86/examples/"},{default:i(()=>[mo]),_:1}),fo])]),bo,o("p",null,[ko,t(n,{to:"/toys/v86/tests/"},{default:i(()=>[go]),_:1}),vo]),yo,o("ul",null,[o("li",null,[t(n,{to:"/toys/v86/examples/basic.html"},{default:i(()=>[wo]),_:1})]),o("li",null,[t(n,{to:"/toys/v86/examples/serial.html"},{default:i(()=>[xo]),_:1})]),o("li",null,[t(n,{to:"/toys/v86/examples/lua.html"},{default:i(()=>[So]),_:1})]),o("li",null,[t(n,{to:"/toys/v86/examples/two_instances.html"},{default:i(()=>[Ao]),_:1})]),o("li",null,[t(n,{to:"/toys/v86/examples/save_restore.html"},{default:i(()=>[Co]),_:1})])]),Po,o("ul",null,[o("li",null,[Do,o("a",Io,[qo,t(s)])]),o("li",null,[Bo,o("a",Eo,[Oo,t(s)])]),o("li",null,[o("a",To,[Lo,t(s)]),jo]),o("li",null,[o("a",Ro,[Mo,t(s)]),No]),o("li",null,[o("a",Wo,[Fo,t(s)]),Vo]),o("li",null,[o("a",zo,[Uo,t(s)]),Ho])]),Ko,Yo,Go,o("p",null,[Qo,o("a",Xo,[Jo,t(s)]),Zo,$o,et])])}var rt=l(p,[["render",ot],["__file","index.html.vue"]]);export{rt as default};
