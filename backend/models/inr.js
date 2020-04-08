const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const gravedades = {
  values: ['GRAVE', 'MEDIO', 'BAJO'],
  message: '{VALUE} no es una gravedad válida'
}

const tipos = {
  values: ['SIMULACRO', 'CASOREAL'],
  message: '{VALUE} no es un tipo válido'
}

const inrSchema = new Schema({
  nombre: {type: String, required: [true, 'Nombre obligatorio'], unique:true },
  localizacion: {type: String, required: [true, 'Localización obligatoria'] },
  descripcion: { type: String,  required: [true, 'Descripción es necesario'] },
  datosRelevantes: { type: String,  required: [true, 'datosRelevantes es necesario'] },
  gravedad: { type: String, enum: gravedades, select: true, required: [true, 'Gravedad es necesario'] },
  tipo: { type: String, enum: tipos, select: true, required: [true, 'Tipo de INR es necesario'] },
  activo: { type: Boolean, default: true },
  numAfectados: {type: Number, required: [true, 'Número de afectados necesario']},
  recursosNecesarios: {type: String, required: [true, 'Recursos necesarios obligatorio'] },
  tipoTerreno: {type: String, required: [true, 'Tipo de terreno obligatorio'] },
  fechaInicio:{type: Date, default: Date.now},
  fechaFin:{type: Date},
  
});

module.exports = mongoose.model('inr', inrSchema);


