const express = require('express')
const order = require('../controllers/order.controller')
const router = express.Router()

router.route("/").post(order.createOrder).get(order.getAll)
router.route("/chitietdonhang").post(order.createOrderDetail)


module.exports = router