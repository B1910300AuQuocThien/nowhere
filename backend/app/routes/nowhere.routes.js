const express = require("express")
const nowheres = require("../controllers/product.controller")

const router = express.Router()

router.route("/")
    .get(nowheres.findAll)
    .post(nowheres.create)
    .delete(nowheres.delete)


// cai nay de lai
router.route("/favorite")
    .get(nowheres.findAllFavorite)

router.route("/:id")
    .get(nowheres.findOne)
    .put(nowheres.update)
    .delete(nowheres.delete)

module.exports = router