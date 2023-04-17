const express = require("express")
const customer = require("../controllers/customer.controller")
const router = express.Router()

router.route("/:email").get(customer.findByEmail)

router.route('/').post(customer.create)

module.exports = router