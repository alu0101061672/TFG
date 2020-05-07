const INR = require('../models/inr');

async function showAll (req,res) {

    await INR.find(function(err,inr){

        if(err) res.send(500, err.message);
        
        res.status(200).json(inr);
    });    
}

async function dataINR (req,res) {

    const inr = new INR({
        nombre: req.body.nombre.toUpperCase(),
        localizacion: req.body.localizacion.toUpperCase(),
        descripcion: req.body.descripcion.toUpperCase(),
        gravedad: req.body.gravedad.toUpperCase(),
        tipo: req.body.tipo.toUpperCase(),
        numAfectados: req.body.numAfectados,
        recursoArray: req.body.recursoArray,
        tipoTerreno: req.body.tipoTerreno.toUpperCase(), 
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,

    });

    var i = {};
    var inrs = await INR.find();

    for (var item in inrs){

        if(inrs[item].nombre === req.body.nombre.toUpperCase()){

          i = inrs[item];

        }
    }

    // Evaluamos si no existe el inr en DB
    if(i === {}){
        return res.status(400).json({
        mensaje: 'INR existente',
        });
    } 
    else {

        inr.save(err => {
            if (err)
                return res.status(500).send({
                    message: `Error al crear el inr: ${err}`,
            });

            return res
            .status(201)
            .send({ nombre: i.nombre, });
        });
    }
}

async function getGravedad (req,res) {

    const gravedades = ['GRAVE', 'MEDIO', 'BAJO'];

    res.status(200).json(gravedades);
     
}

async function getTipo (req,res) {

    const tipos = ['SIMULACRO', 'CASO REAL'];

    res.status(200).json(tipos);
     
}

async function getTipoTerreno (req,res) {

    const terrenos = ['TERRESTRE', 'ACUATICO', 'AEREO'];

    res.status(200).json(terrenos);
     
}

function getRecursos (req,res) {

    const recursos = ['POLICIA LOCAL', 'POLICIA NACIONAL', 'GUARDIA CIVIL', 'AMBULANCIA', 'BOMBEROS', 'GES' ];

    res.status(200).json(recursos);
     
}

async function changeDataINR(req,res){

    var i = {};
    var inrconcreto = await INR.find();

    for (var item in inrconcreto){

        if(inrconcreto[item].nombre === req.params.inr.toUpperCase()){

          i = inrconcreto[item];

        }
    }

    try{
        const inrDb = await INR.findByIdAndUpdate( 
            {_id: i._id},
            { 
            nombre: req.body.inr.inr.nombre.toUpperCase(),
            localizacion: req.body.inr.inr.localizacion.toUpperCase(),
            descripcion: req.body.inr.inr.descripcion.toUpperCase(),
            gravedad: req.body.inr.inr.gravedad.toUpperCase(),
            tipo: req.body.inr.inr.tipo.toUpperCase(),
            numAfectados: req.body.inr.inr.numAfectados,
            recursoArray: req.body.inr.inr.recursoArray,
            tipoTerreno: req.body.inr.inr.tipoTerreno.toUpperCase(),
            fechaInicio: req.body.inr.inr.fechaInicio,
            fechaFin: req.body.inr.inr.fechaFin 
            }
        );

        res.json(inrDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

async function deleteINR(req,res){


    var i = {};
    var inrs = await INR.find();

    for (var item in inrs){

        if(inrs[item].nombre === req.params.inr.toUpperCase()){

          i = inrs[item];

        }
    }

    try{

        //const inrDB =  await INR.findOneAndDelete( { nombre: nameOfINR }) ;
        const inrDB = await INR.findByIdAndRemove(i._id);


        if(!inrDB){
            return res.status(400).json({
            mensaje: 'No se encontró el nombre del INR indicado'
            })
        }
        res.json(inrDb);

    } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
    }

}

// async function showAllAportaciones (req,res) {

//     await INR.find(function(err,aportacionArray){
//         if(err) res.send(500, err.message);      
//         res.status(200).json(aportacionArray);
//     });    
// }  


// async function dataAportacion (req,res) {

//     console.log(req.body)

//     const nameOfINR = req.body.nombre;
//     var inr = INR.findOne({ nombre: nameOfINR });

//     try{

//         const inrDb = await INR.findByIdAndUpdate( 
//             {_id: (await inr)._id},
//             { aportacionArray: req.body.aportacionArray},
//         );

//         console.log(inrDb);

//         res.json(inrDb);

//     } catch (error) {
//         return res.status(400).json({
//           mensaje: 'Ocurrio un error',
//           error
//         });
//     }
// }




module.exports = {
    showAll,
    dataINR,
    getGravedad,
    getTipo,
    changeDataINR,
    deleteINR,
    getTipoTerreno,
    getRecursos,
    // showAllAportaciones,
    // dataAportacion,

};
