---
title: 雨云宿迁云服务器试用体验
tags: 
- 雨云
- VPS使用体验
categories: 
- VPS使用体验
index_img: /img/2023/8/11/rainsq/1.png
banner_img: /img/2023/8/11/rainsq/1.png
permalink: /articles/2023/rainyunsq.html
date: 2023-08-11 22:27:34
---
我本打算趁着暑假买台云服务器开mc服务器，但由于没有试用且直接完结导致白废20块钱。
在此提醒大家，买用于开mc服务器的云服务器前能试用一定要试用！不然鬼知道它性能够不够用！

服务器配置如下:

cpu:2v gold6133@2.5Ghz      ram:2GiB

硬盘:20GiB        带宽:上行15Mbps,下行50Mbps

因为我打算开mc服务器，所以买的使NAT模式的，可以开10个端口，一个月25，最近雨云5周年，打折要20。如果要公网ip的话一个月要175，雨云宿迁的ip很贵，如果有公网ip的需求建议买雨云的湖北十堰机器

十堰ip一个月只要35(ip价格，不包含服务器价格),还带100G防御。

下面是脚本测试结果:

![1.png](/img/2023/8/11/rainsq/1.png)可以看到geekbench v5单核562，多核1051.

测速结果:![2.png](/img/2023/8/11/rainsq/2.png)
由于测速是在高峰期,而且测速有误差，已经算是符合标称了

流媒体测试：![3.png](/img/2023/8/11/rainsq/3.png)
既然是用来开服务器，那肯定要来实测一下能开什么服，不过雨云要是单纯想开mc服务器可以去买雨云的面板服，可以白嫖还有独家按天计费，非常适合学生周末玩的需求。

测试使用mohist服务端

1.18.2无mod:内存不够,无法启动，要是想玩1.18.2还是买4G内存比较好，而且gold6133也太不适合开服1.18.2 4G内存纯净服应该可以勉强跑起来,要是想加mod还是买更好cpu的面板服把。

1.12.2安装5个mod:无法稳定运行,经常会崩溃。mod列表:
![4.png](/img/2023/8/11/rainsq/4.png)
1.12.2(paper):正常启动，3*3*3TNT爆炸无波动。

生电测试：两台刷铁轨机工作十分钟不收集未见卡顿，tps仍维持在20
![5.png](/img/2023/8/11/rainsq/5.png)

核心下载:d.mmeiblog.cn