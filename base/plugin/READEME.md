# plugin

> plugin 是 webpack 的支柱功能。webpack 自身也是构建于你在 webpack 配置中用到的[相同的插件系统]之上    
  插件的目的在于解决 loader 无法实现的其他事，包括：打包优化；资源管理；注入环境变量；

## 剖析

> webpack 插件是一个具有 apply 方法的对象   
  apply 方法会被 webpack compiler 调用，并且可以在整个编译声明周期都可以访问 compiler 对象

* ConsoleLogOnBuildWebpackPlugin.js
    ~~~
    const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
    
    class ConsoleLogOnBuildWebpackPlugin {
        apply (compiler) {
            compiler.hooks.run.tap(pluginName, compilation => {
                console.log('webpack 构建过程开始！');
            })
        }
    }
    
    module.exports = ConsoleLogOnBuildWebpackPlugin
    ~~~

## 用法

> 由于参数可以携带 参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例

## 配置方式

* webpack.config.js
    ~~~
    const HtmlWebpackPlugin = require('html -webpack-plugin');
    const webpack = require('webpack');
    const path = require('path');
    
    module.exports = {
        entry: './path/to/my/entry/file.js',
        output: {
            filename: 'my-first-webpack.bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            tules: [
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({template: './src/index.html'})
        ]
    }
    ~~~
    * html-webpack-plugin 为应用程序生成一个 html 文件，并自动注入所有的 bundle

## Node API 方式

> 使用 Node API 的同时，也可以使用 plugins 属性传入插件

* some-node-script.js
    ~~~
    const webpack = require('webpack');     // 访问 webpack 运行时（runtime）
    const configuration = require('./webpack.config.js');
    
    let compiler = webpack(configuration);
    new webpack.ProgressPlugin().apply(compiler);
    compiler.run(function(err, stats) {
        // ...
    })
    ~~~
    
    > 上面的代码和 webpack 运行时（runtime）极其相似
