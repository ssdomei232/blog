---
title: 我的世界整合包通用开服指南
tags: 
- Minecraft
- 我的世界
- 我的世界服务器
- 我的世界整合包
categories: 
- 我的世界
permalink: /articles/2026/minecraft-server-pack.html
date: 2026-10-05 20:41:55
---

## 获取资源

在之前，获取整合包的服务端是相对简单的操作，只需要在curseforge下载就行。  
但由于夸克网盘等网盘的推介奖励和大量面板服的出现，各路整合包的服务端分发变成一片"勃勃生机，万物竞发"的乱象。
~~当然，赚钱嘛，不寒掺~~

### 夸克网盘

夸克网盘存在一个广为人知的小bug，只需要在客户端选择把文件"发送到手机"就可以获得相对快读的下载速度，如果想要进一步突破，可以使用一些第三方客户端
![夸克网盘](/img/2026/minecraft-server-pack/1.png)

### 百度网盘

百度网盘暂时没有特别好的方案，可以选择白嫖一下亲友的VIP

### curseforge

部分整合包会将服务端上传到curseforge上
首先，进入整合包的curseforge页面，选择一个版本并展开详情进入"**View Full Page**"
![curseforge](/img/2026/minecraft-server-pack/2.png)
进入后选择下方**Additional Files**下载服务端文件
![Additional Files](/img/2026/minecraft-server-pack/3.png)

## 安装整合包

在获得服务端文件后，由于各路整合包作者的打包方式各不相同，我们还需要对服务端文件进行一些必要的检查和修改。

### 已完成 Forge 安装

对于高版本 Forge 整合包，比较简单的方法是检查整合包服务端中是否含有`run.sh`和`run.bat`文件;
比较通用的方法是检查整合包服务端中是否含有 `libraries`文件夹，如果满足以上条件，则可以说明整合包作者已经完成了forge的安装，我们只需要按照自己的需求对启动参数进行微调(也可以选择不调整)后上传到服务器中即可。

接着执行`run.sh`或`run.bat`即可完成开服；对于低版本的forge，可能没有这两个文件，只有`start.sh`和`start.bat`，执行这个文件即可。
![forge](/img/2026/minecraft-server-pack/4.png)

### 未完成 Forge 安装

部分整合包不会提前完成 Forge 的安装，而是内置一个 Forgeinstaller ，对于这种情况，我们需要一个良好的网络环境(可以流畅的访问海外网络，因为 forge 的镜像仓库位于海外)，接着执行 `java -jar forge-installer.jar --installServer`即可完成安装(将`forge-installer.jar`替换为实际的forge installer文件名)
![Forge](/img/2026/minecraft-server-pack/5.png)

如果你的网络环境不好，在安装过程中可能会出现报错，只需要多试几次直至成功即可

安装成功的标志通常是命令行提示`The server installed successfully`或`You can delete this installer file now if you wish`之类的日志，并且文件目录中出现了`run.sh`、`run.bat`以及`libraries`目录(低版本没有`run.sh`和`run.bat`)。
![安装](/img/2026/minecraft-server-pack/6.png)
![安装成功](/img/2026/minecraft-server-pack/7.png)

完成安装后，就可以选择将完成安装的服务端打包上传至服务器并执行`run.sh`或`run.bat`完成开服

## 修改配置文件

在完成服务端安装后，需要修改一些配置文件来获得更好的游玩体验,forge服务端的大部分配置位于 `server.properties`中

1. `allow-flight`: 此配置控制是否允许玩家飞行，如果你游玩的整合包中玩家可以飞行，需要调整为`true`来避免服务端错误的将玩家踢出
2. `online-mode`:改配置控制是否开启正版验证，开启后只有正版账号可以登录，此外，如果在游玩过程中更改此配置，会导致玩家背包物品丢失，可以手动在`world/playerdata/`目录下完成关联，不过比较麻烦

## 特殊情况处理

### 整合包没有提供服务端

如果整合包没有提供服务端，我们可能需要自行制作，不过在制作之前，可以现在网上搜索有没有人已经做好了。

如果没有人进行过制作，我们可以使用开源软件 [**ServerPackCreator**](https://github.com/Griefed/ServerPackCreator) 来进行服务端制作，不过这个软件我也没怎么用过，就不详细展开了
![ServerPackCreator](/img/2026/minecraft-server-pack/8.png)

### 整合包只有`.bat`脚本

一些整合包作者可能处于某些奇思妙想，删除了`run.sh`，此时只需要自己再编写一个`run.sh`即可
`run.sh`文件的内容通常形似下面的例子:

```bash
#!/usr/bin/env sh
# Forge requires a configured set of both JVM and program arguments.
# Add custom JVM arguments to the user_jvm_args.txt
# Add custom program arguments {such as nogui} to this file in the next line before the "$@" or
#  pass them to this script directly
java @user_jvm_args.txt @libraries/net/minecraftforge/forge/1.20.1-47.3.33/unix_args.txt "$@"
```

其大致意思是你可以在 `user_jvm_args.txt` 添加定制 jvm 参数，如果你不会这部分的调优，可以选择不做，也可以选择交给 AI 来定制，在添加`run.sh`文件时，只需要将`@libraries/net/minecraftforge/forge/1.20.1-47.3.33/unix_args.txt`换成文件目录中实际的文件位置即可

## 最后

最后，我们在 mcs.mmeiblog.cn 提供了一些打包好的整合包文件，如果你使用MCSM面板，还可以使用网站提供的一键开服功能，如果你想要一起van整合包，可以加入我们的QQ群:)
![qr](/img/2026/minecraft-server-pack/9.jpg)
