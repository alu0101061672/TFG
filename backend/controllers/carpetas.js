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

async function dataCarpeta (req,res) {

    const carpeta = new Carpetas({
        nombre: req.body.nombre.toUpperCase(),
        file: req.body.file,
        inr: req.body.inr._id

    });

    // Buscamos nombre en DB
    const carpetaDB = await Carpetas.findOne({nombre: req.body.nombre.toUpperCase()});

    // Evaluamos si no existe el inr en DB
    if(carpetaDB){
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

    const nombreCarpeta = req.body.nombre.toUpperCase();
    const file = req.body.file;

    var carpeta = Carpetas.findOne({ nombre: nombreCarpeta });
    
    var array = [];
    array.push((await carpeta).file);
    array.push(file);

    try{
        const carpetaDb = await Carpetas.findByIdAndUpdate( 
            {_id: (await carpeta)._id},
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

    const nombreCarpeta = req.params.nombre.toUpperCase();

    var carpeta = Carpetas.findOne({ nombre: nombreCarpeta });

 
    try{

        //const inrDB =  await INR.findOneAndDelete( { nombre: nameOfINR }) ;
        const carpetaDB = await Carpetas.findByIdAndRemove((await carpeta)._id);

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

async function deleteFileFromCarpeta(req,res){

    const nombreCarpeta = req.params.nombre;
    const archivo = req.body.file;


    var carpeta = Carpetas.findOne({ nombre: nombreCarpeta });


    try{

        //const inrDB =  await INR.findOneAndDelete( { nombre: nameOfINR }) ;
        const carpetaDB = await Carpetas.findByIdAndUpdate( 
            {_id: (await carpeta)._id},
            {file: ""},
        );

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

async function addFavorito(req,res) {

    const nombreCarpeta = req.body.nombre.toUpperCase();

    var carpeta = Carpetas.findOne({ nombre: nombreCarpeta });

    try{
        const carpetaDb = await Carpetas.findByIdAndUpdate( 
            {_id: (await carpeta)._id},
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

    const nombreCarpeta = req.body.nombre.toUpperCase();

    var carpeta = Carpetas.findOne({ nombre: nombreCarpeta });
    

    try{
        const carpetaDb = await Carpetas.findByIdAndUpdate( 
            {_id: (await carpeta)._id},
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
    dataCarpeta,
    deleteCarpeta,
    fileInCarpeta,
    deleteFileFromCarpeta,
    addFavorito,
    removeFavorito,



};