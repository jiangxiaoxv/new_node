var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello world!')
})

app.listen(3000)

// 简单说，中间件（middleware）就是处理HTTP请求的函数。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。App实例在运行过程中，会调用一系列的中间件
// 每个中间件可以从App实例，接收三个参数，依次为request对象（代表HTTP请求）、response对象（代表HTTP回应），next回调函数（代表下一个中间件）。每个中间件都可以对HTTP请求（request对象）进行加工，并且决定是否调用next方法，将request对象再传给下一个中间件。
function uselessMiddleware(req, res, next) {
  next()
}
// 上面代码的next就是下一个中间件。如果它带有参数，则代表抛出一个错误，参数为错误文本,抛出错误以后，后面的中间件将不再执行，直到发现一个错误处理函数为止
var express = require('express')
var http = require('http')

var app = express()

app.use(function (request, response, next) {
  console.log('In comes a ' + request.method + ' to ' + request.url)
  next()
})

app.use(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello world!\n')
})

http.createServer(app).listen(1337)

var express = require('express')
var http = require('http')

var app = express()

app.use(function (request, response, next) {
  if (request.url == '/') {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Welcome to the homepage!\n')
  } else {
    next()
  }
})

app.use(function (request, response, next) {
  if (request.url == '/about') {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
  } else {
    next()
  }
})

app.use(function (request, response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' })
  response.end('404 error!\n')
})

http.createServer(app).listen(1337)

var express = require('express')
var http = require('http')
var app = express()

app.all('*', function (request, response, next) {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  next()
})

app.get('/', function (request, response) {
  response.end('Welcome to the homepage!')
})

app.get('/about', function (request, response) {
  response.end('Welcome to the about page!')
})

app.get('*', function (request, response) {
  response.redirect('/hello/anime')
  response.redirect('http://www.example.com')
  response.redirect(301, 'http://www.example.com')
  response.sendFile('/path/to/anime.mp4')

  response.end('404!')
})
//  使用render方法，将message变量传入index模板，渲染成HTML网页
app.get('/', function (request, response) {
  response.render('index', { message: 'Hello World' })
})
http.createServer(app).listen(1337)

// 使用set方法，为系统变量“views”和“view engine”指定值
app.set('views', __dirname + '/views')

app.set('view engine', 'jade')
// （1）request.ip

// request.ip属性用于获得HTTP请求的IP地址

// （2）request.files

// request.files用于获取上传的文件

function mockExpress() {
  var fs = require('fs')
  var options = {
    key: fs.readFileSync('E:/ssl/myserver.key'),
    cert: fs.readFileSync('E:/ssl/myserver.crt'),
    passphrase: '1234',
  }

  var https = require('https')
  var express = require('express')
  var app = express()

  app.get('/', function (req, res) {
    res.send('Hello World Expressjs')
  })

  app.get('/', function (req, res) {
    res.sendfile('./views/index.html')
  })

  var server = https.createServer(options, app)
  server.listen(8084)
  console.log('Server is running on port 8084')
}

// 动态网页模版
function mockExpressDy() {
  // app.js文件

  var express = require('express')
  var app = express()

  // 加载hbs模块
  // npm install hbs --save-dev
  var hbs = require('hbs')

  // 指定模板文件的后缀名为html
  app.set('view engine', 'html')

  // 运行hbs模块
  app.engine('html', hbs.__express)

  app.get('/', function (req, res) {
    res.render('index')
  })

  app.get('/about', function (req, res) {
    res.render('about')
  })

  app.get('/article', function (req, res) {
    res.render('article')
  })
}

function mockTemplate() {
  var express = require('express')
  var app = express()

  var hbs = require('hbs')

  // 加载数据模块
  var blogEngine = require('./blog')

  app.set('view engine', 'html')
  app.engine('html', hbs.__express)
  app.use(express.bodyParser())

  app.get('/', function (req, res) {
    res.render('index', {
      title: '最近文章',
      entries: blogEngine.getBlogEntries(),
    })
  })

  app.get('/about', function (req, res) {
    res.render('about', { title: '自我介绍' })
  })

  app.get('/article/:id', function (req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id)
    res.render('article', { title: entry.title, blog: entry })
  })

  app.listen(3000)

  app.use(express.static('public'))
}

function mockRoute() {
  var router = express.Router()

  router.get('/', function (req, res) {
    res.send('首页')
  })

  router.get('/about', function (req, res) {
    res.send('关于')
  })
  router
    .route('/api')
    .post(function (req, res) {
      // ...
    })
    .get(function (req, res) {
      /* Bear.find(function (err, bears) {
        if (err) res.send(err)
        res.json(bears)
      }) */
    })

  router.use(function (req, res, next) {
    console.log(req.method, req.url)
    next()
  })

  router.param('name', function (req, res, next, name) {
    // 对name进行验证或其他处理……
    console.log(name)
    req.name = name
    next()
  })

  router.get('/hello/:name', function (req, res) {
    res.send('hello ' + req.name + '!')
  })

  app
    .route('/login')
    .get(function (req, res) {
      res.send('this is the login form')
    })
    .post(function (req, res) {
      console.log('processing')
      res.send('processing the login form!')
    })

  //   app.use('/', router)
  app.use('/', router)
}

function mockUpload() {
  // 然后，服务器脚本建立指向/upload目录的路由。这时可以安装multer模块，它提供了上传文件的许多功能
  var express = require('express')
  var router = express.Router()
  var multer = require('multer')

  var uploading = multer({
    dest: __dirname + '../public/uploads/',
    // 设定限制，每次最多上传1个文件，文件大小不超过1MB
    limits: { fileSize: 1000000, files: 1 },
  })

  router.post('/upload', uploading, function (req, res) {})

  module.exports = router
}

function mockBodyPost() {
  // 跨域支持
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
    )
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') {
      res.send(200) /*让options请求快速返回*/
    } else {
      next()
    }
  })
  // post 参数接收，可依赖第三方模块 body-parser 进行转换会更方便、更简单，该模块用于处理 JSON, Raw, Text 和 URL 编码的数据。
  // 安装 body-parser npm install body-parser
  // 参数接受和 GET 基本一样，不同的在于 GET 是 request.query 而 POST 的是 request.body
  var bodyParser = require('body-parser')
  // 创建 application/x-www-form-urlencoded 编码解析
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  app.post('/getUsers', urlencodedParser, function (request, response) {
    var params = {
      username: request.body.username,
      age: request.body.age,
    }
    response.send(params)
  })
}

function mockExpress() {
  //npm install express
  var express = require('express')
  var cookieParser = require('cookie-parser')
  //npm install body-parser
  var bodyParser = require('body-parser')
  var app = express()
  //配置静态文件夹,在本地public读取css,js,html等文件
  app.use(express.static('public'))
  app.use(cookieParser())
  //post请求需要body-parser模块处理
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  )
  app.get('/', function (req, res) {
    res.send('Hello World!')
  })
  app.get('/home', function (req, res) {
    //get请求参数对象
    console.log('get请求参数对象:', req.query)
    res.send('get请求')
  })
  app.post('/home', function (req, res) {
    //post请求参数对象
    console.log('post请求参数对象:', req.body)
    res.send('post请求')
  })
  app.get('/add/:id/:age', function (req, res) {
    //追加请求头
    res.append('Access-Control-Allow-Origin', '*')
    //?id=xx&age=xxx
    console.log(req.query)
    //:id/:age
    console.log(req.params)
    res.send('Hello Oaoafly')
  })
  // 这个设置视图文件的放置地方，然后配置jade为其模板渲染引擎，这里也需要安装jade模块实现
  //views, 放模板文件的目录，比如：
  app.set('views', './views')
  //view engine, 模板引擎
  app.set('view engine', 'jade')
  app.use(express.static('public'))
  app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/public' + 'index.html')
  })
  app.get('/', function (req, res) {
    /* connection.query('select * from news', function (err, data) {
      var content = 'Hello Oaoafly'
      res.render('qianfeng', {
        //model
        name: 'xie',
        name2: 'lan',
        news: data,
      })
    }) */
    //res.send("<p style='color:red'>"+content+"</p>");
  })
  // 还有值得注意的一点就是，对于每个应用程序，可以有多个静态目录，比如你可以按上传的文件类型分目录，当我们找某张图片的时候就会从这几个静态文件夹中一起找取
  app.use(express.static('public'))
  app.use(express.static('uploads'))
  app.use(express.static('files'))

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asm',
  })
  //执行数据库连接 .close();
  connection.connect()
  app.post('/add', function (req, res) {
    //追加请求头
    res.append('Access-Control-Allow-Origin', '*')
    console.log(req.body)
    connection.query(
      "insert into news (title,text) values ('" +
        req.body.title +
        "','" +
        req.body.text +
        "')",
      function (err, data) {
        console.log(data)
      }
    )
    res.send('增加信息')
  })

  var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
  })
}

function mockFilter() {
  const express = require('express')
  const app = express()

  let filter = (req, res, next) => {
    if (req.params.name == 'admin' && req.params.pwd == 'admin') {
      next()
    } else {
      next('用户名密码不正确')
    }
  }

  app
    .get('/:name/:pwd', filter, (req, res) => {
      res.send('ok')
    })
    .listen(88)
}

function mockGlobalUse() {
  const express = require('express')
  const app = express()

  let filter = (req, res, next) => {
    if (req.params.name == 'admin' && req.params.pwd == 'admin') {
      next()
    } else {
      next('用户名密码不正确')
    }
  }

  app.use(filter)

  app
    .get('/:name/:pwd', (req, res) => {
      res.send('ok')
    })
    .listen(88)
}

function mockUpload() {
  const express = require('express')
  const path = require('path')
  const fs = require('fs')
  const https = require('https')
  // 根据项目的路径导入生成的证书文件
  const privateKey = fs.readFileSync(
    path.join(__dirname, '../github.key'),
    'utf8'
  )
  const certificate = fs.readFileSync(
    path.join(__dirname, '../github.crt'),
    'utf8'
  )
  const credentials = {
    key: privateKey,
    cert: certificate,
  }
  // 创建express实例
  const app = express()
  // 处理请求
  app.get('/', async (req, res) => {
    res.status(200).send('Hello World!')
  })
  // 创建https服务器实例
  const httpsServer = https.createServer(credentials, app)
  // 设置https的访问端口号
  const SSLPORT = 8889
  // 启动服务器，监听对应的端口
  httpsServer.listen(SSLPORT, () => {
    console.log(`HTTPS Server is running on: https://localhost:${SSLPORT}`)
  })
}
