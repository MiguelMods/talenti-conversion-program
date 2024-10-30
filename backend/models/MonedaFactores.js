const mongoose = require("mongoose");
const MonedaFactoresSchema = new mongoose.Schema({
  monedaOrigen: {
    type: String,
    required: true,
  },
  MonedaDestino: {
    type: String,
    required: true,
  },
  operacion: {
    type: String,
    required: true,
  },
  FactorTasaCambio: {
    type: Number,
    require: true,
  },
});

const MonedaFactores = mongoose.model("MonedaFactores", MonedaFactoresSchema);
module.exports = MonedaFactores;
