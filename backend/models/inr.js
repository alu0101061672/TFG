const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const inrSchema = new Schema({
  nombre: {type: String, required: [true, 'Nombre obligatorio'], unique:true },
  localizacion: {type: String, required: [true, 'Localización'] },
  descripcion: { type: String,  required: [true, 'Descripción es necesario'] },
  datosRelevantes: { type: String,  required: [true, 'datosRelevantes es necesario'] },
  activo: { type: Boolean, default: true },
  date:{type: Date, default: Date.now},
  
});

module.exports = mongoose.model('inr', inrSchema);


