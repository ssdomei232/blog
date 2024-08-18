---
title: 在 Linux 上使用 Docker-OSX 创建 MacOS 虚拟机
tags: 
- linux
- 开源
categories: 
- Linux
index_img: /img/2024/
banner_img: /img/2024/
permalink: /articles/2024/docker-osx/index.html
date: 2024-08-11 10:48:59
---
## 准备工作
1. 检查 KVM 支持
```bash
ls /dev/kvm
```
如果没有任何内容，表示系统不支持KVM，如果支持，它会输出这样的内容:
```bash
root@mei-pc:/home/mei# ls /dev/kvm
/dev/kvm
root@mei-pc:/home/mei#
```
1. 安装 Docker
建议使用 [LinuxMirrors](https://linuxmirrors.cn/other/) 提供的脚本来安装并配置镜像加速
1. 创建系统盘
使用 qemu-img 创建系统盘
```bash
apt install qemu-utils
qemu-img create -f qcow2 -o size=120G /<你希望使用的系统盘目录>/<你的系统磁盘名称>.img
```

## 启动 Docker 容器
1. 下载x11-apps，用来显示图形界（Docker-OSX要求的）
```bash
apt install x11-apps
```
1. 启动
```bash
docker run -it \
    --device /dev/kvm \
    -p 50922:10022 \
    -p 50599:5999 \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    # 将 /data/apps/macos.img 替换为上面提到的 /<你希望使用的系统盘目录>/<你的系统磁盘名称>.img
    -v "/data/apps/macos.img":/image.img \
    # -v "/home/dockerMac/external.img":/exteralDisk.img \ 这里可以按需加入数据盘
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    -e "IMAGE_PATH=/image.img" \
    -e MASTER_PLIST_URL='https://raw.githubusercontent.com/sickcodes/osx-serial-generator/master/config-custom.plist' \
    -e EXTRA='-device ide-hd,bus=sata.5,drive=DISK-TWO -drive id=DISK-TWO,if=none,file=/exteralDisk.img,format=qcow2' \
    -e EXTRA="-display none -vnc 0.0.0.0:99,password=on" \
    sickcodes/docker-osx:latest
```
### 参考资料
[Docker-OSX](https://github.com/sickcodes/Docker-OSX)
[体验Windows11上安装Docker-OSX系统](https://www.ruterfu.com/2021/11/24/20211124-dockerosx-windows11/)