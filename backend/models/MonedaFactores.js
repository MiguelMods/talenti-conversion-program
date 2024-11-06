const mongoose = require('mongoose')
const MonedaFactoresHistorico = require('./MonedaFactoresHistorico')
// Esquema del contador específico para MonedaFactores
const CounterMonedaFactoresSchema = new mongoose.Schema({
  sequence_value: {
    type: Number,
    default: 0
  }
})

const CounterMonedaFactores = mongoose.model('CounterMonedaFactores', CounterMonedaFactoresSchema)

// Esquema de MonedaFactores
const MonedaFactoresSchema = new mongoose.Schema({
  id: { // Campo para el ID auto-incremental
    type: Number,
    unique: true,
    required: true
  },
  monedaOrigen: {
    type: String,
    required: true
  },
  monedaDestino: { // Cambiado a minúscula
    type: String,
    required: true
  },
  operacion: {
    type: String,
    required: true
  },
  FactorTasaCambio: {
    type: Number,
    required: true // Corregido de require a required
  },
  fechaCreaccion: {
    type: Date,
    default: Date.now // Fecha de actualización
  }
})

// Middleware para auto-incrementar el ID usando el contador específico
MonedaFactoresSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await CounterMonedaFactores.findOneAndUpdate(
      { _id: 'monedaFactoresCounter' }, // ID fijo para el contador
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    )
    this.id = counter.sequence_value // Asigna el valor incrementado al campo id
  }
  next()
})

MonedaFactoresSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery())
  if (docToUpdate) {
    // Crear un nuevo documento en el historial
    const historico = new MonedaFactoresHistorico({
      id: docToUpdate.id,
      monedaOrigen: docToUpdate.monedaOrigen,
      monedaDestino: docToUpdate.monedaDestino,
      operacion: docToUpdate.operacion,
      FactorTasaCambio: docToUpdate.FactorTasaCambio,
      fechaActualizacion: Date.now()
    })
    await historico.save() // Guardar en el historial
  }
  next()
})

const MonedaFactores = mongoose.model('MonedaFactores', MonedaFactoresSchema)
module.exports = { MonedaFactores, CounterMonedaFactores }
