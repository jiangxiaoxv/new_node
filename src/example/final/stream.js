const fs = require('fs')

fs.createReadStream('./url.js').pipe(process.stdout)

// ------------->
var fs = require('fs')

var readStream = fs.createReadStream('./sample.txt')
var content = ''

readStream.setEncoding('utf8')

readStream.on('data', function (chunk) {
  content += chunk
})

readStream.on('end', function (chunk) {
  // 文件读取完成，文件内容是 [你好，我是程序猿小卡]
  console.log('文件读取完成，文件内容是 [%s]', content)
})

// ------------->

var fs = require('fs')
fs.createReadStream('./sample.txt').pipe(process.stdout)

// ------------->
var fs = require('fs')

var onEnd = function () {
  process.stdout.write(']')
}

var fileStream = fs.createReadStream('./sample.txt')
fileStream.on('end', onEnd)

fileStream.pipe(process.stdout)

process.stdout.write('文件读取完成，文件内容是[')

// 写入流
var fs = require('fs')
var content = 'hello world'
var filepath = './sample.txt'

fs.writeFile(filepath, content)
// ------------->

var fs = require('fs')
var content = 'hello world'
var filepath = './sample.txt'

var writeStram = fs.createWriteStream(filepath)
writeStram.write(content)
writeStram.end()

var net = require('net')
var opt = {
  host: '127.0.0.1',
  port: '3000',
}

var server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log('client send message: ', data.toString())
  })
  socket.write('hello client')
})
server.listen(opt.port, opt.host, () => {
  console.log(server.address())
})

var net = require('net')
var opt = {
  host: '127.0.0.1',
  port: '3000',
}

var client = net.connect(opt, function () {
  client.write('msg from client') // 可写
})

// 可读
client.on('data', function (data) {
  // lient: got reply from server [reply from server]
  console.log('client: got reply from server [%s]', data)
  client.end()
})

// 转换流
var fs = require('fs')
var zlib = require('zlib')

var gzip = zlib.createGzip()

var inFile = fs.createReadStream('./extra/fileForCompress.txt')
var out = fs.createWriteStream('./extra/fileForCompress.txt.gz')

inFile.pipe(gzip).pipe(out)
