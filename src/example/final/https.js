// 这个模块的重要性，基本不用强调了。在网络安全问题日益严峻的今天，网站采用HTTPS是个必然的趋势。
var https = require('https')

https
  .get('https://www.baidu.com', function (res) {
    console.log('status code: ' + res.statusCode)
    console.log('headers: ' + JSON.stringify(res.headers))

    res.on('data', function (data) {
      process.stdout.write(data)
    })
  })
  .on('error', function (err) {
    console.error(err)
  })
