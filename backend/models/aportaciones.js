const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const recursos = { 
    values: ['POLICIA LOCAL', 'POLICIA NACIONAL', 'GUARDIA CIVIL', 'AMBULANCIA', 'BOMBEROS', 'GES' ],
    message: '{VALUE} no es un recurso válido'
  }

const aportacionesSchema = new Schema({
    titulo: {type: String, required: [true, 'Título obligatorio'], unique:true },
    descripcion: { type: String, required: [true, 'Descripción es necesario'] },
    recursosNecesarios: {type: String, enum: recursos, select: true, required: [true, 'Recursos necesarios obligatorio'] },
    date:{type: Date, default: Date.now},
    createdBy:{type: String},
    
  });
  
  module.exports = mongoose.model('aportaciones', aportacionesSchema);