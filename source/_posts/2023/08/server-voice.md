---
title: 在服务器没有声卡的情况下使远程桌面播放音频
tags: 
- 运维
categories: 
- 运维
index_img: /img/2023/8/11/serveryc/1.png
banner_img: /img/2023/8/11/serveryc/1.png
permalink: /articles/2023/server-voice.html
date: 2023-08-11 22:22:22
---

在进行远程桌面时通常听不到声音,下面我们来解决它：

版本限制:windows server2003及以上版本

windows xp及以上版本

按win+r--输入gpedit.msc--运行--打开本地组策略编辑器--计算机配置--管理模板--windows组件--远程桌面会话主机--设备和资源重定向--允许音频和视频播放重定向
[![1.png](/img/2023/8/11/serveryc/1.png)](/img/2023/8/11/serveryc/1.png)
[![2.png](/img/2023/8/11/serveryc/2.png)](/img/2023/8/11/serveryc/2.png)
接着打开控制面板--硬件--声音--管理音频设备
[![3.png](/img/2023/8/11/serveryc/3.png)](/img/2023/8/11/serveryc/3.png)
最后点击确认并重启服务器就好了。

~~什么情况会用:如果你租了个外国服务器想用来上墙外面的东西之类的,当然这是合法的,这里就不细说了。~~

~~在设置中还可以重定向录音,就是被控的使用控制端的麦克风,但不知道这有啥用,难道在外网开直播用？当然这就不知道是否合法了(只是我不知道,我懒得去找,我觉得应该不会有人干这种奇葩事)~~