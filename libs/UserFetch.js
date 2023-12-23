
const jwt = require("jsonwebtoken")
const { TOKEN } = require("./envAccess")
const UserModel = require("../models/UserModel")


const fetchUser = async (token) => {
    try {
        const tokenUser = await jwt.verify(token, TOKEN, (err, user) => {
            if (err) {
                throw ("Token is Not Valid")
            }
            return user
        })

        const user = await UserModel.findOne({
            email: tokenUser.email
        })


        return user
    }
    catch (err) {
        throw (err)
    }

}



module.exports = { fetchUser }