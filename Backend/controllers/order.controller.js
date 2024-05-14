const db = require('../models')
const tb_order = db.tb_order
const tb_orderDetail = db.tb_orderDetail

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

        const order = await tb_order.create({
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
            await tb_orderDetail.create({
                orderID: order.id,
                cakeID,
                totalCake,
                totalPoundsAmount,
                totalPrice
            });
        }

        return res.status(201).json(
            {
                status_code: 201,
                msg: "created order success",
                data: order
            }
        );
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

module.exports = {
    createOrder
}