const express = require("express")
const router = express.Router()
const callbackRouter = express.Router()
const passport = require("passport")
const session = require('express-session')
const auth = require('../controllers/auth.controller')
const cors = require('cors')
router.route("/google").get(passport.authenticate('google', {
    scope: ["profile", "email"]
}))

callbackRouter.route('/google/callback').get(passport.authenticate('google', {
    failureRedirect: () => {
        console.log("loai")
    }
}), cors(), function (req, res) {
    return req.user
})

module.exports = {
    router, callbackRouter
}