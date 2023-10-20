// 很有用的调试方法。可以通过 util.debuglog(name) 来创建一个调试fn，这个fn的特点是，只有在运行程序时候，声明环境变量NODE_DEBUG=name，才会打印出调试信息。
// NODE_DEBUG=foo node debuglog.js
var util = require('util')
var logger = util.debuglog('foo')

logger('hello')

var foo = function () {
  console.log('foo')
}

var foo2 = util.deprecate(foo, 'foo is deprecate')

foo2()
