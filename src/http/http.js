const http = require('http')

const server = http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain',
  })
  response.end('hello Node.js😀')
})

server.listen(3000, 'localhost')

server.on('listening', function () {
  console.log('Server is listening')
  // server.close()
})

server.on('connection', function () {
  console.log('Client is connected')
})

server.on('close', function () {
  console.log('server is closed')
})

console.log('Node Server started on port 3000')

// http 模块采用的是1.1版本
// 会采用keep-alive 短时间内再次发送请求会服用原有连接，所以不会打印Client is connected
// 过一会keep-alive中断，才会重新连接，会再次打印Client is connected
