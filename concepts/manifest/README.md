# manifest

> 打包之后，项目结构消失，需要使用 manifest 来替代

* 使用 webpack 构建的应用程序中，有三种主要的代码类型：

    1. 自己编写的源码
    
    2. 自己的源码依赖的 library 或 vendor 代码
    
    3. webpack 的 runtime 和 manifest，管理所有模块的交互

## runtime

> runtime 以及伴随的 manifest 数据，主要是指：  
  在浏览器运行过程中，webpack 用来连接模块化应用程序所须的所有代码。  
  它包含：在模块交互时，连接模块所需的加载和解析逻辑。  
  包括：已加载到浏览器中的连接模块逻辑，以及尚未加载到模块的延迟加载逻辑
  
## manifest

> 当应用程序在浏览器中以 index.html 文件的形式打开，一些 bundle 和需要的资源都需要用某种方式被加载和链接起来  
  在经过 webpack 优化（打包、压缩、为延迟加载而拆分为细小的 chunk）之后，/src 目录的文件结构已不再存在  
  这就需要 manifest 数据来帮助管理模块之间的交互  
  
> 当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 manifest  
  当完成打包，并发送浏览器时，runtime 会通过 manifest 来解析和加载模块  
  无论选择哪种模块语法，import 和 require 都已经转为 __webpack_require__ 方法，此方法指向模块标识符（module identifier）  
  通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块

## 问题

> 正常情况下，manifest 不会造成什么影响  

* 当使用缓存，通过 content hush 作为 bundle 文件的名称时  
  内容修改时，会计算出新的 hush，浏览器会使用新的名称加载文件
