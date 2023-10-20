/**
 * # 初始化package.json
    npm init

    # 安装koa2 
    npm install koa

 */

/**
 * koa特性
 * 只提供封装好http上下文、请求、响应，以及基于async/await的中间件容器。
利用ES7的async/await的来处理传统回调嵌套问题和代替koa@1的generator，但是需要在node.js 7.x的harmony模式下才能支持async/await。
中间件只支持 async/await 封装的，如果要使用koa@1基于generator中间件，需要通过中间件koa-convert封装一下才能使用。
 */

function mockDemo() {
  const Koa = require('koa')
  const app = new Koa()

  app.use(async (ctx) => {
    ctx.body = 'hello koa2'
  })

  app.listen(3000)
  console.log('[demo] start-quick is starting at port 3000')
}
