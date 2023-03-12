const express = require("express")
const classify = require("../controllers/classify.controller")
const router = express.Router()

router.route("/").get(classify.findAll)

module.exports = router