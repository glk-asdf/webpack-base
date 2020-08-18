# module Resolution

> resolver 帮助 webpack 从每个 require/import 语句中，找到需要引入到 bundle 的 chunk（模块代码）  
  当打包时，webpack 使用 enhanced-resolver 来解析文件路径

* resolver 是寻找模块绝对路径的库

## 解析规则

1. 使用 enhanced-resolver，webpack 可以解析三种文件路径
    
    1. 绝对路径
        ~~~
        import '/home/me/file'
        
        import 'C:\\Users\\me\\file'
        ~~~
    
    2. 相对路径
        > 使用 import 或 require 的资源文件所在的目录，被认为是上下文目录  
          相对路径会拼接此上下文目录，生成模块的绝对路径
        ~~~
        import '../src/file'
        
        import './file2'
        ~~~
        
    3. 模块路径
        ~~~
        import 'mudule'
        import 'mudule/lib/file'
        ~~~
        > 在 resolve.modules 中指定所有目录检索模块  
          也可以在 resolve.alias 配置别名替换初始模块路径
        ~~~
        module.exports = {
            resolve: {
                modules: ['node_modules'],
                alias: {
                    '@': path.resolve(__dirname, 'src')
                }
            }
        }
        ~~~

2. 解析完路径后，resolver 将会检查路径是指向文件，还是只想文件夹
    * 如果是指向文件
        * 如果文件具有扩展名，将直接打包
        * 如果不具有扩展名，将使用 resolve.extensions 选项作为文件扩展名解析
            ~~~
            module.exports = {
                resolve: {
                    // 使用此选项会覆盖默认数组，这就意味着 webpack 将不再尝试使用默认扩展来解析模块
                    extensions: ['.wasm', '.mjs', '.js', '.json']
                }
            }
            ~~~
    * 如果指向文件夹
        * 如果文件夹包含 package.json 文件，则会根据 resolve.mainFields 配置中的字段顺序查找，
          并根据 package.json 中的符合配置要求的第一个字段来确认文件路径
            ~~~
            module.exports = {
                resolve: {
                    mainFields: ['browser', 'module', 'main']
                }
            }
            ~~~
        * 如果不存在 package.json 或 resolve.mainFields 没有返回有效字段，
          则会根据 resolve.mainFiles 配置选项中指定的的文件名顺序查找，
          看是否能在 import/require 的目录下匹配到一个存在的文件名
            ~~~
            module.exports = {
                resolve: {
                    mainFiles: ['index']
                }
            }
            ~~~
        * 然后使用 resolve.extensions 选项，解析文件扩展名

## 解析 loader

> 使用 resolveLoader 配置项，可以为 loader 设置独立的解析规则

~~~
module.exports = {
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js', 'json'],
        mainFields: ['loader', 'main']
    }
}
~~~

## 缓存 catch

> 每次文件系统访问文件，都会被缓存，以便于更快触发对同一文件的多个并行或串行请求  
  在 watch 模式下，只有修改过的文件会被从缓存中移出；
  如果关闭 watch，则会在每次编译前清理缓存

~~~
module.exports = {
    watch: true
}
~~~
