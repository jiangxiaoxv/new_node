const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/url', function (ctx, next) {
  ctx.cookies.set('name', 'jxx')
  ctx.body = {
    href: ctx.href,
    path: ctx.path,
    url: ctx.url,
    query: ctx.query,
    queryString: ctx.querystring,
    search: ctx.search,
    host: ctx.host,
    hostname: ctx.hostname,
    protocol: ctx.protocol,
    secure: ctx.secure,
    subdomains: ctx.subdomains,
    origin: ctx.origin,
    // hash: ctx.hash,
    // port: ctx.port,
    header: ctx.headers,
    connection: ctx.get('connection'),
  }
})

module.exports = router
