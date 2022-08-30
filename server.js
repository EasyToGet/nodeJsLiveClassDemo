const http = require('http');

const requestListener = (req, res) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  };

  if (req.url == '/' && req.method == 'GET') {
    res.writeHeader(200, headers);
    res.write(JSON.stringify({
      status: "success",
      data: []
    }));
    res.end();
  } else if (req.method == 'OPTIONS') {
    res.writeHeader(200, headers);
    res.end();
  } else {
    res.writeHeader(404, headers);
    res.write(JSON.stringify({
      status: "false",
      message: "無此網站路由"
    }));
    res.end();
  }
}


const server = http.createServer(requestListener);
server.listen(3005);