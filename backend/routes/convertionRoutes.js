const express = require('express')
const controller = require('../controllers/convertionController')

const routes = express.Router()
const routePath = '/api/convertion'

const { Validator } = require('express-json-validator-middleware')
const convertionSchema = require('../validatorSchema/convertionSchema')
// eslint-disable-next-line new-cap
const validator = new Validator()
const validate = validator.validate

routes.post(routePath, validate(convertionSchema), controller.post)
routes.get(`${routePath}/:id`, controller.getConvertionById)
routes.get(routePath, controller.getAllConvertionHistories)

module.exports = routes
