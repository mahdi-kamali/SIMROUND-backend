const { fetchUser } = require("./UserFetch")




const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.token
        const user = await fetchUser(token)
        if (user.role !== "admin")
            throw ("You Dont Have Permissions.")
        next()

    }
    catch (err) {
        return res.status(403).json(err)
    }
}

const isNormalUser = async (req, res, next) => {
    try {
        const token = req.headers.token
        const user = await fetchUser(token)
        if (user.role === "not activated")
            throw ("You Dont Have Permissions.")
        next()

    }
    catch (err) {
        return res.status(403).json(err)
    }
}



module.exports = { isAdmin, isNormalUser }