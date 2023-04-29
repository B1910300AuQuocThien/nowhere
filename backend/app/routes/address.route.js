const express = require("express")
const address = require("../controllers/address.controller")
const router = express.Router()

router.route("/").post(address.create).get(address.lastRecord)
module.exports = router