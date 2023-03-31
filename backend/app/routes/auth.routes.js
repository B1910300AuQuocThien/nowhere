const express = require("express")
const router = express.Router()
const callbackRouter = express.Router()
const passport = require("passport")

router.route("/google").get(passport.authenticate('google', {
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]
}))

callbackRouter.route('/google/callback').get(passport.authenticate('google', {
    failureRedirect: () => {
        console.log("loai")
    }
}),
    function (req, res) {
        res.send({ message: "thanh cong" })
    })

module.exports = {
    router, callbackRouter
}