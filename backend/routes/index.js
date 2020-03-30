'use strict';

const express = require ('express');
const userCtrl = require( '../controllers/user');

const api = express.Router();
const auth = require('../middlewares/auth');
//const {verificarAuth, verificaRol} = require('../middlewares/auth');

api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);
api.get('/showinfo', userCtrl.showInfo);
api.get('/private', auth, function(req, res) {
    res.status(200).send({ message: 'Tienes Acceso' });
});

api.get('/isAuth', auth, (req, res) => {
    res.status(200).send({ auth: true });
});

module.exports = api;

