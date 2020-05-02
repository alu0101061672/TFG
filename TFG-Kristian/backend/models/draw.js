import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const drawSchema = new Schema(
  {
    //El id se genera automaticamente con el Autoincrement
    shape: { type: Object }
  },
  { idShape: false }
);

drawSchema.plugin(AutoIncrement, { inc_field: "idShape" });

drawSchema.pre("save", function(next) {
  let draw = this;
  next();
});

mongoose.set("useFindAndModify", false);

module.exports = mongoose.model("Draw", drawSchema);
