# modules

> 开发者将程序分解为功能离散的 chunk，并称之为 模块

* 模块化使得便于验证、调试、测试

* 精心编写的模块，具有可靠的抽象和封装界限，使得模块条理清晰，有明确的目的

## webpack 中的依赖关系

* es2015： import、 export

* CommonJS： require、module.exports

* AMD： require 、define

* css/less/sass： @import

* stylesheet： url()     
  html： <img src=>

## 通过 loader 支持多种语言

> loader 处理非 javascript 语言，并将相关依赖引入 build
