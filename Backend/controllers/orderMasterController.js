const db = require('../models')
const orderMaster = db.orderMaster
const Student = db.student
const Tema = db.team
const Teacher = db.teacher

//CREATE ORDER MASTER
const createOrderMaster = async (req, res) => {
    // try {
    //     const {
    //         stuID,
    //         teamID,
    //         teachID,
    //         cakeButter,
    //         cakeJam,
    //         cakeCoffee,
    //         cakeChocolate,
    //         totalCake,
    //         Pound1,
    //         Pound2,
    //         Pound3,
    //         Pound4,
    //         Pound5,
    //         totalPoundsAmount,
    //         totalPrice,
    //         dateBuy,
    //         pickupDate,
    //         pickupTime } = req.body

    //     const totalCakeFun = await (cakeButter + cakeChocolate + cakeCoffee + cakeJam);
    //     const totalPoundsAmountFun = await (Pound1 + Pound2 + Pound3 + Pound4 + Pound5);


    //     console.log(req.body)
    //     const newOrderMaster = new orderMaster({
    //         stuID,
    //         teachID,
    //         teamID,
    //         cakeButter,
    //         cakeChocolate,
    //         cakeCoffee,
    //         cakeJam,
    //         totalCake: totalCakeFun,
    //         Pound1,
    //         Pound2,
    //         Pound3,
    //         Pound4,
    //         Pound5,
    //         totalPoundsAmount: totalPoundsAmountFun,
    //         totalPrice,
    //         dateBuy,
    //         pickupDate,
    //         pickupTime
    //     })

    //     const saveOrderMaster = await newOrderMaster.save()
    //     console.log(saveOrderMaster)
    //     return res.
    //         status(200)
    //         .json({
    //             status: "200",
    //             message: "create order master success",
    //             data: saveOrderMaster
    //         })
    // } catch (error) {
    //     console.error("Error", error);
    //     return res
    //         .status(500)
    //         .json({ message: 'เกิดข้อผิดพลาดในการเพิ่มออร์เดอร์' })
    // }
}

module.exports = {
    createOrderMaster
}


// app.post('/createOrder', async (req, res) => {
//     try {
//       const { stuID, teamID, teachID, dateBuy, timeBuy, pickupDate, pickupTime, price, status, depositPrice, remainingPrice } = req.body;
//       const order = await Order.create({ stuID, teamID, teachID, dateBuy, timeBuy, pickupDate, pickupTime, price, status, depositPrice, remainingPrice });
//       const orderDetails = req.body.orderDetails;
//       for (let i = 0; i < orderDetails.length; i++) {
//         const { cakeID, totalCake, totalPoundsAmount, totalPrice } = orderDetails[i];
//         await OrderDetails.create({ orderID: order.id, cakeID, totalCake, totalPoundsAmount, totalPrice });
//       }
//       res.status(201).json(order);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });