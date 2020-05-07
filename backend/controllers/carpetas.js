const Carpetas = require('../models/carpetas');
const INR = require('../models/inr');

async function showAll (req,res) {

    await Carpetas.find({},function(err,carpeta){

        INR.populate(carpeta, {path: "inr"}, function(err,carpeta){
            
            if(err) res.send(500, err.message);
            res.status(200).send(carpeta);
        });
    });
}

async function showFavs (req,res) {

    const carpetasDB = await Carpetas.find({fav: true});
    res.status(200).send(carpetasDB);


}

async function dataCarpeta (req,res) {

    const carpeta = new Carpetas({
        nombre: req.body.nombre.toUpperCase(),
        file: req.body.file,
        inr: req.body.inr._id

    });

    var car = {};
    var crpts = await Carpetas.find();

    for (var item in crpts){

        if(crpts[item].nombre === req.body.nombre.toUpperCase()){

          car = crpts[item];

        }
    }

    // Evaluamos si no existe el inr en DB
    if(car){
        return res.status(400).json({
        mensaje: 'Carpeta existente',
        });
    } 
    else {

        carpeta.save(err => {
            if (err)
                return res.status(500).send({
                    message: `Error al crear la carpeta: ${err}`,
            });

            return res
            .status(201)
            .send({ carpeta });
        });
    }
}

async function fileInCarpeta(req,res) {

    var car = {};
    var crpts = await Carpetas.find();

    for (var item in crpts){

        if(crpts[item].nombre === req.body.nombre.toUpperCase()){

          car = crpts[item];

        }
    }

    const file = req.body.file;

    var array = [];
    array.push(car.file);
    array.push(file);

    try{
        const carpetaDb = await Carpetas.findByIdAndUpdate( 
            {_id: car._id},
            { 
                file: array,
            }
        );

        res.json(carpetaDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

async function deleteCarpeta(req,res){

    var car = {};
    var crpts = await Carpetas.find();

    for (var item in crpts){

        if(crpts[item].nombre === req.params.nombre.toUpperCase()){

          car = crpts[item];

        }
    }
 
    try{

        //const inrDB =  await INR.findOneAndDelete( { nombre: nameOfINR }) ;
        const carpetaDB = await Carpetas.findByIdAndRemove(car._id);

        if(!carpetaDB){
            return res.status(400).json({
            mensaje: 'No se encontró el nombre de la carpeta indicada'
            })
        }
        res.json(carpetaDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

// async function deleteFileFromCarpeta(req,res){

//     const nombreCarpeta = req.params.nombre;
//     const archivo = req.body.file;


//     var carpeta = Carpetas.findOne({ nombre: nombreCarpeta });


//     try{

//         //const inrDB =  await INR.findOneAndDelete( { nombre: nameOfINR }) ;
//         const carpetaDB = await Carpetas.findByIdAndUpdate( 
//             {_id: (await carpeta)._id},
//             {file: ""},
//         );

//         if(!carpetaDB){
//             return res.status(400).json({
//             mensaje: 'No se encontró el nombre de la carpeta indicada'
//             })
//         }
//         res.json(carpetaDb);

//     } catch (error) {
//         return res.status(400).json({
//           mensaje: 'Ocurrio un error',
//           error
//         });
//     }

// }

async function addFavorito(req,res) {

    var car = {};
    var crpts = await Carpetas.find();

    for (var item in crpts){

        if(crpts[item].nombre === req.body.nombre.toUpperCase()){

          car = crpts[item];

        }
    }

    try{
        const carpetaDb = await Carpetas.findByIdAndUpdate( 
            {_id: car._id},
            {fav: true}
        );

        res.json(carpetaDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

async function removeFavorito(req,res) {

    var car = {};
    var crpts = await Carpetas.find();

    for (var item in crpts){

        if(crpts[item].nombre === req.body.nombre.toUpperCase()){

          car = crpts[item];

        }
    }

    try{
        const carpetaDb = await Carpetas.findByIdAndUpdate( 
            {_id: car._id},
            { 
                fav: false
            }
        );

        res.json(carpetaDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

module.exports = {
    showAll,
    showFavs,
    dataCarpeta,
    deleteCarpeta,
    fileInCarpeta,
    addFavorito,
    removeFavorito,



};