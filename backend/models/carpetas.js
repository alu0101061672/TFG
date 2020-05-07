const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
var INR = mongoose.model('inr');
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const key = "iug45klj3srdf2fcg34v6dx7j8b2";

const carpetaSchema = new Schema({
    nombre: {type: String, required: [true, 'Nombre de la carpeta obligatorio'], unique:true },
    file: {type: Array, select: true},
    inr: {type: Schema.ObjectId, ref: INR},
    fav: {type: Boolean, default: false}

    
  });
  


carpetaSchema.plugin(mongooseFieldEncryption, {
  fields: ["nombre", "inr"], secret: key});
module.exports = mongoose.model('carpetas', carpetaSchema);
