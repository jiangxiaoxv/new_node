var fs = require('fs')
var data

try {
  data = fs.readFileSync('./fileForRead.txt', 'utf8')
  console.log('文件内容: ' + data)
} catch (err) {
  console.error('读取文件出错: ' + err.message)
}

fs.readFile('./fileForRead.txt', 'utf8', function (err, data) {
  if (err) {
    return console.error('读取文件出错: ' + err.message)
  }
  console.log('文件内容: ' + data)
})

// 适合读取大文件
var readStream = fs.createReadStream('./fileForRead.txt', 'utf8')

readStream
  .on('data', function (chunk) {
    console.log('读取数据: ' + chunk)
  })
  .on('error', function (err) {
    console.log('出错: ' + err.message)
  })
  .on('end', function () {
    // 没有数据了
    console.log('没有数据了')
  })
  .on('close', function () {
    // 已经关闭，不会再有事件抛出
    console.log('已经关闭')
  })

// 文件写入
// 以下代码，如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
fs.writeFile('./fileForWrite.txt', 'hello world', 'utf8', function (err) {
  if (err) throw err
  console.log('文件写入成功')
})

try {
  fs.writeFileSync('./fileForWrite1.txt', 'hello world', 'utf8')
  console.log('文件写入成功')
} catch (err) {
  throw err
}

var writeStream = fs.createWriteStream('./fileForWrite1.txt', 'utf8')

writeStream.on('close', function () {
  // 已经关闭，不会再有事件抛出
  console.log('已经关闭')
})

writeStream.write('hello')
writeStream.write('world')
writeStream.end('')

// 判断文件是否存在
// fs.access()除了判断文件是否存在（默认模式），还可以用来判断文件的权限
fs.access('./fileForRead.txt', function (err) {
  if (err) throw err
  console.log('fileForRead.txt存在')
})

fs.access('./fileForRead2.txt', function (err) {
  if (err) throw err
  console.log('fileForRead2.txt存在')
})

// 异步版本（如果目录已存在，会报错） 创建目录
fs.mkdir('./hello', function (err) {
  if (err) throw err
  console.log('目录创建成功')
})

fs.mkdirSync('./hello')

// 删除文件
fs.unlink('./fileForUnlink.txt', function (err) {
  if (err) throw err
  console.log('文件删除成功')
})
fs.unlinkSync('./fileForUnlink.txt')

// 遍历目录
// 注意：fs.readdirSync()只会读一层，所以需要判断文件类型是否目录，如果是，则进行递归遍历。
var path = require('path')

var getFilesInDir = function (dir) {
  var results = [path.resolve(dir)]
  var files = fs.readdirSync(dir, 'utf8')

  files.forEach(function (file) {
    file = path.resolve(dir, file)

    var stats = fs.statSync(file)

    if (stats.isFile()) {
      results.push(file)
    } else if (stats.isDirectory()) {
      results = results.concat(getFilesInDir(file))
    }
  })

  return results
}

var files = getFilesInDir('../')
console.log(files)

// 文件重命名
fs.rename('./hello', './world', function (err) {
  if (err) throw err
  console.log('重命名成功')
})
fs.renameSync('./world', './hello')

// fs.watch()比fs.watchFile()高效很多
// fs.watchFile()
// 实现原理：轮询。每隔一段时间检查文件是否发生变化。所以在不同平台上表现基本是一致的。
var options = {
  persistent: true, // 默认就是true
  interval: 2000, // 多久检查一次
}

// curr, prev 是被监听文件的状态, fs.Stat实例
// 可以通过 fs.unwatch() 移除监听
fs.watchFile('./fileForWatch.txt', options, function (curr, prev) {
  console.log('修改时间为: ' + curr.mtime)
})

// 修改权限
// 可以用fs.chmod()，也可以用fs.fchmod()。两者的区别在于，前面传的是文件路径，后面传的的文件句柄。
// fs.chmod()、fs.lchmod()区别：如果文件是软连接，那么fs.chmod()修改的是软连接指向的目标文件；fs.lchmod()修改的是软连接。
fs.chmod('./fileForChown.txt', '777', function (err) {
  if (err) console.log(err)
  console.log('权限修改成功')
})
fs.chmodSync('./fileForChown.txt', '777')

// 获取文件状态
// fs.stat() vs fs.fstat()：传文件路径 vs 文件句柄。
/**
 * stats.isFile() -- 是否文件
stats.isDirectory() -- 是否目录
stats.isBlockDevice() -- 什么鬼
stats.isCharacterDevice() -- 什么鬼
stats.isSymbolicLink() (only valid with fs.lstat()) -- 什么鬼
stats.isFIFO() -- 什么鬼
stats.isSocket() -- 是不是socket文件
 */
var getTimeDesc = function (d) {
  return (
    [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') +
    ' ' +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
  )
}

fs.stat('./fileForStat.txt', function (err, stats) {
  console.log('文件大小: ' + stats.size)
  console.log('创建时间: ' + getTimeDesc(stats.birthtime))
  console.log('访问时间: ' + getTimeDesc(stats.atime))
  console.log('修改时间: ' + getTimeDesc(stats.mtime))
})

var stats = fs.statSync('./fileForStat.txt')

console.log('文件大小: ' + stats.size)
console.log('创建时间: ' + getTimeDesc(stats.birthtime))
console.log('访问时间: ' + getTimeDesc(stats.atime))
console.log('修改时间: ' + getTimeDesc(stats.mtime))

// 访问/权限检测
fs.access('./fileForAccess.txt', function (err) {
  if (err) throw err
  console.log('可以访问')
})
// 如果成功，则返回undefined，如果失败，则抛出错误（什么鬼）
try {
  fs.accessSync('./fileForAccess.txt')
} catch (e) {
  throw e
}

// 追加文件内容
/**
 * file：可以是文件路径，也可以是文件句柄。（还可以是buffer？）
    data：要追加的内容。string或者buffer。
    options
        encoding：编码，默认是utf8
        mode：默认是0o666
        flag：默认是a
 */
fs.appendFile('./extra/fileForAppend.txt', 'hello', 'utf8', function (err) {
  if (err) throw err
  console.log('append成功')
})

// 删除目录
fs.rmdir('./dirForRemove', function (err) {
  if (err) throw err
  console.log('目录删除成功')
})

// 自定义stdout
// 可以通过 new console.Console(stdout, stderr) 来创建自定义的console实例，这个功能很实用。
// 比如你想将调试信息打印到本地文件，那么，就可以通过如下代码实现。
var file = fs.createWriteStream('./stdout.txt')

var logger = new console.Console(file, file)
logger.log('hello')
logger.log('word')

// 深层打印
// 很少关注 console.dir(obj)，因为大部分时候表现跟 console.log(obj) 差不多，看例子
// 但当obj的层级比较深时，用处就出来了。可以通过depth自定义打印的层级数，默认是2，这对于调试很有帮助。
var obj2 = {
  human: {
    man: {
      info: {
        nick: 'chyingp',
      },
    },
  },
}

console.log(obj2) // 输出：{ human: { man: { info: [Object] } } }
console.dir(obj2) // 输出：{ human: { man: { info: [Object] } } }

console.dir(obj2, { depth: 3 }) // 输出：{ human: { man: { info: { nick: 'chyingp' } } }
