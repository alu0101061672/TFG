import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const eventSchema = new Schema(
    {
        //El id se genera automaticamente con el Autoincrement
        type_event: { type: String },
        icon: { type: String },
        description: { type: String },
        risk: String,
        signupEvent: { type: Date, default: Date.now() },
        lat: Number,
        lon: Number,
    },
    { idEvent: false },
);

eventSchema.plugin(AutoIncrement, { inc_field: 'idEvent' });

eventSchema.pre('save', function(next) {
    let event = this;
    next();
});

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Event', eventSchema);
