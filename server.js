'use strict';
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 4000;
app.listen(port);


const mongoose = require('mongoose');

const uri = 'mongodb://localhost:4000';
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};

// Or using promises
mongoose.connect(uri, options).then(
  /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { 
      console.log('Conectado a DB');
      console.log('server started '+ port);
     },
  /** handle initial connection error */
  err => { console.log(err); }
);

