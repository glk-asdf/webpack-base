# target

> javascript 即可以编写服务端代码，也可以编写浏览器代码，所以 webpack 提供了多种部署 target

* webpack.config.js
    ~~~
    module.exports = {
        // 设置为 node，webpack 将在类 nodejs 环境编译代码
        // 使用 require，而不使用 fs 或 path 等内置模块
        target: 'node'
    }
    ~~~
    > 每个 target 都包含各种 deployment（部署）/environment（环境）特定的附加项

## 多 target

> target 不支持传入多个字符串，但可以使用多个独立配置

~~~
const path = require('path')
const serverConfig = {
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.node.js'
    }
    ...
}
const clientConfig = {
    // 默认为 web，可省略
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.js'
    }
}
module.exports = [serverConfig, clientConfig]
~~~
