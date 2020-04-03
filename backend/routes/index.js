const express = require ('express');
const api = express.Router();
const user = require( '../controllers/user');
const auth = require('../middlewares/auth');

api.post('/signin', user.signIn);
api.post('/signup', user.signUp);

api.delete('/delete/:id', user.deleteUserById);
// api.delete('/delete/:email', user.deleteUserByEmail);
// api.delete('/delete/:usuario', user.deleteUserByUsuario);


api.get('/showinfo', user.showInfo);
api.get('/showall', user.showAll);

api.get('/private', auth, function(req, res) {
    res.status(200).send({ message: 'Tienes Acceso' });
});
api.get('/isAuth', auth, (req, res) => {
    res.status(200).send({ auth: true });
});

module.exports = api;