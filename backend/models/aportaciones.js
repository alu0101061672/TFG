const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
var INR = mongoose.model('inr');
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const key = "56hv3g32kjn2gvcdxf8gvh90jh6bb4hv";

// const recursos = { 
//     values: ['POLICIA LOCAL', 'POLICIA NACIONAL', 'GUARDIA CIVIL', 'AMBULANCIA', 'BOMBEROS', 'GES' ],
//     message: '{VALUE} no es un recurso válido'
//   }

const aportacionesSchema = new Schema({
    titulo: {type: String, required: [true, 'Título obligatorio'], unique:true },
    descripcion: { type: String, required: [true, 'Descripción es necesario'] },
    recursosAportacion: {type: Array, select: true, required: [true, 'Recursos necesarios obligatorio'] },
    date:{type: Date, default: Date.now},
    createdBy:{type: String},
    inr: {type: Schema.ObjectId, ref: INR},
    rectificado: {type: Boolean, default: false}
    
  });

aportacionesSchema.plugin(mongooseFieldEncryption, {
  fields: ["titulo", "descripcion", "createdBy", "inr"], secret: key});
module.exports = mongoose.model('aportaciones', aportacionesSchema);
