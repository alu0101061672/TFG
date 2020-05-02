import services from "../services";

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send("Tu petición no tiene cabecera de autorización");
  }
  const token = req.headers.authorization.split(" ")[1];
  services
    .decodeToken(token)
    .then((response) => {
      //console.log(response);
      req.user = response.payload;
      req.auth = response.auth;
      next();
    })
    .catch((response) => {
      //console.log(response);
      res.status(response.status).send(response.message);
    });
}

module.exports = isAuth;
