// process是node的全局模块，作用比较直观。可以通过它来获得node进程相关的信息，比如运行node程序时的命令行参数。或者设置进程相关信息，比如设置环境变量。
// 环境变量 Process.env
//  NODE_ENV=production node process.js
function mockEnv() {
  if (process.env.NODE_ENV === 'production') {
    console.log('生产环境')
  } else {
    console.log(process.env.NODE_ENV)
    console.log('非生产环境')
  }
}

// process.nextTick(fn) 将 fn 放到 node 事件循环的 下一个tick 里；
// process.nextTick(fn) 比 setTimetout(fn, 0) 性能高；
function mockNexttick() {
  console.log('海贼王')
  process.nextTick(function () {
    console.log('火影忍者')
  })
  console.log('hah')
}

// mockNexttick()
// process.argv 返回一个数组，数组元素分别如下：
function mockParams() {
  process.argv.forEach(function (val, index, array) {
    console.log('参数' + index + ': ' + val)
  })
}

// mockParams()

function mockDirOrpath() {
  console.log(process.cwd()) //：返回当前工作路径
  //   console.log(process.chdir(directory)) // ：切换当前工作路径
  console.log('Starting directory: ' + process.cwd())
  try {
    process.chdir('/tmp') // 切换当前工作路径
    console.log('New directory: ' + process.cwd())
  } catch (err) {
    console.log('chdir: ' + err)
  }
}
// mockDirOrpath()

function mockStdOrSout() {
  process.stdin.setEncoding('utf8')

  process.stdin.on('readable', () => {
    var chunk = process.stdin.read()
    if (chunk !== null) {
      process.stdout.write(`data: ${chunk}`)
    }
  })

  process.stdin.on('end', () => {
    process.stdout.write('end')
  })
}

// mockStdOrSout()

function mockProcessInfo() {
  // process.pid：返回进程id。
  // process.title：可以用它来修改进程的名字，当你用ps命令，同时有多个node进程在跑的时候，作用就出来了。
  // process.uptime()：当前node进程已经运行了多长时间（单位是秒）。
  // process.memoryUsage()：返回进程占用的内存，单位为字节。输出内容大致如下：
  console.log(process.pid) //：返回进程id。
  process.title = 'jxx'
  console.log(process.title)
  console.log(process.uptime())
  console.log(process.memoryUsage())
}

mockProcessInfo()
