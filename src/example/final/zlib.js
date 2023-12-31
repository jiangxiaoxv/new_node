var fs = require('fs')
var zlib = require('zlib')

var gzip = zlib.createGzip()

var inFile = fs.createReadStream('./extra/fileForCompress.txt')
var out = fs.createWriteStream('./extra/fileForCompress.txt.gz')

inFile.pipe(gzip).pipe(out)

// 解压
var fs = require('fs')
var zlib = require('zlib')

var gunzip = zlib.createGunzip()

var inFile = fs.createReadStream('./extra/fileForCompress.txt.gz')
var outFile = fs.createWriteStream('./extra/fileForCompress1.txt')

inFile.pipe(gunzip).pipe(outFile)

// 服务端解压
function mockServerGunzip() {
  var http = require('http')
  var zlib = require('zlib')
  var fs = require('fs')
  var filepath = './extra/fileForGzip.html'

  var server = http.createServer(function (req, res) {
    var acceptEncoding = req.headers['accept-encoding']
    var gzip

    if (acceptEncoding.indexOf('gzip') != -1) {
      // 判断是否需要gzip压缩

      gzip = zlib.createGzip()

      // 记得响应 Content-Encoding，告诉浏览器：文件被 gzip 压缩过
      res.writeHead(200, {
        'Content-Encoding': 'gzip',
      })
      fs.createReadStream(filepath).pipe(gzip).pipe(res)
    } else {
      fs.createReadStream(filepath).pipe(res)
    }
  })

  server.listen('3000')
}

function mockStrGzip() {
  var http = require('http')
  var zlib = require('zlib')

  var responseText = 'hello world'

  var server = http.createServer(function (req, res) {
    var acceptEncoding = req.headers['accept-encoding']
    if (acceptEncoding.indexOf('gzip') != -1) {
      res.writeHead(200, {
        'content-encoding': 'gzip',
      })
      res.end(zlib.gzipSync(responseText))
    } else {
      res.end(responseText)
    }
  })

  server.listen('3000')
}
