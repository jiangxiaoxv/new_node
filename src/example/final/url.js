// url模块三个方法分别是：

// .parse(urlString)：将url字符串，解析成object，便于开发者进行操作。
// .format(urlObj)：.parse() 方法的反向操作。
// .resove(from, to)：以from作为起始地址，解析出完整的目标地址（还是看直接看例子好些）
var url = require('url')
function mockUrl() {
  var str =
    'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1'

  var obj = url.parse(str)
  console.log(obj)
  // 对参数值进行decode
  var obj = url.parse(str, true)
  console.log(obj)
  // 针对路径 //foo/bar 的处理
  var str = '//foo/bar'
  var obj = url.parse(str, true, false) // false好使
  console.log(obj)

  obj = url.parse(str, true, true)
  console.log(obj)

  // url.format(urlObject)
  // url.parse(str)的反向操作，没什么好说的。urlObject包含了很多字段，比如protocol、slashes、protocol等，且不一定需要全部传，所以有一套解析逻辑。

  // url.resolve(from, to)
}
console.log(url.resolve('/one/two/three', 'four')) // '/one/two/four'
