"use strict";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import api from "./routes";
import config from "./config";
import mongoose from "mongoose";
import history from "connect-history-api-fallback";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded, x-xsrf-token';

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", api);

// Middleware para Vue.js router modo history
app.use(history());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(config.db, config.options).then(
  () => {
    console.log("Conectado a DB");
    // app.set('puerto', config.port);
    // app.listen(app.get('puerto'), function() {
    //     console.log(
    //         'Escuchando por el puerto ' + app.get('puerto'),
    //     );
    // });
    server.listen(config.port, () => {
      console.log("Escuchando por el puerto ", config.port);
    });
  },
  err => {
    console.log(err);
  }
);

module.exports = app;
