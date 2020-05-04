const Aportaciones = require('../models/aportaciones');
const INR = require('../models/inr');

async function showAll (req,res) {

    await Aportaciones.find({},function(err,aportacion){

        INR.populate(aportacion, {path: "inr"}, function(err,aportacion){
            
            if(err) res.send(500, err.message);
            res.status(200).send(aportacion);
        });
    });

        
}    


async function dataAportacion (req,res) {

    const aportacion = new Aportaciones({
        titulo: req.body.titulo.toUpperCase(),
        descripcion: req.body.descripcion.toUpperCase(),
        recursosAportacion: req.body.recursosAportacion,
        date: req.body.date,
        createdBy: req.body.createdBy.toUpperCase(),
        inr: req.body.inr._id

    });
    // Buscamos nombre en DB
    const aportacionesDB = await Aportaciones.findOne({titulo: req.body.titulo.toUpperCase()});

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
            .send({ aportacion });
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
            titulo: aportaciones.titulo.toUpperCase(),
            descripcion: aportaciones.descripcion.toUpperCase(),
            recursosAportacion: aportaciones.recursosAportacion,
            rectificado: true,
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


    try{
        const aportacionDB = await Aportaciones.find({titulo: req.params.titulo});
        res.json(aportacionDB);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

module.exports = {
    showAll,
    dataAportacion,
    changeDataAportacion,
    deleteAportacion,
    getRecursos,
    showAportacion,

};
