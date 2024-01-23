const OrderController = require('../controllers/orderController')
const OrderRouter = require('express').Router()

OrderRouter.post('/create', OrderController.createOrder)

module.exports = OrderRouter