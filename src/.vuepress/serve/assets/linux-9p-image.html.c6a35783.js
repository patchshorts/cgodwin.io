import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";import{r as t,o,c as l,a as n,b as c,e as s,d as e}from"./app.e6600fbb.js";const p={},r=s(`<p>In order to create a Linux image that can mount the 9p file system, use add the following lines to the kernel config:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>CONFIG_NET_9P=y
CONFIG_NET_9P_VIRTIO=y
CONFIG_NET_9P_DEBUG=y
CONFIG_VIRTIO=y
CONFIG_VIRTIO_PCI=y
CONFIG_9P_FS=y
CONFIG_9P_FSCACHE=y
CONFIG_9P_FS_POSIX_ACL=y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),d=e("A Dockerfile for this build is here: "),u={href:"https://github.com/ysangkok/build-v86-9p-linux",target:"_blank",rel:"noopener noreferrer"},v=e("https://github.com/ysangkok/build-v86-9p-linux"),m=s(`<h2 id="using-initcpio" tabindex="-1"><a class="header-anchor" href="#using-initcpio" aria-hidden="true">#</a> Using initcpio</h2><p>This allows you to remount the root file system using 9p. No changes are necessary if you only want to mount a 9p filesystem after booting.</p><p>Add the following files:</p><p><code>/etc/initcpio/hooks/9p_root</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/bash</span>

<span class="token function-name function">run_hook</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">mount_handler</span><span class="token operator">=</span><span class="token string">&quot;mount_9p_root&quot;</span>
<span class="token punctuation">}</span>

<span class="token function-name function">mount_9p_root</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    msg <span class="token string">&quot;:: mounting &#39;<span class="token variable">$root</span>&#39; on real root (9p)&quot;</span>
    <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token function">mount</span> -t 9p host9p <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;You are now being dropped into an emergency shell.&quot;</span>
        launch_interactive_shell
        msg <span class="token string">&quot;Trying to continue (this will most likely fail) ...&quot;</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><code>/etc/initcpio/install/9p_root</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token function-name function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	add_runscript
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Change the following options in <code>/etc/mkinitcpio.conf</code>:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">MODULES</span><span class="token operator">=</span><span class="token string">&quot;virtio_pci 9p 9pnet 9pnet_virtio&quot;</span>
<span class="token assign-left variable">HOOKS</span><span class="token operator">=</span><span class="token string">&quot;base udev autodetect modconf block filesystems keyboard fsck 9p_root&quot;</span> <span class="token comment"># appended 9p_root</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function b(k,h){const a=t("ExternalLinkIcon");return o(),l("div",null,[r,n("p",null,[d,n("a",u,[v,c(a)])]),m])}var f=i(p,[["render",b],["__file","linux-9p-image.html.vue"]]);export{f as default};
