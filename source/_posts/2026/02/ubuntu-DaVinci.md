---
title: 在 Ubuntu 22.04+ 上安装达芬奇
tags:
- 达芬奇
- linux
- ubuntu
- DaVinci Resolve
categories: 
- Linux
permalink: /articles/2026/ubuntu-DaVinci.html
date: 2026-02-01 19:52:19
---

由于 DaVinci Resolve 官方标注的 linux 支持仅到 ubuntu 22.04 LTS，所以 DaVinci Resolve 对高版本linux的支持仍存在一些小问题，下面让我们来解决这些问题

## 1. 安装必要的包

首先，我们需要安装一些必要的包

```shell
sudo apt install -y build-essential libssl-dev libfuse2 libapr1 libaprutil1 \
libgstreamer1.0-0 libgstreamer-plugins-base1.0-0 libfontconfig1 libglib2.0-0 \
libsm6 libxi6 libxrender1 libxrandr2 libxcursor1 libxinerama1 libcurl4
```

同时我们还需要解决 libssl1.1 的问题，在新版 Ubuntu 中，默认安装的是 libssl3

```shell
## 这个链接会变，如果404就去上面找到正确的 deb 下载
wget https://mirror.nju.edu.cn/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1-1ubuntu2.1~18.04.23_amd64.deb

sudo dpkg -i libssl1.1*.deb
```

## 2. 安装 NVIDIA 驱动

尽管 NVIDIA 官方的linux闭源驱动饱受诟病(*So, Nvidia Fuck you*)，但为了更好的性能，我们还是需要安装这玩意

```shell
# 添加 NVIDIA 驱动 PPA
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update
 
# 安装最新稳定驱动（如 570 版本）
sudo apt install -y nvidia-driver-570 nvidia-settings
sudo reboot  # 重启生效

# 检查安装
nvidia-smi
```

如果输出了类似下面的信息，就代表你成功安装了nvidia官方闭源驱动(不过新版ubuntu如果你在一开始装系统的时候选择了对应选项的话貌似会自动帮你装)

```shell
mei@mei-SuperPC:~/work/blog$ nvidia-smi
Sun Feb  1 19:36:33 2026       
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 570.195.03             Driver Version: 570.195.03     CUDA Version: 12.8     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA RTX A4000               Off |   00000000:01:00.0  On |                  Off |
| 41%   50C    P5             24W /  140W |    6867MiB /  16376MiB |     38%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
                                                                                         
+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI              PID   Type   Process name                        GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|    0   N/A  N/A            7264      G   /usr/lib/xorg/Xorg                      521MiB |
|    0   N/A  N/A            7544      C   /usr/bin/python3                       1386MiB |
|    0   N/A  N/A            8273      G   /usr/bin/gnome-shell                    435MiB |
|    0   N/A  N/A            8802      G   /opt/freedownloadmanager/fdm             19MiB |
|    0   N/A  N/A            9215      G   ...rack-uuid=3190708988185955192        231MiB |
|    0   N/A  N/A            9275      G   /opt/QQ/qq                               76MiB |
|    0   N/A  N/A           12023      G   ...rack-uuid=3190708988185955192        182MiB |
|    0   N/A  N/A           13296      G   /usr/share/code/code                     77MiB |
|    0   N/A  N/A           24690      G   /usr/bin/nautilus                        22MiB |
|    0   N/A  N/A           43944      G   ...AIAAAAAAAAAA== --shared-files         29MiB |
|    0   N/A  N/A           51015      G   missioncenter                            39MiB |
|    0   N/A  N/A          322496    C+G   /opt/resolve/bin/resolve               3737MiB |
+-----------------------------------------------------------------------------------------+
```

## 3. 下载并安装 Resolve

访问 [支持中心 | Blackmagic Design](https://www.blackmagicdesign.com/cn/support/family/davinci-resolve-and-fusion)，下载最新版的 DaVinci Resolve 或者 DaVinci Resolve Studio(如果你购买了许可证的话)

在下载了官方的 `.run` 安装文件后，我们需要先解决一点达芬奇与新版系统的小冲突，下面是我在 [ask Ubuntu](https://askubuntu.com/questions/1530842/how-to-install-davinci-resolve-on-ubuntu-24-04) 上找到的方案:

1. 绕过包检查并安装

```shell
# 赋予执行权限
chmod +x ./DaVinci_Resolve_*.Linux.run

# 临时跳过依赖检查（仅本次运行）
sudo SKIP_PACKAGE_CHECK=1 ./DaVinci_Resolve_*.Linux.run
```

2. 修复符号链接冲突

DaVinci Resolve 自带旧版 GTK/GLib 库，与 Ubuntu 的新版本冲突，需手动修复：

```shell
# 修复 g_string_free_and_steal 错误：
sudo cp /usr/lib/x86_64-linux-gnu/libglib-2.0.so.0 /opt/resolve/libs/

# 修复 g_task_set_static_name 错误：
cd /opt/resolve/libs
sudo mkdir -p not_used
sudo mv libgio*.so* not_used/      # 移除冲突的 gio 库
sudo mv libgmodule*.so* not_used/  # 移除冲突的 gmodule 库
```

在完成这些操作之后，你就可以开始正常的使用 DaVinci Resolve 了

## 参考资料

[DaVinci Resolve 在 Linux 上的完整指南：安装、配置与最佳实践](https://geek-blogs.com/blog/davinci-resolve-on-linux/)  
[How to install DaVinci Resolve on Ubuntu 24.04](https://askubuntu.com/questions/1530842/how-to-install-davinci-resolve-on-ubuntu-24-04)
