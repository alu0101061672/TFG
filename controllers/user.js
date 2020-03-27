import User from '../models/usuario';
import services from '../services';
import bcrypt from 'bcrypt';

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        usuario: req.body.usuario,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
    });

    user.save(err => {
        if (err)
            return res.status(500).send({
                message: `Error al crear el usuario: ${err}`,
            });

        return res
            .status(201)
            .send({ token: services.createToken(user) });
    });
}

function signIn(req, res) {
    User.findOne({ email: req.body.email })
        .select('password')
        .then(user => {
            if (!user)
                return res.status(404).send({
                    message: 'Este usuario no está en la BBDD',
                });

            bcrypt.compare(req.body.password, user.password, function(
                err,
                result,
            ) {
                if (err)
                    return res.status(500).send({
                        message: `Error al realizar la petición ${err}`,
                    });

                if (result) {
                    let changeLastSignIn = changelastLogin(
                        req.body.email,
                    );
                    changeLastSignIn.then(response =>
                        console.log(
                            `Last Login:  ${response.lastLogin}`,
                        ),
                    );
                    res.status(200).send({
                        message: 'Te has logueado correctamente',
                        token: services.createToken(
                            user,
                            req.originalUrl,
                        ),
                        email: req.body.email,
                    });
                } else {
                    res.status(500).send({
                        message: 'Email o Contraseña incorrectos',
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
            message: 'Enviando datos...',
            user: user,
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
};