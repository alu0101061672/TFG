const express = require ('express');
const api = express.Router();
const userCtrl = require( '../controllers/user');
const auth = require('../middlewares/auth');


api.post('/signin', userCtrl.signIn);
api.get('/showinfo', userCtrl.showInfo);
api.get('/showall', userCtrl.showAll);


api.get('/isAuth', auth, (req, res) => {
    res.status(200).send({ auth: true });
});

module.exports = api;