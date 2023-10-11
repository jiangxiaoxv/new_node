const fsp = require('fs/promises')
const fs = require('fs')
const path = require('path')
const filepath = path.resolve(__dirname, 'index.js')

async function readFileContent(filepath = '') {
  try {
    const filePromise = await fsp.readFile(filepath)
    console.log('>>>>>>>>>>>>>>>>>>${filePromise}', `${filePromise}`)
  } catch (e) {
    console.log('>>>>>>>>>>>>>>>>>>${e}', `${e}`)
  }
}
readFileContent(filepath)
fs.readFile(filepath, 'utf-8', (err, data) => {
  if (err) {
    console.log('>>>>>>>>>>>>>>>>>>${err}', `${err}`)
    return
  }
  console.log('>>>>>>>>>>>>>>>>>>${data}', `${data}`)
})
