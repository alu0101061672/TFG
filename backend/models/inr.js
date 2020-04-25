const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const gravedades = {
  values: ['GRAVE', 'MEDIO', 'BAJO'],
  message: '{VALUE} no es una gravedad válida'
}

const tipos = {
  values: ['SIMULACRO', 'CASO REAL'],
  message: '{VALUE} no es un tipo válido'
}

const recursos = { // sanitarios,seguridad,salvamento,extincion o rescate. GES: grupo de emergencias y salvamento
  values: ['POLICIA LOCAL', 'POLICIA NACIONAL', 'GUARDIA CIVIL', 'AMBULANCIA', 'BOMBEROS', 'GES' ],
  message: '{VALUE} no es un recurso válido'
}

const terrenos = {
  values: ['TERRESTRE', 'ACUATICO', 'AEREO'],
  message: '{VALUE} no es un tipo de terreno válido'
}

const inrSchema = new Schema({
  nombre: {type: String, required: [true, 'Nombre obligatorio'], unique:true },
  localizacion: {type: String, required: [true, 'Localización obligatoria'] },
  descripcion: { type: String,  required: [true, 'Descripción es necesario'] },
  gravedad: { type: String, enum: gravedades, select: true, required: [true, 'Gravedad es necesario'] },
  tipo: { type: String, enum: tipos, select: true, required: [true, 'Tipo de INR es necesario'] },
  activo: { type: Boolean, default: true },
  numAfectados: {type: Number, required: [true, 'Número de afectados necesario']},
  recursosNecesarios: {type: String, enum: recursos, select: true },
  tipoTerreno: {type: String, enum: terrenos, select: true,required: [true, 'Tipo de terreno obligatorio'] },
  fechaInicio:{type: Date, default: Date.now, required: [true, 'Fecha de inicio del INR obligatorio']},
  fechaFin:{type: Date, required: [true, 'Fecha de finalización del INR obligatorio']},
  recursoArray: {type:Array, select: true, required: [true, 'Recursos necesarios obligatorio']},
  
  
});

module.exports = mongoose.model('inr', inrSchema);


