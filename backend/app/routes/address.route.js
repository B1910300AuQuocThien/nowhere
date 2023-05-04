const express = require("express")
const address = require("../controllers/address.controller")
const router = express.Router()

router.route("/").post(address.create)
router.route("/loc").post(address.findByUser)
module.exports = router