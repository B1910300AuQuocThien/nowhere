const express = require("express")
const product = require("../controllers/product.controller")
const router = express.Router()

router.route("/")
    .get(product.findAll_1)
    .post(product.create)
    .delete(product.deleteAll)

router.route("/favorite")
    .get(product.findAllFavorite)

router.route("/khoa").get(product.lastRecord)

router.route("/danhmuc/:id").get(product.findAll_2)

router.route("/:id")
    .get(product.findOne)
    .put(product.update)
    .delete(product.delete)



module.exports = router