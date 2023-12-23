
const express = require("express")
const SimCartModel = require("../../models/SimCartModel")
const { paginateQuery } = require("../../libs/paginateQuery")
const router = express.Router()



router.post("/sim-carts", async (req, res, next) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber);
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
            30,
            {
                price: priceQuery,
                numbers: numbersQuery,
                simCardUsageState: simCardUsageStateQuery,
                ghesti: ghesti ? ghesti : { $ne: undefined },
                ...simCardOperatorQuery,
            }
        );

        return res.json(simCards);
    } catch (err) {
        next(err);
    }
});









module.exports = router