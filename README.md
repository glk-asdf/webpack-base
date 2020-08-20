# webpack 示例

## 打包

* 直接调用 webpack ，使用的是全局安装的 webpack
    ~~~
    webpack --config webpack.config.js
    ~~~

* 直接调用 node_modules 里的 webpack
    ~~~
    // mac
    ./node_modules/.bin/webpack --config webpack.config.js
    // window
    .\node_modules\.bin\webpack --config webpack.config.js
    ~~~

* 使用 npx 调用 node_modules 里的 webpack
    ~~~
    npx webpack --config webpack.config.js
    ~~~

* 使用 package.js 的 script 调用 node_modules 里的 webpack
    ~~~
    npm run build
    ~~~
    > 通过在 npm run build 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack，例如：
    ~~~
    npm run build -- --colors
    ~~~


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

## 为什么选择 webpack

> 打包工具出现之前  
在浏览器中运行 javascript 有两种方法。  
第一种方式，引用一些脚本存放每个功能，此解决方案很难扩展，因为加载太多脚本会导致网络瓶颈
第二种方式，使用一个包含所有项目代码的大型 .js 文件，但这会导致作用域、文件大小、可读性、和可维护性方面的问题

### 立即调用函数表达式 IIFE （Immediately invoked function expressions）

> IIFE 解决大型项目的作用域问题；
当脚本文件被封装在 IIFE 内部时，你可以安全的拼接或安全的组合所有文件，而不必担心作用域冲突

### nodejs

> Commonjs 问世并引入 require 机制，它允许你在当前模块加载和使用某个模块。
导入需要的每个模块，这一开箱即用的功能解决了作用域问题

### 依赖自动收集

> webpack 自动构建并基于你所引用或导出的内容推断出依赖的图谱。
这个特性和 plugin 和 loader 一道让开发者体验更好

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

