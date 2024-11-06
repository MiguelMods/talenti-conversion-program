const express = require('express')
const constroller = require('../controllers/coinController')

const routes = express.Router()
const routePath = '/api/coin'

const { Validator } = require('express-json-validator-middleware')
const monedaSchema = require('../validatorSchema/monedaSchema')
// eslint-disable-next-line new-cap
const validator = new Validator()
const validate = validator.validate

routes.get(routePath, constroller.getAllCoin)
routes.get(`${routePath}/:id`, constroller.getCoinById)
routes.post(routePath, validate({ body: monedaSchema.valueOf() }), constroller.postCoin)
routes.put(routePath, validate({ body: monedaSchema.valueOf() }), constroller.putCoin)
// Manejo de errores de validación
routes.use((err, req, res, next) => {
  if (err && err.validationErrors) {
    console.error('Errores de validación:', err.validationErrors)
    return res.status(400).json({ errors: err.validationErrors })
  }
  if (err.status === 400) {
    return res.status(400).json({ message: 'Error de validación', errors: err.errors })
  }
  next(err)
})

module.exports = routes
