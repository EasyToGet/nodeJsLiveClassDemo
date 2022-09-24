const HttpControllers = require('../controllers/http');
const PostsControllers = require('../controllers/posts');

const routes = async (req, res) => {
  const { url, method } = req;
  let body = "";

  req.on('data', chunk => {
    body += chunk;
  });

  if (url == '/posts' && method == 'GET') {
    PostsControllers.getPosts(req, res);
  } else if (url == '/posts' && method == 'POST') {
    req.on('end', async () => {
      PostsControllers.createdPosts({ body, req, res });
    })
  } else if (url == '/posts' && method == 'DELETE') {
    PostsControllers.deleteAll(req, res);
  } else if (url.startsWith('/posts/') && method == 'DELETE') {
    PostsControllers.deleteSingle(req, res);
  } else if (url.startsWith('/posts/') && method == 'PATCH') {
    req.on('end', async () => {
      PostsControllers.patchPosts({ body, req, res });
    });
  } else if (method == 'OPTIONS') {
    HttpControllers.cors(req, res);
  } else {
    HttpControllers.notFound(req, res);
  }
};

module.exports = routes;