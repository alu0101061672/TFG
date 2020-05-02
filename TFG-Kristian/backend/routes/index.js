"use strict";

import express from "express";
import userCtrl from "../controllers/user";
import eventCtrl from "../controllers/event";
import drawCtrl from "../controllers/draw";
import serviceData from "../services";
import auth from "../middlewares/auth";

const api = express.Router();

// --------------------------- RUTAS A CONTROLADORES ---------------------------------------

// POST

api.post("/signup", userCtrl.signUp);
api.post("/signupevent", eventCtrl.signUpEvent);
api.post("/signupshape", drawCtrl.signUpShape);
api.post("/editshapes", drawCtrl.editShapes);
api.post("/signin", userCtrl.signIn);
api.post("/editevent", eventCtrl.editEvent);
api.post("/edituser", userCtrl.editUser);

// DELETE

api.delete("/deleteshapes", drawCtrl.deleteShapes);
api.delete("/deleteinfo", eventCtrl.deleteInfo);

// GET

api.get("/showshapes", drawCtrl.showShapes);
api.get("/showevent", eventCtrl.showEvent);
api.get("/showinfo", userCtrl.showInfo);

// --------------------------- SERVICES ---------------------------------------

// Ruta para acceder a los recursos del Ministerio de Sanidad con respecto a los datos del covid-19

api.get("/datacovid", async (req, res) => {
  const response = await serviceData.callApiDataCovid();
  res.status(200).send({ response });
});

// Ruta para comprobar si contiene token y si es el correcto

api.get("/isAuth", auth, (req, res) => {
  res.status(200).send({ auth: req.auth });
});

module.exports = api;
