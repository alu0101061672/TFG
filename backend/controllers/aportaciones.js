const Aportaciones = require('../models/aportaciones');

async function showAll (req,res) {

    await Aportaciones.find(function(err,aportacion){

        if(err) res.send(500, err.message);
        
        res.status(200).json(aportacion);
    });    
}

async function dataAportacion (req,res) {

    const aportacion = new Aportaciones({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        recursosNecesarios: req.body.recursosNecesarios,

    });

    // Buscamos nombre en DB
    const aportacionesDB = await Aportaciones.findOne({titulo: req.body.titulo});

    // Evaluamos si no existe el inr en DB
    if(aportacionesDB){
        return res.status(400).json({
        mensaje: 'Aportación existente',
        });
    } 
    else {

        aportacion.save(err => {
            if (err)
                return res.status(500).send({
                    message: `Error al crear la aportación: ${err}`,
            });

            return res
            .status(201)
            .send({ titulo: aportacion.titulo, });
        });
    }
}

function getRecursos (req,res) {

    const recursos = ['POLICIA LOCAL', 'POLICIA NACIONAL', 'GUARDIA CIVIL', 'AMBULANCIA', 'BOMBEROS', 'GES' ];

    res.status(200).json(recursos);
     
}

async function changeDataAportacion(req,res){

    const tituloAportacion = req.params.aportacion;
    const aportaciones = req.body.aportacion.aportacion;

    var apor = Aportaciones.findOne({ titulo: tituloAportacion });

    try{
        const aportacionDb = await Aportaciones.findByIdAndUpdate( 
            {_id: (await apor)._id},
            { 
            titulo: aportaciones.titulo,
            descripcion: aportaciones.descripcion,
            recursosNecesarios: aportaciones.recursosNecesarios,
            }
        );

        res.json(aportacionDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

async function deleteAportacion(req,res){

    const tituloAportacion = req.params.aportacion;

    var aportacion = Aportaciones.findOne({ titulo: tituloAportacion });

    try{

        //const inrDB =  await INR.findOneAndDelete( { nombre: nameOfINR }) ;
        const aportacionesDB = await Aportaciones.findByIdAndRemove((await aportacion)._id);

        if(!aportacionesDB){
            return res.status(400).json({
            mensaje: 'No se encontró el nombre de la aportación indicada'
            })
        }
        res.json(aportacionesDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

async function showAportacion (req,res) {

    var aportacion = await Aportaciones.findOne({ titulo: req });

    var aportacionesDB = await Aportaciones.findById(aportacion._id);
 console.log(aportacionesDB);

}

module.exports = {
    showAll,
    dataAportacion,
    changeDataAportacion,
    deleteAportacion,
    getRecursos,
    showAportacion,

};
