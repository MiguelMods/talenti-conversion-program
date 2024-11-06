const mongoose = require('mongoose')

// Esquema del contador específico para monedas
const CounterMonedaSchema = new mongoose.Schema({
  sequence_value: {
    type: Number,
    default: 0
  }
})

const CounterMoneda = mongoose.model('CounterMoneda', CounterMonedaSchema)

// Esquema de Monedas
const MonedasSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  estatus: {
    type: Boolean,
    required: false,
    default: true
  },
  fechaCreaccion: {
    type: Date,
    default: Date.now // Fecha de actualización
  },
  id: {
    type: Number,
    unique: true,
    required: true
  }
})

// Middleware para auto-incrementar el ID usando el contador específico para monedas
MonedasSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await CounterMoneda.findOneAndUpdate(
      { _id: 'monedaCounter' }, // Usamos un ID fijo para este contador
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    )
    this.id = counter.sequence_value // Asigna el valor incrementado al campo id
  }
  next()
})

const Monedas = mongoose.model('Monedas', MonedasSchema)
module.exports = { Monedas, CounterMoneda }
