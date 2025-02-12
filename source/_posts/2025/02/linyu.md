---
title: 快速搭建一个轻量化的在线聊天系统-林语Mini搭建教程
tags:
- 教程
categories: 
- 教程
index_img: /img/2025/linyu/exported_image.png
banner_img: /img/2025/linyu/exported_image.png
permalink: /articles/2025/linyu.html
date: 2025-02-02 10:10:24
---
`林语Mini（Linyu-mini）` 是一款基于 `Vue 3` 和 `SpringBoot` 构建的高性能即时通讯`在线聊天系统` 。系统以`轻量化` 设计为核心，具备快速部署和便捷扩展的特点，适用于企业内部协作、团队沟通以及小型社交平台等多种场景。
![林语Mini](/img/2025/linyu/exported_image.png)

## 前端

由于林语Mini的前端构建后为静态文件，我们可以在本地构建后将文件上传到服务器上

1. 克隆仓库到本地

```shell
git clone https://github.com/linyu-im/linyu-mini-web.git
cd linyu-mini-web
```

2. 安装 `nodejs`
如果你已经安装了 `nodejs` ，可以跳过这一步
前往 [清华大学开源软件镜像站](https://mirror.tuna.tsinghua.edu.cn/nodejs-release/) 选择对应的安装包安装，我用的是 `v21.0.0`,没有出现兼容性问题
安装完成后执行 `node -v`来验证安装，如果出现以下输出，则证明已经安装成功：

```shell
PS D:\read\work\linyu-mini-web> node -v
v21.0.0
```

3. 安装依赖
在克隆下来的 linyu-mini-web 目录下执行

```shell
npm install
```

4. 修改服务地址
修改`.env` 文件内的地址信息，`VITE_HTTP_URL` 后端服务地址，`VITE_WS_URL` 后端服务websocket地址

```
VITE_HTTP_URL=http://127.0.0.1:9200
VITE_WS_URL=ws://127.0.0.1:9100
```

请按需修改这里的地址，比如可以反代到自己的域名
5. 构建

```shell
npm run build
```

然后将 `dist` 目录下的文件上传到你的网站根目录

## 数据库

创建一个 `mysql` 数据库，选择`utf8mb4`字符集

## 后端

1. 安装依赖
接下来的教程认为您使用linux系统

```
apt install openjdk-8-jdk maven
```

2. 克隆仓库

```
git clone https://github.com/linyu-im/linyu-mini-server.git
cd linyu-mini-server
```

3. 修改数据库信息
进入项目的 `src/main/resources`目录下，打开`application.yml`
参照注释进行修改：

```
#mysql配置
    driver-class-name: com.mysql.cj.jdbc.Driver
    #将下面这行中的 linyu 换成你的数据库名, 127.0.0.1 换成你的数据库地址
    url: jdbc:mysql://127.0.0.1:3306/linyu?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
    username: linyu #数据库用户名
    password: afeagfege #数据库密码
```

4. 运行后端

```
mvn spring-boot:run
```

等待一会后端启动，访问先前部署的前端，就可以使用了

5. 配置进程守护
使用 `Supervisor`,参照我的配置文件修改：

```
[program:linyu-server]
command                 = mvn spring-boot:run
directory               = /media/mei/mov/app/linyu/code/linyu-mini-server
autorestart             = true
startsecs               = 3
stdout_logfile          = /opt/1panel/tools/supervisord/log/linyu-server.out.log
stderr_logfile          = /opt/1panel/tools/supervisord/log/linyu-server.err.log
stdout_logfile_maxbytes = 2MB
stderr_logfile_maxbytes = 2MB
user                    = root
priority                = 999
numprocs                = 1
process_name            = %(program_name)s_%(process_num)02d
```
