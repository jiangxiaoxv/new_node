var EventEmitter = require('events')

class Man extends EventEmitter {}

var man = new Man()

man.on('wakeup', function () {
  console.log('man has woken up')
})

man.emit('wakeup')

var EventEmitter = require('events')

class Man extends EventEmitter {}

var man = new Man()

man.on('wakeup', function () {
  console.log('man has woken up') // 代码1
})

man.emit('wakeup')

console.log('woman has woken up') // 代码2
// 代码1先执行了。(node v6.1.0)
man.removeListener('wakeup', wakeup)
