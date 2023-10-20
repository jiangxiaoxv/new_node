const http = require('http')

const server = http.createServer(function (request, response) {
  let data = ''
  request.on('data', function (chunk) {
    data += chunk
  })
  request.on('end', function () {
    let method = request.method
    let headers = JSON.stringify(request.headers)
    let httpVersion = request.httpVersion
    let requesetUrl = request.url

    response.writeHead(200, {
      'Content-Type': 'text/html',
    })
    let responseData =
      method + ',' + headers + ',' + httpVersion + ',' + requesetUrl
    response.end(responseData)
  })
})

server.listen(3000, function () {
  console.log('node server started on port 3000')
})
