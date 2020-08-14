# configuration

> 供 webpack 使用的配置对象，webpack 会根据配置的属性进行处理

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
