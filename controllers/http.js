const headers = require('../service/headers');

const http = {
  cors(req, res) {
    res.writeHeader(200, headers);
    res.end();
  },
  notFound(req, res) {
    res.writeHeader(404, headers);
    res.write(JSON.stringify({
      status: "false",
      message: "無此網站路由"
    }));
    res.end();
  }
};

module.exports = http;