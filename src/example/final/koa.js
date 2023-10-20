/**
 * Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序
 */

function mockKoa() {
  const Koa = require('koa')
  const app = new Koa()
  const bodyParser = require('koa-bodyparser') // 需要先安装koa-bodyparser npm install koa-bodyparser
  // 注意post请求需要配合koa-bodyparser模块和x-www-form-urlencoded格式，如果是formdata 格式，可以用multer模块来解析
  app.use(bodyParser())
  app.use(async (ctx) => {
    ctx.body = 'Hello World'
    /**
       * ctx.request; // 这是 koa Request
        ctx.req; // 这是 node Request
        // 注意：绕过 Koa 的 response 处理是 不被支持的. 应避免使用以下 node 属性：res.statusCode, res.writeHead(), res.write(), res.end()

        res.statusCode
        res.writeHead()
        res.write()
        res.end()
        ctx.request

        ctx.response; // 这是 koa Response
        ctx.res; // 这是 node Response
        ctx.response.body=
        ctx.body= // 简写
        将响应体设置为以下之一：
            string 写入
            Buffer 写入
            Stream 管道
            Object || Array JSON-字符串化
            null 无内容响应
       */
  })
  app.listen(3000)
}

function mockController() {
  const Controller = require('egg').Controller
  class HomeController extends Controller {
    async index() {
      this.ctx.body = 'Hello world'
    }
  }
  // app/controller/user.js
  const Controller = require('egg').Controller
  class UserController extends Controller {
    async info() {
      const { ctx } = this
      const userId = ctx.params.id
      const userInfo = await ctx.service.user.find(userId)
      ctx.body = userInfo
    }
  }
  module.exports = UserController
  module.exports = HomeController
}

function mockRoute() {
  module.exports = (app) => {
    app.router.get('/user/:id', app.controller.user.info)
  }

  // app/router.js（编写文件的位置）
  module.exports = (app) => {
    const { router, controller } = app
    router.get('/', controller.home.index)
  }
}

function mockStaic() {
  /**
     * Egg 内置了 static 插件，线上环境建议部署到 CDN，无需该插件
    static 插件默认映射/public/* -> app/public/*目录
    此处，我们把静态资源都放到app/public目录即可
     * 
     */
  exports.cors = {
    enable: true,
    package: 'egg-cors',
  }
}

function mockService() {
  /**
     * 简单来说，Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：

    保持 Controller 中的逻辑更加简洁。 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
    将逻辑和展现分离，更容易编写测试用例，测试用例的编写具体可以查看这里。
    所以我们可以把操作数据库的逻辑放在 Service 层

     */

  // app/service/user.js
  const Service = require('egg').Service
  class UserService extends Service {
    // 默认不需要提供构造函数。
    // constructor(ctx) {
    //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    //   // 就可以直接通过 this.ctx 获取 ctx 了
    //   // 还可以直接通过 this.app 获取 app 了
    // }
    async find(uid) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const user = await this.ctx.db.query(
        'select * from user where uid = ?',
        uid
      )
      // 假定这里还有一些复杂的计算，然后返回需要的信息。
      const picture = await this.getPicture(uid)
      return {
        name: user.user_name,
        age: user.age,
        picture,
      }
    }
    async getPicture(uid) {
      const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, {
        dataType: 'json',
      })
      return result.data
    }
  }
  module.exports = UserService
}

function mockEgg() {
  /**
   * npm i egg-init -g
     egg-init egg-example --type=simple
     cd egg-example
     npm i
  */

  const Koa = require('koa')
  const app = new Koa()
  const fs = require('fs')
  const route = require('koa-route')
  //   const app = new Koa()

  app.use((ctx) => {
    if (ctx.request.accepts('xml')) {
      ctx.response.type = 'xml'
      ctx.response.body = '<data>Hello World</data>'
    } else if (ctx.request.accepts('json')) {
      ctx.response.type = 'json'
      ctx.response.body = { data: 'Hello World' }
    } else if (ctx.request.accepts('html')) {
      ctx.response.type = 'html'
      ctx.response.body = '<p>Hello World</p>'
    } else {
      ctx.response.type = 'text'
      ctx.response.body = 'Hello World'
    }
  })

  app
    .use((ctx) => {
      ctx.response.type = 'html'
      ctx.response.body = fs.createReadStream('./demos/template.html')
    })
    .listen(3000)

  app.use((ctx) => {
    if (ctx.request.path !== '/') {
      ctx.response.type = 'html'
      ctx.response.body = '<a href="/">Index Page1</a>'
    } else {
      ctx.response.body = 'Hello World'
    }
  })

  const main = route.get('/', (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = '<a href="/">Index Page1</a>'
  })

  const about = route.get('/about', (ctx) => {
    ctx.response.body = 'Hello World'
  })

  app.use(main)
  app.use(about)

  function handleStatic() {
    const path = require('path')
    const serve = require('koa-static')

    const mainStaic = serve(path.join(__dirname, '../public/'))

    app.use(mainStaic)
  }

  handleStatic()

  const redirect = route.get('/redirect', (ctx) => {
    ctx.response.redirect('/')
    ctx.response.body = '<a href="/">Index Page</a>'
  })
  app.use(redirect)

  // 异步中间件
  function asyncMiddle() {
    // 如果有异步操作（比如读取数据库），中间件就必须写成 async 函数
    const main = async function (ctx, next) {
      ctx.response.type = 'html'
      ctx.response.body = await fs.readFile('./demos/template.html', 'utf8')
    }

    app.use(main)
  }

  // 中间件合成
  function middleMerge() {
    const compose = require('koa-compose')
    const logger = (ctx, next) => {
      console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
      next()
    }

    const main = (ctx) => {
      ctx.response.body = 'Hello World'
    }

    const middlewares = compose([logger, main])

    app.use(middlewares)
  }

  function mock500ErrorMiddle() {
    const main = (ctx) => {
      ctx.throw(500)
    }

    app.use(main)
  }

  function mock404() {
    const main = (ctx) => {
      ctx.response.status = 404
      ctx.response.body = 'Page Not Found'
    }

    app.use(main)
  }

  function mockError() {
    const handler = async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500
        ctx.response.body = {
          message: err.message,
        }
      }
    }

    app.use(handler)
  }

  function mockCookie() {
    const main = function (ctx) {
      const n = Number(ctx.cookies.get('view') || 0) + 1
      ctx.cookies.set('view', n)
      ctx.response.body = n + ' views'
    }

    app.use(main)
  }

  function mockForm() {
    const koaBody = require('koa-body')
    const app = new Koa()

    const main = async function (ctx) {
      const body = ctx.request.body
      if (!body.name) ctx.throw(400, '.name required')
      ctx.body = { name: body.name }
    }

    app.use(koaBody())
    app.use(main)
  }

  function mockUpload() {
    const os = require('os')
    const path = require('path')
    const fs = require('fs')
    const koaBody = require('koa-body')

    const main = async function (ctx) {
      const tmpdir = os.tmpdir()
      const filePaths = []
      const files = ctx.request.body.files || {}

      for (let key in files) {
        const file = files[key]
        const filePath = path.join(tmpdir, file.name)
        const reader = fs.createReadStream(file.path)
        const writer = fs.createWriteStream(filePath)
        reader.pipe(writer)
        filePaths.push(filePath)
      }

      ctx.body = filePaths
    }

    app.use(koaBody({ multipart: true }))
    app.use(main)
  }

  // 运行过程中一旦出错，Koa 会触发一个error事件。监听这个事件，也可以处理错误
  app.on('error', (err, ctx) => {
    console.error('server error', err)
  })

  app
    .use((ctx) => {
      //处理请求的中间件
      ctx.response.body = 'hello world'
    })
    .listen(3000)
}
