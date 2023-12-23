const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { TOKEN } = require("../../libs/envAccess")
const { fetchUser } = require("../../libs/UserFetch")


router.post("/", async (req, res, next) => {
    try {

        const token = req.headers.token

       

        if (!token) throw "Token required."


        const user = await fetchUser(token)

        if (!user) throw "token Invalid."


        return res.json(user)

    }
    catch (err) {
        return next(err)
     }
})

module.exports = router