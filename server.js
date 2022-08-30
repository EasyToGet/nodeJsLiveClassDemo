const http = require('http');

const requestListener = (req, res) => {
  res.writeHeader(200, {"Content-Type":"text/plain"});
  res.write("HelloWorld!");
  res.end();
}


const server = http.createServer(requestListener);
server.listen(3005);