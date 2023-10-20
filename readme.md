# 学习路径（https://blog.poetries.top/node-learning-notes/notes/modules/-7.1%20%E8%BF%9B%E7%A8%8B%E7%9B%B8%E5%85%B3%20process.html#%E6%A8%A1%E5%9D%97%E6%A6%82%E8%A7%88）

# Node 架构

1. v8 引擎（解释 JavaScript 代码）
2. libuv（访问文件系统，网络， 事件循环）

# Node

1. 单线程，一个线程基本上只是一个指令序列
2. 事件循环

   -

# 2023/10/11 号 学习 node

```js
Javascript 由三部分
node.js 由ecmascript，node的api组成
javascript 存在两个问题：文件依赖，明明冲突

```

```node
node 是一种单线程，基于事件驱动的非阻塞IO模型
```

```js 高并发的原因
单线程（主线程）
线程池（事件循环机制）
事件驱动
异步回调
```
