const express = require("express")
const material = require("../controllers/material.controller")
const router = express.Router()

router.route("/").get(material.findAll)

module.exports = router