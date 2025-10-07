---
title: 为什么在 Alpine 上编译的 Go 程序依赖 musl?即使 CGO_ENABLED=0
tags:
- 学习笔记
- linux
- Go
categories: 
- Go
permalink: /articles/2025/musl-and-go.html
date: 2025-10-07 16:15:08
---

今天在玩 Gitea Action 时,发现部署到 1Panel 后出现了`-bash: ./main: cannot execute: required file not found`报错

一开始以为是上传失败了,ls了一下发现文件存在仔细看了一下,发现这不是文件不存在,而是依赖不存在

这时问题来了,Go明明是静态语言,为什么会有依赖呢

`file main`一下:

```bash
root@mei-home:/opt/apps/Thermohygrometer# file ./main
./main: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib/ld-musl-x86_64.so.1, BuildID[sha1]=aaf248e63656640884f4398b4b91f7816874f991, with debug_info, not stripped
```

发现依赖了`musl`运行库,那`musl`是什么呢,`musl`是`Alpine`的 C 标准库（libc），相当于 Ubuntu 的 glibc。

这时想到了我构建应用时使用的 Alpine, Go 编译器底层调用的是 Alpine 的 linker（musl），所以生成的 ELF 头部写死了 interpreter 为 /lib/ld-musl-x86_64.so.1(即使CGO_ENABLE=0)

```bash
root@mei-home:/opt/apps/Thermohygrometer# ldd ./main
        linux-vdso.so.1 (0x00007ffd949ea000)
        libc.musl-x86_64.so.1 => not found
```

### 解决方案

解决方案很简单,在使用Go的交叉编译时会创建静态的二进制文件

```bash
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main .
```

这样再检查一下

```bash
root@mei-home:/opt/apps/Thermohygrometer# ldd ./main
        not a dynamic executable
root@mei-home:/opt/apps/Thermohygrometer# file main
main: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, Go BuildID=EiBzV9q1enaIbGopv6tQ/TygrGeQ8AZBjwXzZ8GxH/dsSh1SEjtFORxlyVFYK2/Vw0VWXVbMZ5IBUderZZF, with debug_info, not stripped
```

果然没有问题了
