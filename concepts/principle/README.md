# 原理

> 打包，是指处理某些文件并将其输出为其他文件的能力  
但是，输入和输出之间，还包括模块、入口起点、chunk、chunk组和许多其他中间部分

## 主要部分

> 项目使用的每个文件，都是一个模块
* ./index.js
~~~
import app fron './app.js';
~~~
* ./app.js
~~~
export default 'the app';
~~~
> 通过互相引用，这些模块会形成一个图（ModuleGraph）数据结构

> 打包过程中，模块会被合并成 chunk。chunk 合并成 chunk 组，并形成一个模块互相连接的图（ModuleGraph）  
如何通过以上来描述一个入口起点：在其内部会创建一个只有一个 chunk 的 chunk 组
* webpack.config.js
~~~
module.exports = {
    entry: './index.js'
}
~~~
> 这会创建出一个名为 main 的 chunk 组（main 是入口起点的默认名称）。次 chunk 组包含 ./index.js 模块。
随着 parser（解析器）处理 ./index.js 内部的 import 时，新模块就会被添加到此 chunk 中

* webpack.config.js
~~~
module.exports = {
    entry: {
        home: './home.js',
        about: './about.js'
    }
}
~~~
> 这会创建出两个名为 home 和 about 的 chunk 组。每个 chunk 组都包含一个包含一个模块的 chunk：
./home.js 对应 home，./about.js 对应 about  

> 一个 chunk 组可能有多个 chunk。例如，splitChunksPlugin 会将 chunk 拆分为一个或多个 chunk

## chunk

> chunk 有两种形式：  

* initial（初始化）是入口起点的 main chunk。此 chunk 包含，为入口起点指定的所有模块及其依赖

* non-initial 是可以延迟加载的块。可能会出现在使用动态导入（dynamic imports）或者 splitChunksPlugin 时

> 每个 chunk 都有对应的 asset（资源）。资源，是指输出文件（即打包结果）

* webpack.config.js
~~~
module.exports = {
    entry: './src/index.jsx'
}
~~~
* ./src/index.jsx
~~~
import React from 'react'
import ReactDOM from 'react-dom'

import('./app.jsx').then(App => ReactDOM.render(<App />, root))
~~~
> 这会创建出一个名为 main 的 initial chunk。包含  

* main
    * ./src/index.jsx
    * react    
    * react-dom
    > 以及 ./app.jsx 依赖的所有模块

> 然后会为 ./app.jsx 创建 non-initial chunk，因为 ./app.jsx 是动态导入

* output：
    * ./dist/main.js    initial chunk
    * ./dist/394.js     non-initial chunk
    > 默认情况下，non-initial 是没有名称的，因此会使用唯一 id 来替代名称。  
    在使用动态倒入时，我们可以通过使用 magic commit（魔术注释）来显示指定 chunk 名称：
    ~~~
    import(
    /* webpackChunkName: "app" */
    './app.jsx'
    ).then(App => ReactDOM.render(<App />, root))
    ~~~
    > Output:
    * ./dist/main.js    initial chunk
    * ./dist/app.js     non-initial chunk

## output 输出

> 输出文件的名称会受配置中的两个字段影响：

* outout.filename 用于 initial chunk 文件

* output.chunkFilename 用于 non-initial chunk 文件

> 这些字段会有一些占位符：

* [id]      - chunk id（例如：[id].js -> 485.js）

* [name]    - chunk name（例如：[name].js -> app.js）。如果 chunk 没有名称，则会使用其 id 作为 name

* [contenthush]     - 输出文件内容的 md4-hush（例如：[contenthush].js -> 4ea6ff1de66c537eb9b2.js）
