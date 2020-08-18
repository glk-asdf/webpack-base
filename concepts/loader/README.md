# loader

> webpack 只能理解 javascript 和 json 文件，这是 webpack 开箱即用的能力   
  loader 用于对模块的代码进行转换   
  在 import 或 "load(加载)" 模块时，预处理文件。类似于其他构建工具的 task （任务）

* 可以将 Typescript 转为 javascript  
* 可以将 内联图像 转为 data URL
* 可以在 js 模块中引入 css

## css 和 typescript 的使用示例

1. 安装对应 loader  

    ~~~
    npm install --save-dev css-loader ts-loader
    ~~~
    
2. 添加 webpack 配置项

    * wepack.config.js
    
        ~~~
        module.exports = {
            module: {
                rules: [
                    {
                        // 识别出那些属性会被转换
                        test: /\.css$/,
                        // 在进行转换时，使用的 loader
                        use: 'css-loader'
                    },
                    {
                        test: /\.ts$/,
                        use: 'ts-loader'
                    }
                ]
            }
        }
        ~~~
        * /\.css$/ 与 '/\.css$/'（或 "/\.css$/"）不同  
          前者表示 .css 结尾  
          后者表示名为 .css

## 使用 loader 的方式

### 配置方式

> 在 webpack.config.js 中指定 loader

* 在 module.rules 中可以指定多个 loader

* loader 从右到左，从下到上的取值（evaluate）/执行（execute）

#### sass 的引用

> 从 sass-loader 开始，然后是 css-loader，最后是 style-loader

* webpack.config.js
    ~~~
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }
            ]
        }
    }
    ~~~

### 内联方式

> 在 import 或与 import 等同的引用方式中，指定 loader

* 可以添加 query 参数，也可以添加 json 参数
    ~~~
    // query
    ?key-value&&foo=bar
    // json
    ?{"key":"value","foo":"bar"}
    ~~~

* 使用 ! 将资源中的 loader 分开

    ~~~
    import Style from 'style-loader!css-loader?modules!./style.css';
    ~~~

* 添加前缀，可以覆盖 webpack.config.js 配置中的的所有 loader，proLoader 和 postLoader
    
    * 使用 ! 前缀，禁用已配置的所有 normal loader
    
        ~~~
        import Style from '!style-loader!css-loader?modules!./style.css';
        ~~~
    
    * 使用 !! 前缀，禁用已配置的所有 loader （preLoader, loader, postLoader）
    
        ~~~
        import Style from '!!style-loader!css-loader?modules!./style.css';
        ~~~
    
    * 使用 -! 前缀，禁用已配置的所有 preLoader 和 loader，不禁用 postLoader
    
        ~~~
        import Style from '-!style-loader!css-loader?modules!./style.css';
        ~~~

### cli 方式

> 通过 cli 使用 loader

~~~
webpack --moudle-bind pug-loader --module-bind 'css=style-loader!css-loader'
~~~

## loader 特性

* loader 支持链式调用     
  loader 按照相反的顺序执行  
  loader 将资源转化的结果，传递给下一个 loader，最后一个 loader 返回 webpack 期望的 javascript

* loader 支持同步，也支持异步

* loader 运行在 Node.js 中，并且能够执行任何操作

* loader 可以通过 options 对象配置（仍然支持使用 query 参数设置选项，但已被废弃）

* xxx-loader 模块中，通过 package.json 中的 main 字段指定 loader 文件   
  module.rules 通过模块名，或直接指定 loader 文件引入

* plugin 可以为 loader 带来更多特性

* loader 能够产生额外的任意文件

## 解析 loader

> loader 遵循模块解析规则。  
  多数情况下，loader 将从模块路径加载（通常从 npm install，node_modules 进行加载）
  
> 正常情况下，loader 模块导出一个函数，并且编写为 nodejs 兼容的 javascript     
  通常使用 npm 进行管理 loader，也可以将应用程序的文件作为自定义 loader  
  按照约定，loader 命名为 xxx-loader
