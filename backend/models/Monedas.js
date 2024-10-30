const mongoose = require("mongoose");
const MonedasSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
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
