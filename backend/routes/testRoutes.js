const express = require('express')
const routes = express.Router()
const controller = require('../controllers/testController')
routes.get('/api/test', controller.get)
module.exports = routes
