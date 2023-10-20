// http.Server继承了net.Server，此外，http客户端与http服务端的通信均依赖于socket（net.Socket）。也就是说，做node服务端编程，net基本是绕不开的一个模块。
/**
 * net 模块包含两个部分
 * net.Server：TCP server，内部通过socket来实现与客户端的通信。
 * net.Socket：tcp/本地 socket的node版实现，它实现了全双工的stream接口。
 */
var net = require('net')

var PORT = 3000
var HOST = '127.0.0.1'

// tcp服务端
var server = net.createServer(function (socket) {
  console.log('服务端：收到来自客户端的请求')

  socket.on('data', function (data) {
    console.log('服务端：收到客户端数据，内容为{' + data + '}')

    // 给客户端返回数据
    socket.write('你好，我是服务端')
  })

  socket.on('close', function () {
    console.log('服务端：客户端连接断开')
  })
})
server.listen(PORT, HOST, function () {
  console.log('服务端：开始监听来自客户端的请求')
})

console.log(server.address())
server.close(function (error) {
  if (error) {
    console.log('close回调：服务端异常：' + error.message)
  } else {
    console.log('close回调：服务端正常关闭')
  }
})

server.on('error', function (error) {
  console.log('error事件：服务端异常：' + error.message)
})

server.on('connection', function (socket) {
  socket.end('2. connection 触发\n')
})
// 输出如下 { port: 3000, family: 'IPv4', address: '127.0.0.1' }

// var net = require('net');

var PORT = 3000
var HOST = '127.0.0.1'

// tcp客户端
var client = net.createConnection(PORT, HOST)

client.on('connect', function () {
  console.log('客户端：已经与服务端建立连接')
})

client.on('data', function (data) {
  console.log('客户端：收到服务端数据，内容为{' + data + '}')
})

client.on('close', function (data) {
  console.log('客户端：连接断开')
})

client.end('你好，我是客户端')
