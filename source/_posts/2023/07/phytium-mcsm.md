---
title: 使用国产飞腾D2000平台搭建mc服务器
tags: 
- mc服务器
- mcsm
- linux
- 国产
categories: 
- Linux
index_img: /img/2023/7/20/ftmc/00012-2560986177.webp
banner_img: /img/2023/7/20/ftmc/00012-2560986177.webp
permalink: /articles/2023/phytium-mcsm.html
date: 2023-07-20 22:13:12
---
{% note danger %}
此教程已经过时,MCSM已经推出 10 版本
{% endnote %}
在今年的3月份，我搞到了一台长城制造的搭载国产arm架构cpu(飞腾D2000/8）的高度国产化主机世恒TD120A2.

具体配置:
cpu:D2000/8 八核处理器，最大主频2.3Ghz
内存:紫光2666-8G*1
显卡:JM7200,2G显存
硬盘:256GSSD

系统建议:此型号电脑建议安装国产arm架构操作系统，其他操纵系统存在部分驱动问题，经测试，乌班图无法安装推荐使用银河麒麟或统信uos专业版arm架构

uos:软件生态较强，但不购买只能试用3个月，重装无效，试用期过后几乎什么都不能干。
下载官网:[资源中心 | 统信UOS生态社区 (chinauos.com)](https://www.chinauos.com/resource/download-professional)
银河麒麟:原带系统，驱动适配较好，但生态拉跨，而且设置麻烦，但资源占用似乎略少于uos。推荐使用此系统。

下面的教程以银河麒麟为例：
# 1. 修改部分设置

在设置-网络-桌面共享中打开共享的两项
![1.png](/img/2023/7/20/ftmc/1.png)
现在我们就可以用远程桌面链接设备了，步骤和连接windows系统一样。
接着打开设置-安全与更新-安全中心-网络保护
如图操作
![2.png](/img/2023/7/20/ftmc/2.png)
银河麒麟的防火墙有bug，关闭它，如果重启后出现无法访问的情况，打开再关闭一下防火墙大概率就好了。

接着打开设置-安全与更新-安全中心-应用控制与保护，如图操作，如果不做，你会被提示烦死并且无法正常安装软件也**无法正常ssh远程**
![3.png](/img/2023/7/20/ftmc/3.png)
接下来我们就可以正常远程控制服务器并进行下一步了
# 2.安装java

# 3.安装mcsm

# 4.安装服务端

以上四个步骤请看我的这篇文章--[使用mcsm面板搭建我的世界服务器](https://mmeiblog.cn/2023/08/19/202308191605/)
如果需要端口控制功能可以安装[1Panel](https://1panel.cn/)，在安全中进行管理
# 5.内网穿透

大部分人都没有公网ip，而这就需要[内网穿透](https://baike.baidu.com/item/%E5%86%85%E7%BD%91%E7%A9%BF%E9%80%8F/8597835?fr=ge_ala)了

这里以使用[樱花frp](https://www.natfrp.com/)为例，樱花frp有大量免费额度，大量低延迟节点，也可以选择充值vip来获得较好体验。

这里看樱花frp的[帮助文档](https://doc.natfrp.com/app/mc.html)即可。

[启动器下载](https://www.natfrp.com/tunnel/download)选择linux-arm64(aarch64)

执行启动器时选择在终端运行