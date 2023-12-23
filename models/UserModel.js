const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please Enter Email."],
            unique: [true, "This Email Already Exist"],
        },
        fullName: {
            type: String,
            required: [true, "Please Enter Full Name."],
        },
        phoneNumber: {
            type: String,
            required: [true, "Please Enter Phone Number."],
        },
        password: {
            type: String,
            required: [true, "Please Enter Password."],
            match: [
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                "Password must be at least 8 characters long and include both letters and numbers."
            ],
        },
        role: {
            type: String,
            default: "normal",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserModel);
