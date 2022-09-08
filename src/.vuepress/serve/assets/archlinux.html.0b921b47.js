import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{r as o,o as l,c as r,a as s,b as a,d as n,e as i}from"./app.e6600fbb.js";const c={},d=s("p",null,"(This document partly also applies to other Linuxes)",-1),u=s("h2",{id:"choosing-an-installer-iso",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#choosing-an-installer-iso","aria-hidden":"true"},"#"),n(" Choosing an installer ISO")],-1),p=n("The last ISO installer version of Archlinux that supports 32-bit is "),m={href:"https://www.archlinux.org/releng/releases/2017.02.01/",target:"_blank",rel:"noopener noreferrer"},v=n("2017.02.01"),h=n(". Later versions of the archisos don't work on the v86 emulator because the installer only supports x86_64, not x86 anymore. For existing Archlinux installations, updates and patches will be done until somewhere around 2018."),b=n("In the future the community might come up with an alternative distribution based on Archlinux to maintain support for x86. At this point in time "),k={href:"https://mirror.archlinux32.org",target:"_blank",rel:"noopener noreferrer"},g=n("archlinux32"),f=n(" seems to work."),y=i(`<h2 id="basic-installation-using-qemu" tabindex="-1"><a class="header-anchor" href="#basic-installation-using-qemu" aria-hidden="true">#</a> Basic installation using QEMU</h2><p>Installing Archlinux like this will result in a raw disk image that can be booted by v86.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># fetch archlinux32 installer</span>
<span class="token function">wget</span> https://mirror.archlinux32.org/archisos/archlinux32-2021.12.01-i686.iso

<span class="token comment"># Create a 10 gigabyte disk image. If you intend to pacstrap only &#39;base&#39; then 1.5G should be fine also.</span>
qemu-img create arch.img 10G

<span class="token comment"># Follow the normal installation process (you can add accel=kvm if your system supports it to speed up the installation)</span>
qemu-system-x86_64 -m <span class="token number">256</span> -drive <span class="token assign-left variable">file</span><span class="token operator">=</span>arch.img,format<span class="token operator">=</span>raw -cdrom archlinux32-2021.12.01-i686.iso
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For keyboard support it is necessary to open /etc/mkinitcpio.conf and edit the following line:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">MODULES</span><span class="token operator">=</span><span class="token string">&quot;atkbd i8042&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>For the changes to take effect you need to regenerate the RAMdisk with <code>mkinitcpio -p linux</code></p><p>The resulting <code>arch.img</code> is a bootable disk image for v86.</p><h2 id="scripting-image-creation-for-v86" tabindex="-1"><a class="header-anchor" href="#scripting-image-creation-for-v86" aria-hidden="true">#</a> Scripting image creation for v86</h2><p>Installing the ISO by hand takes a long time if you intend to recreate the image many times. There are various reasons why you might want to do this more than once. For example: because the emulator is slow you might want to compile any new software release in QEMU which is much faster and then use the resulting image in v86 instead of making the emulator compile the software. Another reason is that the build progress potentially takes long and if you want to do automated builds in parallel to find out what configurations do and don&#39;t work you can just throw more computing power at the problem in order to solve it. This example requires that you have <code>packer</code>, <code>qemu</code> and <code>kpartx</code> installed.</p><h3 id="creating-a-packer-template" tabindex="-1"><a class="header-anchor" href="#creating-a-packer-template" aria-hidden="true">#</a> Creating a packer template</h3>`,10),w={href:"https://www.packer.io/docs/builders/qemu.html",target:"_blank",rel:"noopener noreferrer"},_=n("Packer"),q=n(" is a tool that lets you boot an ISO in any of multiple emulators (so QEMU in our case) and send pre-scripted keystrokes to bootstrap and SSH server. Once the SSH connection is established a script can be started for further provisioning."),x=i(`<p>Create a template for automating the base installation</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> -p packer
<span class="token function">cat</span> <span class="token operator">&gt;</span> packer/template.json <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;
{
  &quot;provisioners&quot;: [
    {
      &quot;type&quot;: &quot;shell&quot;,
      &quot;override&quot;: {
        &quot;qemu&quot;: {
          &quot;scripts&quot;: [&quot;scripts/provision.sh&quot;]
        }
      }
    }
  ],
  &quot;builders&quot;: [
    {
      &quot;accelerator&quot;: &quot;kvm&quot;,
      &quot;type&quot;: &quot;qemu&quot;,
      &quot;boot_command&quot;: [
        &quot;&lt;enter&gt;&lt;wait30&gt;&lt;enteropenssl passwd help&lt;wait10&gt;&quot;,
        &quot;dhcpcd&lt;enter&gt;&lt;wait5&gt;&quot;,
        &quot;echo root:root | chpasswd&lt;enter&gt;&lt;wait5&gt;&quot;,
        &quot;systemctl start sshd&lt;enter&gt;&quot;
      ],
      &quot;headless&quot;: true,
      &quot;boot_wait&quot;: &quot;10s&quot;,
      &quot;disk_size&quot;: 1500,
      &quot;disk_interface&quot;: &quot;ide&quot;,
      &quot;iso_url&quot;: &quot;https://mirror.archlinux32.org/archisos/archlinux32-2021.12.01-i686.iso&quot;,
      &quot;iso_checksum&quot;: &quot;90c6f5aecb095d5578f6c9970539da7c5e9324ec&quot;,
      &quot;iso_checksum_type&quot;: &quot;sha1&quot;,
      &quot;ssh_wait_timeout&quot;: &quot;120s&quot;,
      &quot;ssh_pty&quot;: true,
      &quot;ssh_username&quot;: &quot;root&quot;,
      &quot;ssh_password&quot;: &quot;root&quot;,
      &quot;ssh_port&quot;: 22,
      &quot;format&quot;: &quot;raw&quot;,
      &quot;vm_name&quot;: &quot;archlinux&quot;,
      &quot;disk_detect_zeroes&quot;: &quot;unmap&quot;,
      &quot;memory&quot;: 2048,
      &quot;vnc_bind_address&quot;: &quot;0.0.0.0&quot;
    }
  ]
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),E=i("You can tweak the options a bit to match your situation. For debugging you can set <code>headless</code> to <code>false</code>. That will show you the vnc instead of running the <code>boot_command</code> in the background. For a <code>base</code> pacstrap using a 1.5G disk should be sufficient. The <code>raw</code> disk format is important. v86 does not read qcow2 images, only raw disk images. If your system does not support kvm (the default accelerator), you can change <code>&quot;accelerator&quot;: &quot;none&quot;</code> to the settings, in macos you may use <code>&quot;accelerator&quot;: &quot;hvf&quot;</code>. Other accelerator options can be found ",15),T={href:"https://www.packer.io/docs/builders/qemu.html#accelerator",target:"_blank",rel:"noopener noreferrer"},O=n("here"),L=n("."),S=i(`<p>After gaining SSH connectivity to the VM, packer will run the <code>scripts/provisioning.sh</code> script in the guest.</p><h3 id="creating-the-archlinux-installation-script" tabindex="-1"><a class="header-anchor" href="#creating-the-archlinux-installation-script" aria-hidden="true">#</a> Creating the Archlinux installation script</h3><p>Create a script for your Archlinux installation. This runs in the ISO booted Archlinux environment, so you need to partition, pacstrap and install a bootloader.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> -p packer/scripts
<span class="token comment">### Write your own or copy paste the example below</span>
<span class="token function">vim</span> packer/scripts/provision.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>An example script to install Archlinux with the root mounted using the 9p network filesystem:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Creating a GPT partition on /dev/sda1&quot;</span>
<span class="token builtin class-name">echo</span> -e <span class="token string">&quot;g<span class="token entity" title="\\n">\\n</span>n<span class="token entity" title="\\n">\\n</span><span class="token entity" title="\\n">\\n</span><span class="token entity" title="\\n">\\n</span><span class="token entity" title="\\n">\\n</span>w&quot;</span> <span class="token operator">|</span> <span class="token function">fdisk</span> /dev/sda

<span class="token comment"># In case you might want to create a DOS partition instead. It doesn&#39;t really matter.</span>
<span class="token comment">#echo &quot;Creating a DOS partition on /dev/sda1&quot;</span>
<span class="token comment">#echo -e &quot;o\\nn\\np\\n1\\n\\n\\nw&quot; | fdisk /dev/sda</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Formatting /dev/sda1 to ext4&quot;</span>
<span class="token function">mkfs</span> -t ext4 /dev/sda1

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Mounting new filesystem&quot;</span>
<span class="token function">mount</span> -t ext4 /dev/sda1 /mnt

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Create pacman package cache dir&quot;</span>
<span class="token function">mkdir</span> -p /mnt/var/cache/pacman/pkg

<span class="token comment"># We don&#39;t want the pacman cache to fill up the image. After reboot whatever tarballs pacman has cached are gone.</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Mount the package cache dir in memory so it doesn&#39;t fill up the image&quot;</span>
<span class="token function">mount</span> -t tmpfs none /mnt/var/cache/pacman/pkg

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Updating archlinux-keyring&quot;</span>
pacman -Sy archlinux-keyring --noconfirm

<span class="token comment"># uncomment to remove signing if unable to resolve signing errors</span>
<span class="token function">sed</span> -i <span class="token string">&#39;s/SigLevel.*/SigLevel = Never/g&#39;</span> /etc/pacman.conf

<span class="token comment"># Install the Archlinux base system, feel free to add packages you need here</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Performing pacstrap&quot;</span>
pacstrap -i /mnt base linux dhcpcd <span class="token function">curl</span> openssh --noconfirm

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Writing fstab&quot;</span>
genfstab -p /mnt <span class="token operator">&gt;&gt;</span> /mnt/etc/fstab

<span class="token comment"># When the Linux boots we want it to automatically log in on tty1 as root</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Ensuring root autologin on tty1&quot;</span>
<span class="token function">mkdir</span> -p /mnt/etc/systemd/system/getty@tty1.service.d
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;<span class="token bash punctuation"> <span class="token operator">&gt;</span> /mnt/etc/systemd/system/getty@tty1.service.d/override.conf</span>
[Service]
ExecStart=
ExecStart=-/usr/bin/agetty --autologin root --noclear %I $TERM
EOF</span>

<span class="token comment"># This is the tricky part. The current root will be mounted on /dev/sda1 but after we reboot</span>
<span class="token comment"># it will try to mount root during boot using the 9p network filesystem. This means the emulator</span>
<span class="token comment"># will request all files over the network using XMLHttpRequests from the server. This is great</span>
<span class="token comment"># because then you only need to provide the client with a saved state (the memory) and the</span>
<span class="token comment"># session will start instantly and load needed files on the fly. This is fast and it saves bandwidth.</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Ensuring root is remounted using 9p after reboot&quot;</span>
<span class="token function">mkdir</span> -p /mnt/etc/initcpio/hooks
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;<span class="token bash punctuation"> <span class="token operator">&gt;</span> /mnt/etc/initcpio/hooks/9p_root</span>
run_hook() {
    mount_handler=&quot;mount_9p_root&quot;
}

mount_9p_root() {
    msg &quot;:: mounting &#39;$root&#39; on real root (9p)&quot;
    # Note the host9p. We won&#39;t mount /dev/sda1 on root anymore,
    # instead we mount the network filesystem and the emulator will
    # retrieve the files on the fly.
    if ! mount -t 9p host9p &quot;$1&quot;; then
        echo &quot;You are now being dropped into an emergency shell.&quot;
        launch_interactive_shell
        msg &quot;Trying to continue (this will most likely fail) ...&quot;
    fi
}
EOF</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Adding initcpio build hook for 9p root remount&quot;</span>
<span class="token function">mkdir</span> -p /mnt/etc/initcpio/install
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;<span class="token bash punctuation"> <span class="token operator">&gt;</span> /mnt/etc/initcpio/install/9p_root</span>
#!/bin/bash
build() {
	add_runscript
}
EOF</span>

<span class="token comment"># We need to load some modules into the kernel for it to play nice with the emulator</span>
<span class="token comment"># The atkbd and i8042 modules are for keyboard input in the browser. If you do not</span>
<span class="token comment"># want to use the network filesystem you only need these. The 9p, 9pnet and 9pnet_virtio</span>
<span class="token comment"># modules are needed for being able to mount 9p network filesystems using the emulator.</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Configure mkinitcpio for 9p&quot;</span>
<span class="token function">sed</span> -i <span class="token string">&#39;s/MODULES=()/MODULES=(atkbd i8042 libps2 serio serio_raw psmouse virtio_pci virtio_pci_modern_dev 9p 9pnet 9pnet_virtio fscache netfs)/g&#39;</span> /mnt/etc/mkinitcpio.conf

<span class="token comment"># Because we want to mount the root filesystem over the network during boot, we need to</span>
<span class="token comment"># hook into initcpio. If you do not want to mount the root filesystem during boot but</span>
<span class="token comment"># only want to mount a 9p filesystem later, you can leave this out. Once the system</span>
<span class="token comment"># has been booted you should be able to mount 9p filesystems with mount -t 9p host9p /blabla</span>
<span class="token comment"># without this hook.</span>
<span class="token function">sed</span> -i <span class="token string">&#39;s/fsck&quot;/fsck 9p_root&quot;/g&#39;</span> /mnt/etc/mkinitcpio.conf

<span class="token comment"># enable ssh password auth and root login</span>
<span class="token function">sed</span> -i <span class="token string">&#39;s/#PermitRootLogin.*/PermitRootLogin yes/g&#39;</span> /etc/ssh/sshd_config
<span class="token function">sed</span> -i <span class="token string">&#39;s/#PasswordAuthentication.*/PasswordAuthentication yes/g&#39;</span> /etc/ssh/sshd_config

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Writing the installation script&quot;</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;<span class="token bash punctuation"> <span class="token operator">&gt;</span> /mnt/bootstrap.sh</span>
#!/usr/bin/bash
echo &quot;Re-generate initial ramdisk environment&quot;
mkinitcpio -p linux

# uncomment to remove signing if you are unable to resolve signing errors otherwise
sed -i &#39;s/SigLevel.*/SigLevel = Never/g&#39; /etc/pacman.conf

pacman -S --noconfirm syslinux gptfdisk
syslinux-install_update -i -a -m

# disabling ldconfig to speed up boot (to remove Rebuild dynamic linker cache...)
# you may want to comment this out
echo &quot;Disabling ldconfig service&quot;
systemctl mask ldconfig.service

sync
EOF</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Chrooting and bootstrapping the installation&quot;</span>
arch-chroot /mnt <span class="token function">bash</span> bootstrap.sh


<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;<span class="token bash punctuation"> <span class="token operator">&gt;</span> /mnt/boot/syslinux/syslinux.cfg</span>
# Config file for Syslinux -
# /boot/syslinux/syslinux.cfg
#
# Comboot modules:
#   * menu.c32 - provides a text menu
#   * vesamenu.c32 - provides a graphical menu
#   * chain.c32 - chainload MBRs, partition boot sectors, Windows bootloaders
#   * hdt.c32 - hardware detection tool
#   * reboot.c32 - reboots the system
#
# To Use: Copy the respective files from /usr/lib/syslinux to /boot/syslinux.
# If /usr and /boot are on the same file system, symlink the files instead
# of copying them.
#
# If you do not use a menu, a &#39;boot:&#39; prompt will be shown and the system
# will boot automatically after 5 seconds.
#
# Please review the wiki: https://wiki.archlinux.org/index.php/Syslinux
# The wiki provides further configuration examples

DEFAULT arch
PROMPT 0        # Set to 1 if you always want to display the boot: prompt
TIMEOUT 100

# Menu Configuration
# Either menu.c32 or vesamenu32.c32 must be copied to /boot/syslinux
UI menu.c32
#UI vesamenu.c32

# Refer to http://syslinux.zytor.com/wiki/index.php/Doc/menu
MENU TITLE Arch Linux
#MENU BACKGROUND splash.png
MENU COLOR border       30;44   #40ffffff #a0000000 std
MENU COLOR title        1;36;44 #9033ccff #a0000000 std
MENU COLOR sel          7;37;40 #e0ffffff #20ffffff all
MENU COLOR unsel        37;44   #50ffffff #a0000000 std
MENU COLOR help         37;40   #c0ffffff #a0000000 std
MENU COLOR timeout_msg  37;40   #80ffffff #00000000 std
MENU COLOR timeout      1;37;40 #c0ffffff #00000000 std
MENU COLOR msg07        37;40   #90ffffff #a0000000 std
MENU COLOR tabmsg       31;40   #30ffffff #00000000 std

# boot sections follow
#
# TIP: If you want a 1024x768 framebuffer, add &quot;vga=773&quot; to your kernel line.
#
#-*

LABEL arch
    MENU LABEL Arch Linux 9p
    LINUX ../vmlinuz-linux
    APPEND root=/dev/sda1 rw quiet
    INITRD ../initramfs-linux.img

LABEL arch2
    MENU LABEL Arch Linux Disk
    LINUX ../vmlinuz-linux
    APPEND root=/dev/sda1 rw quiet disablehooks=9p_root
    INITRD ../initramfs-linux.img

LABEL hdt
        MENU LABEL HDT (Hardware Detection Tool)
        COM32 hdt.c32

LABEL reboot
        MENU LABEL Reboot
        COM32 reboot.c32

LABEL poweroff
        MENU LABEL Poweroff
        COM32 poweroff.c32
EOF</span>
<span class="token function">umount</span> -R /mnt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With the packer template and the script you have enough to create an image that can be booted by v86. But because this example script installs an Archlinux that wants to mount root over the network with 9p, we need to host that filesystem first. If you do not want to use 9p, you can just run <code>(cd packer &amp;&amp; packer build -force template.json)</code> to build the image.</p><h3 id="creating-the-9p-filesystem" tabindex="-1"><a class="header-anchor" href="#creating-the-9p-filesystem" aria-hidden="true">#</a> Creating the 9p filesystem</h3><p>Now that we have an image that contains a filesystem, we can convert that filesystem into something we can host on the webserver together with the v86 library.</p><p>To do so, we need to mount the image once and create a json mapping of the filesystem. The following script shows how to map the filesystem in an automated fashion.</p><p>Create a script to builds the image and then creates v86 compatible artifacts:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">vim</span> build.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Example script:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>

<span class="token assign-left variable">SRC</span><span class="token operator">=</span>packer
<span class="token assign-left variable">TARGET</span><span class="token operator">=</span>output

<span class="token comment"># build the boxfile from the iso</span>
<span class="token punctuation">(</span>cd <span class="token variable">$SRC</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token assign-left variable">PACKER_LOG</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">PACKER_LOG_PATH</span><span class="token operator">=</span><span class="token string">&quot;./packer.log&quot;</span> packer build -force template.json<span class="token punctuation">)</span>

<span class="token comment"># test if there is a boxfile where we expected it</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> -f <span class="token variable">$SRC</span>/output-qemu/archlinux <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Looks like something went wrong building the image, maybe try again?&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span><span class="token punctuation">;</span>

<span class="token comment"># clean up any previous loops and mounts</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Making sure mountpoint is empty&quot;</span>
<span class="token assign-left variable">LOOP_DEV</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">sudo</span> losetup -f<span class="token variable">)</span></span>

<span class="token function">sudo</span> <span class="token function">umount</span> diskmount -f <span class="token operator">||</span> /bin/true
<span class="token function">sudo</span> kpartx -d <span class="token variable">$LOOP_DEV</span> <span class="token operator">||</span> /bin/true
<span class="token function">sudo</span> losetup -d <span class="token variable">$LOOP_DEV</span> <span class="token operator">||</span> /bin/true

<span class="token comment"># mount the generated raw image, we do that so we can create</span>
<span class="token comment"># a json mapping of it and copy it to host on the webserver</span>
<span class="token function">mkdir</span> -p diskmount
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Mounting the created image so we can convert it to a p9 image&quot;</span>
<span class="token function">sudo</span> losetup <span class="token variable">$LOOP_DEV</span> <span class="token variable">$SRC</span>/output-qemu/archlinux
<span class="token function">sudo</span> kpartx -a <span class="token variable">$LOOP_DEV</span>
<span class="token function">sudo</span> <span class="token function">mount</span> /dev/mapper/<span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $LOOP_DEV<span class="token variable">)</span></span>p1 diskmount

<span class="token comment"># make images dir</span>
<span class="token function">mkdir</span> -p <span class="token variable">$TARGET</span>
<span class="token function">mkdir</span> -p <span class="token variable">$TARGET</span>/images
<span class="token function">mkdir</span> -p <span class="token variable">$TARGET</span>/images/arch

<span class="token comment"># map the filesystem to json with fs2json</span>
<span class="token function">sudo</span> ./tools/fs2json.py --out <span class="token variable">$TARGET</span>/images/fs.json diskmount
<span class="token function">sudo</span> ./tools/copy-to-sha256.py diskmount <span class="token variable">$TARGET</span>/images/arch

<span class="token comment"># copy the filesystem and chown to nonroot user</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Copying the filesystem to <span class="token variable">$TARGET</span>/arch&quot;</span>
<span class="token function">mkdir</span> <span class="token variable">$TARGET</span>/arch -p
<span class="token function">sudo</span> <span class="token function">rsync</span> -q -av diskmount/ <span class="token variable">$TARGET</span>/arch
<span class="token function">sudo</span> <span class="token function">chown</span> -R <span class="token variable"><span class="token variable">$(</span><span class="token function">whoami</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">whoami</span><span class="token variable">)</span></span> <span class="token variable">$TARGET</span>/arch

<span class="token comment"># clean up mount</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Cleaning up mounts&quot;</span>
<span class="token function">sudo</span> <span class="token function">umount</span> diskmount -f
<span class="token function">sudo</span> kpartx -d <span class="token variable">$LOOP_DEV</span>
<span class="token function">sudo</span> losetup -d <span class="token variable">$LOOP_DEV</span>

<span class="token comment"># Move the image to the images dir</span>
<span class="token function">sudo</span> <span class="token function">mv</span> <span class="token variable">$SRC</span>/output-qemu/archlinux <span class="token variable">$TARGET</span>/images/arch.img
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),A=n("Given that the packer template and "),R={href:"http://provision.sh",target:"_blank",rel:"noopener noreferrer"},C=n("provision.sh"),M=n(" is rooted at "),N=s("code",null,"packer",-1),I=n(" (adjust the value of "),U=s("code",null,"$SRC",-1),P=n(" otherwise), run the "),$=s("code",null,"build.sh",-1),D=n(" at root of your "),F=s("code",null,"v86",-1),B=n(" repo:"),G=i(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>chmod +x build.sh
./build.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Generated artifacts are now available for serving from <code>output</code>.</p><h3 id="using-the-created-artifacts-in-v86" tabindex="-1"><a class="header-anchor" href="#using-the-created-artifacts-in-v86" aria-hidden="true">#</a> Using the created artifacts in v86</h3><p>Now that we have everything we need to host a server that serves an Archlinux environment over the network.</p><p>Create a checkout of v86 and run <code>make build/libv86.js</code>. We can then edit <code>examples/arch.html</code>, we have two options:</p><ol><li>Boot Arch Linux from the 9p filesystem (generated .bin artifacts at <code>/output/images/arch</code>):</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>filesystem: <span class="token punctuation">{</span>
  baseurl: <span class="token string">&quot;../output/images/arch/&quot;</span>,
  basefs: <span class="token string">&quot;../output/images/fs.json&quot;</span>,
<span class="token punctuation">}</span>,

bzimage_initrd_from_filesystem: true,

cmdline: <span class="token punctuation">[</span>
  <span class="token string">&quot;rw&quot;</span>,
  <span class="token string">&quot;root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose&quot;</span>,
<span class="token punctuation">]</span>.join<span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>,

acpi: false,
autostart: true,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>Boot the archlinux from the qemu raw disk image:</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>hda: <span class="token punctuation">{</span>
    url: <span class="token string">&quot;../output/images/arch.img&quot;</span>,
    <span class="token comment"># set to true if you want to load it asynchrously during runtime (for this option we need to run a webserver that supports the Range header)</span>
    <span class="token comment"># NOTE: async: false is slow but proved to be more realiable</span>
    async: false,

    <span class="token comment"># This needs to be the size of the raw disk.</span>
    size: <span class="token number">1.5</span> * <span class="token number">1024</span> * <span class="token number">1024</span> * <span class="token number">1024</span>,
    <span class="token comment"># See the \`disk_size\` item in the packer template.</span>
<span class="token punctuation">}</span>,

acpi: false,
autostart: true,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),V=n("Next, we need a webserver that supports the Range header. For example "),j={href:"https://github.com/smgoller/rangehttpserver",target:"_blank",rel:"noopener noreferrer"},H=n("this extension of the SimpleHTTPServer"),W=n(". At your "),z=s("code",null,"v86",-1),Y=n(" root, run:"),K=i(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">wget</span> https://raw.githubusercontent.com/smgoller/rangehttpserver/master/RangeHTTPServer.py
python2 RangeHTTPServer.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Now that the webserver is running, point your browser to <code>http://localhost:8000/examples/arch.html</code>. Wait for the Linux to boot. When the system is up, click &#39;Save state to file&#39;. Your browser will download a <code>v86state.bin</code> file. Copy that file to <code>/your/v86/dir/images</code>. You can then edit <code>examples/arch.html</code> again and add a &#39;state&#39; key to the <code>V86Starter</code> array.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>initial_state: <span class="token punctuation">{</span>
    <span class="token string">&quot;url&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;http://localhost:8000/images/v86state.bin&quot;</span>,
<span class="token punctuation">}</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you refresh <code>http://localhost:8000/examples/arch.html</code> you will see that the state is restored instantly and all required files are loaded over the network on the fly.</p><h3 id="networking" tabindex="-1"><a class="header-anchor" href="#networking" aria-hidden="true">#</a> Networking</h3>`,5),Q=n("The emulator can emulate a network card. For more information "),X={href:"https://github.com/copy/v86/blob/master/docs/networking.md",target:"_blank",rel:"noopener noreferrer"},J=n("look at the networking documentation"),Z=n(". To set up networking in the VM, add the following item to the "),nn=s("code",null,"V86Starter",-1),sn=n(" array in the "),en=s("code",null,"examples/arch.html",-1),an=n(" file:"),tn=i(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>network_relay_url: <span class="token string">&quot;ws://localhost:8080/&quot;</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,1),on=n("This will make the emulator try to connect to a "),ln={href:"https://github.com/benjamincburns/websockproxy",target:"_blank",rel:"noopener noreferrer"},rn=n("WebSockets proxy"),cn=n(". Running the proxy is very easy if you use the Docker container."),dn=i(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> run --privileged -p <span class="token number">8080</span>:80 --name relay bennottelling/websockproxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,1),un=s("strong",null,"NOTE:",-1),pn=n(" original "),mn=s("code",null,"benjamincburns/jor1k-relay:latest",-1),vn=n(" has throttling built-in by default which will degrade the networking. "),hn=s("code",null,"bennottelling/websockproxy",-1),bn=n(" has this throttling removed via "),kn={href:"https://github.com/benjamincburns/websockproxy/issues/4#issuecomment-317255890",target:"_blank",rel:"noopener noreferrer"},gn=n("websockproxy/issues/4#issuecomment-317255890"),fn=n("."),yn=i(`<p>You can check if the relay is running correctly by going to <code>http://localhost:8080/</code> in your browser. There you should see a message that reads <code>Can &quot;Upgrade&quot; only to &quot;Websocket&quot;.</code>.</p><p>Now you should be able to get network connectivity in the virtual machine. If you are restoring from a saved state, you might need to first run:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> enp0s5 down
rmmod ne2k-pci
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>To bring the network up, run:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>modprobe ne2k-pci
dhcpcd -w4 enp0s5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>It might take a while for a carrier to become available on the interface. If the <code>dhcpcd</code> command fails shortly after booting, wait a bit and try again a bit later. If you are using the 9p network filesystem you can use the developer tools networking tab (in chrome) to get a sense of what is going on by looking at the files that are being downloaded.</p><p>When the network is up you should be able to curl a website. To check, run <code>curl icanhazip.com</code>. There you should see the public IP of the machine running the proxy.</p><p>You can&#39;t do inbound traffic into the VM with the websockproxy Docker container because it uses a basic NAT. To SSH into the VM running in the browser, you can create a reverse SSH tunnel to expose the SSH port of the sshd in the VM to the outside world. You may need to start <code>sshd</code> first, it may also be reasonable to change root password:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">passwd</span> root
systemctl start sshd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>then create a reverse SSH tunnel:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># This will create a port 1122 on the example.com server</span>
<span class="token comment"># which forwards to the SSH in the VM</span>
<span class="token function">ssh</span> root@example.com -R <span class="token number">1122</span>:localhost:22
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now on the <code>example.com</code> server you should be able to SSH into your browser tab by running <code>ssh root@localhost -p 1122</code>.</p>`,12);function wn(_n,qn){const e=o("ExternalLinkIcon");return l(),r("div",null,[d,u,s("p",null,[p,s("a",m,[v,a(e)]),h]),s("p",null,[b,s("a",k,[g,a(e)]),f]),y,s("p",null,[s("a",w,[_,a(e)]),q]),x,s("p",null,[E,s("a",T,[O,a(e)]),L]),S,s("p",null,[A,s("a",R,[C,a(e)]),M,N,I,U,P,$,D,F,B]),G,s("p",null,[V,s("a",j,[H,a(e)]),W,z,Y]),K,s("p",null,[Q,s("a",X,[J,a(e)]),Z,nn,sn,en,an]),tn,s("p",null,[on,s("a",ln,[rn,a(e)]),cn]),dn,s("p",null,[un,pn,mn,vn,hn,bn,s("a",kn,[gn,a(e)]),fn]),yn])}var Tn=t(c,[["render",wn],["__file","archlinux.html.vue"]]);export{Tn as default};
