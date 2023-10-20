// console.log('>>>>>>>>>>>>>>>>>>${global}', `${global},`, Object.keys(global))

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  const start = new Date()
  console.log('before await')
  console.log(JSON.stringify(this))

  await next()
  console.log('after await')

  const ms = new Date() - start
  console.log('consume timer,', ms)
})

app.use(async (ctx) => {
  console.log('response')
  ctx.body = 'hello koa2'
})

app.listen(3000)
