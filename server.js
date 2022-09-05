const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errorHandle = require('./errorHeader');

const todos = [];

const requestListener = (req, res) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  };

  let body = "";

  req.on('data', chunk => {
    body += chunk;
  });

  if (req.url == '/todos' && req.method == 'GET') {
    res.writeHeader(200, headers);
    res.write(JSON.stringify({
      status: "success",
      data: todos
    }));
    res.end();
  } else if (req.url == '/todos' && req.method == 'POST') {
    req.on('end', () => {
      try {
        const title = JSON.parse(body).title;
        if (title !== undefined) {
          const todo = [
            {
              title: title,
              id: uuidv4()
            }
          ]
          todos.push(todo);
          res.writeHeader(200, headers);
          res.write(JSON.stringify({
            status: "success",
            data: todos
          }));
          res.end();
        } else {
          errorHandle(res);
        }
      } catch (error) {
        errorHandle(res);
      }
    });
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