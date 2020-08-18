# mode

> 通过选择 development、production、none 中的一个，来设置 mode 参数     
  不同的参数，可以启用 webpack 内置在相应环境下的优化    
  默认值是 production

* NODE_ENV 并不会自动的设置 mode
    ~~~
    process.env.NODE_ENV = 'production'
    ~~~
    
