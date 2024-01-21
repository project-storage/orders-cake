const db = require('../models')
const Order = db.order
const OrderDetails = db.orderMaster

const createOrder = async (req, res) => {
    try {
        const { stuID, teamID, teachID, dateBuy, timeBuy, pickupDate, pickupTime, price, status, depositPrice, remainingPrice } = req.body;
        const order = await Order.create({ stuID, teamID, teachID, dateBuy, timeBuy, pickupDate, pickupTime, price, status, depositPrice, remainingPrice });
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