const INR = require('../models/inr');
const services = require('../services');
var bcrypt = require('bcryptjs');

async function showAll (req,res) {

    await INR.find(function(err,inr){

        if(err) res.send(500, err.message);
        
        res.status(200).json(inr);
    });    
}

async function dataINR (req,res) {

    const inr = new INR({
        nombre: req.body.nombre,
        localizacion: req.body.localizacion,
        descripcion: req.body.descripcion,
        gravedad: req.body.gravedad,
        tipo: req.body.tipo,
        numAfectados: req.body.numAfectados,
        recursosNecesarios: req.body.recursosNecesarios,
        tipoTerreno: req.body.tipoTerreno, 
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,

    });

    // Buscamos nombre en DB
    const inrDB = await INR.findOne({nombre: req.body.nombre});

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

    const gravedades = await INR.distinct("gravedad");

    res.status(200).json(gravedades);
     
}

async function getTipo (req,res) {

    const tipos = await INR.distinct("tipo");

    res.status(200).json(tipos);
     
}

module.exports = {
    showAll,
    dataINR,
    getGravedad,
    getTipo,

};
