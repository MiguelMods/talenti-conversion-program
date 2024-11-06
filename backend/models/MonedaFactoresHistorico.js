const mongoose = require('mongoose')

// Esquema del historial de MonedaFactores
const MonedaFactoresHistoricoSchema = new mongoose.Schema({
  id: { // ID del registro original
    type: Number,
    required: true
  },
  monedaOrigen: {
    type: String,
    required: true
  },
  monedaDestino: {
    type: String,
    required: true
  },
  operacion: {
    type: String,
    required: true
  },
  FactorTasaCambio: {
    type: Number,
    required: true
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now // Fecha de actualización
  }
})

const MonedaFactoresHistorico = mongoose.model('MonedaFactoresHistorico', MonedaFactoresHistoricoSchema)
module.exports = MonedaFactoresHistorico
