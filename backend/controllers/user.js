const User = require('../models/usuario');
const services = require('../services');
var bcrypt = require('bcryptjs');

async function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        usuario: req.body.usuario,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
    });


    // Buscamos email en DB
    const usuarioDB = await User.findOne({email: req.body.email});

    // Evaluamos si no existe el usuario en DB
    if(usuarioDB){
        return res.status(400).json({
        mensaje: 'Usuario existente',
        });
    } 
    else {

        user.save(err => {
            if (err)
                return res.status(500).send({
                    message: `Error al crear el usuario: ${err}`,
            });

        return res
            .status(201)
            .send({ token: services.createToken(user), });
        });
    }

}

function signIn(req, res) {
    User.findOne({ email: req.body.email })
        .select('password')
        .then(user => {
            if (!user)
                return res.status(404).send({
                    message: 'Este usuario no está en la BBDD',
                });
            
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(user.password, salt);
            bcrypt.compare(req.body.password, hash, function(
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

                            console.log(`Last Login:  ${response.lastLogin}`)
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
        
        });
    });
}

function changelastLogin(email) {
    let dateLogin = {
        lastLogin: Date.now(),
    };

    return User.findOneAndUpdate({ email: email }, dateLogin);
}

async function showAll (req,res) {

    await User.find(function(err,user){

        if(err) res.send(500, err.message);
        
        //console.log('GET /user')
        res.status(200).json(user);
    })    
}

async function getRole (req,res) {

    const roles = await User.distinct("role");


    // roles.forEach( (e) => {
    //     console.log(e)

    //     rols.rol = e

    // })


        //if(err) res.send(500, err.message);
        //console.log('GET /user')
        res.status(200).json(roles);
     
}

async function changeRolToUser(req,res){

    const usu = req.params.usuario;
    const roles = req.body.role;

        console.log(usu);
        console.log(roles);
   
        var user = User.findOne({ usuario: usu });

    try{
        const userDb = await User.findByIdAndUpdate( 
            {_id: (await user)._id},
            {role: roles},
        );
 

        res.json(userDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

async function deleteUserByUsuario(req,res){

    const usu = req.params.usuario;
        //console.log(usu);
   
        var user = User.findOne({ usuario: usu });

        //console.log((await user)._id);

    try{
        const userDb = await User.findByIdAndRemove((await user)._id);

        if(!userDb){
            return res.status(400).json({
            mensaje: 'No se encontró el id indicado'
            })
        }
        res.json(userDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

module.exports = {
    signIn,
    signUp,
    showInfo,
    showAll,
    deleteUserByUsuario,
    getRole,
    changeRolToUser

};