# output

> 通过 output 告诉 webpack 如何向硬盘写入编译文件（在哪里写入 bundle，以及如何命名）     
  输出文件的默认值是 ./dist/main.js ，其他文件默认放置在 ./dist/ 下面
  即使存在多个 entry 起点，但只能指定一个 output 配置
  
* webpack.config.js
    > 最低要求是，添加 [output.filename](https://webpack.docschina.org/configuration/output/#outputfilename)
    ~~~
    module.exports = {
        output: {
            filename: 'bundle.js'            
        }
    }
    ~~~

## output.filename

> 决定了 bundle 的名称，并将 bundle 写入到 [output.path](https://webpack.docschina.org/configuration/output/#outputpath)    
  当通过多个入口起点（entry point）、代码拆分（code splitting）或者各种插件（plugin）创建多个 bundle，
  则需要对应的替换方式，使用占位符（substitutions）确保每个文件具有唯一的名称    
  虽然是 name，但可以使用文件夹结构，如：'js/[name]/bundle.js'

* 当通过多个入口起点（entry point）创建多个 bundle
    > 使用入口名称
    ~~~
    module.exports = {
        output: {
            filename: '[name].bundle.js'
        }
    }
    ~~~

* 使用模块标识符 chunk id
    ~~~
    module.exports = {
        output: {
            filename: '[id].bundle.js'
        }
    }
    ~~~

* 使用每一次构建过程，唯一的 hush 生成
    ~~~
    module.exports = {
        output: {
            filename: '[name].[hush].bundle.js'
        }
    }
    ~~~

* 使用每一个 chunk 内容的 hush
    ~~~
    module.exports = {
        output: {
            filename: '[chunkhush].bundle.js'
        }
    }
    ~~~

* 使用每一个生成内容的 hush
    ~~~
    module.exports = {
        output: {
            filename: '[contenthush].bundle.js'
        }
    }
    ~~~
    
* 使用函数返回 filename
    ~~~
    module.exports = {
        output: {
            filename: (pathData) => {
                return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js'
            }
        }
    }
    ~~~

## CDN 和 hush

> 将 bundle 写入到 path     
  在 index.html 中的引用，将 path 改为 publicPath    
  手动将 path 中的bundle发布至publicPath，即 CDN    

* webpack.config.js
    ~~~
    module.exports = {
        output: {
            ...
            path: '/js/[hush]',
            publicPath: 'https://cdn.example.com/js/[hush]'
        }
    }
    ~~~

    * publicPath 可以留空，在入口文件（webpack.entry.js）中动态设置  
        ~~~
        __webpack_public_path__ = myRuntimePublicPath;
        ~~~
