const express = require("express")
const material = require("../controllers/material.controller")
const router = express.Router()

router.route("/")
    .get(material.findAll)
    .post(material.create)

router.route("/:id")
    .get(material.findOne)
    .delete(material.delete)

module.exports = router