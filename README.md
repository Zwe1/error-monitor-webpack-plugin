# error-monitor-webpack-plugin

## 说明

为 error-monitor 系统在 webpack 打包环境下量身订制的 Plugin。用于处理 source-map 文件上传到[后端服务器](https://github.com/Zwe1/error-monitor-node-server)，以便对 [web](https://github.com/Zwe1/error-monitor-frontend) 错误进行源码解析。

## 架构

该 Plugin 遵循 webpack 插件设计原则，在 webpack 打包阶段注册事件监听任务来处理 source-map 文件。

1. 接受定制化参数
2. 整合 source-map 文件
3. 上传文件至服务器

## 使用方法

```js

## npm

npm i error-monitor-webpack-plugin -D

-- webpack.config.js

const EmWebpackPlugin = require('error-monitor-webpack-plugin');

module.exports = {
    plugins: [new EmWebpackPlugin(options)]
}

--


```

## 实现步骤

1. 获取 source-map 输出位置
2. 过滤出需要上传的文件
3. 建立 node 服务间通信信道

## 难点

1. source-map 抓取与上传

在插件厨师化时，获取到上传的服务器地址及打包路径，遍历 build 目录筛选出需要上传的 map 文件及 manifest 文件，这是后续代码转化需要的两类核心文件。

在上传过程中计划将文件转换成二进制流，附加时间戳作为本次打包的 source-map 文件的识别标志。时间戳选取打包文件生成时的时间戳还是上传文件时的时间戳，这一点还存疑，暂取上传时的时间戳，待后续具体测试时再调整。

## 潜在问题

1. 身份识别

在上传 source-map 时，如何确认身份信息，保证服务安全不被攻击，避免收集了危险的信息。考虑可以生成一个 token 令牌，作为当前整个前端系统与后端沟通的身份令牌。

可以考虑使用 http.request 中 author 来传递身份令牌。
