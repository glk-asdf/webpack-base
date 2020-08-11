# webpack-base

> webpack 是 javascript 应用程序的静态模块打包工具    
  它会先构建依赖图，然后根据依赖图映射到模块，并生成一个或多个 build
  
## 安装

* 安装 webpack

~~~
npm install webpack --save-dev
~~~

* 如果是 webpack v4+，需要安装 webpack-cli

~~~
npm install webpack-cli --save-dev
~~~

### 最新体验版

> 最新体验版可能含有 bug，不适合使用在生产版本

~~~
// 最新体验版
npm install webpack@next --save-dev
// 指定 tag/分支
npm install webpack<tagname/branchname> --save-dev
~~~

## 运行打包

> 运行 webpack，设置参数、配置项等

### 设置配置项 config

~~~
  webpack --config webpack.config.js
~~~

* 入口 entry
* 出口 output

## node 模块

### path

> 根据当前文件路径 __dirname， 通过 path.resolve 方法获取，传入相对路径，获取绝对路径
~~~
import path from 'path'

path.resolve(__dirname, '../src/index.js')
~~~
