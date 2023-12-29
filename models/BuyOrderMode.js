const mongoose = require("mongoose");

const status = [
    "منتظر پرداخت" ,
    "موفق" ,
    "ناموفق" ,
    "مشکل فنی"
]



const BuyOrderModel = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please Enter buyerID."],
    },
    userEmail: {
        type: String,
        required: [true, "Please Enter User Email."],
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
        default: status[0]
    }

},
    {
        timestamps: true
    });

module.exports = mongoose.model("BuyOrder", BuyOrderModel);
