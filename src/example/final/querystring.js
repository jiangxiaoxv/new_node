// 在nodejs中，提供了querystring这个模块，用来做url查询参数的解析，使用非常简单
// .parse()：对url查询参数（字符串）进行解析，生成易于分析的json格式。
// .stringif()：跟**.parse()**相反，用于拼接查询查询。

var querystring = require('querystring')
var str = 'nick=casper&age=24'
var obj = querystring.parse(str)
console.log(JSON.stringify(obj, null, 4))

// 再来看下sep、eq有什么作用。相当于可以替换&、=为自定义字符，对于下面的场景来说还是挺省事的。
var str1 = 'nick=casper&age=24&extra=name-chyingp|country-cn'
var obj1 = querystring.parse(str1)
var obj2 = querystring.parse(obj1.extra, '|', '-')
console.log(JSON.stringify(obj2, null, 4))

// 没什么好说的，相当于parse的逆向操作。直接看代码
var querystring = require('querystring')

var obj1 = {
  nick: 'casper',
  age: '24',
}
var str1 = querystring.stringify(obj1)
console.log(str1)

var obj2 = {
  name: 'chyingp',
  country: 'cn',
}
var str2 = querystring.stringify(obj2, '|', '-')
console.log(str2)
