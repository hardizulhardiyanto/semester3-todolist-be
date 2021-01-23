var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_list_project',
    password: 'postgres',
    port: 5432
})

var indexRouter = require('./routes/index')(pool);
var usersRouter = require('./routes/users');

var app = express();

app.use(cors())
app.use(bodyParser.json({ limit: '500mb'}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
