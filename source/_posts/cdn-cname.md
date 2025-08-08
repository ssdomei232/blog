---
title: 各厂商CDN的CNAME域名及介绍
tags:
- 工具
- 分享
categories: 
- 工具
permalink: /articles/2024/cdn-cname/index.html
date: 2024-06-30 15:30:47
---

{% note warning %}
**协议声明**  
经历多次 AI 洗稿后，此文章许可协议改为 [CC-BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans)
{% endnote %}

{% note warning %}
本文章不提供选购建议，我也没用过，我也不知道哪个好用，厂商合规程度不代表服务质量
{% endnote %}

## 速查表格

如果你不想听我瞎叭叭,可以直接使用速查表格,如果你想了解一些详情,可以往下翻翻

| 厂商 | CNAME域名 | 地址 | ICP备案情况 |　公安备案情况　| ICP/ISP/CDN证情况 |
| --- | --- | --- | --- | --- | --- |
| 白山云 | qingcdn.com </br> bsclink.cn </br> trpcdn.net </br> bsgslb.com | baishan.com | 有 | 有 | A2.B1-20160192 |
| 网宿   | wsdvs.com </br> wsglb0.com </br> wscdns.com　</br> cdn30.com | wangsucloud.com | 有 | 有 | A2.B1-20050405 </br> 沪B2-20030144 |
| 滨纷云 | dogecast.com | bitiful.com | 有 | 有 | 无 |
| 蓝汛   | ccgslb.com.cn | edgenext.com | 有 | 有 | |
| 帝联   | fastcdn.com | dnion.com | 有 | 有 | B1-20100055 |
| 阿里云 | kunlun*.com(国内加速) </br> cdngslb.com(全球加速) </br> inittt.com(ESA) </br> init**.com(ESA全球加速) </br> aliyunddos10**.com(DDOS防御) | aliyun.com | 有 | 有 | 有 |
| 腾讯云 | dnsv1.com </br> tc.cdntip.com </br> spcdntip.com | cloud.tencent.com | 有 | 有 | 有 |
| 百度云 | bdydns.com </br> jomodns.com | cloud.baidu.com | 有 | 有 | 有 |
| 七牛云 | qiniudns.com | qiniu.com | 有 | 有 | B1.B2-20160552 |
| 又拍云 | aicdn.com | upyun.com | 有 | 有 | B1-20212420 </br> 浙B2-20220438 |
| 云端智度 | spdydns.com | isurecloud.net | 有 | 有 | B1-20161570 </br> 京B2-20220459 |
| 网易云 | 163jiasu.com | sf.163.com | 有 | 有 | 粤B2-20090191 </br> B1.B2-20090058 |
| 360云 | 360cdn.cn </br> qihucdn.com | zyun.360.cn | 有 | 有 | 有 |
| 亚马逊云 | cloudfront.net | aws.amazon.com | 无 | 无 | 无 |
| Microsoft Azure | mschcdn.com | azure.microsoft.com | 有 | 有 | 无 |
| verycdn | verycdn.net | api.verycdn.cn | 有 | 有 | 苏B2-20120140 </br> A2.B1-20150199 |
| 金山云 | ksyuncdn.com </br> ks-cdn1.com </br> ks-cdn.com | ksyun.com | 有 | 有 | A2.B1-20140153 </br> 京ICP证120829号 </br> 京B2-20180585|
| 华为云 | cdnhwc2.com </br> cdnhwcggk22.com </br> cdnhwcaip122.cn | huaweicloud.com | 有 | 有 | B1.B2-20200593 </br> 黔D3-20230001 |
| 失控的防御系统/日出CDN | cnmnmsl.top | scdn.io | 有 | 有 | B1-20243664 |
| CNMCDN | svipcdn.cn | cnmcdn.cn | 有 | 有 | B1-20231488 |
| 星极世纪 | dns-waf.waf.pro | waf.pro | 有 | 有 | B1-20243738 </br> 川B2-20250065 |
| 明赋云 | mingfucdn.com | mingfucloud.com | 有 | 有 | B1-20184249 </br> 陕B2-20240342 |
| 括彩云 | kuocaidns.com | kuocaicdn.com | 有 | 有 | 沪B2-20220232 |
| 京东云星盾 | cloud-scdn.com | jdcloud.com | 有 | 有 | 有 |
| 星域CDN | PCDN | xycloud.com | 有 | 有 | B1-20160023 |
| 多吉云 | dogedns.com | dogecloud.com | 有 | 有 | 湘B2-20230142 </br> B1-20231256 |
| Edge one(中国站) | dnse1.com(全球) </br> dnse2.com(全球) </br> dnse5.com(全球不含大陆) | cloud.tencent.com | 有 | 有 | 有 |
| Edge one(国际站) | dnse3.com(全球不含大陆) </br> dnsoe2.com(pages服务-全球) </br> dnsoe3.com(pages服务-全球不含大陆)| edgeone.ai | 无 | 无 | 无 |
| 雨云 | raincdn.cn | rainyun.com | 有 | 有 | B1-20231485 |
| Cloudflare CN | cf-ns.com | | | | |
| LEDCDN | qiucname.tech | cdn.ledcdn.com | 无 | 无 | 无 |
| 亿速云 | kunlun*.com | yisu.com | 有 | 有 | B1-20181529 |
| 天翼云 | ctdns.cn | ctyun.cn | 有 | 有 | 有 |
| 知道创宇 | jiashule.com | yunaq.com | 有 | 有 | B1-20210729 </br> B2-20200545 |
| 方能CDN | fn01.vip | funnull.buzz | 无 | 无 | 无 |
| Greypanel | greycdn.net | greypanel.com | 无 | 无 | 无 |
| 优速盾 | dun.kim | cdnb.net | 有 | 有 | B1-20213618 |
| FreeCDN | freecdn.pw | freecdn.pw | 无 | 无 | 无 |
| 级级盾 | 1idc.cc | 7gd.cn | 有 | 有 | B1-20222867 |
| 速御安全 | tyudns.com | tyucdn.com | 有 | 无 | 无 |
| 语鹿云盾CDN | cdnv8.cn | lucdn.cn | 有 | 无 | 沪B2-20250375 </br> 沪B2-20250375 |
| 稳坚盾 | gn.gtm-cname.cn | wjdun.cn | 有 | 有 | B1-20201536 |
| 云盾 | hwwsdns.cn | yundun.com | 有 | 有 | B1-20170465 |
| LightCDN | litecdncname.com | lightcdn.com | 有 | 有 | B1-20170465 |
| 亿信互联 | ens4.com | qiezic.com | 有 | 有 | B1-20235945 |
| 狐蒂云 | 743forever.com | szhdy.com | 有 | 有 | B1-20242378 |

## 详情

商业机密 /doge

### 白山云

**介绍**
`www.gov.cn` 用的就是白山云,不过白山云只为企业提供加速服务
**域名列表**:

* qingcdn.com
* bsclink.cn
* trpcdn.net

### 阿里云

**介绍**
一夜破产CDN,如果你的钱包特别充实,阿里云绝对是最好的选择,毕竟阿里云算得上是国内唯一正经做云的厂商了  
**域名列表**:
`kunlun**.com`: 专为国内提供加速服务  
`cdngslb.com`: 提供全球加速服务  
`inittt.com`: 此域名为 ESA 服务所使用的域名，我看了一下阿里云的文档，ESA 是原来的 DCDN 升级后改名得来的  
ESA 与腾讯云的 EdgeOne 一样，都很像 Cloudflare 的产品逻辑，整合自己所有的云产品，给客户提供很简单易懂的向外提供服务的方式  
`init**.com`: ESA全球加速,阿里云注册了一堆这种格式的域名，也不知道用没用  
`aliyunddos10**.com`: 阿里云DDOS防御的 CNAME 域名,从 `aliyunddos1000.com`　注册到了 `aliyunddos1032.com`

### 腾讯云

**介绍**
对于个人来说,小量使用腾讯云绝对称得上是物美价廉,不过也有破产风险
**域名列表**:

* dnsv1.com
* tc.cdntip.com
* spcdntip.com

### 星极世纪

地址: waf.pro
**介绍**
有证，[DP](https://xcdream.com)严选(DP给他们当过一段时间员工)

### 明赋云

地址: mingfucloud.com
**介绍**
知名的123云盘就是他们的东西,明赋云的CDN几乎算业内最低价,0.035元/GB,不过明赋云之前也干过一些不太道德的事
**域名列表**:

* mingfucdn.com

### 括彩云

地址: kuocaicdn.com
**介绍**
价格但比明赋云略贵,不过有免费额度,而且可以通过bug白嫖流量,感觉老板情绪有点激动...<!--  别人在qq群里散播它的谣言,不去找qq反而去告群主索要发布谣言的人的信息,直接把群主吓得开了全员禁言  -->
**域名列表**:

* kuocaidns.com

### 星域CDN

**介绍**
知名PCDN网心云的CDN,节点质量参差不齐,导致体验不咋地,典型的例子就是Bilibili的直播,什么牛鬼蛇神都能跑赚钱宝

### 多吉云

**介绍**
融合CDN,没有自建节点,不过有一点免费额度
**域名列表**:

* dogedns.com

### Edge one

**介绍**
腾讯云边缘加速网络,类似于Cloudflare,价格便宜  
Edge one 目前国内站与国际站有较大区分，和阿里云一样，edge one 国际站也退出了免费套餐，不过特别的是**免费版有大陆加速节点**(cdn服务需要海外实名认证,但pages服务不需要实名)  
**域名列表**:

* dnse1.com(全球加速)
* dnse2.com(全球加速-国内站)
* dnse3.com(全球不含大陆加速-国内站)
* dnse4.com(用途暂不明确，等待测试)
* dnse5.com(全球不含大陆加速-国际站)
* dnsoe2.com(pages服务-全球)
* dnsoe3.com(pages服务-全球不含大陆)

### 雨云

**介绍**
由于上游(白山云)突然发送停止服务告知(上午发告知，下午停止服务),目前在开发新的解决方案(换别的上游)
**域名列表**:

* raincdn.cn

### Cloudflare CN

**介绍**
Cloudflare与京东云合作的CDN,价格低廉,不过质量不太高,但有消息称Cloudflare已结束与京东云的合作,转为自建节点
**域名列表**:

* cf-ns.com

### LEDCDN

地址: cdn.ledcdn.com
**介绍**
原来的 Qui CDN
为希望优化大陆访问的个人站长提供公益 CDN
**域名列表**:

* qiucname.tech

### 亿速云

**介绍**
阿里云CDN的代理
**域名列表**:

* kunlun*.com  

### 天翼云

**介绍**
中国电信的云服务
**域名列表**:

* ctdns.cn

### 方能CDN

**介绍**
**请抵制此CDN品牌，他们深度参与了包括供应链投毒，诈骗，色情网站，钓鱼网站，假冒企业官网，假冒软件，博彩等灰产业务**
上条消息来源: [请持续关注由中国灰产公司主导的 CDN 投毒](https://www.54yt.net/435.html)
相关域名：funnull.com
**域名列表**:

* fn01.vip

## 已经跑路/停止运营的CDN

### 奇安信网战卫士

**介绍**
良心厂商,极少的国内免费CDN,虽然节点有点少,申请有点麻烦.
奇安信网战卫士的免费服务已于2024年5月终止,看来做公益也很烧钱啊
**域名列表**:

* qianxincdn.com

### 星穹CDN

地址: domecdn.com
**介绍**
很便宜的CDN小厂,我们怀疑跑路的原因是站长上了大学后没空了
**域名列表**:

* cname.fun

## 特别鸣谢

* [@yunsen2025](https://github.com/yunsen2025): 疯狂催更以及部分厂商信息(TA的转载: [Yunsen‘s blog](https://www.yunsen2025.top/017-cdn-cname/))
