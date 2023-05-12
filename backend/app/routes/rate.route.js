const express = require("express")
const rate = require('../controllers/rate.controller')
const router = express.Router()

router.route("/").post(rate.create)
router.route('/:id').delete(rate.delete)

module.exports = router