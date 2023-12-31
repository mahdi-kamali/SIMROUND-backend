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
    maxGhestCount: {
        type: Number,
        default: 0
    },
    pish: {
        type: Number,
        default: 0
    },
    sellerID: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please Enter sellerID."]
    },
    label: {
        type: String,
        required: [true, "Please Enter label"]
    },
    description: {
        type: String,
        default: null
    },
    readingType: {
        type: String,
        required: [true, "Please Enter readingType"]
    },
    operatorName: {
        type: String,
        required: [true, "Please Enter Operator Name."]
    },
    simCardUsageState: {
        type: String,
        default: simcartUsedTypes[0]
    },
    activationDate: {
        type: Date,
        default: null
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    ghesti: {
        type: Boolean,
        default: false
    },
    vaziat: {
        type: Boolean,
        default: false
    },
    isVIP: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model("simcards", SimCardModel);
