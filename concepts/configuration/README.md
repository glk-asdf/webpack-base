# configuration

> webpack 配置文件是 javascript 文件，文件导出-个 webpack 配置的对象  
  webpack 会根据配置的属性进行处理

* 在命令行中使用 --config 指定配置文件
    ~~~
    webpack --config webpack.config.js
    ~~~

* webpack 遵循 CommonJS 模块规则
    
    > 从 entry point 开始，才是 loader 处理的起点，起点之前只能使用 CommonJS
    
    * 使用 require() 引入其他文件
    * 使用 require() 引入 npm 下载的函数
    * 使用 javascript 控制流表达式，例如 ?; 操作符
    * 对 value 使用常量或变量赋值
    * 编写并执行函数，生成部分配置

* 应避免如下操作
    
    > 虽然技术上可行，但还是应该规范操作
    
    * 当使用 webpack cli 工具时，访问 cli 参数（应编写自己的 cli 工具替代，或者使用 --env）
    * 导出不确定的结果（两次调用 webpack 应产生相同的输出文件）
    * 编写超长的配置（应将配置文件拆分为多个，使用 webpack-merge 组合）

* webpack 实现了既可表达，又可灵活配置，得益于 配置即为代码

## 基本配置

* webpack.config.js
    ~~~
    module.exports = {
        mode: 'development',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        }
    }
    ~~~

## 配置文件输出类型为 Object、Function 或 Promise ，还可以导出多个配置

* Object
    ~~~
    module.exports = {
        mode: 'development',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        }
    }
    ~~~

* Function
    ~~~
    /**
    * @param env 环境变量
    * @param argv 参数
    */
    module.exports = function (env, argv) {
        return {
            mode: env.production ? 'peoduction' : 'development',
            devtool: env.production ? 'source-map' : 'eval',
            plugins: [
                // 主要用于压缩文件，去除无意义代码
                new TerserPlugin({
                    terserOptions: {
                        compress: argv['optimize-minimize']
                    }
                })
            ]
        }
    }
    ~~~

* Promise
    > 需要异步加载配置文件时，非常方便  
      只在使用 webpack cli 时，可以返回 Promise
    ~~~
    module.exports = function () {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve({
                    entry: './src/index.js',
                    ...
                })
            }, 5000)
        })
    }
    ~~~

* 多个配置
    > 如果将名称传递给 --config-name 标志，则 webpack 将仅构建该特定配置
    ~~~
    module.exports = [
        {
            output: {
                filename: './dist-amd.js',
                libraryTarget: 'amd'
            },
            name: 'amd',
            entry: './app.js',
            mode: 'production'
        },
        {
            outpur: {
                filename: './dist-commonjs.js',
                libraryTarget: 'commonjs'
            },
            name: 'commonjs',
            entry: './app.js',
            mode: 'production'
        }
    ]
    ~~~

## webpack 支持多种编程和数据语言编写的配置文件
