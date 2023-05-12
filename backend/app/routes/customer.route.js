const express = require("express")
const customer = require("../controllers/customer.controller")
const router = express.Router()

router.route('/last').get(customer.lastRe)
router.route('/dangnhap').post(customer.login)
router.route("/:email").get(customer.findByEmail)
router.route('/').post(customer.create).get(customer.findAll)
router.route('/capnhat').post(customer.updateStatus)
router.route('/capnhatnguoidung/:id').post(customer.updateUser)
router.route('/:id').delete(customer.delete)
router.route('/nguoidung/:id').get(customer.findById)
module.exports = router