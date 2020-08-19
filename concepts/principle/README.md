# 原理

> 打包，是指处理某些文件并将其输出为其他文件的能力  
但是，输入和输出之间，还包括模块、入口起点、chunk、chunk组和许多其他中间部分

##主要部分

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
 
