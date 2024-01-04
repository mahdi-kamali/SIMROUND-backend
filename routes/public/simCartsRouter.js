const express = require("express");
const SimCartModel = require("../../models/SimCartModel");
const { paginateQuery } = require("../../libs/paginateQuery");
const router = express.Router();

router.post("/sim-carts", async (req, res, next) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber);
    const {
      priceMin = 0,
      priceMax = 99999999999,
      digits = `9*********`,
      vaziat = "all",
      operatorName,
    } = req.query;

    const data = req.query

    // return res.json(readingType)

    let numbersQuery = {
      $gte: 9374905487,
      $lte: 9374905487,
    };

    const minDigit = `${digits}`.replaceAll("*", "0");
    const maxDigit = `${digits}`.replaceAll("*", "9");
    numbersQuery = {
      $gte: parseInt(minDigit),
      $lte: parseInt(maxDigit),
    };

    const priceQuery = {
      $gte: priceMin,
      $lte: priceMax,
    };




    // const simCards = await paginateQuery(SimCartModel, pageNumber, 30, {
    //   price: priceQuery,
    //   numbers: numbersQuery,
    //   vaziat: vaziatQuery,
    //   ghesti: ghesti ? ghesti : { $ne: undefined },
    //   operatorName: operatorName ? operatorName : { $ne: "all" },
    // });


    delete data.pageNumber
    delete data.digits
    delete data.priceMin
    delete data.priceMax
    data.price = priceQuery 
    data.numbers = numbersQuery

    const simCards = await paginateQuery(SimCartModel, pageNumber, 30, {
        ...data ,

      });

    return res.json(simCards);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
