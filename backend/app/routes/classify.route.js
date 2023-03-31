const express = require("express")
const classify = require("../controllers/classify.controller")
const router = express.Router()

router.route("/")
    .post(classify.create)
    .get(classify.findAll)

router.route("/:id")
    .get(classify.findOne)
    .delete(classify.delete)

module.exports = router