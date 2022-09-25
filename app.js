var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); 
const swaggerUI = require('swagger-ui-express');    //  載入 swagger UI 套件
const swaggerFile = require('./swagger-output.json');   //  載入 swagger 輸出文件

const { notFound } = require('./service/http');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');

var app = express();

require('./connections/index');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', postsRouter);
app.use('/api', usersRouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));   //  生成 API 文件
app.use(notFound);

module.exports = app;
