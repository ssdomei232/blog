---
title: 
tags:
- 学习笔记
- linux
- Go
categories: 
- Go
permalink: /articles/2025/musl-and-go.html
date: 2025-10-04 15:38:45
---

root@mei-home:/opt/apps/Thermohygrometer# ./main
-bash: ./main: cannot execute: required file not found

root@mei-home:/opt/apps/Thermohygrometer# ls
main  sql.db  templates

root@mei-home:/opt/apps/Thermohygrometer# file ./main
./main: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib/ld-musl-x86_64.so.1, BuildID[sha1]=aaf248e63656640884f4398b4b91f7816874f991, with debug_info, not stripped

root@mei-home:/opt/apps/Thermohygrometer# ldd ./main
        linux-vdso.so.1 (0x00007ffd949ea000)
        libc.musl-x86_64.so.1 => not found

root@mei-home:/opt/apps/Thermohygrometer# ldd ./main
        not a dynamic executable
