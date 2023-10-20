// 域名解析
var dns = require('dns')

dns.lookup('www.qq.com', function (err, address, family) {
  if (err) throw err
  console.log('例子A: ' + address)
})

var options = { all: true }
// 我们知道，同一个域名，可能对应多个不同的ip。那么，如何获取一个域名对应的多个ip呢？可以这样。
dns.lookup('www.qq.com', options, function (err, address, family) {
  if (err) throw err
  console.log('例子B: ' + address)
})

dns.resolve4('id.qq.com', function (err, address) {
  if (err) throw err
  console.log(JSON.stringify(address))
})

// dns.lookup()跟dns.resolve4()的区别
// 当配置了本地Host时，是否会对查询结果产生影响。

// dns.lookup()：有影响。
// dns.resolve4()：没有影响。
