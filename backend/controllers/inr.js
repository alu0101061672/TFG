const INR = require('../models/inr');
const services = require('../services');
var bcrypt = require('bcryptjs');

async function showAll (req,res) {

    await INR.find(function(err,inr){

        if(err) res.send(500, err.message);
        
        res.status(200).json(inr);
    })    
}

module.exports = {
    showAll,

};
