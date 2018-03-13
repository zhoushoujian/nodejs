> 本教程是由Marp制作的PPT，保存格式是.md   
> 使用Marp可以得到更好的观看效果。   
> Marp下载地址：https://yhatt.github.io/marp/   

# Nodejs Web开发

## Nodejs介绍与安装

### [创世纪](./1.%20创世纪.md)
- Nodejs的创造，历史背景与价值
- Nodejs的基本架构与优缺点
- Nodejs的优势场景
- Nodejs的现状与未来

### [安装](./2.%20安装.md)
- Nodejs版本介绍
- 在各个平台下的安装以及相关的注意事项
- nvm介绍

### [运行](./3.%20运行.md)
- 命令行运行
- REPL运行
- 文件里运行

## Nodejs基础知识

### [全局变量](./4.%20全局变量.md)
- global, console, process
- 定时器(timers)
- Buffer
- module域下的变量

### [模块](./5.%20模块.md)
- 系统自带的模块
- 模块相关的变量
- 模块的引用
- 模块的创建
- module.exports 与 exports的差别

## Nodejs核心概念

### [网络编程](./6.%20网络编程.md)
- OSI与TCP/IP
- Socket
- 网络IO模型
- libuv
- 同步/异步/阻塞/非阻塞
- 理解有连接与无连接
- 理解有状态与无状态
- TCP包的示例与简介
- UDP包的示例与简介
- http包的示例与简介

### [事件](./7.%20事件.md)
- 事件机制的介绍
- Event对象的使用
- on的使用
- on与once的差别
- 示例与深入理解

## Nodejs重要概念与官方包

### [Buffer与流](./8.%20Buffer%20与%20流.md)
- 什么是Buffer? 有什么作用？
- Buffer的使用
- Buffer与数值的转换
- Buffer与字符的转换
- Buffer的比较
- 流与它的类型
- 读取流及相关事件
- 写入流及相关事件

### [文件与目录](./9.%20文件与目录.md)
- fs包
- 异步与同步接口
- 常用文件操作API
- 常用目录操作API
- path包

## Nodejs包机制与重要的第三方包

### [npm包管理](./10.%20npm包管理.md)
- npm介绍
- 其它语言的包管理系统
- 包管理软件的基本功能
- SEMVER及版本自动更新
- npm安装或者更新
- 包安装
- 查看包信息
- 理解node.js模块与npm包的关系
- package.json文件
- SEMVER及自动更新带来的问题与解决方案

### [重要的一些基础包](./11.%20重要的一些基础包.md)

- lodash
- async
- debug
- moment
- request
- cheerio
- rxjs

## Nodejs与Web服务器技术

### [Web开发](./12.%20Web开发.md)
- 认识HTTP
- HTTP常用方法
- HTTP状态码
- HTTP头信息
- Web服务器基本功能列表
- http包的实现方式

### [Express](./13.%20express.md)
- express是什么？
- 四个核心对象
- 最简单的示例
- 理解中间件
- 使用路由器
- Web服务器的基本功能示例

### [常用数据库的介绍与使用](./14.%20常用数据库的介绍与使用.md)
- 数据库的作用
- RDB VS noSQL
- Mysql数据库基本操作
- Mongodb数据库基本操作
- 应用mysql包调用mysql服务
- 应用mongodb包调用mongodb服务

### [字符与编码](./advanced/字符与编码.md)


## 函数、回调函数与异步调用的代码同步化

### [箭头函数与匿名函数](./advanced/箭头函数vs匿名函数.md)

### [异步调用的注意点](./advanced/异步调用的注意点.md)

### [异步IO的代码同步化](./advanced/异步IO的代码同步化.md)

## 写好的代码，设计好的API

### [代码风格](./advanced/代码风格.md)

### [单元测试与持续集成](./advanced/单元测试与持续集成.md)

### [Web API设计](./advanced/Web%20API设计.md)

## 服务器加速，优化，部署，访问

### [缓存技术与性能测试](./advanced/缓存技术与性能测试.md)

### [服务器配置与部署](./advanced/服务器配置与部署.md)

## OAuth,即服务器间的分享，互联(以微信公众号开发为例)

### [OAuth与微信公众号开发](./advanced/OAuth与微信公众号开发.md)

### [微信公众号开发](./advanced/微信公众号开发.md)


## 网络安全

### [网络安全基础](./advanced/网络安全基础.md)


