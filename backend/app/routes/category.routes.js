const express = require("express")
const category = require("../controllers/category.controller")
const router = express.Router()

router.route("/").get(category.findAll)
module.exports = router