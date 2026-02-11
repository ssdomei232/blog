---
title: 使用 GPT-SoVITS WebAPI
tags:
- GPT-SoVITS
- AI
- Go
categories: 
- AI
permalink: /articles/2026/gpt-sovits-api.html
date: 2026-02-11 14:54:19
---

GPT-SoVITS 在项目中提供了一个简易WebAPI以及相关文档:  
[api_v2.py](https://github.com/RVC-Boss/GPT-SoVITS/blob/main/api_v2.py)

想要启动它需要在安装完后运行 `python api_v2.py -a 127.0.0.1 -p 9880 -c GPT_SoVITS/configs/tts_infer.yaml`

自带的简易API会采用`tts_infer.yaml`中第一条有效配置，配置文件中`t2s_weights_path`就是GPT权重文件的路径，`vits_weights_path`就是Sovits的权重文件路径，可以选择使用默认的，也可以选择使用你自己训练的，不过在使用前要记得将第一条有效配置(就是custom项)的`version`改成你使用的权重文件的版本  

我写了一个简易的 Go SDK: [gpt_sovits_go_sdk](https://github.com/ssdomei232/gpt_sovits_go_sdk) 当然这个轮子省略了很多详细的配置，如果需要，你可以自己实现一个
