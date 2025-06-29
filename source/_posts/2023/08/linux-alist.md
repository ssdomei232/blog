---
title: linux安装Openlist,反向代理教程
tags: 
- linux
categories: 
- Linux
index_img: /img/2023/8/14/linalist/t.png
banner_img: /img/2023/8/14/linalist/t.png
permalink: /articles/2023/linux-alist.html
date: 2023-08-14 08:13:33
---

由于本文具有时效性，在此注明最后编辑日期，本文会不定期更新，但仅限我的blog，其它地方太麻烦了。 **最后编辑于：** 2025-06-29

## 建议

无论您是否需要此教程，都建议您向您的alist中注入以下代码，以规避不必要的责任

粘贴至设置-全局-自定义内容即可

```javascript
<script src="https://cdn.bootcss.com/sweetalert/2.1.0/sweetalert.min.js"></script>
<script>swal('注意','本站为私人云盘网站，如果您要下载内部文件，请注意：所有资源仅供学习交流使用，请在下载后24小时内删除','success'); </script>
```

## 安装

{% note warning %}
警告: Alist　已经被国内商业灰产公司收购,请不要继续使用它,而是使用由开源社区维护的 [Openlist](https://oplist.org/)
{% endnote %}

参照 [Openlist 的安装文档](https://oplist.org/zh/guide/install/script.html) 安装

## 反向代理

反向代理可以将5244端口监听至80/443端口，以此来部署SSL证书和不带端口访问。

## 本地代理

### 宝塔面板

[宝塔](https://www.bt.cn/?invite_code=M192aGJreGU=)

**如果您一开始就使用面板安装，请跳过第一步。**

1. 在宝塔的网站界面点击"添加站点"将php版本设置为纯静态,并将example.com替换为你的自定义域名
![1.png](/img/2023/8/14/linalist/1.png)
**2. 点击设置-配置文件，删除图中框起来的几行，记得点保存**
![2.png](/img/2023/8/14/linalist/2.png)
![3.png](/img/2023/8/14/linalist/3.png)
3.接着在配置文件中随便找个地方粘贴以下配置：**（记得点保存）**

```conf
  location / {
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header Host $http_host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header Range $http_range;
 proxy_set_header If-Range $http_if_range;
  proxy_redirect off;
  proxy_pass http://127.0.0.1:5244;
  # the max size of file to upload
  client_max_body_size 20000m;
}
```

4.添加A记录到你反向代理服务器的ip地址，使用内网穿透就A解析到内网穿透服务器ip或CNAME到内网穿透服务器域名

#### 部署SSL

宝塔有一键部署，申请之后记得点保存，也可以使用阿里云或腾讯云的免费证书，用着更舒服
![5.png](/img/2023/8/14/linalist/5.png)

### 1panel

1.点击网站--创建网站--反向代理，在代理地址处填写127.0.0.1，主域名替换为你的自定义域名
![6.png](/img/2023/8/14/linalist/6.png)
2.在反向代理网站点击配置--配置文件，在如图位置粘贴以下配置，注意不要放在最后面的那个右花括号后面

```conf
location / {
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header Host $http_host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header Range $http_range;
 proxy_set_header If-Range $http_if_range;
  proxy_redirect off;
  proxy_pass http://127.0.0.1:5244;
  # the max size of file to upload
  client_max_body_size 20000m;
}

```

![7.png](/img/2023/8/14/linalist/7.png)

#### 部署SSL

先在证书页面申请证书，然后如图操作

![8.png](/img/2023/8/14/linalist/8.png)

#### **异地代理**

只需要把上文需要添加添加的配置文件改为以下配置即可，把第9行的YOURIP改成你alist服务器的公网ip地址1panel记得把代理地址也改成你服务器的公网ip地址。

```conf
 # 把第9行的YOURIP改成你alist服务器的公网ip地址
location / {
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header Host $http_host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header Range $http_range;
 proxy_set_header If-Range $http_if_range;
  proxy_redirect off;
  proxy_pass http://YOURIP:5244;
  # the max size of file to upload
  client_max_body_size 20000m;
}
```
