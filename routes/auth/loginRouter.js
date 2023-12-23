

const express = require("express")
const UserModel = require("../../models/UserModel")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { TOKEN } = require("../../libs/envAccess")



router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body



        const user = await UserModel.findOne({
            email: email,
            password: password
        }).select()



        if (!user || user === null) {
            throw ("Email Or Password Wrong.")
        }



        const userData = {
            fullName: user.fullName,
            email: email,
            loggedIn: Date.now(),
            role: user.role
        }


        const token = await jwt.sign(
            userData,
            TOKEN,
            {
                expiresIn: "1d"
            }
        )



        return res.json({
            message: "Welcome Back.",
            token
        })
    }
    catch (e) {
        return next(e)
    }
})



module.exports = router