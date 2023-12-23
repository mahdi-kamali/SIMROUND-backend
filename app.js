const express = require("express")
const mongoose = require('mongoose');
const bodyParse = require("body-parser")
const multer = require("multer");
const { ErrorHandler } = require("./libs/ErrorHandler");
const upload = multer()
const dotEnv = require("dotenv");
const { isAdmin, isNormalUser } = require("./libs/UserRoleChecker");
const cors = require("cors")



// Mongo Connection
mongoose.connect('mongodb://127.0.0.1:27017/simround')
    .then(() => console.log('DataBase Connected!'));



const port = 3001;
const app = express()


// Express Uses
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('public'));
app.use(cors())




// Auth Routes
app.use("/api/auth", require("./routes/auth/registerRouter"))
app.use("/api/auth", require("./routes/auth/loginRouter"))
app.use("/api/auth/info", require("./routes/auth/userInfoRouter"))



// Public Routes
app.use("/api", require("./routes/public/simCartsRouter"))



// Admin Panel 
app.use("/api/admin-panel", isAdmin,
    require("./routes/admin-panel/adminPanelRouter"))




// User 
app.use("/api/user/", isNormalUser, require("./routes/user/userRoutes"))











// Error Hanlder 
app.use(ErrorHandler)






app.listen(port, () => {
    console.log(`Server Running => ${port}`)



})
