# webpack-base

> webpack 是 javascript 应用程序的静态模块打包工具    
  它会先构建依赖图，然后根据依赖图映射到模块，并生成一个或多个 bundle
  
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
  无参数的情况下，默认入口起点为 ./src/index.js，然后在 ./dist/main.js 输出结果

### 设置配置项 config

> 使用 --config 指定配置文件

~~~
  webpack --config webpack.config.js
~~~

## 配置可扩展

> 配置可以重复使用，也可以组合使用  
  将关注点从 环境（environment）、目标（build target）、运行时（runtime）中分离    
  使用 webpack-marge 合并   
~~~
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
NODE_ENV: '"development"'
})
~~~

## 浏览器兼容（browser compatibility）

> webpack 支持所有符合 es5 标准的浏览器（不支持 ie8 及以下版本）  
  webpack 的 import() 和 require.ensure() 需要 Promise 。如果想要支持旧版本浏览器，需要提前加载 polyfill    
  polyfill 是用在 浏览器(browser) api 的 shimming    
  shimming 是一个库(library)，将一个新的 api 引入到旧的环境，仅靠旧的环境已有手段实现

* 兼容 ie9 使用 babel-polyfill

~~~
module.exports = {
    entry: [''babel-polyfill', './src/main.js']
}
~~~

## 环境（environment）

> webpack 运行于 Node.js v8.x+ 版本

## node 模块

### path

> path 是 Node.js 内置核心模块   
  根据全局变量 __dirname（即当前文件路径）， 通过 path.resolve 方法获取，传入相对路径，获取绝对路径

* webpack.config.js
    ~~~
    import path from 'path'
    
    path.resolve(__dirname, '../src/index.js')
    ~~~
    * 文件中的路径都是从执行 webpack 命令的目录（不是 config 文件所在的目录）开始寻找

### process

> process 是 Node.js 内置核心模块   
  过程对象
  
* build.js
~~~
process.env.NODE_ENV = 'production'
~~~

