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

// Get all orders with their details
const getAllOrders = async (req, res) => {
    try {
        const orders = await tb_order.findAll({
            include: [
                {
                    model: db.tb_orderDetail,
                    as: 'orderDetails',
                    include: [
                        {
                            model: db.tb_cake,
                            as: 'cake'
                        }
                    ]
                },
                {
                    model: db.tb_student,
                    as: 'student'
                },
                {
                    model: db.tb_team,
                    as: 'team'
                },
                {
                    model: db.tb_status,
                    as: 'status'
                }
            ],
            order: [['id', 'DESC']]
        });

        return res.status(200).json({
            status_code: 200,
            msg: "Get all orders success",
            data: orders
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

// Get order by ID with details
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await tb_order.findByPk(id, {
            include: [
                {
                    model: db.tb_orderDetail,
                    as: 'orderDetails',
                    include: [
                        {
                            model: db.tb_cake,
                            as: 'cake'
                        }
                    ]
                },
                {
                    model: db.tb_student,
                    as: 'student'
                },
                {
                    model: db.tb_team,
                    as: 'team'
                },
                {
                    model: db.tb_status,
                    as: 'status'
                }
            ]
        });

        if (!order) {
            return res.status(404).json({
                status_code: 404,
                msg: "Order not found"
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Get order success",
            data: order
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
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
            teachID
        } = req.body;

        const order = await tb_order.findByPk(id);
        if (!order) {
            return res.status(404).json({
                status_code: 404,
                msg: "Order not found"
            });
        }

        await order.update({
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

        return res.status(200).json({
            status_code: 200,
            msg: "Update order success",
            data: order
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await tb_order.findByPk(id);
        if (!order) {
            return res.status(404).json({
                status_code: 404,
                msg: "Order not found"
            });
        }

        // Delete associated order details first
        await tb_orderDetail.destroy({
            where: { orderID: id }
        });

        // Then delete the order
        await order.destroy();

        return res.status(200).json({
            status_code: 200,
            msg: "Delete order success"
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

// Get orders by student ID
const getOrdersByStudentId = async (req, res) => {
    try {
        const { stuID } = req.params;

        const orders = await tb_order.findAll({
            where: { stuID: stuID },
            include: [
                {
                    model: db.tb_orderDetail,
                    as: 'orderDetails',
                    include: [
                        {
                            model: db.tb_cake,
                            as: 'cake'
                        }
                    ]
                },
                {
                    model: db.tb_student,
                    as: 'student'
                },
                {
                    model: db.tb_team,
                    as: 'team'
                },
                {
                    model: db.tb_status,
                    as: 'status'
                }
            ],
            order: [['id', 'DESC']]
        });

        return res.status(200).json({
            status_code: 200,
            msg: "Get orders by student ID success",
            data: orders
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByStudentId
}