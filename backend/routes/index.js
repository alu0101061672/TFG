const express = require ('express');
const api = express.Router();
const user = require( '../controllers/user');
const auth = require('../middlewares/auth');

api.post('/signin', user.signIn);
api.post('/signup', user.signUp);

api.delete('/delete/:usuario', user.deleteUserByUsuario);

api.get('/showinfo', user.showInfo);
api.get('/showall', user.showAll);
api.get('/getrole', user.getRole);

api.put('/changerol/:usuario', user.changeRolToUser)

api.get('/private', auth, function(req, res) {
    res.status(200).send({ message: 'Tienes Acceso' });
});
api.get('/isAuth', auth, (req, res) => {
    res.status(200).send({ auth: true });
});

module.exports = api;