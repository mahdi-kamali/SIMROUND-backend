const mongoose = require("mongoose");

const SellOrderModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please Enter fullName"]
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please Enter BuyerID."],
    },
    simCardNumber: {
        type: String,
        required: [true, "Please Enter simCardNumber"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please Enter Your phoneNumber."]
    },
    price: {
        type: String,
        required: [true, "Please Enter Price."]
    },
    status: {
        type: String,
        default: "waiting"
    }

},
    {
        timestamps: true
    });

module.exports = mongoose.model("SellOrder", SellOrderModel);
