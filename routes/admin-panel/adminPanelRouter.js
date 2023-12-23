

const express = require("express")
const SimCartModel = require("../../models/SimCartModel")
const { fetchUser } = require("../../libs/UserFetch")
const { paginateQuery } = require("../../libs/paginateQuery")
const BuyOrderMode = require("../../models/BuyOrderMode")
const SellOrderModel = require("../../models/SellOrderModel")
const router = express.Router()



// New
router.post("/sim-cards/new", async (req, res, next) => {
    try {
        const data = req.body
        const { ghesti, vaziat } = req.body

        data.ghesti = ghesti === "on"
        data.vaziat = vaziat === "on"


        const seller = await fetchUser(req.headers.token)


        const newSimCart = new SimCartModel(data)
        newSimCart.sellerID = seller._id


        return res.json(await newSimCart.save())
    }
    catch (e) {
        return next(e)
    }
})



// Update
router.put("/sim-cards/update", async (req, res, next) => {
    try {
        const { simCardID } = req.body
        const data = req.body


        const simCard = await SimCartModel.findByIdAndUpdate(simCardID, {
            ...data,
        }

        )



        if (!simCard) throw ("SimCard Not exist.")



        return res.json("Updating Success!")
    }
    catch (err) {
        return next(err)
    }
})



// Delete 
router.delete("/sim-cards/delete", async (req, res, next) => {
    try {
        const { simCardID } = req.body

        const simCard = await SimCartModel.findByIdAndDelete(simCardID)
        if (!simCard) throw ("SimCard Not exist.")


        return res.json("SimCard Deleted!.")
    }
    catch (err) {
        return next(err)
    }
})



// Get All
router.get("/sim-cards", async (req, res, next) => {
    try {
        const pageNumber =
            parseInt(req.query.pageNumber) ? parseInt(req.query.pageNumber) : 1;

        const {
            priceMin = 0,
            priceMax = 99999999999,
            digits = `9*********`,
            simCardUsageState = "all",
            ghesti = false,
            operatorName = "all"
        } = req.query;

        let numbersQuery = {
            $gte: 9374905487,
            $lte: 9374905487
        };


        const minDigit = `${digits}`.replaceAll("*", "0");
        const maxDigit = `${digits}`.replaceAll("*", "9");
        numbersQuery = {
            $gte: parseInt(minDigit),
            $lte: parseInt(maxDigit)
        };
        // return res.json(numbersQuery)


        const priceQuery = {
            $gte: priceMin,
            $lte: priceMax
        };

        let simCardUsageStateQuery = {
            $ne: "all"
        };

        if (simCardUsageState !== "all") {
            simCardUsageStateQuery = simCardUsageState;
        }


        let simCardOperatorQuery = {};

        if (operatorName !== "all") {
            simCardOperatorQuery = { operatorName };
        }





        const simCards = await paginateQuery(
            SimCartModel,
            pageNumber,
            15,
            {
                price: priceQuery,
                numbers: numbersQuery,
                simCardUsageState: simCardUsageStateQuery,
                ghesti: ghesti ? ghesti : { $ne: undefined },
                ...simCardOperatorQuery,
            }
        );

        return res.json(simCards)


        return res.json(simCards);
    } catch (err) {
        next(err);
    }
});



// خرید های ما از مشتری
router.get("/buy-orders/:pageNumber", async (req, res, next) => {
    try {
        const pageNumber = parseInt(req.params.pageNumber) || 1; // Extract page number from URL params, default to 1 if not provided
        const itemsPerPage = 10; // Set the number of items per page

        const paginatedOrders = await paginateQuery(BuyOrderMode, pageNumber, itemsPerPage);

        return res.json(paginatedOrders);
    } catch (error) {
        return next(error);
    }
});


// فروش های ما به مشتری
router.get("/sell-orders/:pageNumber", async (req, res, next) => {
    try {
        const pageNumber = parseInt(req.params.pageNumber) || 1; // Extract page number from URL params, default to 1 if not provided
        const itemsPerPage = 10; // Set the number of items per page

        const paginatedOrders = await paginateQuery(SellOrderModel, pageNumber, itemsPerPage);

        return res.json(paginatedOrders);
    } catch (error) {
        return next(error);
    }
});




















module.exports = router