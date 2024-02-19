const db = require('../models');
const Order = db.order;
const OrderDetails = db.orderMaster;

const createOrder = async (req, res) => {
    try {
        const {
            bookNumber,
            orderNumber,
            stuID,
            teamID,
            dateBuy,
            timeBuy,
            pickupDate,
            pickupTime,
            price,
            statusID,
            depositPrice,
            remainingPrice,
            teachID,
            orderDetails
        } = req.body;

        const order = await Order.create({
            bookNumber,
            orderNumber,
            stuID,
            teamID,
            dateBuy,
            timeBuy,
            pickupDate,
            pickupTime,
            price,
            statusID,
            depositPrice,
            remainingPrice,
            teachID
        });

        for (let i = 0; i < orderDetails.length; i++) {
            const {
                cakeID,
                totalCake,
                totalPoundsAmount,
                totalPrice
            } = orderDetails[i];
            await OrderDetails.create({
                orderID: order.id,
                cakeID,
                totalCake,
                totalPoundsAmount,
                totalPrice
            });
        }

        return res.status(201).json(order);
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({
            message: 'An error occurred while adding the order'
        });
    }
};

module.exports = {
    createOrder
};
