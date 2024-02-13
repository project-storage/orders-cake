const db = require('../models')
const Order = db.order
const OrderDetails = db.orderMaster

const createOrder = async (req, res) => {
    try {
        const { bookNumber, orderNumber, stuID, teamID, dateBuy, timeBuy, pickupDate, pickupTime, price, statusID, depositPrice, remainingPrice, teachID } = req.body;
        const order = await Order.create({ bookNumber, orderNumber, stuID, teamID, dateBuy, timeBuy, pickupDate, pickupTime, price, statusID, depositPrice, remainingPrice, teachID });
        const orderDetails = req.body.orderDetails;
        for (let i = 0; i < orderDetails.length; i++) {
            const { cakeID, totalCake, totalPoundsAmount, totalPrice } = orderDetails[i];
            await OrderDetails.create({ orderID: order.id, cakeID, totalCake, totalPoundsAmount, totalPrice });
        }
        res.status(201).json(order);
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'เกิดข้อผิดพลาดในการเพิ่มออร์เดอร์' })
    }
}

module.exports = {
    createOrder
}