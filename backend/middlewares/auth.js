const services = require('../services');

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ auth: false });
    }
    const token = req.headers.authorization.split(' ')[1];
    services
        .decodeToken(token)
        .then(response => {
            req.user = response;
            next();
        })
        .catch(response => {
            res.status(response.status).send();
        });
}/*
const jwt = require('jsonwebtoken');

let verificarAuth = (req, res, next) => {

  // Leer headers
  let token = req.get('token');

  jwt.verify(token, 'secret', (err, decoded) => {

    if(err) {
      return res.status(401).json({
        mensaje: 'Error de token',
        err
      })
    }

    // Creamos una nueva propiedad con la info del usuario
    req.usuario = decoded.data; //data viene al generar el token en login.js
    next();

  });

}

let verificaRol = (req, res, next) => {

    let rol = req.usuario.role;
  
    console.log(rol);
    
    if(rol !== 'ADMIN'){
      return res.status(401).json({
        mensaje: 'Rol no autorizado!'
      })
    }
    
    next();
  
  }
  
  module.exports = {verificarAuth, verificaRol};*/
  

module.exports = isAuth;