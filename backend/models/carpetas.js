const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
var INR = mongoose.model('inr');

const carpetaSchema = new Schema({
    nombre: {type: String, required: [true, 'Nombre de la carpeta obligatorio'], unique:true },
    file: {type: Array, select: true},
    inr: {type: Schema.ObjectId, ref: INR},
    fav: {type: Boolean, default: false}

    
  });
  
  module.exports = mongoose.model('carpetas', carpetaSchema);