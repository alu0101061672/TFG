import User from "../models/user";
import services from "../services";
import bcrypt from "bcrypt";

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password,
  });

  user.save((err) => {
    if (err)
      return res.status(500).send({
        message: `Error al crear el usuario: ${err}`,
      });

    return res
      .status(201)
      .send({ message: "El usuario se ha registrado con éxito" }); //.send({ token: services.createToken(user) });
  });
}

function signIn(req, res) {
  User.findOne({ email: req.body.email })
    .select("password")
    .then((user) => {
      if (!user)
        return res.status(404).send({
          message: "Este usuario no está en al BBDD",
        });

      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err)
          return res.status(500).send({
            message: `Error al realizar la petición ${err}`,
          });

        if (result) {
          let changeLastSignIn = changelastLogin(req.body.email);
          changeLastSignIn.then((response) =>
            console.log(`Ultimo acceso:  ${response.lastLogin}`)
          );
          res.status(200).send({
            message: "Te has logueado correctamente",
            token: services.createToken(user),
            email: req.body.email,
          });
        } else {
          res.status(500).send({
            message: "Email o Contraseña incorrectos",
          });
        }
      });
    });
}

function showInfo(req, res) {
  User.findOne({ email: req.query.email }).then((user, err) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición ${err}`,
      });

    return res.status(200).send({
      message: "Enviando datos...",
      user: user,
    });
  });
}

function editUser(req, res) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) return next(err);

      User.findOneAndUpdate(
        {
          email: req.body.email,
        },
        {
          displayName: req.body.displayName,
          password: hash,
        }
      ).then((user, err) => {
        if (err)
          return res.status(500).send({
            message: `Error al realizar la peticion ${err}`,
          });

        return res.status(200).send({
          message: `El usuario se ha editado con éxito`,
          user: user,
        });
      });
    });
  });
}

function changelastLogin(email) {
  let dateLogin = {
    lastLogin: Date.now(),
  };

  return User.findOneAndUpdate({ email: email }, dateLogin);
}

module.exports = {
  signIn,
  signUp,
  showInfo,
  editUser,
};
