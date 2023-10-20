/**
 * path.dirname()
 * path.basename()
 * path.extname()
 */

const path = require('path')
var filepath = '/tmp/demo/js/test.js'

// 获取路径/文件名/扩展名
console.log(path.dirname(filepath))
console.log(path.basename('/tmp/demo/js/test.js'))

// 只想获取文件名，单不包括文件扩展呢
console.log(path.basename('/tmp/demo/js/test.js', '.js'))

// 获取文件扩展名
// 输出：.js
console.log(path.extname(filepath))

// 路径组合
// 输出 '/foo/bar/baz/asdf'
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path/www/js/mod.js
console.log(path.resolve('www', 'js/upload', '../mod.js'))

// 路径解析
// 输出 demo/js/upload/
console.log(path.normalize('demo/js/upload/'))
// 文件路径分解/组合
/**
 * path.format(pathObject)：将pathObject的root、dir、base、name、ext属性，按照一定的规则，组合成一个文件路径。
 * path.parse(filepath)：path.format()方法的反向操作。
 */
var p1 = path.format({
  root: '/tmp/',
  base: 'hello.js',
})
console.log(p1) // 输出 /tmp/hello.js

var p2 = path.format({
  dir: '/tmp',
  name: 'hello',
  ext: '.js',
})
console.log(p2) // 输出 /tmp/hello.js

path.parse('/home/user/dir/file.txt')
// returns
// {
//    root : "/",
//    dir : "/home/user/dir",
//    base : "file.txt",
//    ext : ".txt",
//    name : "file"
// }

// 获取相对路径
// path.relative(from, to)

var p1 = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
console.log(p1) // 输出 "../../impl/bbb"
// 如果from、to指向同个路径，那么，返回空字符串。
// 如果from、to中任一者为空，那么，返回当前工作路径。

/**
 * path.sep：路径分隔符。在linux上是/，在windows上是\。
 * path.delimiter：path设置的分割符。linux上是:，windows上是;。
 */
