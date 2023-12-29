const express = require("express")
const BuyOrderModel = require("../../models/BuyOrderMode")
const { fetchUser } = require("../../libs/UserFetch")
const SimCartModel = require("../../models/SimCartModel")
const SellOrderModel = require("../../models/SellOrderModel")
const router = express.Router()



router.get("/buy-orders/", async (req, res, next) => {
    const user = await fetchUser(req.headers.token)
    const buyOrders = await BuyOrderModel.find({
        userID: user._id
    })
    return res.json(buyOrders)
})


router.post("/buy-orders/new", async (req, res, next) => {
    try {
        const { simCardID, paymanyMethod } = req.body


       


        if (!simCardID || simCardID === null) throw ("simCardID Required.")




        const user = await fetchUser(req.headers.token)


        const simCard = await SimCartModel.findById(simCardID)




        const newBuyOrder = new BuyOrderModel(
            {
                userEmail: user.email,
                simCardID: simCard._id,
                paymentMethod: paymanyMethod,
                userID: user._id,
                price: simCard.price
            }
        )
        return res.json(await newBuyOrder.save())
    }
    catch (err) {
        next(err)
    }
})



router.get("/sell-orders/", async (req, res, next) => {
    const user = await fetchUser(req.headers.token)
    const buyOrders = await BuyOrderModel.find({
        userID: user._id
    })
    return res.json(buyOrders)
})


router.post("/sell-orders/new", async (req, res, next) => {
    try {
        const data = req.body
        const user = await fetchUser(req.headers.token)
        const newSellOrder = new SellOrderModel(data)
        newSellOrder.userID = user._id
        return res.json(await newSellOrder.save())
    }
    catch (err) {
        return next(err)
    }
})



module.exports = router