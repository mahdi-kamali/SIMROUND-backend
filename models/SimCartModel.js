const mongoose = require("mongoose");

const simcartUsedTypes = ["new", "used", "semi used"];

const simCartOperators = ["MTN Irancell", "Hamrah-e Aval", "Rightel"];

const SimCardModel = new mongoose.Schema(
  {
    numbers: {
      type: Number,
      required: [true, "لطفاً شماره را وارد کنید."],
      validate: [
        {
          validator: function (value) {
            return /^[9]/.test(value.toString());
          },
          message: (props) => `${props.value} باید با 9 شروع شود`,
        },
        {
          validator: function (value) {
            return /^\d{9}$/.test(value.toString().substring(1));
          },
          message: (props) => `${props.value} شماره باید 10 رقمی باشد`,
        },
      ],
      unique: true, // تغییر این خط
    },
    khanaei: {
      type: String,
      required: [true, "لطفاً خانه‌ای را وارد کنید."],
    },
    price: {
      type: Number,
      required: [true, "لطفاً قیمت را وارد کنید."],
    },
    maxGhestCount: {
      type: Number,
      default: 0,
    },
    pish: {
      type: Number,
      default: 0,
    },
    seller: {
      type: Number,
      required: [true, "لطفاً فروشنده را وارد کنید."],
    },
    sellerID: {
      type: mongoose.Schema.ObjectId,
      required: [true, "لطفاً شناسه فروشنده را وارد کنید."],
    },
    label: {
      type: String,
      required: [true, "لطفاً برچسب را وارد کنید"],
    },
    description: {
      type: String,
      default: null,
    },
    readingType: {
      type: String,
      required: [true, "لطفاً نوع خواندن را وارد کنید"],
    },
    operatorName: {
      type: String,
      required: [true, "لطفاً نام اپراتور را وارد کنید."],
    },
    activationDate: {
      type: Date,
      default: null,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    ghesti: {
      type: Boolean,
      default: false,
    },
    vaziat: {
      type: String,
      default: simcartUsedTypes[0],
    },
    isVIP: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

SimCardModel.path("numbers").validate({
  validator: async function (value) {
    const count = await this.constructor.countDocuments({ numbers: value });
    return count === 0;
  },
  message: "این شماره قبلا ثبت شده است .",
});

module.exports = mongoose.model("simcards", SimCardModel);
