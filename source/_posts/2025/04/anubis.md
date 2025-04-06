---
title: 使用 Anubis 抵挡疯狂的 LLM bot
tags:
- 工具
- AI
- 人机验证
categories: 
- 工具
index_img: /img/2025/anubis/index.webp
banner_img: /img/2025/anubis/index.webp
permalink: /articles/2025/anubis.html
date: 2025-04-06 09:27:20
---
前段时间，由于上学一直没看服务器负载，放假了回来一看，八核的 Git 服务器被各路 LLM bot 干的天天满载(甚至还有OpenAI bot)，一天能跑 100G+ 的流量  
当时没有什么解决方案，只能粗暴的在 WAF 上部署了拦截 UA 中所有包含 `bot` 字段请求的规则:  
![waf-1](/img/2025/anubis/waf-1.webp)
![waf-2](/img/2025/anubis/waf-2.webp)

最近看到了[FOSS infrastructure is under attack by AI companies](https://thelibre.news/foss-infrastructure-is-under-attack-by-ai-companies/) 这篇文章，找到了解决方案

## Anubis

[Anubis](https://github.com/TecharoHQ/anubis) 是一个采用工作量证明的反向代理，这个程序会在用户的浏览器上，执行一段 JS 程序，进行大量的数学计算。直到计算答案正确，才可以访问目标网站。  
关于其算法的人话介绍可以看 [科技爱好者周刊（第 343 期）：如何阻止 AI 爬虫](https://www.ruanyifeng.com/blog/2025/03/weekly-issue-343.html)

### 使用 Docker compose 部署

使用以下docker-compose.yml:

```yaml
services:
  anubis-nginx:
    image: ghcr.io/techarohq/anubis:latest
    environment:
      BIND: ":8080"
      COOKIE_DOMAIN: "example.com"
      DIFFICULTY: "5"
      METRICS_BIND: ":9090"
      SERVE_ROBOTS_TXT: "true"
      TARGET: "http://localhost"
    ports:
      - 8080:8080
      - 9090:9090
    volumes:
      - "./botPolicy.json:/data/cfg/botPolicy.json:ro"
  nginx:
    image: nginx
    volumes:
      - "./www:/usr/share/nginx/html"
```

常用环境变量说明:

|环境变量 | 说明|
|--- | ---|
|BIND | Anubis 监听的网络地址，也就是提供服务的端口，示例: ":8080"|
|COOKIE_DOMAIN | Anubis 挑战通行证 cookie 应设置的域名。这应该设置为从您的注册商那里购买的域名（例如：如果您的 webapp 运行在 `anubis.techaro.lol` 上，则为 `techaro.lol` ）|
|DIFFICULTY | 难度，结果最高位中连续的0的数量，越大需要计算的时间越长|
|METRICS_BIND | Anubis 提供 Prometheus 指标的端口|
|SERVE_ROBOTS_TXT | 如果设置 `true` ，Anubis 将提供默认的 `robots.txt` 文件，该文件通过名称禁止所有已知的 AI 爬虫，然后额外禁止每个爬虫。如果事实和情况使得难以更改底层服务以提供此类 `robots.txt` 文件，则此操作很有用|
|TARGET | Anubis 应将有效请求转发到的服务 URL，也就是后端服务的地址，示例: "<http://127.0.0.1:3000>"|

有关更多的环境变量说明请阅读 [Setting up Anubis | Anubis](https://anubis.techaro.lol/docs/admin/installation/)，上面罗列的只是必要的环境变量

### Prometheus 指标

Anubis 提供了 Prometheus 指标来让我们查看系统的运行状态等信息，访问`http://<你的服务器IP>:<你在环境变量中设置的METRICS_BIND值>/metrics`即可获取 Prometheus 指标  
其中:

| 指标 | 说明 |
| --- | --- |
| anubis_challenges_issued | Anubis 发出的质询数量 |
| anubis_challenges_validated | 通过质询的请求数量 |
| anubis_failed_validations | 未通过质询的请求数量 |

### 禁用 DNSBL 检查

Anubis 默认会在连接时对访问者 ip 进行 DNSBL 检查，但是很多 ipv6 地址不在 Anubis 使用的 DNSBL 的数据库中，不过在 [#184](https://github.com/TecharoHQ/anubis/issues/184) 中已经有人提出了删除 DNSBL 检查功能的请求  
**禁用方法：**
向安装目录下的  `botPolicy.json` 配置文件中写入(如果没有请创建这个文件):

```json
[
  {
    "dnsbl": false
  }
]
```

## 参考资料

[Anubis](https://anubis.techaro.lol/docs/)  
[Anubis Update: February 2025](https://xeiaso.net/blog/2025/anubis-update-m02/)
