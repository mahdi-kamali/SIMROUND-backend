const mongoose = require("mongoose");

const BuyOrderModel = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please Enter buyerID."],
    },
    simCardID: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please Enter simCardID."],
    },
    paymentMethod: {
        type: String,
        required: [true, "Please Enter payment Method."]
    },
    price: {
        type: String,
        required: [true, "Please Enter price."]
    },
    status: {
        type: String,
        default: "waiting"
    }

},
    {
        timestamps: true
    });

module.exports = mongoose.model("BuyOrder", BuyOrderModel);
