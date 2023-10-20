// dgram模块是对UDP socket的一层封装，相对net模块简单很多，下面看例子。
// 例子：UDP服务端
var PORT = 33333
var HOST = '127.0.0.1'

var dgram = require('dgram')
var server = dgram.createSocket('udp4')

server.on('listening', function () {
  var address = server.address()
  console.log('UDP Server listening on ' + address.address + ':' + address.port)
})

server.on('message', function (message, remote) {
  console.log(remote.address + ':' + remote.port + ' - ' + message)
})

server.bind(PORT, HOST)

// 例子：UDP客户端
var PORT = 33333
var HOST = '127.0.0.1'

var dgram = require('dgram')
var message = Buffer.from('My KungFu is Good!')

var client = dgram.createSocket('udp4')

client.send(message, PORT, HOST, function (err, bytes) {
  if (err) throw err
  console.log('UDP message sent to ' + HOST + ':' + PORT)
  client.close()
})

client.bind(function () {
  client.setBroadcast(true)
  client.send(msg, port, host, function (err) {
    if (err) throw err
    console.log('msg has been sent')
    client.close()
  })
})
