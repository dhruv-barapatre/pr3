const otpGenerator = require("otp-generator")
const jwt = require("jsonwebtoken")

function otpGeneratorfun(user) {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
    const token = jwt.sign({ otp, user }, "sdshdgsdgsdh")
    return {otp,token}
}

module.exports=otpGeneratorfun
