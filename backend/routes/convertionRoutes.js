const express = require('express')
const controller = require('../controllers/convertionController')

const routes = express.Router()
const routePath = '/api/convertion'

routes.post(routePath, controller.post)
routes.get(`${routePath}/:id`, controller.getConvertionById)
routes.get(routePath, controller.getAllConvertionHistories)

module.exports = routes
