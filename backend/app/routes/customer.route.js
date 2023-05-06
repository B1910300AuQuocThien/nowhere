const express = require("express")
const customer = require("../controllers/customer.controller")
const router = express.Router()

router.route('/last').get(customer.lastRe)
router.route('/dangnhap').post(customer.login)
router.route("/:email").get(customer.findByEmail)
router.route('/').post(customer.create).get(customer.findAll)

module.exports = router