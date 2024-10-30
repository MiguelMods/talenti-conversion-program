const mongoose = require("mongoose");
const ConvertionsSchema = new mongoose.Schema({
  monto: {
    type: Number,
    required: true,
  },
  monedaOrigen: {
    type: String,
    required: true,
  },
  monedaDestino: {
    type: String,
    required: true,
  },
  resultado: {
    type: Number,
    default: false,
  },
});

const Convertion = mongoose.model("Convertion", ConvertionsSchema);
module.exports = Convertion;
