'use strict';

import express from 'express';
import userCtrl from '../controllers/user';

const api = express.Router();
import auth from '../middlewares/auth';
//const {verificarAuth, verificaRol} = require('../middlewares/auth');

api.post('/signup', userCtrl.signUp);
api.post('/signin', [verificarAuth, verificaRol], userCtrl.signIn);
api.get('/showinfo', userCtrl.showInfo);
api.get('/private', auth, function(req, res) {
    res.status(200).send({ message: 'Tienes Acceso' });
});

api.get('/isAuth', auth, (req, res) => {
    res.status(200).send({ auth: true });
});

module.exports = api;

