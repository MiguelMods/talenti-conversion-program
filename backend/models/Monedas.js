const mongoose = require("mongoose");
const MonedasSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: Number,
    required: true,
  },
  estatus: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const Monedas = mongoose.model("Monedas", MonedasSchema);
module.exports = Monedas;
