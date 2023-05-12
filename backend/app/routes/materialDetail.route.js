const express = require('express')
const materialDetail = require('../controllers/materialDetail.controller')
const router = express.Router()

router.route("/").post(materialDetail.create)
router.route('/capnhat').post(materialDetail.updateQuantity)
router.route('/chatlieu').post(materialDetail.getById)

module.exports = router