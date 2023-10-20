/**
 * string_decoder模块用于将Buffer转成对应的字符串。使用者通过调用stringDecoder.write(buffer)，可以获得buffer对应的字符串。
   它的特殊之处在于，当传入的buffer不完整（比如三个字节的字符，只传入了两个），内部会维护一个internal buffer将不完整的字节cache住，等到使用者再次调用stringDecoder.write(buffer)传入剩余的字节，来拼成完整的字符。
 */
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder('utf8')
// Buffer.from('你') => <Buffer e4 bd a0>
const str = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0]))
console.log(str) // 你

// 当decoder.end([buffer])被调用时，内部剩余的buffer会被一次性返回。如果此时带上buffer参数，那么相当于同时调用decoder.write(buffer)和decoder.end()。
function mockDecoderEnd() {
  const StringDecoder = require('string_decoder').StringDecoder
  const decoder = new StringDecoder('utf8')

  // Buffer.from('你好') => <Buffer e4 bd a0 e5 a5 bd>
  let str = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0, 0xe5, 0xa5]))
  console.log(str) // 你

  str = decoder.end(Buffer.from([0xbd]))
  console.log(str) // 好
}
