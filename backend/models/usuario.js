const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

//const uniqueValidator = require('mongoose-unique-validator');

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
  lastLogin: Date,
  
});

/*usuarioSchema.plugin(uniqueValidator, { message: 'Error, esperaba {PATH} único.' });


UserSchema.pre('save', function(next) {
  let user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.gravatar = function() {
  if (!this.email)
      return `https://gravatar.com/avatar/?s=200&d=retro`;

  const md5 = crypto
      .createHash('md5')
      .update(this.email)
      .digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

mongoose.set('useFindAndModify', false);*/

module.exports = mongoose.model('usuario', usuarioSchema);


