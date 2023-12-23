const express = require("express")
const UserModel = require("../../models/UserModel")
const router = express.Router()



router.post("/register/", async (req, res, next) => {
    try {
        const data = req.body


        const { password, passwordConfirmation } = data

        if (!password || !passwordConfirmation) {
            throw ("Password / Password Confimration Required.")
        }

        if (password !== passwordConfirmation) {
            throw ("Password or Password Confirmation Not Match!")
        }


        const user = new UserModel({
            ...data
        })

        return res.json(await user.save())
    }
    catch (err) {
        return next(err)
    }

})




module.exports = router