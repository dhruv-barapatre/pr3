const expres=require("express")
const { Signup } = require("../controller/user.controller")

const userRouter=expres.Router()
userRouter.post("/signUp",Signup)

module.exports=userRouter