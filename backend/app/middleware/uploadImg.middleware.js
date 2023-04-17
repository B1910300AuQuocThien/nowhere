const util = require("util")
const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")
const config = require("../config")



var storage = new GridFsStorage({
    url: config.db.uri,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        console.log(req.body)
        const match = ["image/png", "image/jpeg", "image/jpg"]
        if (match.includes(file.mimeType) === -1) {
            const filename = `image_${Date.now()}`
            return filename

        }
        return {
            bucketName: config.imgBucket,
            filename: `image_${Date.now()}`,
        }
    },
    metadata: (req, file) => {
        return {
            image_id: `image_${Date.now()}`
        }
    }

})

var uploadFile = multer({ storage: storage }).fields([{ id: `image_${Date.now()}` }])
uploadFile = multer({ storage: storage }).single('file')

var uploadFilesMiddleware = util.promisify(uploadFile)
module.exports = uploadFilesMiddleware