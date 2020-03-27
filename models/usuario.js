import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

// Roles
const roles = {
  values: ['ADMIN', 'USER'],
  message: '{VALUE} no es un rol válido'
}

const usuarioSchema = new Schema({
  usuario: {type: String, required: [true, 'Nombre obligatorio'], unique:true },
  email: {type: String, required: [true, 'Email obligatorio'], unique:true },
  password: { type: String,  required: [true, 'Pass es necesario'] },
  confirmpassword: { type: String,  required: [true, 'Pass es necesario'] },
  role: { type: String, default: 'USER', enum: roles },
  activo: { type: Boolean, default: true },
  date:{type: Date, default: Date.now},
  lastLogin: Date
});

userSchema.plugin(uniqueValidator, { message: 'Error, esperaba {PATH} único.' });

// Convertir a modelo
const usuario = mongoose.model('usuario', usuarioSchema);

export default usuario;
