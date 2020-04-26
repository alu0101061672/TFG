const express = require ('express');
const api = express.Router();
const user = require( '../controllers/user');
const auth = require('../middlewares/auth');
const inr = require('../controllers/inr');
const carpeta = require('../controllers/carpetas');
const aportacion = require('../controllers/aportaciones');

api.post('/signin', user.signIn);
api.post('/signup', user.signUp);
api.delete('/delete/:usuario', user.deleteUserByUsuario);
//api.get('/showinfo', user.showInfo);
api.get('/showall', user.showAll);
api.get('/showuser/:email', user.showUser);
api.get('/getrole', user.getRole);
api.put('/logout/:usuario', user.logOut);
api.put('/changerol/:usuario', user.changeRolToUser);

api.get('/showinrs', inr.showAll);
api.get('/getgravedad', inr.getGravedad);
api.get('/gettipo', inr.getTipo);
api.get('/getterreno', inr.getTipoTerreno);
api.get('/getrecursos', inr.getRecursos);
api.post('/inr', inr.dataINR);
api.put('/changeDataINR/:inr', inr.changeDataINR);
api.delete('/deleteINR/:inr', inr.deleteINR);

//api.get('/showaportaciones', inr.showAllAportaciones);
// api.get('/getrecursosaportacion', inr.getRecursosAportacion);
// api.get('/showaportacion/:titulo', inr.showAportacion);
//api.post('/aportacion', inr.dataAportacion);
// api.put('/changeDataAportacion/:aportacion', inr.changeDataAportacion);
// api.delete('/deleteAportacion/:aportacion', inr.deleteAportacion);


api.get('/showaportaciones', aportacion.showAll);
// api.get('/getrecursosaportacion', aportacion.getRecursos);
// api.get('/showaportacion/:titulo', aportacion.showAportacion);
 api.post('/aportacion', aportacion.dataAportacion);
// api.put('/changeDataAportacion/:aportacion', aportacion.changeDataAportacion);
// api.delete('/deleteAportacion/:aportacion', aportacion.deleteAportacion);


api.get('/showall', carpeta.showAll);
api.post('/addCarpeta', carpeta.dataCarpeta);
api.delete('/deleteCarpeta/:nombre', carpeta.deleteCarpeta);







// api.get('/private', auth, function(req, res) {
//     res.status(200).send({ message: 'Tienes Acceso' });
// });
// api.get('/isAuth', auth, (req, res) => {
//     res.status(200).send({ auth: true });
// });

module.exports = api;