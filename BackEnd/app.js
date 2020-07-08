var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usuarioRouter = require('./routes/usuario');
var tiposPetRouter = require('./routes/tiposPet');
var petRouter = require('./routes/pet');
var mensagemRouter = require('./routes/mensagem');
var apoioRouter = require('./routes/apoio');
var imagemRouter = require('./routes/imagem');

var app = express();

const cors = require('cors')
app.use(cors())

const db = require('./config/database');
db('mongodb://localhost:27017/appPet');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuario', usuarioRouter);
app.use('/tiposPet', tiposPetRouter);
app.use('/pet', petRouter);
app.use('/mensagem', mensagemRouter);
app.use('/apoio', apoioRouter);
app.use('/imagem', imagemRouter);

module.exports = app;
