const fs = require('fs')
const crypto = require('crypto')
const EventEmitter = require('events')
const http = require('http')

// 事件驱动架构
// 不再事件循环中
function eventLoop() {
  const start = Date.now()
  process.env.UV_THREADPOOL_SIZE = 1
  setTimeout(() => {
    console.log('Timer 1 finished')
  }, 0)

  process.nextTick(() => {
    console.log('nextTick 1 finished')
  })

  // 跟随在IO之后的会调
  setImmediate(() => {
    console.log('Immediate 1 finished')
  })

  fs.readFile('test-file.txt', 'utf-8', (err, data) => {
    // console.log('>>>>>>>>>>>>>>>>')
    // console.log(data)
    // console.log('>>>>>>>>>>>>>>>>')
    console.log('I/O finished')
  })

  console.log('hello from the top-level code')
}

function inEventLoop() {
  const start = Date.now()
  process.env.UV_THREADPOOL_SIZE = 4 // 默认线程池是4个，线程池执行耗时任务
  setTimeout(() => {
    console.log('Timer 1 finished')
  }, 0)
  process.nextTick(() => {
    console.log('nextTick 1 finished')
  })
  // 跟随在IO之后的会调
  setImmediate(() => {
    console.log('Immediate 1 finished')
  })

  fs.readFile('test-file.txt', 'utf-8', (err, data) => {
    // console.log('>>>>>>>>>>>>>>>>')
    // console.log(data)

    setTimeout(() => {
      console.log('Timer 2 finished')
    }, 0)

    setTimeout(() => {
      console.log('Timer 3 finished')
    }, 3000)

    // 跟随在IO之后的会调
    setImmediate(() => {
      console.log('Immediate 2 finished')
    })
    process.nextTick(() => {
      console.log('nextTick 2 finished')
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
      console.log(Date.now() - start, 'Password encrypted')
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
      console.log(Date.now() - start, 'Password encrypted')
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
      console.log(Date.now() - start, 'Password encrypted')
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
      console.log(Date.now() - start, 'Password encrypted')
    })
    console.log('I/O finished')
    console.log('>>>>>>>>>>>>>>>>')
  })

  console.log('hello from the top-level code')
}

function event() {
  const myEmitter = new EventEmitter()

  myEmitter.on('newSale', (data) => {
    console.log('There was a new sale', data)
  })
  myEmitter.on('newSale', (data) => {
    console.log('Cosumer name:Jonas', data)
  })
  myEmitter.emit('newSale', 12)
}

function MockEventEmitter() {
  class Sales extends EventEmitter {
    constructor() {
      super()
    }
  }
}

function mockServer() {
  const server = http.createServer()
  server.on('request', (req, res) => {
    console.log('Requeset received')
    res.end('Requeset received')
  })
  server.on('request', (req, res) => {
    console.log('Requeset received😀')
  })
  server.on('close', () => {
    console.log('Server closed')
  })
  server.listen(8000, '127.0.0.1', () => {
    console.log('wait for requreset...')
  })
}

// eventLoop()
// inEventLoop()
// event()
// mockServer()

/**
 * 流是继承了events类
 * 可读流、可写流、双工流、转换流
 * 流可以发射data、end事件
 */
function mockStream() {
  const server = http.createServer()
  server.on('request', (req, res) => {
    // solution 1
    /* fs.readFile('test-file.txt', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      res.end(data)
    }) */
    // solution 2, 出现背压问题
    /* let i = 0
    const readable = fs.createReadStream('test-file.txt')
    readable.on('data', (chunk) => {
      res.write(`<h5>>>>>>>>>>>>>>>>>>>>>>>>>>>>${chunk}</h5>`)
      //   res.write(chunk)
    })
    readable.on('end', () => {
      console.log('>>>>>>>>>>>>>>>>>>end')
      res.end()
    })
    readable.on('error', (err) => {
      console.log(err)
      res.statusCode = 500
      res.end('file not found')
    }) */
    // solution 3
    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res)
    // readableSource.pipe(writeableDest)
  })

  server.listen(8000, '127.0.0.1', () => {
    console.log('Listening...')
  })
}

// mockStream()

function mockRequire() {
  // console.log(arguments)
  // console.log(require('module').wrappper)
}
// console.log(arguments)
// console.log(require('module'))
// mockRequire()
