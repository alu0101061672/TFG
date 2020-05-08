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

    var ap = {};
    var aprts = await Aportaciones.find();

    for (var item in aprts){

        if(aprts[item].titulo === req.body.titulo.toUpperCase()){

          ap = aprts[item];

        }
    }
    // Evaluamos si no existe el inr en DB
    if(ap === {}){
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

    var ap = {};
    var aprts = await Aportaciones.find();

    for (var item in aprts){

        if(aprts[item].titulo === req.params.aportacion.toUpperCase()){

          ap = aprts[item];

        }
    }

    try{
        const aportacionDb = await Aportaciones.findByIdAndUpdate( 
            {_id: ap._id},
            { 
            titulo: req.body.aportacion.aportacion.titulo.toUpperCase(),
            descripcion: req.body.aportacion.aportacion.descripcion.toUpperCase(),
            recursosAportacion: req.body.aportacion.aportacion.recursosAportacion,
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

    var ap = {};
    var aprts = await Aportaciones.find();

    for (var item in aprts){

        if(aprts[item].titulo === req.params.aportacion.toUpperCase()){

          ap = aprts[item];

        }
    }

    try{

        //const inrDB =  await INR.findOneAndDelete( { nombre: nameOfINR }) ;
        const aportacionesDB = await Aportaciones.findByIdAndRemove(ap._id);

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

    await Aportaciones.find({ titulo: req.params.titulo.toUpperCase()},function(err,aportacion){

        INR.populate(aportacion, {path: "inr"}, function(err,aportacion){
            
            if(err) res.send(500, err.message);
            res.status(200).send(aportacion);
        });
    });

    // var ap = {};
    // var aprts = await Aportaciones.find({});

    // for (var item in aprts){

    //     if(aprts[item].titulo === req.params.titulo.toUpperCase()){

    //       ap = aprts[item];

    //     }
    // }

    // try{
    //     const aportacionesDB = await Aportaciones.findOne({_id: ap._id});

    //     if(!aportacionesDB){
    //         return res.status(400).json({
    //         mensaje: 'No se encontró el nombre de la aportación indicada'
    //         })
    //     }
    //     // console.log(res.json(ap));
    //     res.json(aportacionesDB);

    // } catch (error) {
    //     return res.status(400).json({
    //       mensaje: 'Ocurrio un error',
    //       error
    //     });
    // }

}

module.exports = {
    showAll,
    dataAportacion,
    changeDataAportacion,
    deleteAportacion,
    getRecursos,
    showAportacion,

};
