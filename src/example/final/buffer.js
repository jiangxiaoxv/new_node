// Buffer是node的核心模块，开发者可以利用它来处理二进制数据，比如文件流的读写、网络请求数据的处理等。
var buf = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
var array = 'buffer'.split('').map(function (v) {
  return '0x' + v.charCodeAt(0).toString(16)
})
var buf1 = Buffer.alloc(10) // 长度为10的buffer，初始值为0x0
var buf2 = Buffer.alloc(10, 1) // 长度为10的buffer，初始值为0x1
var buf3 = Buffer.allocUnsafe(10) // 长度为10的buffer，初始值不确定
var buf4 = Buffer.from([1, 2, 3]) // 长度为3的buffer，初始值为 0x01, 0x02, 0x03
var buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
var buf = Buffer.from('this is a tést') // 默认采用utf8
console.log(buf.toString()) // 默认编码是utf8，所以正常打印

var letter = 'é'
var buff = Buffer.from(letter) // 默认编码是utf8，这里占据两个字节 <Buffer c3 a9>
var len = buff.length // 2
var code = buff[0] // 第一个字节为0xc3，即195：超出ascii的最大支持范围
var binary = code.toString(2) // 195的二进制：10101001
var finalBinary = binary.slice(1) // 将高位的1舍弃，变成：0101001
var finalCode = parseInt(finalBinary, 2) // 0101001 对应的十进制：67
var finalLetter = String.fromCharCode(finalCode) // 67对应的字符：C

// 同理 0xa9最终转成的ascii字符为)
// 所以，最终输出为 this is a tC)st

var buff = Buffer.from('buffer')
var buff2 = Buffer.from(buff)

console.log(buff.toString()) // 输出：buffer
console.log(buff2.toString()) // 输出：buffer

buff2[0] = 0x61

console.log(buff.toString()) // 输出：buffer
console.log(buff2.toString()) // 输出：auffer

// buf.equals(otherBuffer)
// 判断两个buffer实例存储的数据是否相同，如果是，返回true，否则返回false
// 例子一：编码一样，内容相同
var buf1 = Buffer.from('A')
var buf2 = Buffer.from('A')

console.log(buf1.equals(buf2)) // true

// 例子三：编码不一样，内容相同
var buf5 = Buffer.from('ABC') // <Buffer 41 42 43>
var buf6 = Buffer.from('414243', 'hex')

console.log(buf5.equals(buf6)) //true
//只要比较的两者内容相同,`buf.equals(otherBuffer)` 就返回true

// buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
// 同样是对两个buffer实例进行比较，不同的是：
// 可以指定特定比较的范围（通过start、end指定）
// 返回值为整数，达标buf、target的大小关系
/* 假设返回值为
0：buf、target大小相同。
1：buf大于target，也就是说buf应该排在target之后。
-1：buf小于target，也就是说buf应该排在target之前。
 */

var buff1 = Buffer.alloc(10)
var buff2 = Buffer.alloc(20)

var totalLength = buff1.length + buff2.length

console.log(totalLength) // 30

var buff3 = Buffer.concat([buff1, buff2], totalLength)

console.log(buff3.length) // 30
var buff1 = Buffer.from([1, 2])
var buff2 = Buffer.alloc(2)

buff1.copy(buff2)

console.log(buff2) // <Buffer 01 02>
buf2 = Buffer.allocUnsafe(26).fill('!')

// buf.write(string[, offset[, length]][, encoding])
var buff = Buffer.alloc(4)
buff.write('a') // 返回 1
console.log(buff) // 打印 <Buffer 61 00 00 00>

buff.write('ab') // 返回 2
console.log(buff) // 打印 <Buffer 61 62 00 00>

// 填充：buf.fill(value[, offset[, end]][, encoding])
// 用value填充buf，常用于初始化buf。参数说明如下：
var buff = Buffer.alloc(20).fill('a')

console.log(buff.toString()) // aaaaaaaaaaaaaaaaaaaa
var buff = Buffer.from('hello')

console.log(buff.toString()) // hello

console.log(buff.toString('utf8', 0, 2)) // he
var buff = Buffer.from('hello')

console.log(buff.toJSON()) // { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }

var buff = Buffer.from('abcde')

for (const key of buff.keys()) {
  console.log('key is %d', key)
}
// key is 0
// key is 1
// key is 2
// key is 3
// key is 4

for (const value of buff.values()) {
  console.log('value is %d', value)
}
// value is 97
// value is 98
// value is 99
// value is 100
// value is 101
for (const pair of buff.entries()) {
  console.log('buff[%d] === %d', pair[0], pair[1])
}
// buff[0] === 97
// buff[1] === 98
// buff[2] === 99
// buff[3] === 100
// buff[4] === 101
var buff1 = Buffer.from('abcde')
console.log(buff1) // <Buffer 61 62 63 64 65>

var buff2 = buff1.slice()
console.log(buff2) // <Buffer 61 62 63 64 65>

var buff3 = buff1.slice(1, 3)
console.log(buff3) // <Buffer 62 63>

buff3[0] = 97 // parseInt(61, 16) ==> 97
console.log(buff1) // <Buffer 62 63>
