const express = require('express')
const order = require('../controllers/order.controller')
const router = express.Router()

router.route("/").post(order.createOrder).get(order.getAll)
router.route("/trangthai").get(order.getStatus)
router.route("/trangthai/capnhat").post(order.updateStatus)
router.route("/chitietdonhang").post(order.createOrderDetail)
router.route("/:id").get(order.getOrderByStatus)


module.exports = router