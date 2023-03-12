const express = require("express")
const router = express.Router()
const uploadController = require("../controllers/uploadImg.controller")
const homeController = require("../controllers/home")

router.route("/files").get(uploadController.getListFiles)
router.route("/").post(uploadController.uploadFiles)
router.route("/").get(homeController.getHome)
module.exports = router