const express = require('express')
const constroller = require('../controllers/coinController')

const routes = express.Router()
const routePath = '/api/coin'

routes.get(routePath, constroller.getAllCoin)
routes.get(`${routePath}/:id`, constroller.getCoinById)
routes.post(routePath, constroller.postCoin)
routes.put(routePath, constroller.putCoin)

module.exports = routes
