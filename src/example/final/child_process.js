const spawn = require('child_process').spawn
function mockSpawn() {
  const ls = spawn('ls', ['-lh', '/usr'])

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}

// child_process.exec(command[, options][, callback])
// 创建一个shell，然后在shell里执行命令。执行完成后，将stdout、stderr作为参数传入回调方法。
// 执行成功，error为null；执行失败，error为Error实例。error.code为错误码，
// stdout、stderr为标准输出、标准错误。默认是字符串，除非options.encoding为buffer
function mockExec() {
  var exec = require('child_process').exec

  // 成功的例子
  exec('ls -al', function (error, stdout, stderr) {
    if (error) {
      console.error('error: ' + error)
      return
    }
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + typeof stderr)
  })

  // 失败的例子
  exec('ls hello.txt', function (error, stdout, stderr) {
    if (error) {
      console.error('error: ' + error)
      return
    }
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + stderr)
  })
}

// mockExec()

// child_process.execFile(file[, args][, options][, callback])
// 跟.exec()类似，不同点在于，没有创建一个新的shell。至少有两点影响
// 比child_process.exec()效率高一些。（实际待测试）
// 一些操作，比如I/O重定向，文件glob等不支持。

function mockExecFile() {
  var child_process = require('child_process')

  child_process.execFile(
    'node',
    ['--version'],
    function (error, stdout, stderr) {
      if (error) {
        throw error
      }
      console.log(stdout)
    }
  )

  child_process.execFile(
    '/Users/a/.nvm/versions/node/v6.1.0/bin/node',
    ['--version'],
    function (error, stdout, stderr) {
      if (error) {
        throw error
      }
      console.log(stdout)
    }
  )
}

// child_process.fork(modulePath[, args][, options])
// modulePath：子进程运行的模块。
// execPath： 用来创建子进程的可执行文件，默认是/usr/local/bin/node。也就是说，你可通过execPath来指定具体的node可执行文件路径。（比如多个node版本）
// execArgv： 传给可执行文件的字符串参数列表。默认是process.execArgv，跟父进程保持一致。
// silent： 默认是false，即子进程的stdio从父进程继承。如果是true，则直接pipe向子进程的child.stdin、child.stdout等。
// stdio： 如果声明了stdio，则会覆盖silent选项的设置。
function mockChildProcess() {
  function parent() {
    var child_process = require('child_process')

    var child = child_process.fork('./child.js')

    child.on('message', function (m) {
      console.log('message from child: ' + JSON.stringify(m))
    })

    child.send({ from: 'parent' })
  }

  function child() {
    process.on('message', function (m) {
      console.log('message from parent: ' + JSON.stringify(m))
    })

    process.send({ from: 'child' })
  }
}

// 首先，process.execArgv的定义，参考这里。设置execArgv的目的一般在于，让子进程跟父进程保持相同的执行环境。
function execArgv() {
  function parent() {
    var child_process = require('child_process')

    console.log('parent execArgv: ' + process.execArgv)

    child_process.fork('./child.js', {
      execArgv: process.execArgv,
    })
  }

  function child() {
    console.log('child execArgv: ' + process.execArgv)
  }
}

// child_process.spawn(command[, args][, options]) // 要执行的命令
function mockSpawn() {
  var spawn = require('child_process').spawn
  var ls = spawn('ls', ['-al'])

  ls.stdout.on('data', function (data) {
    console.log('data from child: ' + data)
  })

  ls.stderr.on('data', function (data) {
    console.log('error from child: ' + data)
  })

  ls.on('close', function (code) {
    console.log('child exists with code: ' + code)
  })
}
