# hot module replacement 模块热替换

> HMR 会在应用程序运行过程中，替换、添加或删除模块，而无需重新加载整个页面

* 热替换可以显著加快开发速度
    * 保留应用程序状态（完全重新加载页面会丢失）
    * 只更新变更内容，以节省宝贵的开发时间
    * 在源代码中 css/js 产生修改时，会立刻在浏览器中进行更新（几乎相当于在浏览器 devtools 直接更改样式）

## HMR 工作原理

* 应用程序中
    1. 应用程序要求 HMR runtime 检查更新
    2. HMR runtime 异步的下载更新，然后通知应用程序
    3. 应用程序要求 HMR runtime 应用更新
    4. HMR runtime 同步的应用更新
    > 可以设置 HMR，以使此进程自动触发更新

* 在 compiler 中
    > 除了普通资源，compiler 需要发出 update ，将之前的版本更新到新的版本，update 由两部分组成
    1. 更新后的 manifest（json）
    2. 一个或多个 update chunk （javascript）
    > manifest 包括新的 compilation hash 和 updated chunk 列表，
    每个 chunk 都包含着全部更新模块的最新代码（或者一个 flag 用于表明此模块需要被移除）  
    compiler 会确保这些在构建之间的模块 id 和 chunk id 保持一致。
    通常将这些 id 保存在内存中（使用 webpack-dev-server时），
    但是也可能将它们存储在一个 json 文件中
    
* 在模块中
    > HMR 是可选功能，只会影响包含 HMR 的模块  
    例如，通过 style-loader 为 style 追加补丁，style-loader 实现了 HMR 接口；
    当它通过 HMR 接收到更新，它会使用新的样式替换旧的样式  
    
    > 多数情况下，不需要在每个模块强行写入 HMR 代码，
    如果一个模块没有 HMR 处理函数，更新就会冒泡（bubble up）。
    这意味着某个单独处理函数能够更新整个模块树。
    如果在模块树的一个单独模块被更新，那么整组依赖模块都会被重新加载

* 在 runtime 中
    > 对于模块系统运行时（module system runtime），会发出额外代码，来跟踪模块 parents 和 children 关系。
    在管理方面，runtime 支持两个方法 check 和 apply
    * check 方法，发出 http 请求来更新 manifest 。  
    如果请求失败，说明没有可用更新。  
    如果请求成功，会将 updated chunk 列表与当前 loaded chunk 列表进行比较。
    每个 loaded chunk 都会下载相应的 updated chunk。当所有更新 chunk 完成下载，runtime 就会切换到 ready 状态
    
    * apply 方法，将所有 updated module 标记为无效。  
    对于每个无效 module，都需要在模块中有一个 update handler，或者在此模块的父级模块中有一个 update handler，
    否则，会进行无效标记冒泡，并且父级也会被标记为无效。继续每个冒泡，直到达到应用程序入口起点，
    或者达到带有 module handler 的 module （以最先达到为准，冒泡停止）。如果它从入口起点开始冒泡，则此过程失败  
    之后所有无效 module 都会被（通过 dispose handler）处理和解除加载。
    然后更新当前 hash ，并且调用所有 accept handler。runtime 切换回 idle 状态
    
## 起步

> 开发环境中，可以将 HMR 作为 LiveReload 的替代。  
webpack-dev-server 支持 hot 模式，在试图加载整个页面前，hot 模式会尝试使用 HMR 来更新。
