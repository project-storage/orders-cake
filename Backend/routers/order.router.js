const orderController = require('../controllers/order.controller')
const orderRouter = require('express').Router()

orderRouter.post('/create', orderController.createOrder)
orderRouter.get('/', orderController.getAllOrders)
orderRouter.get('/:id', orderController.getOrderById)
orderRouter.put('/:id', orderController.updateOrder)
orderRouter.delete('/:id', orderController.deleteOrder)
orderRouter.get('/student/:stuID', orderController.getOrdersByStudentId)

module.exports = orderRouter