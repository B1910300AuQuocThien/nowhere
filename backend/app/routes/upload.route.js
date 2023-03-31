const express = require("express")
const router = express.Router()
const uploadController = require("../controllers/uploadImg.controller")
const homeController = require("../controllers/home")

router.route("/files").get(uploadController.getListFiles)
router.route("/hinhsp/:name").get(uploadController.download)
router.route("/").post(uploadController.uploadFiles)
router.route("/").get(homeController.getHome)
router.route("/data").get(uploadController.getImgData)
router.route("/files").delete(uploadController.deleteAllImg)
router.route("/files/last").get(uploadController.lastImage)

module.exports = router