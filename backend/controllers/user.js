const User = require('../models/usuario');
const services = require('../services');
var bcrypt = require('bcryptjs');

async function signUpAdmin(req, res) {

    const user = new User({
        email: req.body.email,
        usuario: req.body.usuario,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        role: req.body.role,
        verificado: true,

    });

    var usu = {};
    var usuarios = await User.find();

    for (var item in usuarios){

        if(usuarios[item].email === req.body.email){

            usu = usuarios[item];

        }
    }

    // Evaluamos si no existe el usuario en DB
    if(usu === {}){
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

async function signUpNoAdmin(req, res) {

    const user = new User({
        email: req.body.email,
        usuario: req.body.usuario,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        role: req.body.role,
        verificado: false,


    });

    var usu = {};
    var usuarios = await User.find();

    for (var item in usuarios){

        if(usuarios[item].email === req.body.email){

          usu = usuarios[item];

        }
    }

    // Evaluamos si no existe el usuario en DB
    if(usu === {}){
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

async function signIn(req, res) {

    var usu = {};
    var usuarios = await User.find();

    for (var item in usuarios){
        console.log(usuarios[item].email)

        if(usuarios[item].email === req.body.email){

          usu = usuarios[item];

        }
    }

//  if(usu.verificado === true){

    await User.findByIdAndUpdate( 
        {_id: usu._id},
        {activo: false},
    );
    
    

    User.findById({ _id: usu._id })
        .select('password')
        .then((user) => {
            
            if (!user)
                return res.status(404).send({
                    message: 'Este usuario no está en la BBDD',
                });
            
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(usu.password, salt);
            bcrypt.compare(usu.password, hash, function(
                err,
                result,
            ) {
                if (err)
                    return res.status(500).send({
                        message: `Error al realizar la petición ${err}`,
                    });
                if (result) {
                    let changeLastSignIn = changelastLogin(
                        usu.email,
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
                        email: usu.email,
                        role: usu.role,
                        usuario: usu.usuario,
                        verificado: usu.verificado,
                    });
                } else {
                    res.status(500).send({
                        message: 'Email o Contraseña incorrectos',
                    });
                }
            });
        });
//  } else {


//  }
}

// function showInfo(req, res) {
//     User.findOne({ email: req.query.email }).then((user, err) => {
//         if (err)
//             return res.status(500).send({
//                 message: `Error al realizar la petición ${err}`,
//             });

//         return res.status(200).send({
//             message: 'Enviando datos...',
        
//         });
//     });
// }

async function changelastLogin(email) {

    var usu = {};
    var usuarios = await User.find();

    for (var item in usuarios){

        if(usuarios[item].email === req.body.email){

          usu = usuarios[item];

        }
    }


    let dateLogin = {
        lastLogin: Date.now(),
    };

    return User.findByIdAndUpdate({ _id: usu._id }, dateLogin);
}

async function showAll (req,res) {

    await User.find(function(err,user){

        if(err) res.send(500, err.message);
        
        //console.log('GET /user')
        res.status(200).json(user);
    })    
}

async function showNoVerificados (req,res) {

    var usus = await User.find({ verificado: false });  
    res.status(200).json(usus);
}

async function logOut (req,res) {

    var usu = {};
    var usuarios = await User.find();

    for (var item in usuarios){

        if(usuarios[item].usuario === req.params.usuario){

          usu = usuarios[item];

        }
    }

    try{

        const userDb = await User.findByIdAndUpdate( 
            {_id: usu._id},
            {activo: true},
        );

        res.json(userDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }
    
}

async function showUser (req,res) {

    var usu = {};
    var usuarios = await User.find();

    for (var item in usuarios){

        if(usuarios[item].email === req){

          usu = usuarios[item];

        }
    }


    var userDB = await User.findById(usu._id);
 console.log(userDB);
   // res.send(userDB);

}

async function getRole (req,res) {

    const roles = ['ADMIN', 'USER'];

    res.status(200).json(roles);
     
}

async function changeRolToUser(req,res){

    var usu = {};
    var usuarios = await User.find();

    for (var item in usuarios){

        if(usuarios[item].usuario === req.params.usuario){

          usu = usuarios[item];

        }
    }

    const roles = req.body.role;

    try{
        const userDb = await User.findByIdAndUpdate( 
            {_id: usu._id},
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

    var usu = {};
    var usuarios = await User.find();

    for (var item in usuarios){

        if(usuarios[item].usuario === req.params.usuario){

          usu = usuarios[item];

        }
    }

    try{
        const userDb = await User.findByIdAndRemove(usu._id);

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

async function changeVerificado(req,res){

    var usu = {};
    var usuarios = await User.find();

    for (var item in usuarios){

        if(usuarios[item].usuario === req.params.usuario){

          usu = usuarios[item];

        }
    }
   
    try{
        const userDb = await User.findByIdAndUpdate( 
            {_id: usu._id},
            {verificado: true},
        );

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
    signUpAdmin,
    signUpNoAdmin,
    showAll,
    deleteUserByUsuario,
    getRole,
    changeRolToUser,
    showUser,
    logOut,
    showNoVerificados,
    changeVerificado

};