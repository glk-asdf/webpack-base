# entry

> entry point 指示 webpack 应该使用对应模块，作为其构建内部依赖图的开始     
  从入口起点开始，寻找直接和间接依赖

* 默认值是 ./src/index.js ，可以通过 entry 属性，指定一个或多个不同的入口起点

* 兼容 ie 使用 babel-polyfill

~~~
module.exports = {
    entry: [''babel-polyfill', './src/main.js']
}
~~~

* 单个入口语法可扩展性弱，对象语法可扩展性强

* 当使用插件生成入口时，你可以传递空对象 {} 给 entry

## 单个入口语法

> 用法： entry: string | [string]

* 单个入口
    ~~~
    module.exports = {
        entry: './path/to/my/entry/file.js'
    }
    ~~~
* entry 属性的单个入口
    ~~~
    module.exports = {
        entry: {
            main: './path/to/my/entry/file.js'
        }
    }
    ~~~

* entry 当传入文件路径数组时，将创建一个多主入口（multi-main entry）   
  在想要一次注入多个依赖文件，并且将它们的依赖导向到一个 chunk 时
  （？一个 index.html 引入多个 js 文件，每个 js 文件是由入口和对应依赖生成），可以使用

## 对象语法

> 用法： entry: {<entryChunkName> string | [string] } | {}

* webpack.config.js
    ~~~
    module.exports = {
       entry: {
            app: './src/app.js',
            adminApp: './src/adminApp.js'
       }
    }
    ~~~

### 分离 app 应用程序和 vendor 第三方库入口

> [name] 指的是 entry（对象语法下）的 key  
  [contentHash] 指的是内容通过散列函数得到的，是一种压缩映射、消息摘要
  在 production 模式下，使用 [contentHash]，是为了避免缓存问题，更新间隙无文件问题

* webpack.config.js
    > 将应用程序和第三方库分离  
      在 vendor 中存入未做修改必要的 library 或文件，内容不变，内容哈希值也不变，就可以缓存，减少加载时间
    ~~~
    module.exports = {
       entry: {
            main: './src/app.js',
            vendor: './src/vendor.js'
       }
    }
    ~~~

* webpack.prod.js
    ~~~
    module.exports = {
        output: {
            filename: '[name].[contentHash].bundle.js'
        }
    }
    ~~~

* webpack.dev.js
    ~~~
    module.exports = {
        ourput: {
            filename: '[name].bundle.js'
        }
    }
    ~~~

> 在 webpack < 4 版本中，将 vendor 作为单独入口添加到 entry 中，
  与 commonChunkPlugin 结合，将其编译为一个单独文件
  
> 在 webpack 4 版本中，使用[optimization.splitChunks](https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks)，
  将 vendor 和 app 模块分离
  
### 多页面应用程序

> 多页面应用程序中，server 会拉取新的新的 HTML 文档，页面重新加载，资源也会重新加载   
  使用 optimization.splitChunks 为页面共享的应用程序代码创建 bundle，
  多页面能够复用多个入口起点之间的大量代码和模块   
  根据经验，每个 HTML 文档，只能使用一个入口起点

* webpack.config.js
    ~~~
    module.exports = {
        entry: {
            pageOne: './src/pageOne/index.js',
            pageTwo: './src/pageTwo/index.js',
            pageThree: './src/pageThree/index.js'
        }
    }
    ~~~
