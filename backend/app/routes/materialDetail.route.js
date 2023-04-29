const express = require('express')
const materialDetail = require('../controllers/materialDetail.controller')
const router = express.Router()

router.route("/").post(materialDetail.create)

module.exports = router