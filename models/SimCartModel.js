const mongoose = require("mongoose");



const simcartUsedTypes = [
    "new",
    "used",
    "semi used"
]

const simCartOperators = [
    "MTN Irancell",
    "Hamrah-e Aval",
    "Rightel",
]



const SimCardModel = new mongoose.Schema({

    numbers: {
        type: Number,
        required: [true, "Please Enter Numbers."],
        validate: [
            {
                validator: function (value) {
                    return /^[9]/.test(value.toString());
                },
                message: props => `${props.value} باید با 9 شروع شود`
            },
            {
                validator: function (value) {
                    return /^\d{9}$/.test(value.toString().substring(1));
                },
                message: props => `${props.value} شماره باید 10رقمی باشد`
            }
        ]
    },
    price: {
        type: Number,
        required: [true, "Please Enter price."]
    },

    sellerID: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please Enter sellerID."]
    },

    activationDate: Date,

    isActivated: {
        type: Boolean,
        default: true
    },
    operatorName: {
        type: String,
        required: [true, "Please Enter Operator Name."]
    },

    simCardUsageState: {
        type: String,
        default: simcartUsedTypes[0]
    },
    ghesti: {
        type: Boolean,
        default: false
    },
    pish: {
        type: Number,
        default: 0
    },
    vaziat: {
        type: Boolean,
        default: false
    }


},
    {
        timestamps: true
    });

module.exports = mongoose.model("simcards", SimCardModel);
