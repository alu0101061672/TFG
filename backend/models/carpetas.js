const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const carpetaSchema = new Schema({
    nombre: {type: String, required: [true, 'Nombre de la carpeta obligatorio'], unique:true },
    file: {type: String},
    
  });
  
  module.exports = mongoose.model('carpetas', carpetaSchema);