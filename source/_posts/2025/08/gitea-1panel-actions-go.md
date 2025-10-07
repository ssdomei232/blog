---
title: 使用Gitea Actions+1Panel自动构建并部署Go项目
tags:
- 学习笔记
- linux
- Gitea
- 1Panel
- Go
categories: 
- Go
index_img: /img/2025/gitea-actions-1panel-go/actions.png
banner_img: /img/2025/gitea-actions-1panel-go/actions.png
permalink: /articles/2025/gitea-actions-1panel-go.html
date: 2025-08-27 15:38:45
---

Gitea 和 1Panel 都非常好用，Gitea 提供了可以自托管的 Actions 功能，1Panel 在最近的版本中提供了api功能，用这些功能可以很方便的将 Go 项目快速自动构建并部署上线(其他语言的项目也可以，不过会稍微复杂一些)

### 1. 为 Gitea 添加 runner

1. 在 Gitea 的`管理后台-Actions-Runners`中点击"创建Runner",复制注册令牌备用
![runner](/img/2025/gitea-actions-1panel-go/runner.png)

2. 选择一台服务器来安装 Runner,你可以直接在1Panel的应用商店安装act runner,也可以单独购买一台服务器来安装runner,这里推荐购买一台海外服务器，可以解决第三方库下载缓慢的问题  

在安装runner时，配置中的注册令牌是刚刚在gitea中获取到的令牌，运行器名称随便起一个就行，运行器标签可以参照 [Gitea 文档](https://docs.gitea.com/usage/actions/act-runner#labels)，一般使用默认的就行  

runner安装完成后在刚刚获取注册令牌的页面检查runner是否上线

### 2. 获取1Panel API令牌

在 1Panel 的面板设置中开启 API 接口，接口有效期推荐填写0,即不不验证有效期，ip白名单可以按需填写，然后将接口密钥复制备用
![1panel-api-key](/img/2025/gitea-actions-1panel-go/1panel-api-key.png)
然后将接口密钥设置为 Gitea 仓库的 Secret
![gitea-secret](/img/2025/gitea-actions-1panel-go/gitea-secret.png)
顺便把面板地址也配置为Secret:`PANEL_URL`(后面不带`/`,不加安全人口)，比如`https://1p.mmeiblog.cn:33333`

### 3. 编写 Actions

Gitea Actions 的语法与 Github Actions 的语法基本一样，只是有部分特性不被支持，Gitea Actions 也支持使用 Github 上的 Actions 仓库，语法与 Github Actions 一样  

创建`.gitea/workflows/release.yml`文件，这里我将 Secret 设置为构建时的环境变量来使用，Go版本可以自己设置,这里**把`APP_NAME`的值换成你的应用名称，这很重要**  

```yaml
name: Go Build and Release

on:
  push

jobs:
  build-and-release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Go
        uses: actions/setup-go@v3
        with:
          go-version: "1.23"

      - name: Get dependencies
        run: go mod tidy

      - name: Build project
        run: go build -o main
      
      - name: Update Server by 1panel
        env:
            PANEL_API_KEY: ${{ secrets.PANEL_API_KEY }}
            PANEL_URL: ${{ secrets.PANEL_URL }}
            APP_NAME: "your-app-name"
        run: chmod +x script/update.sh && ./script/update.sh
```

{% note warning %}
**警告:**
如果你使用gitea runner的docker镜像来部署runner，请把构架命令改为:

```bash
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main
```

因为在alpine上构建时会在 ELF 头上带上`musl`的运行库，这会导致构建出来的程序无法跑在没有安装`musl`运行库的系统中(即使你在编译时使用了`CGO_ENABLE=0`)
{% endnote %}

### 4. 创建运行环境

先创建一个应用目录:`mkdir /opt/apps/your-app-name`,应用名称自己替换为上一步中的`APP_NAME`

然后在 1Panel 的`网站-运行环境-Go`中创建运行环境(最好加上时区的环境变量),启动命令为`chmod +x main && ./main`
![go-runtime](/img/2025/gitea-actions-1panel-go/go-runtime.png)

然后点击F12开发者工具，点击网络，然后点一下面板中应用的"重启"，可以看到开发者工具中出现了一个名称为`operate`的请求，在负载中找到`ID`，记下备用
![1p-request](/img/2025/gitea-actions-1panel-go/1p-request.png)

### 编写上传脚本

创建脚本:

```bash
# 先切换到项目根目录下
mkdir script
cd script && touch update.sh
```

这里我在actions中运行一个bash脚本，你也可以把他塞进actions中，不过那样比较丑，然后按照注释**替换id为上一步中拿到的ID**

```bash
#!/bin/bash

# 把这里的ID替换为上一步中拿到的ID
id=6

# generate 1panel token
clientToken=$PANEL_API_KEY
timestamp=$(date +%s)
input="1panel$clientToken$timestamp"
token=$(echo -n "$input" | md5sum | awk '{print $1}')

# delete file
curl --location --request POST "$PANEL_URL/api/v2/files/del?operateNode=undefined" \
-H "1Panel-Token: $token" \
-H "1Panel-Timestamp: $timestamp" \
--header 'Content-Type: application/json' \
--data-raw '{"path":"/opt/apps/'"$APP_NAME"'/main","isDir":false,"forceDelete":true}'

# updaload file
curl --location --request POST "$PANEL_URL/api/v2/files/upload" \
-H "1Panel-Token: $token" \
-H "1Panel-Timestamp: $timestamp" \
--form 'path=/opt/apps/'"$APP_NAME" \
--form 'file=@main'

# restart runtime 
curl --location --request POST "$PANEL_URL/api/v2/runtimes/operate" \
-H "1Panel-Token: $token" \
-H "1Panel-Timestamp: $timestamp" \
--header 'Content-Type: application/json' \
--data-raw '{
  "ID": '"$id"',
  "operate": "restart"
}'
```

这样在每次提交时actions就会自动构建并部署应用到你的服务器上
![actions](/img/2025/gitea-actions-1panel-go/actions.png)

在最后吐槽一下1panel的api文档，参数就写一半，剩下一半参数自己猜
