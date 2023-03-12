const util = require("util")
const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")
const config = require("../config")



var storage = new GridFsStorage({
    url: config.db.uri,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        console.log(file)
        const match = ["image/png", "image/jpeg", "image/jpg"]
        if (match.includes(file.mimeType) === -1) {
            const filename = `${Date.now()}--bezoder-${file.originalname}`
            return filename
        }
        return {
            bucketName: config.imgBucket,
            filename: `${Date.now()}--bezkoder-${file.originalname}`
        }
    }
})

var uploadFile = multer({ storage: storage }).single("file")
var uploadFilesMiddleware = util.promisify(uploadFile)
module.exports = uploadFilesMiddleware