const S = require('fluent-json-schema')

const convertionSchema = S.object()
  .prop('monto', S.number().required())
  .prop('monedaOrigen', S.string().minLength(3).maxLength(5).required())
  .prop('monedaDestino', S.string().minLength(3).maxLength(5).required())

// Exporta el esquema
module.exports = convertionSchema
