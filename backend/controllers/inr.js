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

    // Buscamos nombre en DB
    const inrDB = await INR.findOne({nombre: req.body.nombre.toUpperCase()});

    // Evaluamos si no existe el inr en DB
    if(inrDB){
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
            .send({ nombre: inr.nombre, });
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

    const nameofINR = req.params.inr;
    const inrs = req.body.inr;

    var inr = INR.findOne({ nombre: nameofINR });

    try{
        const inrDb = await INR.findByIdAndUpdate( 
            {_id: (await inr)._id},
            { 
            nombre: inrs.inr.nombre.toUpperCase(),
            localizacion: inrs.inr.localizacion.toUpperCase(),
            descripcion: inrs.inr.descripcion.toUpperCase(),
            gravedad: inrs.inr.gravedad.toUpperCase(),
            tipo: inrs.inr.tipo.toUpperCase(),
            numAfectados: inrs.inr.numAfectados,
            recursoArray: inrs.inr.recursoArray.toUpperCase(),
            tipoTerreno: inrs.inr.tipoTerreno.toUpperCase(),
            fechaInicio: inrs.inr.fechaInicio,
            fechaFin: inrs.inr.fechaFin 
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

    const nameOfINR = req.params.inr;

    var inr = INR.findOne({ nombre: nameOfINR });


    try{

        //const inrDB =  await INR.findOneAndDelete( { nombre: nameOfINR }) ;
        const inrDB = await INR.findByIdAndRemove((await inr)._id);


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
