'use strict';
var express = require('express');
var serveStatic = require('serve-static')
const morgan = require('morgan');
const cors = require('cors');

const user = require('./routes/index');
// const signup = require('./routes/signup');
// const signin = require('./routes/signin');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("tiny"));
app.use(cors());

app.use('/user', user)
// app.use('/signup', signup);
// app.use('/signin', signin);

app.use(serveStatic(__dirname + "/dist"));

const mongoose = require('mongoose');

mongoose
  .connect("mongodb://localhost:27017/smc", { useNewUrlParser: true, useUnifiedTopology: true})
  .then(console.log("Conectado a la bbdd"))
  .catch(err => console.log(err));

app.set("port", process.env.PORT || 4000);
const port = app.get("port");

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));

