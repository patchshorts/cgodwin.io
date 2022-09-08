FROM i386/ubuntu:bionic

ENV DEBIAN_FRONTEND noninteractive

RUN apt update && \
    apt --yes --no-install-recommends install \
        linux-image-lowlatency grub2 systemd \
        libterm-readline-perl-perl \
        gcc make libc6-dev \
        unzip bzip2 xz-utils \
        locales \
        strace file xterm vim apt-file \
        dhcpcd5 \
        wget curl \
        net-tools netcat \
        wmctrl xdotool ca-certificates initramfs-tools \
    && \
    echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen \
    locale-gen \
    chsh -s /bin/bash && \
    echo "root:root" | chpasswd && \
    mkdir -p /etc/systemd/system/serial-getty@ttyS0.service.d/ && \
    systemctl enable serial-getty@ttyS0.service && \
    rm /lib/systemd/system/getty.target.wants/getty-static.service && \
    rm -f /etc/issue && \
    systemctl disable systemd-timesyncd.service && \
    systemctl disable apt-daily.timer && \
    systemctl disable apt-daily-upgrade.timer && \
    systemctl disable dhcpcd.service && \
    echo "tmpfs /tmp tmpfs nodev,nosuid 0 0" >> /etc/fstab && \
    cd /root/ && \
    wget http://www.math.utah.edu/~mayer/linux/nbench-byte-2.2.3.tar.gz && \
    tar xfv nbench-byte-2.2.3.tar.gz && \
    rm nbench-byte-2.2.3.tar.gz && \
    mv nbench-byte-2.2.3 bench && \
    cd bench && \
    make

COPY getty-noclear.conf getty-override.conf /etc/systemd/system/getty@tty1.service.d/
COPY getty-autologin-serial.conf /etc/systemd/system/serial-getty@ttyS0.service.d/

COPY logind.conf /etc/systemd/logind.conf

#COPY xinitrc /root/.xinitrc
COPY networking.sh /root/

COPY boot-9p /etc/initramfs-tools/scripts/boot-9p

# this needs to be commented out in order to boot from hdd
RUN printf '%s\n' 9p 9pnet 9pnet_virtio virtio virtio_ring virtio_pci | tee -a /etc/initramfs-tools/modules && \
    echo 'BOOT=boot-9p' | tee -a /etc/initramfs-tools/initramfs.conf && \
    update-initramfs -u

RUN apt-get --yes clean && \
    rm -r /var/lib/apt/lists/* && \
    rm -r /usr/share/doc/* && \
    rm -r /usr/share/man/* && \
    rm -r /usr/share/locale/?? && \
    rm /var/log/*.log /var/log/lastlog /var/log/wtmp /var/log/apt/*.log /var/log/apt/*.xz

## cgodwin.io Additions

RUN update-ca-certificates

# # K0S
# COPY get.k0s.sh ./
# RUN chmod 755 get.k0s.sh;sh get.k0s.sh
# RUN k0s install controller --single

# K3S
RUN curl -sfL https://get.k3s.io | sh -

