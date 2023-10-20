// readline是个非常实用的模块。如名字所示，主要用来实现逐行读取，比如读取用户输入，或者读取文件内容。常见使用场景有下面几种，本文会逐一举例说明。

// 文件逐行读取：比如说进行日志分析。
// 自动完成：比如输入npm，自动提示"help init install"。
// 命令行工具：比如npm init这种问答式的脚手架工具
const readline = require('readline')
const fs = require('fs')

function mockInterface() {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('Please input a word: ', function (answer) {
    console.log('You have entered [%s]', answer.toUpperCase())
    rl.close()
  })
}
// ------------------------>
function mockFileInterface() {
  const fs = require('fs')

  var rl = readline.createInterface({
    input: fs.createReadStream('./dns.js'),
  })

  rl.on('line', (line) => {
    const arr = line.split(' ')
    console.log('访问时间：%s %s，访问地址：%s', arr[0], arr[1], arr[13])
  })
}

// mockFileInterface()

/**
 * 
 这里我们实现一个简单的自动完成功能，当用户输入npm时，按tab键，自动提示用户可选的子命令，如help、init、install。
    输入np，按下tab：自动补全为npm
    输入npm in，按下tab：自动提示可选子命令 init、install
    输入npm inst，按下tab：自动补全为 npm install
 */

function mockAutoComplete() {
  function completer(line) {
    const command = 'npm'
    const subCommands = ['help', 'init', 'install']

    // 输入为空，或者为npm的一部分，则tab补全为npm
    if (line.length < command.length) {
      return [command.indexOf(line) === 0 ? [command] : [], line]
    }

    // 输入 npm，tab提示 help init install
    // 输入 npm in，tab提示 init install
    let hits = subCommands.filter(function (subCommand) {
      const lineTrippedCommand = line.replace(command, '').trim()
      return lineTrippedCommand && subCommand.indexOf(lineTrippedCommand) === 0
    })

    if (hits.length === 1) {
      hits = hits.map(function (hit) {
        return [command, hit].join(' ')
      })
    }

    return [hits.length ? hits : subCommands, line]
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: completer,
  })

  rl.prompt()
}

// mockAutoComplete()

function mockNpmInit() {
  const readline = require('readline')
  const fs = require('fs')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OHAI> ',
  })

  const preHint = `
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`npm help json\` for definitive documentation on these fields
and exactly what they do.

Use \`npm install <pkg> --save\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
`

  console.log(preHint)

  // 问题
  let questions = ['name', 'version', 'author']

  // 默认答案
  let defaultAnswers = ['name', '1.0.0', 'none']

  // 用户答案
  let answers = []
  let index = 0

  function createPackageJson() {
    var map = {}
    questions.forEach(function (question, index) {
      map[question] = answers[index]
    })

    fs.writeFileSync('./package.json', JSON.stringify(map, null, 4))
  }

  function runQuestionLoop() {
    if (index === questions.length) {
      createPackageJson()
      rl.close()
      return
    }

    let defaultAnswer = defaultAnswers[index]
    let question = questions[index] + ': (' + defaultAnswer + ') '

    rl.question(question, function (answer) {
      answers.push(answer || defaultAnswer)
      index++
      runQuestionLoop()
    })
  }

  runQuestionLoop()
}

mockNpmInit()
