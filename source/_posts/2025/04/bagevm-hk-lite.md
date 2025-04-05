---
title: Bagevm-HK-Lite 使用体验
tags:
- VPS使用体验
categories: 
- VPS使用体验
index_img: /img/2025/bagevm-hk-lite/Daily-network.webp
banner_img: /img/2025/bagevm-hk-lite/Daily-network.webp
permalink: /articles/2025/bagevm-hk-lite.html
date: 2025-04-05 15:30:47
---

## 配置

配置如下:

| 地区 | CPU | 内存 | 硬盘 | 宽带 | 流量 | IP | 价格 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| HK-Lite | AMD EPYC 7663 | 1GB | 10GB SSD | 1Gbps | 4TiB/月（双向） | v4*1 + v6*1| 2.5$/月|  

**优惠码**:  
月付优惠码: `1YearM7THT80`  
年付优惠码: `1YearM7LMT70`  

## 线路

| 运营商 | 去程 | 回程 |
| --- | ---| --- |
| China Telecom | AS4134 -> ntt(jp) -> ntt(hk) | ntt(hk) -> ntt(sg) -> AS4134 |
| China Unicom | AS4837 -> ntt(hk) | ntt(hk) -> ntt(jp) -> AS4837 |
| China Mobile | AS58453(hk) -> ntt(hk) | AS58453 |

移动直连确实爽

## 体验（山东移动）

由于这台机器属于移动快乐机，所以其他网络的用户还是别买了。  
我使用的是移动千兆家宽，每天的平均延迟在50-60ms:  
![延迟](/img/2025/bagevm-hk-lite/Daily-network.webp)

把小猫挂到路由器上后体验绝佳，从 Huggingface 下载模型最高可到 300Mbps+:  
![Huggingface](/img/2025/bagevm-hk-lite/hf-speed.webp)
