var crypto = require('crypto')
var fs = require('fs')

var content = fs.readFileSync('./test.txt', { encoding: 'utf8' })
var hash = crypto.createHash('sha256')
var output

hash.update(content)

output = hash.digest('hex')

console.log(output)

var crypto = require('crypto')
var md5 = crypto.createHash('md5')

var result = md5.update('a').digest('hex')

// 输出：0cc175b9c0f1b6a831c399e269772661
console.log(result)
