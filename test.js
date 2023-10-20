console.log('start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve(1)
  .then((data) => {
    console.log('promise data')
  })
  .then(() => {
    console.log('promise data2')
  })

process.nextTick(() => {
  console.log('process.nextTick')
})

const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, './package.json')
const fileContent = fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.log('err', err)
    return
  }
  console.log('data', data)
})

setTimeout(() => {
  console.log('setTimeout2')
}, 0)

console.log('end')
