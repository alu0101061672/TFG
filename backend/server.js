'use strict';
var express = require('express');
var serveStatic = require('serve-static')
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

const user = require('./routes/index');

const app = express();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Methods', '*');
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.header('Allow', '*');
//   res.setHeader('Allow', '*');
//   res.header('Access-Control-Request-Method', '*')

//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   if (req.method === 'OPTIONS') {
//       res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//       res.header('Access-Control-Allow-Methods', '*');

//       return res.status(200).json({});
//   };
//   next();
// });

app.use(cors({origin: '*',credentials: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("tiny"));

app.use('/user', user)

app.use(serveStatic(__dirname + "/dist"));

const mongoose = require('mongoose');

mongoose
  .connect(config.db, config.options)
  .then(console.log("Conectado a la bbdd"))
  .catch(err => console.log(err));



app.listen(config.port, () => console.log(`Escuchando en el puerto ${config.port}`));

