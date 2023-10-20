var http = require('http')
var querystring = require('querystring')
var url = require('url')

let res = null
let req = null
// http server 例子
var server = http.createServer(function (serverReq, res1) {
  var url = serverReq.url
  req = serverReq
  res1.statusCode = 200
  res1.statusMessage = 'ok'
  res1.writeHead(200, 'ok', {
    'Content-Type': 'text/plain',
  })
  res = res1
  res1.end('您访问的地址是：' + url)
})

server.listen(3000)

// http client 例子
var client = http.get('http://127.0.0.1:3000', function (clientRes) {
  clientRes.pipe(process.stdout)
})

// 设置响应头部
// res提供了 res.writeHead()、response.setHeader() 来实现响应头部的设置。
res.writeHead(200, 'ok', {
  'Content-Type': 'text-plain',
})

res.setHeader('Content-Type', 'text-plain')
// 删
res.removeHeader('Content-Type')
res.setHeader('Content-Type', 'text/html') // 覆盖
// 查
res.getHeader('content-type')

// req它其实是http.IncomingMessage实例，在服务端、客户端作用略微有差异
// 服务端处：获取请求方的相关信息，如request header等。
// 客户端处：获取响应方返回的相关信息，如statusCode等。
// 服务端
var server = http.createServer(function (req, res) {
  console.log(req.headers)
  console.log('1、客户端请求url：' + req.url)
  console.log('2、http版本：' + req.httpVersion)
  console.log('3、http请求方法：' + req.method)
  console.log('4、http请求头部' + JSON.stringify(req.headers))
  var urlObj = url.parse(req.url)
  var query = urlObj.query
  var queryObj = querystring.parse(query)

  console.log(JSON.stringify(queryObj))
  res.end('ok')
})

// 客户端
http.get('http://127.0.0.1:3000', function (res) {
  console.log(res.statusCode)
})

// post请求参数
var server = http.createServer(function (req, res) {
  var body = ''
  req.on('data', function (thunk) {
    body += thunk
  })

  req.on('end', function () {
    console.log('post body is: ' + body)
    res.end('ok')
  })
})

var PORT = 3000
var requestIndex = 0
var connectionIndex = 0

var server = http.createServer(function (req, res) {
  res.end('ok')
})

server.on('request', function (req, res) {
  requestIndex++
  console.log('request event: 第' + requestIndex + '个请求！')
})

server.on('connection', function (req, res) {
  connectionIndex++
  console.log('connection event: 第' + connectionIndex + '个请求！')
})

// ClientRequest概览
var options = {
  protocol: 'http:',
  hostname: 'id.qq.com',
  port: '80',
  path: '/',
  method: 'GET',
}

var client = http.request(options, function (res) {
  var data = ''
  res.setEncoding('utf8')
  res.on('data', function (chunk) {
    data += chunk
  })
  res.on('end', function () {
    console.log(data)
  })
})

client.end()

http.get('http://id.qq.com/', function (res) {
  var data = ''
  res.setEncoding('utf8')
  res.on('data', function (chunk) {
    data += chunk
  })
  res.on('end', function () {
    console.log(data)
  })
})

var url = 'http://id.qq.com/'

var client = http.get(url, function (res) {
  console.log('1. response event')
})

client.on('response', function (res) {
  console.log('2. response event')
})

client.end()
