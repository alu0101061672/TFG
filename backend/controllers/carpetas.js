const Carpetas = require('../models/carpetas');

async function showAll (req,res) {

    await Carpetas.find(function(err,carpeta){

        if(err) res.send(500, err.message);
        
        res.status(200).json(carpeta);
    });    
}

async function dataCarpeta (req,res) {

    const carpeta = new Carpetas({
        nombre: req.body.nombre,
        archivo: req.body.file,

    });

    // Buscamos nombre en DB
    const carpetaDB = await Carpetas.findOne({nombre: req.body.nombre});

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
            .send({ nombre: carpeta.nombre, });
        });
    }
}

async function deleteCarpeta(req,res){

    const nombreCarpeta = req.params.carpeta;

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

module.exports = {
    showAll,
    dataCarpeta,
    deleteCarpeta,
    deleteFileFromCarpeta,



};