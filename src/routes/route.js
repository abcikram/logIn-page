const express = require("express")
const router = express.Router()

const userController = require("../controller/userController")
const middlewa = require("../middleware/auth")



router.post("/register", userController.createUser)

router.post("/login",userController.userLogin)

router.put("/update/:userId",middlewa.authentication, userController.Updateuser)



module.exports = router