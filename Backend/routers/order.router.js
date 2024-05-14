const orderController = require('../controllers/order.controller')
const orderRouter = require('express').Router()

orderRouter.post('/create', orderController.createOrder)

module.exports = orderRouter