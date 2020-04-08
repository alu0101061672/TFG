'use strict';
var express = require('express');
var serveStatic = require('serve-static')
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

const user = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("tiny"));
app.use(cors());

app.use('/user', user)

app.use(serveStatic(__dirname + "/dist"));

const mongoose = require('mongoose');

mongoose
  .connect(config.db, config.options)
  .then(console.log("Conectado a la bbdd"))
  .catch(err => console.log(err));



app.listen(config.port, () => console.log(`Escuchando en el puerto ${config.port}`));

