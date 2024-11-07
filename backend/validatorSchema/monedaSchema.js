const S = require('fluent-json-schema')

const monedaSchema = S.object()
  .prop('codigo', S.string().minLength(3).maxLength(10).required())
  .prop('descripcion', S.string().minLength(10).maxLength(100).required())

// Exporta el esquema
module.exports = monedaSchema
